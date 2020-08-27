export const githubCSP = (req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "img-src 'self' https://avatars3.githubusercontent.com"
  );
  next();
};

export const kakaoCSP = (req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "img-src 'self' http://k.kakaocdn.net"
  );
  next();
};
