import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import { s3 } from "../middlewares";

export const getJoin = (req, res) => {
  try {
    res.render("join", { pageTitle: "Join" });
  } catch (error) {
    req.flash("error", "Can't access the join");
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
    file,
  } = req;

  if (password !== password2) {
    req.flash("error", "Passwords don't match");
    res.status(400);
    res.redirect(routes.join);
  } else {
    try {
      const user = await User({
        name,
        email,
        avatarUrl: file ? file.location : null,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.join);
      req.flash("error", "Join fail");
    }
  }
};

export const getLogin = (req, res) => {
  try {
    res.render("login", { pageTitle: "Login" });
  } catch (error) {
    req.flash("error", "Can't access the login");
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.login,
  failureFlash: "Login fail",
  successFlash: "Welcome!",
});

// Github
export const githubLogin = passport.authenticate("github", {
  failureFlash: "Login fail",
  successFlash: "Welcome!",
});
export const githubLoginCallback = (req, res) => {
  res.redirect(routes.home);
};
export const githubStrategy = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email },
  } = profile;
  console.log(profile._json);
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      avatarUrl,
      githubId: id,
      name,
      email,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

// Kakao
export const kakaoLogin = passport.authenticate("kakao", {
  failureFlash: "Login fail",
  successFlash: "Welcom!",
});
export const kakaoLoginCallback = (req, res) => {
  res.redirect(routes.home);
};
export const kakaoStrategy = async (_, __, profile, cb) => {
  const {
    _json: {
      id,
      properties: { nickname, profile_image: profileImage },
      kakao_account: { email },
    },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.kakaoId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      avatarUrl: profileImage,
      kakoId: id,
      name: nickname,
      email,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const logout = (req, res) => {
  req.flash("info", "Log out!!");
  req.logout();
  res.redirect(routes.home);
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate({
      path: "videos",
      populate: {
        path: "creator",
      },
    });
    res.render("userDetail", { pageTitle: user.name, user });
  } catch (error) {
    req.flash("error", "Can't find the user profile");
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getMe = async (req, res) => {
  const {
    user: { id },
  } = req;
  try {
    const user = await User.findById(id).populate({
      path: "videos",
      populate: {
        path: "creator",
      },
    });
    res.render("userDetail", { pageTitle: user.name, user });
  } catch (error) {
    req.flash("error", "Can't find your profile");
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditProfile = async (req, res) => {
  const {
    user: { id },
  } = req;
  try {
    const user = await User.findById(id);
    res.render("editProfile", { pageTitle: "editProfile", user });
  } catch (error) {
    req.flash("error", "Can't find your profile");
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditProfile = async (req, res) => {
  const {
    body: { name, status },
    user: { id },
    file,
  } = req;

  try {
    if (file) {
      const user = await User.findById(id);
      const regex = /(http[s]?:\/\/)?([^\/\s]+\/)(.*)/;
      const filePath = await user.avatarUrl.match(regex)[3];
      const delFile = {
        Bucket: "wetube-v3",
        Key: filePath,
      };
      await s3.deleteObject(delFile, function (err) {
        if (err) console.log(err);
        else console.log("The file has been removed");
      });
    }

    await User.findByIdAndUpdate(id, {
      name,
      status,
      avatarUrl: file ? file.location : req.user.avatarUrl,
    });
    req.flash("success", "Edit success");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Edit fail");
    console.log(error);
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = async (req, res) => {
  try {
    res.render("changePassword", { pageTitle: "changePassword" });
  } catch (error) {
    req.flash("error", "Can't access the change-password page");
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, verifyPassword },
  } = req;
  if (newPassword !== verifyPassword) {
    console.log("password doesn't match");
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
    return;
  }
  try {
    await req.user.changePassword(oldPassword, newPassword);
    req.flash("success", "Change password success");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Change password fail");
    console.log("old password is incorrect");
    console.log(error);
    res.redirect(`/users${routes.changePassword}`);
  }
};
