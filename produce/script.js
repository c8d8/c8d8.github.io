// スクロールしたら、ふわっと表示する
document.documentElement.classList.add('js');
const items = document.querySelectorAll('.fade');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((list) => {
    list.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('on'));
}
// 動画は同時に1本だけ再生する
const videos = document.querySelectorAll('video');
videos.forEach((v) => v.addEventListener('play', () => videos.forEach((o) => { if (o !== v) o.pause(); })));
// 再生前はブラウザの再生バーを隠し、中央のボタンだけ見せる
videos.forEach((v) => {
  v.removeAttribute('controls');
  const box = document.createElement('div');
  box.className = 'vp';
  v.parentNode.insertBefore(box, v);
  box.appendChild(v);
  const b = document.createElement('button');
  b.type = 'button';
  b.setAttribute('aria-label', (v.getAttribute('aria-label') || '動画') + 'を再生');
  box.appendChild(b);
  b.addEventListener('click', () => { b.remove(); v.controls = true; v.play(); });
});
