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

// Github
const GITHUB = '/auth/github';
const GITHUB_CALLBACK = '/auth/github/callback';

// KakaoTalk
const KAKAO = '/auth/kakao';
const KAKAO_CALLBACK = '/auth/kakao/callback';

// videos
const VIDEOS = '/videos';
const UPLOAD = '/upload';
const VIDEO_DETAIL = '/:id';
const EDIT_VIDEO = '/:id/edit-video';
const DELETE_VIDEO = '/:id/delete-video';

// api
const API = '/api';
const REGISTER_VIEW = '/:id/view';

const routes = {
  // global
  home: HOME,
  search: SEARCH,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  me: ME,

  // Github Login
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,

  // Google Login
  kakao: KAKAO,
  kakaoCallback: KAKAO_CALLBACK,

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

  // api
  api: API,
  registerView: (id) => {
    if (id) return `/api/${id}/view`;
    return REGISTER_VIEW;
  },
};

export default routes;
