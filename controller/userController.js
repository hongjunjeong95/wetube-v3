import passport from 'passport';
import routes from '../routes';
import User from '../models/User';

export const getJoin = (req, res) => {
  try {
    res.render('join', { pageTitle: 'Join' });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password1, password2 },
    file,
  } = req;
  if (password1 !== password2) {
    res.status(400);
    res.redirect(routes.join);
  }
  try {
    const user = await User({
      name,
      email,
      avatarUrl: file ? file.path : null,
    });
    console.log('postjoin', user);
    await User.register(user, password1);
    next();
  } catch (error) {
    console.log(error);
    res.redirect(routes.join);
  }
};

export const getLogin = (req, res) => {
  try {
    res.render('login', { pageTitle: 'Login' });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postLogin = passport.authenticate('local', {
  successRedirect: routes.home,
  failureRedirect: routes.login,
});

// Github
export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = (req, res) => {
  res.redirect(routes.home);
};

export const githubStrategy = async (_, __, profile, cb) => {
  const {
    _json: { id, avatarUrl, name, email },
  } = profile;
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

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const userDetail = (req, res) => {
  res.render('userDetail', { pageTitle: 'userDetail' });
};

export const getMe = async (req, res) => {
  const {
    user: { id },
  } = req;
  try {
    const user = await User.findById(id);
    res.render('userDetail', { pageTitle: user.name, user });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const editProfile = (req, res) => {
  res.render('editProfile');
};

export const changePassword = (req, res) => {
  res.render('changePassword');
};
