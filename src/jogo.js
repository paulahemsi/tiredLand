//!opções que não tem o estado ficarem ali mas apagadinhas

//!testar variáveis numéricas

//!sair e voltar da página

//!testar som

//!testar vídeo

//!ver se é possível acrescentar vídeos ou imagens ou p5 no meio

const containerElement = document.querySelector('.container');
const textoElement = document.querySelector('#text');
const botoesElement = document.querySelector('#option-buttons');

//objeto que guarda estato da personagem
let estado = {};

function novoJogo() {
  estado = {};
  mostrarTexto(1);
}

function mostrarTexto(indexFragmentosDeTexto) {
  //O método find() retorna o valor do primeiro elemento do array que satisfizer a função de teste provida. Caso contrario, undefined é retornado.
  // const texto = fragmentosDeTexto.find(callback(element[, index[, array]])[, thisArg])
  window.scrollTo(0, 0);
  fadeIn(containerElement, 2);
  const texto = fragmentosDeTexto.find(
    (fragmentosDeTexto) => fragmentosDeTexto.id === indexFragmentosDeTexto
  );
  textoElement.innerText = texto.texto;
  while (botoesElement.firstChild) {
    botoesElement.removeChild(botoesElement.firstChild);
  }

  texto.opcoes.forEach((opcao) => {
    if (mostrarOpcao(opcao)) {
      const botao = document.createElement('button');
      botao.innerText = opcao.texto;
      botao.classList.add('btn');
      botao.addEventListener('click', function selecionou() {
        selecionouOpcao(opcao);
      });
      botoesElement.appendChild(botao);
    }
  });
}

function mostrarOpcao(opcao) {
  return opcao.condicao == null || opcao.condicao(estado);
}

function selecionouOpcao(opcao) {
  fadeOut(containerElement, 2);
  setTimeout(function () {
    const proximoFragmentoDeTextoId = opcao.proximoTexto;
    estado = Object.assign(estado, opcao.definirEstado);
    mostrarTexto(proximoFragmentoDeTextoId);
  }, 1000);
}

function fadeIn(elemento, tempo) {
  processa(elemento, tempo, 0, 100);
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

const fragmentosDeTexto = [
  {
    id: 1,
    texto: `Exhausted? Enraged? In need of some hard core fun? Welcome to Tiredland! A place to let off steam when you just can’t take it anymore!`,
    opcoes: [
      {
        texto: 'start',
        definirEstado: { medo: true },
        proximoTexto: 2,
      },
    ],
  },
  {
    id: 2,
    texto: `LEAH

    She's in her early twenties and is still positive about life. She's agile, energetic and tries to be a fair person. Her mind is super fast and great with connecting the dots, and she'll probably need to pause a few conversations to finish some thoughts. With some remarkable facts in her journey like a conservative upbringing, late sexual discovery and some professional failures, she feels good. But she can't fit in anywhere. And that's exhausting.
    
    
    FRAN
    
    She feels on a road with a dead end. In her mid fifties, she has a family back home. She loves them a lot, but she's reached a point where her problems are not actually hers, and that's friggin' heavy. She's completely weary, but has a powerful life drive buried underneath it all. Too modest to say it, everything she decides to touch becomes beautiful and joyful. Her intuition works better than a satellite, so if she can hear it, she'd probably see her road is long and dynamic.
    
    
    BARB
    
    Observant, she's got an organic horizontal leadership. She's resilient, witty and pragmatic, and got a taste for tattoos. One of her favorites is the " 100% " one, meaning: I've survived 100% of my worst days. Once she found real love, and that brought light to her journey, but her love is not among us anymore. So that's why you'll probably see her talking to emptiness from now and then. Some say she's a radical, but she prefers to describe herself as someone tired who just decided to retaliate.`,
    opcoes: [
      {
        texto: 'FRAN',
        proximoTexto: 3,
      },
    ],
  },
  {
    id: 3,
    texto: `I just wish I had a quiet and clean place to sit and put my feet up. But yeah... I guess even that it's too much to ask for now...

    ...I have no clue what time it is, and I still need to find a place to spend the night. I'm not sure if I should be in a hurry for that or if it just doesn't matter anymore...`,
    opcoes: [
      {
        texto: 'Keep walking',
        proximoTexto: 4,
      },
    ],
  },
  {
    id: 4,
    texto: `...anyway, the sound of the waves calms me down a bit...

    (sigh)
    
    ...I feel I'm close to these noises, maybe they're gonna offer me a shelter for now.`,
    opcoes: [
      {
        texto: 'keep moving',
        proximoTexto: 5,
      },
    ],
  },
  {
    id: 5,
    texto: `...oh my goodness... So that's it... That's the source of the noise?`,
    opcoes: [
      {
        texto: 'observe further',
        proximoTexto: 6,
      },
    ],
  },
  {
    id: 6,
    texto: `It's a ferris wheel!

    If there's one thing I didn't expect to see in such terrible day is that... a ferris wheel.
    
    (smiles briefly)
    
    ...in an amusement park... 
    
    
    ...how ironic!
    
    `,
    opcoes: [
      {
        texto: 'find the entrance to the park',
        proximoTexto: 7,
      },
      {
        texto: '"am I alone here?"',
        proximoTexto: 8,
      },
    ],
  },
  {
    id: 7,
    texto: `...these damn feet hurt like hell...

    +TIRED
    
    I've got to find the entrance to it... 
    
    Hmmm.. If the sea is that way, I should probably head the other way around, if I were this park I'd have a gate to the streets...that's where the cars would be, right?
    `,
    opcoes: [
      {
        texto: 'leave the sea behind',
        proximoTexto: 9,
      },
    ],
  },
  {
    id: 8,
    texto: `+FEAR

    It looks like I'm still alone here... But damn it's getting dark as hell!
    
    Oh my my...
    `,
    opcoes: [
      {
        texto: 'find the entrance',
        proximoTexto: 9,
      },
    ],
  },
  {
    id: 9,
    texto: `Oh, that's some old entrance! No wonder that ferris wheel screams so much...

    ...I like the feeling of it though...Nice orange and green there at those gates...
    
    ...I remember when I was a little girl and my dad kept bringing me to such parks... no way I was the only one having fun... the old man loved some fishing for gifts!
    `,
    opcoes: [
      {
        texto: '"Wait, is that a sentence on that pillar?"',
        proximoTexto: 10,
      },
    ],
  },
  {
    id: 10,
    texto: `[ Seize the day, you only live once ]


    ...indeed... 
    ...if I could, I'd definitely choose to live once again...
    (sigh)
    
    ok, so let me check if there's a way in.
    `,
    opcoes: [
      {
        texto: 'check the gate and see if it opens',
        proximoTexto: 11,
      },
      {
        texto: 'take a walk around it',
        proximoTexto: 12,
      },
    ],
  },
];

novoJogo();
