const container = document.querySelector('#container');
const videoPreview = document.querySelector('#videoPreview');
const btnStartRecorder = document.querySelector('#btnStartRecorder');

let stream;
let recorder;
let videoFile;

const handleStartRecorder = () => {
  recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

  btnStartRecorder.innerText = '녹화 정지';
  btnStartRecorder.removeEventListener('click', handleStartRecorder);
  btnStartRecorder.addEventListener('click', handleStopRecorder);

  recorder.ondataavailable = event => {
    videoFile = URL.createObjectURL(event.data);
    videoPreview.srcObject = null;
    videoPreview.src = videoFile;
    videoPreview.loop = true;
    videoPreview.play();
    handleDownRecorder();
  };
  recorder.start();
};

const handleStopRecorder = () => {
  btnStartRecorder.innerText = '녹화 시작';
  btnStartRecorder.removeEventListener('click', handleStopRecorder);
  btnStartRecorder.addEventListener('click', handleStartRecorder);
  recorder.stop();
};

const handleDownRecorder = () => {
  const a = document.createElement('a');
  a.href = videoFile;
  a.download = 'videoFile.webm';
  a.innerText = '녹화 다운받기';

  container.appendChild(a);
};

const init = async () => {
  const constraints = { audio: false, video: { width: 320, height: 240 } };
  stream = await navigator.mediaDevices.getUserMedia(constraints);

  videoPreview.srcObject = stream;
  videoPreview.play();
};

init();

btnStartRecorder.addEventListener('click', handleStartRecorder);
