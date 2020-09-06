/* eslint-disable operator-linebreak */
/* eslint-disable arrow-parens */
import getBlobDuration from 'get-blob-duration';
import axios from 'axios';

const videoContainer = document.getElementById('jsVideoPlayer');
const videoPlayer = document.querySelector('#jsVideoPlayer video');
const playBtn = document.getElementById('jsPlayBtn');
const volumeBtn = document.getElementById('jsVolumeBtn');
const volumeRange = document.getElementById('jsVolumeRange');
const fullScreen = document.getElementById('jsFullScreen');
const currentTime = document.getElementById('jsCurrentTime');
const totalTime = document.getElementById('jsTotalTime');
const progress = document.getElementById('jsProgress');
const progressBar = document.getElementById('jsProgressBar');
const videoViews = document.getElementsByClassName('video__views');
let viewsCnt = 0;

let fullScrnCheck = false;
let volumeValue = 0.5;
let progressMouseDown = false;
let progressBarClicked = false;
let duration = null;

const handlePlayClick = () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
};

const handleVolumeClick = () => {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeRange.value = videoPlayer.volume;
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volumeRange.value = 0;
  }
};

const handleVolumeRange = (e) => {
  const {
    target: { value },
  } = e;
  videoPlayer.volume = value;
  if (value >= 0.7) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.4) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else if (value >= 0.1) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
};

const exitFullScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
    fullScreen.innerHTML = '<i class="fas fa-expand"></i>';
    fullScreen.removeEventListener('click', exitFullScreen);
    fullScreen.addEventListener('click', goFullScreen);
    videoContainer.removeEventListener('dblclick', exitFullScreen);
    videoContainer.addEventListener('dblclick', goFullScreen);
    fullScrnCheck = false;
  }
};

const goFullScreen = () => {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
    fullScreen.innerHTML = '<i class="fas fa-compress"></i>';
    fullScreen.removeEventListener('click', goFullScreen);
    fullScreen.addEventListener('click', exitFullScreen);
    videoContainer.removeEventListener('dblclick', goFullScreen);
    videoContainer.addEventListener('dblclick', exitFullScreen);
    fullScrnCheck = true;
  }
};

const preventSpaceScroll = (e) => {
  if (
    e.keyCode === 32 ||
    e.keyCode === 38 ||
    (e.keyCode === 40 && e.target === document.body)
  ) {
    e.preventDefault();
  }
};

const handleESC = () => {
  if (!document.fullscreenElement) {
    fullScreen.innerHTML = '<i class="fas fa-expand"></i>';
    fullScreen.removeEventListener('click', exitFullScreen);
    fullScreen.addEventListener('click', goFullScreen);
    videoContainer.removeEventListener('dblclick', exitFullScreen);
    videoContainer.addEventListener('dblclick', goFullScreen);
    fullScrnCheck = false;
  }
};

const formatDate = (formatTime) => {
  const fullMinutes = Math.floor(formatTime / 60);
  const fullHours = Math.floor(fullMinutes / 60);
  let seconds = Math.floor(formatTime % 60);
  let minutes = fullMinutes % 60;
  let hours = fullHours % 24;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${hours}:${minutes}:${seconds}`;
};

const getCurrentTime = () => {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
};

const setTotalTime = async () => {
  duration = await getBlobDuration(videoPlayer.src);
  const totalTimeString = formatDate(duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
};

const handleProgress = () => {
  const percent = (videoPlayer.currentTime / videoPlayer.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

const scrub = (event) => {
  const scrubTime =
    (event.offsetX / progress.offsetWidth) * videoPlayer.duration;
  videoPlayer.currentTime = scrubTime;
};

const handleKeydown = async (e) => {
  if (e.keyCode === 32) {
    handlePlayClick();
  } else if (e.keyCode === 70) {
    if (!fullScrnCheck) {
      goFullScreen();
      fullScrnCheck = true;
    } else if (fullScrnCheck) {
      exitFullScreen();
      fullScrnCheck = false;
    }
  } else if (e.keyCode === 77) {
    handleVolumeClick();
  } else if (e.keyCode === 38 && videoPlayer.volume < 1) {
    volumeValue = Math.floor(volumeValue * 10 + 1) / 10;
    const event = {
      target: {
        value: volumeValue,
      },
    };
    volumeRange.value = volumeValue;
    handleVolumeRange(event);
  } else if (e.keyCode === 40 && videoPlayer.volume > 0) {
    volumeValue = Math.floor(volumeValue * 10 - 1) / 10;
    const event = {
      target: {
        value: volumeValue,
      },
    };
    volumeRange.value = volumeValue;
    handleVolumeRange(event);
  } else if (e.keyCode === 37 && videoPlayer.currentTime > 0) {
    let back = videoPlayer.currentTime - 10;
    if (back < 0) {
      back = 0;
    }
    videoPlayer.currentTime = back;
    handleProgress();
  } else if (e.keyCode === 39 && videoPlayer.currentTime < duration) {
    let forward = videoPlayer.currentTime + 10;
    console.log('forward', forward);
    console.log('duration', duration);
    if (forward > duration) {
      forward = duration;
    }
    videoPlayer.currentTime = forward;
    handleProgress();
  }
};

const upViewsCnt = () => {
  viewsCnt = parseInt(videoViews[0].textContent.split(' ')[0], 10);
  viewsCnt++;
  if (viewsCnt === 1) videoViews[0].innerText = '1 view';
  else videoViews[0].innerText = `${viewsCnt} views`;
};

const registerView = () => {
  const videoId = window.location.href.split('/videos/')[1];

  axios({
    method: 'post',
    url: `/api/${videoId}/view`,
  });
  upViewsCnt();
};

const handleEnded = () => {
  registerView();
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  videoPlayer.currentTime = 0;
};

const init = () => {
  videoPlayer.volume = 0.5;
  playBtn.addEventListener('click', handlePlayClick);
  videoPlayer.addEventListener('click', handlePlayClick);
  volumeBtn.addEventListener('click', handleVolumeClick);
  volumeRange.addEventListener('input', handleVolumeRange);
  fullScreen.addEventListener('click', goFullScreen);
  videoContainer.addEventListener('dblclick', goFullScreen);
  videoContainer.addEventListener('fullscreenchange', handleESC);
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('keydown', preventSpaceScroll);
  setTotalTime();

  // Video progress
  videoPlayer.addEventListener('timeupdate', handleProgress);
  progress.addEventListener('click', scrub);
  window.addEventListener(
    'mousemove',
    (event) => progressBarClicked && progressMouseDown && scrub(event)
  );

  // Vidoe progress boolean
  progress.addEventListener('mousedown', () => {
    progressMouseDown = true;
    progressBarClicked = true;
  });
  window.addEventListener('mousedown', () => {
    progressMouseDown = true;
  });

  progress.addEventListener('mouseup', () => {
    progressMouseDown = false;
  });
  window.addEventListener('mouseup', () => {
    progressMouseDown = false;
    progressBarClicked = false;
  });

  // register View
  videoPlayer.addEventListener('ended', handleEnded);
};

if (videoContainer) {
  init();
}
