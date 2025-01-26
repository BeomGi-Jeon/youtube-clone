const profileInfo = document.querySelector('.profile__info');

// 이미지 객체를 생성하여 비동기 로딩 처리
const img = new Image();
img.src = 'https://picsum.photos/seed/picsum/200/70';

img.onload = () => {
  // 이미지 로딩이 완료되면 배경 이미지를 설정
  profileInfo.style.backgroundImage = `url(${img.src})`;
};

img.onerror = (error) => {
  console.error('이미지 로드 실패:', error);
  // 이미지 로딩 실패 시 대체 배경 이미지 설정 (옵션)
  profileInfo.style.backgroundImage = 'url(path/to/default-image.jpg)';
};
