const videoContainer = document.getElementById('jsVideoPlayer');
const videoPlayer = document.querySelector('#jsVideoPlayer video');
const playBtn = document.getElementById('jsPlayBtn');
const volumeBtn = document.getElementById('jsVolumeBtn');
const volumeRange = document.getElementById('jsVolumeRange');
const fullScreen = document.getElementById('jsFullScreen');

let fullScrnCheck = false;

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

const handleKeydown = (e) => {
  console.log(e.keyCode);
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
  }
};

const preventSpaceScroll = (e) => {
  if (e.keyCode === 32 && e.target === document.body) {
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

const init = () => {
  playBtn.addEventListener('click', handlePlayClick);
  videoPlayer.addEventListener('click', handlePlayClick);
  volumeBtn.addEventListener('click', handleVolumeClick);
  volumeRange.addEventListener('input', handleVolumeRange);
  fullScreen.addEventListener('click', goFullScreen);
  videoContainer.addEventListener('dblclick', goFullScreen);
  videoContainer.addEventListener('fullscreenchange', handleESC);
  document.addEventListener('keydown', handleKeydown);
  window.addEventListener('keydown', preventSpaceScroll);
};

if (videoContainer) {
  init();
}
