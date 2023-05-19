import document from '../css/userAccount.css'

const progressBarFill = document.querySelector('.progress-bar-fill');
const progressBarValue = document.querySelector('.progress-bar-value');

function setProgressBarValue(value) {
  progressBarFill.style.width = value + '%';
  progressBarValue.textContent = value + '%';
}

