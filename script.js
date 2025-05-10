/* =======================================================
   FUNÇÃO: Cria flores caindo
   =======================================================
   Mantém o efeito de flores, este código continua idêntico.
*/
function createFlower() {
  const flower = document.createElement("img");
  flower.src = "flores.gif"; 
  flower.classList.add("flor");
  flower.style.left = Math.random() * window.innerWidth + "px";
  flower.style.width = "90px";
  flower.style.height = "auto";
  flower.style.position = "absolute";
  flower.style.top = "-50px"; 

  document.body.appendChild(flower);

  let speed = Math.random() * 5 + 2;

  function fall() {
    let topPos = parseFloat(flower.style.top);
    flower.style.top = topPos + speed + "px";

    if (topPos < window.innerHeight) {
      requestAnimationFrame(fall);
    } else {
      flower.remove();
    }
  }
  fall();
}

/* Inicia as flores caindo a cada 400ms */
let flowerInterval = setInterval(createFlower, 400);

/* =======================================================
   FUNÇÃO: Faz o botão "Não" fugir do cursor
   ======================================================= */
function desviar(event) {
  var button = event.target;
  var taskbarHeight = 40; // Altura aproximada da barra de tarefas
  var maxX = window.innerWidth - button.offsetWidth - 10; 
  var maxY = window.innerHeight - button.offsetHeight - taskbarHeight - 10; 

  var x = Math.max(10, Math.random() * maxX); 
  var y = Math.max(10, Math.random() * maxY); 

  button.style.position = "absolute";
  button.style.left = `${x}px`;
  button.style.top = `${y}px`;
}

/* =======================================================
   FUNÇÃO: Torna um elemento arrastável (drag-and-drop)
   ======================================================= */
function makeDraggable(el) {
  let offsetX = 0, offsetY = 0, initialX, initialY;

  // Eventos de mouse
  el.addEventListener('mousedown', dragMouseDown);

  // Eventos de toque
  el.addEventListener('touchstart', dragTouchStart, { passive: false });

  function dragMouseDown(e) {
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.addEventListener('mousemove', elementDrag);
    document.addEventListener('mouseup', closeDragElement);
    el.style.zIndex = 1000;
  }

  function elementDrag(e) {
    e.preventDefault();
    offsetX = e.clientX - initialX;
    offsetY = e.clientY - initialY;
    initialX = e.clientX;
    initialY = e.clientY;
    el.style.left = (el.offsetLeft + offsetX) + "px";
    el.style.top = (el.offsetTop + offsetY) + "px";
  }

  function closeDragElement(e) {
    document.removeEventListener('mousemove', elementDrag);
    document.removeEventListener('mouseup', closeDragElement);
  }

  // Funções para modos de toque
  function dragTouchStart(e) {
    e.preventDefault();
    if (e.touches.length === 1) { // Garante que estamos lidando com um toque único
      initialX = e.touches[0].clientX;
      initialY = e.touches[0].clientY;
      document.addEventListener('touchmove', elementTouchDrag, { passive: false });
      document.addEventListener('touchend', closeTouchDrag);
      el.style.zIndex = 1000;
    }
  }

  function elementTouchDrag(e) {
    e.preventDefault();
    if (e.touches.length === 1) {
      offsetX = e.touches[0].clientX - initialX;
      offsetY = e.touches[0].clientY - initialY;
      initialX = e.touches[0].clientX;
      initialY = e.touches[0].clientY;
      el.style.left = (el.offsetLeft + offsetX) + "px";
      el.style.top = (el.offsetTop + offsetY) + "px";
    }
  }

  function closeTouchDrag(e) {
    document.removeEventListener('touchmove', elementTouchDrag);
    document.removeEventListener('touchend', closeTouchDrag);
  }
}


/* =======================================================
   FUNÇÃO: Reproduz a música de fundo (MP3) com fade-in gradual
   ======================================================= */
function playBgMusic() {
  const audio = document.getElementById("bg-music");
  audio.volume = 0; // Começa com volume 0
  audio.play().catch(err => {
    console.error("Erro ao reproduzir música:", err);
  });

  // Aumenta gradualmente o volume até 1
  let vol = 0;
  let fadeInterval = setInterval(() => {
    vol += 0.05; // Incrementa o volume - ajuste conforme necessário
    if (vol >= 1) {
      vol = 1;
      clearInterval(fadeInterval);
    }
    audio.volume = vol;
  }, 200); // Intervalo em milissegundos para atualizar o volume
}

/* =======================================================
   EVENTO: Ao clicar em "SIM"
     - Esconde o conteúdo inicial
     - Exibe o álbum de fotos com transição lenta
     - Para as flores caindo
     - Inicia a reprodução da música de fundo (MP3) com fade-in
     - Torna as fotos arrastáveis
   ======================================================= */
document.getElementById("btn-sim").addEventListener("click", function() {
  // Esconde o conteúdo inicial
  document.getElementById("conteudo").style.display = "none";
  
  // Para as flores caindo
  clearInterval(flowerInterval);
  
  // Exibe o álbum com transição: removemos 'hidden'
  const album = document.getElementById("album");
  album.classList.remove("hidden");
  
  // Força o layout para que a transição de opacity seja aplicada
  setTimeout(() => {
    album.style.opacity = 1;
  }, 10);
  
  // Inicia a reprodução da música de fundo (MP3) com fade-in
  playBgMusic();
  
  // Torna cada foto arrastável
  const photos = document.querySelectorAll(".foto");
  photos.forEach(function(photo) {
    makeDraggable(photo);
  });
});
