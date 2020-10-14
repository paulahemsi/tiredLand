const containerElement = document.querySelector('.container');
const wrapperElement = document.querySelector('.wrapper');
containerElement.addEventListener('click', comecarJogo);

function comecarJogo() {
  fadeOut(wrapperElement, 3);
  setTimeout(function novaPagina() {
    window.location.href = './index.html';
  }, 2000);
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
  opacidade = inicio;
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
