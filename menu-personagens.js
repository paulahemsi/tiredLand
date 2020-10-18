import { novoJogo } from './jogo.js';

const containerElement = document.querySelector('.c2');
const bodyElement = document.querySelector('body');
const menuElement = document.querySelector('.menu');
let personagem;

function comecarJogo() {
  fadeOut(menuElement, 3);
  setTimeout(function novaPagina() {
    bodyElement.removeChild(menuElement);
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

containerElement.addEventListener('click', comecarJogo);
