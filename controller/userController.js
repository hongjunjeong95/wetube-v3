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

export const logout = (req, res) => {
  res.render('logout');
};

export const userDetail = (req, res) => {
  res.render('userDetail');
};

export const editProfile = (req, res) => {
  res.render('editProfile');
};

export const changePassword = (req, res) => {
  res.render('changePassword');
};
