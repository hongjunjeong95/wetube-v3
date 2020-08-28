import routes from '../routes';
import Video from '../models/Video';

export const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
};

export const home = (req, res) => {
  res.render('search', { pageTitle: 'search' });
};

export const search = (req, res) => {
  res.render('search', { pageTitle: 'search' });
};

export const videoDetail = (req, res) => {
  res.render('videoDetail', { pageTitle: 'videoDetail' });
};

export const getUpload = (req, res) => {
  try {
    res.render('upload', { pageTitle: 'upload' });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
    user: { id },
  } = req;
  try {
    const newVideo = await Video.create({
      title,
      description,
      videoUrl: path,
      createdAt: getDate(),
      creator: id,
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.upload);
  }
};

export const editVideo = (req, res) => {
  res.render('editVideo', { pageTitle: 'editVideo' });
};

export const deleteVideo = (req, res) => {
  res.render('deleteVideo', { pageTitle: 'deleteVideo' });
};
