/* eslint-disable arrow-parens */
import axios from 'axios';

const commentContainer = document.getElementById('jsCommentContainer');
const commentForm = document.getElementById('jsCommentForm');
const commentTextarea = document.getElementById('jsCommentTextarea');
const commentAvatar = document.getElementById('jsCommentAvatar');
const commentList = document.getElementsByClassName('comments__list');
const commentCntCLASS = document.getElementsByClassName('comments__cnt');
const deleteComments = document.querySelectorAll('.jsDeleteComment');

let commentCnt = 0;

const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
};

const sendComment = (comment) => {
  const videoId = window.location.href.split('/videos/')[1];
  axios({
    url: `/api/${videoId}/comment`,
    method: 'POST',
    data: { comment },
  });
};

const upCommentCnt = () => {
  commentCnt = parseInt(commentCntCLASS[0].textContent.split(' ')[0], 10);
  commentCnt++;

  if (commentCnt === 1) commentCntCLASS[0].innerText = '1 comment';
  else commentCntCLASS[0].innerText = `${commentCnt} comments`;
};

const addElement = (text) => {
  const ul = commentList;
  const li = document.createElement('li');
  const column1 = document.createElement('div');
  const img = document.createElement('img');
  const content = document.createElement('div');
  const info = document.createElement('div');
  const comment = document.createElement('div');
  const userName = document.createElement('span');
  const createdAt = document.createElement('span');
  const spanText = document.createElement('span');
  const column2 = document.createElement('div');
  const form = document.createElement('form');
  const input = document.createElement('input');

  li.className = 'comment__item';
  column1.className = 'comment__column';
  img.className = 'avatar--small';
  img.src = commentAvatar.src;
  content.className = 'comment__content';
  info.className = 'content__info';
  comment.className = 'comment';
  userName.className = 'content__userName';
  userName.innerHTML = window.JSONUser.name;
  createdAt.className = 'content__createdAt';
  createdAt.innerHTML = getDate();
  spanText.innerHTML = text;

  form.classList.add('comment__delBtn');
  form.classList.add('jsDeleteComment');
  input.type = 'submit';
  input.value = 'Delete';
  input.name = 'hi';

  content.appendChild(info);
  info.appendChild(userName);
  info.appendChild(createdAt);
  content.appendChild(comment);
  comment.appendChild(spanText);

  form.appendChild(input);

  column1.appendChild(img);
  column1.appendChild(content);

  column2.appendChild(form);

  li.appendChild(column1);
  li.appendChild(column2);
  ul[0].insertBefore(li, ul[0].firstChild);

  upCommentCnt();
};

const handleCommentSubmit = (e) => {
  e.preventDefault();
  const comment = commentTextarea.value;
  sendComment(comment);
  addElement(comment);
  commentTextarea.value = '';
};

const downCommentCnt = () => {
  commentCnt = parseInt(commentCntCLASS[0].textContent.split(' ')[0], 10);
  commentCnt--;
  if (commentCnt === 1) commentCntCLASS[0].innerText = '1 comment';
  else commentCntCLASS[0].innerText = `${commentCnt} comments`;
};

const deleteElement = (e) => {
  const form = e.target;
  const column = form.parentNode;
  const li = column.parentNode;
  const ul = li.parentNode;
  ul.removeChild(li);
};

const handleDeleteComment = (e) => {
  e.preventDefault();
  const videoId = window.location.href.split('/videos/')[1];
  const form = e.target;
  const input = form.querySelector('input');
  const id = input.name;

  axios({
    url: `/api/${videoId}/comment/delete`,
    method: 'POST',
    data: { id },
  });

  downCommentCnt();
  deleteElement(e);
};

const init = () => {
  commentForm.addEventListener('submit', handleCommentSubmit);
  deleteComments.forEach((deleteComment) =>
    deleteComment.addEventListener('submit', handleDeleteComment)
  );
};

if (commentContainer) {
  init();
}
