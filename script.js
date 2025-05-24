function createFlower() {
  const flower = document.createElement("img");
  flower.src = "flores.gif";
  flower.classList.add("flor");
  flower.style.left = Math.random() * window.innerWidth + "px";
  flower.style.width = "90px";
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

let flowerInterval = setInterval(createFlower, 400);

function desviar(event) {
  var button = event.target;
  var maxX = window.innerWidth - button.offsetWidth - 10;
  var maxY = window.innerHeight - button.offsetHeight - 50;
  var x = Math.max(10, Math.random() * maxX);
  var y = Math.max(10, Math.random() * maxY);
  button.style.position = "absolute";
  button.style.left = `${x}px`;
  button.style.top = `${y}px`;
}

function makeDraggable(el) {
  let offsetX = 0, offsetY = 0, initialX, initialY;
  el.addEventListener('mousedown', dragMouseDown);
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

  function closeDragElement() {
    document.removeEventListener('mousemove', elementDrag);
    document.removeEventListener('mouseup', closeDragElement);
  }

  function dragTouchStart(e) {
    e.preventDefault();
    if (e.touches.length === 1) {
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

  function closeTouchDrag() {
    document.removeEventListener('touchmove', elementTouchDrag);
    document.removeEventListener('touchend', closeTouchDrag);
  }
}

function playBgMusic() {
  const audio = document.getElementById("bg-music");
  audio.volume = 0;
  audio.play().catch(err => console.error("Erro ao reproduzir música:", err));
  let vol = 0;
  let fadeInterval = setInterval(() => {
    vol += 0.05;
    if (vol >= 1) {
      vol = 1;
      clearInterval(fadeInterval);
    }
    audio.volume = vol;
  }, 200);
}

document.getElementById("btn-sim").addEventListener("click", function () {
  document.getElementById("conteudo").style.display = "none";
  clearInterval(flowerInterval);
  const album = document.getElementById("album");
  album.classList.remove("hidden");
  setTimeout(() => album.style.opacity = 1, 10);
  playBgMusic();

  const photos = document.querySelectorAll(".foto");
  photos.forEach(makeDraggable);
});

// ========== Quiz Simples via alert/prompt ==========
function iniciarQuiz() {
  const perguntas = [
    {
      pergunta: "1. Como eu te chamo carinhosamente?",
      alternativas: ["1) Mozão", "2) Bê", "3) Vd", "4) Gatinha"],
      correta: "4"
    },
    {
      pergunta: "2. Qual foi o nosso primeiro filme juntos no cinema?",
      alternativas: ["1) Titanic", "2) Vingadores", "3) Thor", "4) A Barraca do Beijo"],
      correta: "3"
    },
    {
      pergunta: "3. Qual o sabor do meu sorvete favorito?",
      alternativas: ["1) Morango", "2) Baunilha", "3) Menta", "4) Ovomaltine"],
      correta: "3"
    },
    {
      pergunta: "4. Onde foi nosso primeiro beijo?",
      alternativas: ["1) Cinema", "2) Praça", "3) Carro", "4) Ponto de onibus"],
      correta: "4"
    },
    {
      pergunta: "5. Qual a minha cor favorita?",
      alternativas: ["1) Verde", "2) Azul", "3) Roxo", "4) Preto"],
      correta: "2"
    },
    {
      pergunta: "6. Qual é o nome do nosso primeiro filho?",
      alternativas: ["1) Minion Bob", "2) Sapo bob", "3) Bela de Neve", "4) Fofucho"],
      correta: "1"
    },
    {
      pergunta: "7 .Qual é o nome do nosso ultimo filho?",
      alternativas: ["1) Minion Bob", "2) Sapo bob", "3) Bela de Neve", "4) Fofucho"],
      correta: "3"
    },
    {
      pergunta: "8. Quem disse 'eu te amo' primeiro?",
      alternativas: ["1) Pedro", "2) Ana", "3) Nós dois", "4) Indiferente"],
      correta: "1"
    },
    {
      pergunta: "9. Qual é a nossa música?",
      alternativas: ["1) Perfect", "2) Dandelions", "3) Shallow", "4) Thinking Out Loud"],
      correta: "2"
    },
    {
      pergunta: "10. Qual meu passatempo favorito?",
      alternativas: ["1) Estudar", "2) Dançar", "3) Sair", "4) Te ver"],
      correta: "4"
    }
  ];

  let acertos = 0;

  for (let i = 0; i < perguntas.length; i++) {
    const p = perguntas[i];
    let resposta = prompt(`${p.pergunta}\n${p.alternativas.join("\n")}\n\nDigite a letra da alternativa:`);

    if (resposta && resposta.toLowerCase() === p.correta) {
      alert("✅ Acertou! 🥰");
      acertos++;
    } else {
      alert(`❌ Ops! A resposta correta era "${p.correta.toUpperCase()}".`);
    }
  }

  alert(`🎉 Você acertou ${acertos} de ${perguntas.length} perguntas!\nTe amo muito 💖 Muito obrigado por todo esse tempo ao meu lado. 💖💖💖25/05/2022💖💖💖`);
}
