import Video from '../models/Video';

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views++;
    video.save();
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.redirect(routes.home);
  } finally {
    res.end();
  }
};
