const btnStartRecorder = document.querySelector('#btnStartRecorder');

const handleStartRecorder = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  console.log(stream);
};

btnStartRecorder.addEventListener('click', handleStartRecorder);
