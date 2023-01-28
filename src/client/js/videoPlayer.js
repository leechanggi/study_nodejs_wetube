const videoContent = document.querySelector('#videoContent');
const video = document.querySelector('#video');

const videoController = document.querySelector('#videoController');
const inputVideoTimeline = document.querySelector('#videoTimeline');
const inputVideoVolume = document.querySelector('#videoVolume');
const btnVideoPlay = document.querySelector('#videoPlay');
const btnVideoMute = document.querySelector('#videoMute');
const btnVideoFull = document.querySelector('#videoFull');

const videoCurrentTime = document.querySelector('#videoCurrentTime');
const videoDuration = document.querySelector('#videoDuration');

const minVideoVolume = 0;
const maxVideoVolume = 1;

let valueVideoVolume = 0.5;

let handleVideoTimeout = null;
let handleMoveTimeout = null;

const handleLoadedmetadata = () => {
  const duration = Math.floor(video.duration);
  const formatDuration = formatTime(duration);
  const hr = formatDuration[0];
  const min = formatDuration[1];
  const sec = formatDuration[2];

  inputVideoTimeline.setAttribute('max', duration);
  videoCurrentTime.innerHTML = hr === '00' ? '00:00' : '00:00:00';
  videoDuration.innerHTML = hr === '00' ? `${min}:${sec}` : `${hr}:${min}:${sec}`;
};

const handleTimeupdate = () => {
  const current = Math.floor(video.currentTime);
  const formatCurrent = formatTime(current);
  const hr = formatCurrent[0];
  const min = formatCurrent[1];
  const sec = formatCurrent[2];

  inputVideoTimeline.value = current;
  videoCurrentTime.innerHTML = hr === '00' ? `${min}:${sec}` : `${hr}:${min}:${sec}`;
};

const handleVideoVolume = event => {
  const {
    target: { value },
  } = event;

  if (video.muted) {
    video.muted = false;
    btnVideoMute.innerHTML = '음소거';
  }

  if (value > maxVideoVolume) {
    valueVideoVolume = maxVideoVolume;
  } else if (value < minVideoVolume) {
    valueVideoVolume = minVideoVolume;
  } else {
    valueVideoVolume = value;
  }

  video.volume = valueVideoVolume;
};

const handleVideoTimeline = event => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleClickVideoPlay = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  btnVideoPlay.innerHTML = video.paused ? '재생' : '일시정지';
};

const handleVideoMute = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  btnVideoMute.innerHTML = video.muted ? '음소거 해제' : '음소거';
  inputVideoVolume.value = video.muted ? 0 : valueVideoVolume;
};

const handleVideoFull = () => {
  const fullScreen = document.fullscreenElement;
  if (fullScreen) {
    document.exitFullscreen();
  } else {
    videoContent.requestFullscreen();
  }
  btnVideoFull.innerHTML = fullScreen ? '전체화면으로 보기' : '기본화면으로 보기';
};

const handleVideoMouseMove = () => {
  if (handleVideoTimeout) {
    clearTimeout(handleVideoTimeout);
    handleVideoTimeout = null;
  }
  if (handleMoveTimeout) {
    clearTimeout(handleMoveTimeout);
    handleMoveTimeout = null;
  }
  videoController.classList.add('show');
  handleMoveTimeout = setTimeout(hideController, 3000);
};

const handleVideoMouseLeave = () => {
  handleVideoTimeout = setTimeout(hideController, 3000);
};

const formatTime = time => {
  return new Date(time * 1000).toISOString().substring(11, 19).split(':');
};

const hideController = () => {
  videoController.classList.remove('show');
};

video.addEventListener('loadedmetadata', handleLoadedmetadata);
video.addEventListener('timeupdate', handleTimeupdate);
inputVideoVolume.addEventListener('input', handleVideoVolume);
inputVideoTimeline.addEventListener('input', handleVideoTimeline);
btnVideoPlay.addEventListener('click', handleClickVideoPlay);
btnVideoMute.addEventListener('click', handleVideoMute);
btnVideoFull.addEventListener('click', handleVideoFull);
videoContent.addEventListener('mousemove', handleVideoMouseMove);
videoContent.addEventListener('mouseleave', handleVideoMouseLeave);
