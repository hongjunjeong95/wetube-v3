/* eslint-disable no-multi-str */
const csp = (req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "img-src 'self'\
    https://avatars3.githubusercontent.com\
    http://k.kakaocdn.net\
    https://wetube-v3.s3.amazonaws.com"
  );
  next();
};

export default csp;
