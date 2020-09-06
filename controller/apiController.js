import Video from '../models/Video';
import Comment from '../models/Comment';
import { getDate } from './videoController';

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
  } finally {
    res.end();
  }
};

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  console.log(req.body);
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      createdAt: getDate(),
      creator: user.id,
    });
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};
