const message = `My dearest Ei Myat Thu,

On your special day I wish you a sky full of smiles and a heart full of dreams come true.

You are my joy, my safe place, and the reason I smile every day.

Happy Birthday, My Love. I love you always and forever. 🎂🌸

- Ko Mya Gyi`;

const typedEl = document.getElementById('typed');
const cursor = document.getElementById('cursor');
let i = 0;
function typeStep() {
  if(i < message.length) {
    typedEl.textContent += message[i++];
    setTimeout(typeStep, 28 + Math.random()*40);
  } else {
    cursor.style.display='none';
  }
}

window.addEventListener('load', () => {
  typeStep();
  spawnHearts();
  startConfetti();
  startPreviewSlider(); 
});

const modal = document.getElementById("memoriesModal");
const btn = document.getElementById("toggleMemories");
const closeBtn = document.querySelector(".close");

btn.onclick = () => modal.style.display = "flex";

closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (e) => { 
  if (e.target === modal) modal.style.display = "none"; 
}

const memSlides = document.querySelectorAll("#memorySlideshow img");
let memIndex = 0;
function showMemSlide() {
  memSlides.forEach( s => s.classList.remove("active"));
  memSlides[memIndex].classList.add("active");
  memIndex = (memIndex + 1) % memSlides.length;
}
setInterval(showMemSlide, 3000);

const quotes = [
  "Every time I see you, my heart skips a beat 💕",
  "I still can’t believe I get to share my life with you ❤️",
  "Your smile is my favorite part of every day 😍",
  "Even the quietest moments with you feel magical ✨"
];
const quoteEl = document.getElementById("quote");
let qIndex = 0;
function changeQuote(){
  quoteEl.textContent = quotes[qIndex];
  qIndex = (qIndex+1) % quotes.length;
}
changeQuote();
setInterval(changeQuote, 4000);

function spawnHearts() {
  const container = document.getElementById('hearts');
  const colors = ['#ff8aa0','#ff6b81','#ffd1e6','#ffb3c6'];
  for(let j=0;j<10;j++) {
    const h = document.createElement('div');
    h.className='heart';
    const size = 18 + Math.random()*28;
    const left = Math.random()*100;
    const dur = 6 + Math.random()*6;
    h.style.left = left + '%';
    h.style.bottom = '-30px';
    h.style.width = size + 'px';
    h.style.height = size + 'px';
    h.style.animationDuration = dur + 's';
    h.innerHTML = `<svg viewBox="0 0 32 29" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.6 0c-2 0-3.9.9-5.1 2.4L16 4.8l-2.5-2.4C11.9.9 10 .1 8 .1 3.8.1 .6 3.3.6 7.5c0 9 15.4 16.8 15.4 16.8s15.4-7.8 15.4-16.8C31.4 3.3 28.2.1 23.6 0z" fill="${colors[Math.floor(Math.random()*colors.length)]}"/></svg>`;
    container.appendChild(h);
    setTimeout( () => { h.remove() }, dur*1000+1000);
  }
}

function startConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
  resize(); window.addEventListener('resize', resize);

  const pieces = [];
  const colors = ['#ffadad','#ffd6a5','#fdffb6','#caffbf','#9bf6ff','#a0c4ff','#bdb2ff','#ffc6ff'];
  for(let i=0; i<130; i++){
    pieces.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height + canvas.height,
      r: 6 + Math.random()*10,
      vx: -1 + Math.random()*2,
      vy: -6 - Math.random()*8,
      color: colors[Math.floor(Math.random()*colors.length)],
      t: Math.random()*Math.PI*2
    });
  }
  function frame() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p=>{
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.2;
      p.t += 0.05;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(Math.sin(p.t)*0.6);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r*1.6);
      ctx.restore();
      if(p.y > canvas.height + 50){
        p.x = Math.random()*canvas.width;
        p.y = -10;
        p.vy = -6 - Math.random()*8;
      }
    });
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function startPreviewSlider() {
  const preview = document.querySelector('.photo-preview');
  const imgs = preview ? preview.querySelectorAll('img') : [];
  if(!imgs.length) return;

  let idx = 0;
  imgs.forEach(img => img.classList.remove('active'));
  imgs[idx].classList.add('active');

  const interval = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 5000 : 2800;
  setInterval(()=>{
    imgs[idx].classList.remove('active');
    idx = (idx + 1) % imgs.length;
    imgs[idx].classList.add('active');
  }, interval);

  imgs.forEach((img, i)=>{
    img.addEventListener('click', ()=>{
      imgs[idx].classList.remove('active');
      idx = i;
      imgs[idx].classList.add('active');
    });
  });
}

function openModal(img) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  if(!modal || !modalImg) return;
  modal.style.display = "flex";
  modalImg.src = img.src;
}
function closeModal() {
  const m = document.getElementById("modal");
  if(m) m.style.display = "none";
}

const music = document.getElementById("bg-music");
const playPauseBtn = document.getElementById("playPauseBtn");
playPauseBtn.addEventListener("click", ()=>{
  if (music.paused) {
    music.play();
    playPauseBtn.textContent = "⏸ Pause Music";
  } else {
    music.pause();
    playPauseBtn.textContent = "▶ Play Music";
  }
});

document.getElementById('replayBtn').addEventListener('click', () => {
  typedEl.textContent=''; cursor.style.display='inline-block'; i=0; typeStep();
  spawnHearts();
  music.currentTime = 0; music.play();
});
