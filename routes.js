// home
const HOME = '/';
const SEARCH = '/search';
const JOIN = '/join';
const LOGIN = '/login';
const LOGOUT = '/logout';
const ME = '/me';

// users
const USERS = '/users';
const EDIT_PROFILE = '/edit-profile';
const CHANGE_PASSWORD = '/change-password';
const USER_DETAIL = '/:id';

// videos
const VIDEOS = '/videos';
const UPLOAD = '/upload';
const VIDEO_DETAIL = '/:id';
const EDIT_VIDEO = '/:id/edit-video';
const DELETE_VIDEO = '/:id/delete-video';

const routes = {
  // global
  home: HOME,
  search: SEARCH,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  me: ME,

  // user
  users: USERS,
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
    }
    return USER_DETAIL;
  },

  // video
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: (id) => {
    if (id) return `/videos/${id}`;
    return VIDEO_DETAIL;
  },
  editVideo: (id) => {
    if (id) return `/videos/${id}/edit-video`;
    return EDIT_VIDEO;
  },
  deleteVideo: (id) => {
    if (id) return `/videos/${id}/delete-video`;
    return DELETE_VIDEO;
  },
};

export default routes;
