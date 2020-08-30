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

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).populate('creator').sort({ _id: -1 });
    res.render('home', { pageTitle: 'home', videos });
  } catch (error) {
    console.log(error);
    res.render('home', { pageTitle: 'home', videos: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { term },
  } = req;
  try {
    const videos = await Video.find({ title: { $regex: term, $options: 'i' } });
    res.render('search', { pageTitle: 'search', videos });
  } catch (error) {
    console.log(error);
    res.render('search', { pageTitle: 'search', videos: [] });
  }
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id).populate('creator');
    res.render('videoDetail', { pageTitle: 'videoDetail', video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
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

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      res.render('editVideo', { pageTitle: 'editVideo', video });
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    body: { title, description },
    params: { id },
  } = req;
  try {
    await Video.findByIdAndUpdate(id, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    res.render('editVideo', { pageTitle: 'editVideo' });
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      await Video.findByIdAndRemove(id);
      res.redirect(routes.home);
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
