//!opções que não tem o estado ficarem ali mas apagadinhas

//!testar variáveis numéricas

//!sair e voltar da página

//!testar som

//!testar vídeo

//!ver se é possível acrescentar vídeos ou imagens ou p5 no meio

let bodyElement;
let wrapperElement;
let containerTextoElement;
//let containerEstadosElement;
let textoElement;
let botoesElement;
let estado = {};

function criarElementos() {
  bodyElement = document.querySelector('body');
  wrapperElement = document.createElement('div');
  containerTextoElement = document.createElement('div');
  // containerEstadosElement = document.createElement('div');
  textoElement = document.createElement('div');
  botoesElement = document.createElement('div');

  bodyElement.classList.add('jogo');
  wrapperElement.classList.add('wrapper-jogo');
  // containerEstadosElement.classList.add('container-estados');
  containerTextoElement.classList.add('container-texto');
  textoElement.classList.add('text');
  botoesElement.classList.add('option-buttons');
  botoesElement.classList.add('btn-grid');

  bodyElement.appendChild(wrapperElement);
  //wrapperElement.appendChild(containerEstadosElement);
  wrapperElement.appendChild(containerTextoElement);
  containerTextoElement.appendChild(textoElement);
  containerTextoElement.appendChild(botoesElement);
}

function novoJogo() {
  estado = {};
  criarElementos();
  mostrarTexto(3);
}

function mostrarTexto(indexFragmentosDeTexto) {
  window.scrollTo(0, 0);
  if (indexFragmentosDeTexto != 1) {
    fadeIn(containerTextoElement, 2);
  }
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
  fadeOut(containerTextoElement, 2);
  setTimeout(function () {
    const proximoFragmentoDeTextoId = opcao.proximoTexto;
    estado = Object.assign(estado, opcao.definirEstado);
    mostrarTexto(proximoFragmentoDeTextoId);
  }, 2000);
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

const fragmentosDeTexto = [
  {
    id: 3,
    texto: `...if there's a day I could never imagine I'd live, this is definitely it...

    ...for how long have I been walking?...
    If my feet could answer that question they'd say "FOR TOO LOOOONG!"
    
    `,
    opcoes: [
      {
        texto: 'keep walking',
        proximoTexto: '4',
      },
    ],
  },
  {
    id: '4',
    texto: `...well, I think I've walked far enough not to go back...

    ...at least not tonight...`,
    opcoes: [
      {
        texto: 'Keep walking',
        proximoTexto: '5',
      },
    ],
  },
  {
    id: '5',
    texto: `...what am I doing?



    ...where am I going?!




    `,
    opcoes: [
      {
        texto: `...can't answer, can't stop...`,
        proximoTexto: 6,
      },
    ],
  },
  {
    id: 6,
    texto: `...dear God...I have to stop for a moment and catch my breath....`,
    opcoes: [
      {
        //! faltando passagem 8
        texto: 'stop for a while',
        proximoTexto: 8,
      },
      {
        texto: 'keep walking',
        proximoTexto: 7,
      },
    ],
  },
  {
    id: 8,
    texto: `...I'm not that young anymore... this body is just...

    ...oh...this body is just...
    
    ...whatever...
        
    `,
    opcoes: [
      {
        texto: 'catch your breath',
        proximoTexto: 9,
      },
    ],
  },
  {
    id: 9,
    texto: `...what a night...
    ...what a day...
    what what what what what what
    
    ...maybe I should just go back...we can deal with it...I can solve this too....
    
    ...I don't know... I guess I could...
    `,
    opcoes: [
      {
        //! faltando passagem 11
        texto: '...should I go back?',
        proximoTexto: 11,
      },
      {
        texto: `...I don't wanna go back...`,
        proximoTexto: 10,
      },
    ],
  },
  {
    id: 10,
    texto: `...I guess I could solve one more, but I don't really want it...
    ...yeah, I don't want it...
    ...I don't want it...
    
    Dear God, I don't want to go back.
    `,
    opcoes: [
      {
        texto: 'breath deeply',
        proximoTexto: 12,
      },
    ],
  },
  {
    id: 12,
    texto: `...so many years I spent with him, and now I just can't take it anymore...

    ...I just gotta stop it...I have nothing to do with all that...I just want to have a quiet life...
    
    ...oh, that's the sound of the waves! I'm close to the beach! Ohh, that could be nice... an old rag like me swimming in the dark naked!! hahahahaha...
    
    `,
    opcoes: [
      {
        texto: `...no way...don't even dare the thought of doing it for real...`,
        proximoTexto: 13,
      },
    ],
  },
  {
    id: 13,
    texto: `...I can hear this other noise though...could be the wind, but actually it's creepier than that...
    ...dear God...creepy noises and this old woman all alone in the dark...who am I?! Not even when I was 15 I did such a thing!
    ...oh fuck it! 
    ...!
    Holy shit! I just used bad words!
    
    `,
    opcoes: [
      {
        texto: 'stay silent',
        proximoTexto: 14,
      },
    ],
  },
  {
    id: 14,
    texto: `...it's probably the sound of something big being blown by the wind...that could mean shelter for tonight...
    `,
    opcoes: [
      {
        texto: 'follow the wind sound',
        proximoTexto: 15,
      },
      {
        //! faltando passagem 16
        texto: `could be nice to check the sea.`,
        proximoTexto: 16,
      },
    ],
  },
  {
    id: 15,
    texto: `...I just wish I had a quiet and clean place to sit and put my feet up...but yeah... I guess even that it's too much to ask for now...

    ...I have no clue what time it is...
    
    `,
    opcoes: [
      {
        texto: 'guess what time it is',
        proximoTexto: 17,
      },
    ],
  },
  {
    id: 17,
    texto: `...time to find a place to spend the night...

    ...well, I'm not sure if I should be in a hurry for that or if it just doesn't matter anymore...
    `,
    opcoes: [
      {
        texto: 'keep walking towards the noises',
        proximoTexto: 18,
      },
    ],
  },
  {
    id: 18,
    texto: `...anyway, the sound of the waves calms me down a bit...

    (sigh)
    
    ...I feel I'm close to these windy noises, maybe they're gonna offer me a shelter for now...
    `,
    opcoes: [
      {
        texto: 'keep moving',
        proximoTexto: 19,
      },
    ],
  },
  {
    id: 19,
    texto: `...dear God!... So that's it... That's the source of the noise?
    `,
    opcoes: [
      {
        texto: 'observe further',
        proximoTexto: 20,
      },
    ],
  },
  {
    id: 20,
    texto: `It's a ferris wheel!

    If there's one thing I didn't expect to see in such terrible day is that... a ferris wheel.
    
    (smiles briefly)
    
    ...in an amusement park... 
    
    
    ...how ironic! `,
    opcoes: [
      {
        //TODO +TIRED
        texto: 'find the entrance to the park',
        proximoTexto: 21,
      },
      {
        //TODO + FEAR
        texto: `"am I alone here?"`,
        proximoTexto: 22,
      },
    ],
  },
  {
    id: 21,
    texto: `...these damn feet hurt like hell...
    
    I've got to find the entrance to it... 
    
    Hmmm.. If the sea is that way, I should probably head the other way around, if I were this park I'd have a gate to the streets...that's where the cars would be, right?
    
    `,
    opcoes: [
      {
        texto: 'leave the sea behind',
        proximoTexto: 23,
      },
    ],
  },
  {
    id: 22,
    texto: `It looks like I'm still alone here... But damn it's getting dark as hell!

    Oh my my...
    
    `,
    opcoes: [
      {
        texto: 'find the entrance',
        proximoTexto: 23,
      },
    ],
  },
  {
    id: 23,
    texto: `Oh, that's some old entrance! No wonder that ferris wheel screams so much...

    ...I like the feeling of it though...Nice orange and green there at those gates...
    
    ...I remember when I was a little girl and my dad kept bringing me to such parks... no way I was the only one having fun... the old man loved some fishing for gifts!
    
    `,
    opcoes: [
      {
        texto: '"Wait, is that a sentence on that pillar?"',
        proximoTexto: 24,
      },
    ],
  },
  {
    id: 24,
    texto: `[ Seize the day, you only live once ]


    ...indeed... 
    ...if I could, I'd definitely choose to live once again...
    (sigh)
    
    ok, so let me check if there's a way in.
    
    `,
    opcoes: [
      {
        texto: 'check the gate and see if it opens',
        proximoTexto: 26,
      },
      {
        texto: `take a walk around it`,
        proximoTexto: 25,
      },
    ],
  },
  {
    id: 25,
    texto: `...oh my, this park must be big, I've been walking for a while...
    ...it's so dark in there, I'm not sure if there's a better way to get in other than that gate I saw...
    
    ...oh wait, there's a sign there...
    
    [ PRIVATE PROPERTY
    DON'T ENTER
    MAD DOG ]
    
    //TODO +FEAR +CURIOSITY
   ...wow...I did not see that coming...
  ...it could be true, but it also could be just a sign to scare away people like me...
    `,
    opcoes: [
      {
        texto: 'go back to the gate and see if it opens',
        proximoTexto: 26,
      },
      {
        texto: `keep investigating`,
        proximoTexto: 27,
      },
    ],
  },
  {
    id: 26,
    texto: `...ok, remember when you were a kid and these...
    `,
    opcoes: [
      {
        texto: '',
        proximoTexto: 26,
      },
      {
        texto: ``,
        proximoTexto: 26,
      },
    ],
  },
  {
    id: 27,
    texto: `...there are some holes someone has dug under these gates... I think they entered through those passages...

    ...but it's so dark in there... what the hell am I doing?
  
    //TODO [ [pass under the gates| frase seguinte na mesma tela, não leva a um novo lugar] ]
    uh... I don't think I'd be able to pass underneath it, I wouldn't fit...
    
    `,
    opcoes: [
      {
        texto: 'go back to the main gate',
        proximoTexto: 26,
      },
      {
        texto: `pass under the gates`,
        //! VER TODO ACIMA
        proximoTexto: 25,
      },
    ],
  },
];

export { novoJogo };
