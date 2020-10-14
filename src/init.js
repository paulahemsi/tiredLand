import game from './gameState';

const TICK_RATE = 3000;

async function init() {
  console.log('começando o jogo');

  let nextTimeToTick = Date.now();

  //função dentro da função pra manter o nextTimeToTick aqui no mesmo escopo, sem precisar torná-lo global, tentando deixar sempre as coisas no menor escopo possível
  function nextAnimationFrame() {
    const now = Date.now();

    if (nextTimeToTick <= now) {
      game.tick();
      nextTimeToTick = now + TICK_RATE;
    }

    requestAnimationFrame(nextAnimationFrame);
  }

  requestAnimationFrame(nextAnimationFrame);
}

init();
