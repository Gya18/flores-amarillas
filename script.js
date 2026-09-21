const messages = {
  1: {
    kicker: "Flor 01 · Tú",
    title: "Lo que más me gusta de ti",
    text: "Eres un Niko de corazón bonito, sin maldad y con una forma muy tuya de cuidar. Eres muy buena conmigo, amorosa y cariñosa. Haces que incluso los días normales se sientan más tranquilos, bonitos y especiales.",
    photo: "assets/flor1.webp"
  },
  2: {
    kicker: "Flor 02 · Un recuerdo",
    title: "Nuestro primer concierto juntos",
    text: "Este año fuimos a ver a My Chemical Romance y nos encantó. Fue nuestro primer concierto juntos y terminó convirtiéndose en uno de esos recuerdos que quiero repetir contigo muchas veces: cantar, disfrutar y vivir más primeras veces a tu lado.",
    photo: "assets/flor2.webp"
  },
  3: {
    kicker: "Flor 03 · Algo importante",
    title: "Quizá no te lo digo seguido…",
    text: "Te convertiste en un pilar de mi vida. Eres quien me da estabilidad, tranquilidad y esa sensación de calma que necesito cuando las cosas se ponen difíciles. Tenerte a mi lado hace una diferencia enorme para mí.",
    photo: "assets/flor3.webp"
  },
  4: {
    kicker: "Flor 04 · Confesión 😅",
    title: "Bueno… tengo que admitir algo",
    text: "Confieso que olvidé que hoy era 21 jajaja. Pero quizá eso hizo que terminara haciendo algo mucho más a nuestra manera: improvisado, con cariño y con unas cuantas líneas de código. Así que técnicamente… lo salvó TI. 😌",
    photo: "assets/flor4.webp"
  },
  5: {
    kicker: "Flor 05 · Nosotros",
    title: "Una promesa",
    text: "Sé que nos va a ir muy bien. Vamos a cumplir nuestras metas, nuestros sueños y muchas de las cosas que todavía imaginamos. No porque todo vaya a ser fácil, sino porque quiero seguir avanzando, creciendo y construyendo todo eso contigo.",
    photo: "assets/flor5.webp"
  }
};

const $ = s => document.querySelector(s);
const startBtn = $('#startBtn');
const garden = $('#jardin');
const lunaSection = $('#lunaSection');
const ending = $('#ending');
const modal = $('#messageModal');
const modalPhoto = $('#modalPhoto');
const modalKicker = $('#modalKicker');
const modalTitle = $('#modalTitle');
const modalText = $('#modalText');
const progressText = $('#progressText');
const progressEmoji = $('#progressEmoji');
const progressBar = $('#progressBar');
let opened = new Set();

function petalBurst(count=16, multicolor=false){
  const layer = $('#petalLayer');
  const symbols = multicolor ? ['💛','💜','🩷','💙','💚','🧡'] : ['🌼','💛','✨'];
  for(let i=0;i<count;i++){
    const s=document.createElement('span');
    s.className='falling';
    s.textContent=symbols[i%symbols.length];
    s.style.left=`${Math.random()*100}vw`;
    s.style.setProperty('--drift',`${(Math.random()-.5)*220}px`);
    s.style.animationDelay=`${Math.random()*.3}s`;
    s.style.fontSize=`${16+Math.random()*14}px`;
    layer.appendChild(s);
    setTimeout(()=>s.remove(),2400);
  }
}

function updateProgress(){
  const n=opened.size;
  progressText.textContent=`${n} de 5 flores abiertas`;
  progressBar.style.width=`${n*20}%`;
  progressEmoji.textContent=n===0?'🌱':n<3?'🌼':n<5?'🌻':'💛';
  if(n===5){
    progressText.textContent='¡Jardín completo! Bonus desbloqueado';
    lunaSection.classList.remove('hidden');
    setTimeout(()=>lunaSection.scrollIntoView({behavior:'smooth',block:'center'}),500);
  }
}

startBtn.addEventListener('click',()=>{
  garden.classList.remove('hidden');
  petalBurst(18);
  garden.scrollIntoView({behavior:'smooth'});
});

document.querySelectorAll('.flower-card').forEach(card=>{
  card.addEventListener('click',()=>{
    const id=card.dataset.id;
    const m=messages[id];
    opened.add(id);
    card.classList.add('opened');
    card.querySelector('.status').textContent='Recuerdo descubierto 💛';
    modalPhoto.src=m.photo;
    modalKicker.textContent=m.kicker;
    modalTitle.textContent=m.title;
    modalText.textContent=m.text;
    modal.showModal();
    petalBurst(12);
    updateProgress();
  });
});

$('#closeModal').addEventListener('click',()=>modal.close());
$('#nextBtn').addEventListener('click',()=>modal.close());
modal.addEventListener('click',e=>{
  const r=modal.getBoundingClientRect();
  if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) modal.close();
});

$('#lunaBtn').addEventListener('click',()=>{
  ending.classList.remove('hidden');
  petalBurst(30,true);
  setTimeout(()=>ending.scrollIntoView({behavior:'smooth'}),250);
});

$('#replayBtn').addEventListener('click',()=>{
  window.scrollTo({top:0,behavior:'smooth'});
  petalBurst(20);
});
