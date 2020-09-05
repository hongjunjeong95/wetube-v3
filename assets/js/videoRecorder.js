const recordContainer = document.getElementById('jsRecordContainer');
const videoPreview = document.getElementById('jsVideoPreview');
const recordBtn = document.getElementById('jsRecordBtn');
const downloadBtn = document.getElementById('jsDownloadBtn');

let recorder;

const handleVideoData = (event) => {
  const { data: videoFile } = event;
  videoPreview.src = URL.createObjectURL(videoFile);
  downloadBtn.href = videoPreview.src;
  downloadBtn.download = 'RecordedVideo.webm';
};

const stopRecording = () => {
  recorder.stop();
  recordBtn.removeEventListener('click', stopRecording);
  recordBtn.addEventListener('click', getVideo);
  recordBtn.innerHTML = 'Start recording';
};

const startRecording = (stream) => {
  recorder = new MediaRecorder(stream);
  recorder.start();
  recorder.addEventListener('dataavailable', handleVideoData);
  recordBtn.removeEventListener('click', getVideo);
  recordBtn.addEventListener('click', stopRecording);
  recordBtn.innerHTML = 'Stop recording';
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 1280, height: 720 },
      audio: true,
    });

    videoPreview.srcObject = stream;
    videoPreview.play();
    videoPreview.muted = true;
    startRecording(stream);
  } catch (error) {
    console.log(error);
    recordBtn.innerHTML = "Can't record 😂";
  }
};

const init = () => {
  recordBtn.addEventListener('click', getVideo);
};

if (recordContainer) {
  init();
}
