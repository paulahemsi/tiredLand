import { novoJogo } from './jogo.js';

const containerElement = document.querySelector('.container');
const wrapperElement = document.querySelector('.wrapper');
const bodyElement = document.querySelector('body');
let personagem;

function popup(evento) {
  if (
    evento.path[0].classList.contains('c1') ||
    evento.path[1].classList.contains('c1')
  ) {
    personagem = 'Leah';
  } else if (
    evento.path[0].classList.contains('c2') ||
    evento.path[1].classList.contains('c2')
  ) {
    personagem = 'Fran';
  } else if (
    evento.path[0].classList.contains('c3') ||
    evento.path[1].classList.contains('c3')
  ) {
    personagem = 'Barb  ';
  }
  if (window.confirm(`do you wanna be ${personagem}?`)) {
    comecarJogo();
  }
}

function comecarJogo() {
  fadeOut(wrapperElement, 3);
  setTimeout(function novaPagina() {
    bodyElement.removeChild(wrapperElement);
    bodyElement.classList.remove('menu');
    novoJogo();
  }, 3000);
}

function fadeOut(elemento, tempo) {
  processa(elemento, tempo, 100, 0);
}

function processa(elemento, tempo, inicio, fim) {
  let incremento;
  if (inicio == 0) {
    incremento = 2;
    elemento.style.display = 'block';
  } else {
    incremento = -2;
  }
  let opacidade = inicio;
  let intervalo = setInterval(function () {
    if (opacidade == fim) {
      if (fim == 0) {
        elemento.style.display = 'none';
      }
      clearInterval(intervalo);
    } else {
      opacidade += incremento;
      elemento.style.opacity = opacidade / 100;
      elemento.style.filter = "alpha(opacity='+opacidade+')";
    }
  }, tempo * 5);
}

containerElement.addEventListener('click', popup);
