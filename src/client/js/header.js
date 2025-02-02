const profileInfo = document.querySelector('.profile__info');

const img = new Image();
img.src = 'https://picsum.photos/seed/picsum/200/70';

img.onload = () => {
  profileInfo.style.backgroundImage = `url(${img.src})`;
};