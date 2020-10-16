//!testar variáveis numéricas

//!testar som

//!testar vídeo

//!ver se é possível acrescentar vídeos ou imagens ou p5 no meio

let bodyElement;
let wrapperElement;
let containerTextoElement;
let containerEsquerdaElement;
let textoElement;
let botoesElement;
let rowEstadosElement;
let estadosElement = [];
let canvasElement;
let audioElement;
let estado = {};
// *TRILHAS*
let mar = './assets/mar.ogg';

function tocar(musica) {
  audioElement.setAttribute('src', musica);
  var playPromise = audioElement.play();

  // In browsers that don’t yet support this functionality,
  // playPromise won’t be defined.
  if (playPromise !== undefined) {
    playPromise
      .then(function () {
        console.log('sucesso');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

function criarElementos() {
  bodyElement = document.querySelector('body');
  wrapperElement = document.createElement('div');
  containerTextoElement = document.createElement('div');
  containerEsquerdaElement = document.createElement('div');
  textoElement = document.createElement('div');
  botoesElement = document.createElement('div');
  rowEstadosElement = document.createElement('div');
  for (let i = 0; i < 4; i++) {
    let p = document.createElement('p');
    estadosElement.push(p);
  }
  canvasElement = document.createElement('canvas');
  audioElement = document.createElement('audio');

  bodyElement.classList.add('jogo');
  wrapperElement.classList.add('wrapper-jogo');
  containerEsquerdaElement.classList.add('container-esquerda');
  containerTextoElement.classList.add('container-texto');
  textoElement.classList.add('text');
  botoesElement.classList.add('option-buttons');
  botoesElement.classList.add('btn-grid');
  rowEstadosElement.classList.add('row-estados');
  canvasElement.classList.add('canvas');
  for (let i = 0; i < estadosElement.length; i++) {
    estadosElement[i].classList.add('estados');
  }

  bodyElement.appendChild(wrapperElement);
  bodyElement.appendChild(audioElement);
  wrapperElement.appendChild(containerEsquerdaElement);
  wrapperElement.appendChild(containerTextoElement);
  containerTextoElement.appendChild(textoElement);
  containerTextoElement.appendChild(botoesElement);
  containerEsquerdaElement.appendChild(rowEstadosElement);
  containerEsquerdaElement.appendChild(canvasElement);
  for (let i = 0; i < estadosElement.length; i++) {
    rowEstadosElement.appendChild(estadosElement[i]);
  }
  for (let i = 0; i < estadosElement.length; i++) {
    estadosElement[i].textContent = '+teste';
  }
}

function novoJogo() {
  estado = {};
  criarElementos();
  tocar(mar);
  mostrarTexto(3);
}

function mostrarTexto(indexFragmentosDeTexto) {
  window.scrollTo(0, 0);
  if (indexFragmentosDeTexto != 1) {
    fadeIn(containerTextoElement, 2);
    fadeIn(containerEsquerdaElement, 2);
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
  fadeOut(containerEsquerdaElement, 2);
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
    //TODO +FEAR +CURIOSITY
    texto: `...oh my, this park must be big, I've been walking for a while...
    ...it's so dark in there, I'm not sure if there's a better way to get in other than that gate I saw...
    
    ...oh wait, there's a sign there...
    
    [ PRIVATE PROPERTY
    DON'T ENTER
    MAD DOG ]
    
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
        proximoTexto: '25b',
      },
    ],
  },
  {
    //TODO [ [pass under the gates| frase seguinte na mesma tela, não leva a um novo lugar] ]
    id: '25b',
    texto: `...there are some holes someone has dug under these gates... I think they entered through those passages...

    ...but it's so dark in there... what the hell am I doing?
  
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
        proximoTexto: '25b',
      },
    ],
  },
  {
    id: 26,
    texto: `
    ...this is a really old amusemnt park! How come I've never seen it before?
    
    ...this gate is all rusty, as well as all the rest... It must be abandoned for a really long time...
    
    ...but yeah...still closed and locked... damn you gate!`,
    opcoes: [
      {
        texto: 'shake the gate',
        proximoTexto: 27,
      },
    ],
  },
  {
    id: 27,
    texto: `..this rusty noise is less creepy now... I don't know... but there's this energy in the air...

    ...I just can't tell it's good or bad... `,
    opcoes: [
      {
        texto: 'try to listen to guts',
        proximoTexto: 28,
      },
      {
        texto: `try to open the gate`,
        proximoTexto: 29,
      },
    ],
  },
  {
    id: 28,
    //TODO - FEAR
    texto: `
    ...it's all dark and abandoned, maybe there could be people inside that could be mad at me for invading their spot...maybe it could be a place where people get murdered...some men could hide there to wake up their shadows...
    ...but somehow this is not what I feel deep deep down... I'm not the bravest person when it comes to invading an abandoned amusement park in the middle of the night... and here I am doing what?
    ...dear God...I don't know...how did I end up here?
`,
    opcoes: [
      {
        texto: 'find a way through the gate',
        proximoTexto: 29,
      },
    ],
  },
  {
    id: 29,
    texto: `...ok...remember when you were a kid and invading Mrs Figgs was a piece of cake... how would I enter Mrs Figgs' amusement park?

    ...no doorbells...there's only a chain and a lock...ok...I could try to break the chain...
    
    ...that's crazy...how am I supposed to do that?!`,
    opcoes: [
      {
        texto: 'try to find a chain cutter',
        proximoTexto: 31,
      },
      {
        texto: `...there's a ticket booth over there...`,
        proximoTexto: 32,
      },
    ],
  },
  {
    //TODO +TIRED +FRUSTRATED
    id: 31,
    texto: `
    WHERE???

`,
    opcoes: [
      {
        texto: 'check the ticket booth',
        proximoTexto: 32,
      },
    ],
  },
  {
    //TODO +SAD (to colocando vários pra gente ir sentindo kkkkk não se desespera)
    id: 32,
    texto: `
    ...wow...to think that so many people spent their money here...
    ...I bet Tata would love to see this...

    ...there's a door behind that faded elephant painting...`,
    opcoes: [
      {
        texto: 'open the door',
        proximoTexto: 33,
      },
    ],
  },
  {
    //TODO +EXCITED
    id: 33,
    texto: `...good Lord!...it's open!...

    ...oh my...I can enter an abandoned amusement park in the middle of a Tuesday night...WHO AM I?!
    ...what if there's someone in?...shouldn't I have some kind of weapon to defend myself just in case?...
    `,
    opcoes: [
      {
        texto: `...it can't be worse than it is...just get in`,
        proximoTexto: 34,
      },
      {
        texto: `...yeah, I'll find something...`,
        proximoTexto: 35,
      },
    ],
  },
  {
    id: 34,
    texto: `...hole Mary!...that's a gorgeous ferris wheel! It feels like a dream!...


    ...it's hypnotizing to watch it...
    `,
    opcoes: [
      {
        texto: `contemplate the ferris wheel`,
        proximoTexto: 38,
      },
      {
        texto: `take a walk around`,
        proximoTexto: 39,
      },
    ],
  },
  {
    id: 35,
    texto: `...I'm too distracted for a woman alone in the dark...

    ...there were some stones close to the gate...they were probably part of the wall...I remember having seen some painting on it...
    
    ...oh, there's also this piece of iron from the gate on the floor... won't do much, but could be a bit more terrifying than just me...`,
    opcoes: [
      {
        texto: `get the stone`,
        proximoTexto: 36,
      },
      {
        texto: `get the iron bar`,
        proximoTexto: 37,
      },
    ],
  },
  {
    //TODO - FEAR + EXCITED + TIRED STONE
    id: 36,
    texto: `...it's a bit heavy, but I could throw at someone who dares interrupting my path tonight...

    `,
    opcoes: [
      {
        texto: 'take a walk in the park',
        proximoTexto: 39,
      },
    ],
  },
  {
    //TODO - FEAR + EXCITED IRON BAR
    id: 37,
    texto: `...if I hit someone with this it'll probably twist and be useless...but they'll get a piece of me anyway...I'm more than just an old hag...I'M AN OLD HAG WITH AN IRON BAR!...

    `,
    opcoes: [
      {
        texto: 'take a walk in the park',
        proximoTexto: 39,
      },
    ],
  },
  {
    //TODO (imagem da roda gigante com som...animada?...)
    id: 38,
    texto: `FERRIS WHEEL

    `,
    opcoes: [
      {
        texto: 'take a walk',
        proximoTexto: 39,
      },
    ],
  },
  {
    id: 39,
    texto: `...there are some cute alleys going towards the sea...oh, there's probably a good view over there...

    ...I guess this wide street will take me to the ferris wheel...
    
    ...hmmm...there's also this little stone path on the right...looks like somewhere over the rainbow...it could take me somewhere nice then?...well...back in the days I'd say so, tonight I'm not so sure...
    `,
    opcoes: [
      {
        texto: `take the cute alleys to the sea`,
        proximoTexto: 40,
      },
      {
        texto: `take the wide street to ferris wheel`,
        proximoTexto: 43,
      },
      {
        texto: `take the stone path to the unknown`,
        proximoTexto: 46,
      },
    ],
  },
  {
    id: 40,
    //TODO +EXCITED -TIRED
    texto: `...oh yessss...I can smell it...I can feel how salty it is...oh my...it feels so good to be here...

    ...it's too dark to see anything...no light at all down there... but ain't it something?...complete darkness and the waves sprinkling me now and then...
    `,
    opcoes: [
      {
        texto: `stay a bit longer`,
        proximoTexto: 41,
      },
      {
        texto: `go see the ferris wheel`,
        proximoTexto: 43,
      },
      {
        texto: `investigate the stone path`,
        proximoTexto: 46,
      },
    ],
  },
  {
    id: 41,
    texto: `...I'm always impressed by the strenght of the ocean...
    ...it comes and goes, making everything spin on the surface, but deep down it's just hosting this amazing party full of invisible lives...
    
    ...it only appears to be dark to my eyes, but if I could be as light as a little fish, I'd be swimming happy after some little plant...
    
    ...does fish eat plant?...
    `,
    opcoes: [
      {
        texto: 'answer',
        proximoTexto: 42,
      },
    ],
  },
  {
    id: 42,
    // TODO +HUNGRY
    texto: `...I never really thought about what fish eat, I've always eaten then before that...

    ...oh my...I feel terrible about it now...
    
    ...Jina is right, I don't need to eat these blessed animals...I could do better with plants and other things... well, not today though...anything that comes will be accepted...
    `,
    opcoes: [
      {
        texto: 'go back to the stone path to the unknown',
        proximoTexto: 46,
      },
      {
        texto: 'go back to see the ferris wheel',
        proximoTexto: 43,
      },
    ],
  },
  {
    id: 43,
    texto: `...this park must have been beautiful back in the old days...all these stands...bet there were fishing, shooting and ring throwing stands...

    ...oh look...in that one there are still some teddy bears...oh my dear God...that looks creepy and sad...
    
    `,
    opcoes: [
      {
        texto: 'continue to ferris wheel',
        proximoTexto: 44,
      },
    ],
  },
  {
    id: 44,
    texto: `...this ferris wheel is amazing...soooo big...

    ...how do people have the courage to board this little thing and just keep looking outside at that height!?!
    
    ...oh my dear goodness in the sky...no way I could do that...
    
    ...well...specially now!...    
    `,
    opcoes: [
      {
        texto: 'count how many cabins are there',
        proximoTexto: 45,
      },
    ],
  },
  {
    id: 45,
    // TODO ++FEAR (avançado--se tiver arma tem menos medo e pode falar algo como "thank Lord I have this in my hands...I'll kick their ass!...")
    texto: `...I feel butterflies in my stomach just to keep watching it... Lisa would love it...

    ...WHAT'S THAT SOUND?!
    
    ...I can't see anyone...I don't see anything different...
    ...Oh god oh god oh god...
    
    `,
    opcoes: [
      {
        texto: 'go take a breathe at the sea',
        proximoTexto: 40,
      },
      {
        texto: 'go down the stone path',
        proximoTexto: 46,
      },
    ],
  },
  {
    id: 46,
    //TODO +FEAR
    texto: `...all this weed taking over the path...so beautiful...so calm...and...these cobblestone way reminds me of Yota...we'd go to school walking everyday and he had this bag with wheels...instead of just carrying it, he'd just pull it on the stones and the noise was just so loud!...hahahahaha....oh my...yes...we'd spend so much time rolling the bag back to its wheels...

    ...such a stubborn little brat...I miss him...
    
    ...oh good God...here I am getting distracted again...
    `,
    opcoes: [
      {
        texto: 'pay attention and keep walking',
        proximoTexto: 47,
      },
    ],
  },
  {
    id: 47,
    //TODO -EXCITED
    texto: `...there are so many bottles on the floor... this is or was a place for some people to gather and have some drinks...oh...to me would be drinks....but people these days do all kinds of things...I don't even know what that could be...

    ...hmmm...it doesn't smell good here...and I just wanted a quiet and clean place...what a luxury!...
    
    ...there's something ahead...        `,
    opcoes: [
      {
        texto: 'move carefully towards it',
        proximoTexto: 48,
      },
    ],
  },
  {
    id: 48,
    texto: `...seems like there's anyone here either...oh my...I'm lucky I guess...at least this!...
    // TODO +EXCITED

    
    ...it's some kind of house I guess...wait...there's something written there...I can't see...
    `,
    opcoes: [
      {
        texto: 'approach to read',
        proximoTexto: 49,
      },
      {
        texto: 'take a walk around it first',
        //! xx
        proximoTexto: 'xx',
      },
    ],
  },
  {
    id: 49,
    texto: `[ HOTEL ]

    ...oh dear...it's a hotel!...
    
    ...hahahaha...it should be a scary one...I can't imagine a better scenery for it then...this gives me the creeps...
    
    ...but yeah...could be a good shelter...gee!...really?...a horror hotel could be my shelter?...my life is becoming a joke...
     `,
    opcoes: [
      {
        texto: `check if it's open`,
        proximoTexto: 50,
      },
    ],
  },
  {
    id: 50,
    texto: `------check the door--------

    ----it's open-----
    
     `,
    opcoes: [
      {
        texto: `enter hotel`,
        proximoTexto: 51,
      },
      {
        texto: `...I'm not ready for that yet...`,
        // ! xx
        proximoTexto: 'xx',
      },
    ],
  },
  {
    id: 51,
    texto: `------check around...rooms...mirrors...puppets...furniture...

     `,
    opcoes: [
      {
        texto: `-----kitchen------`,
        proximoTexto: '?',
      },
      {
        texto: `-----living room-----`,
        // ! xx
        proximoTexto: '?',
      },
      {
        texto: `-----bathroom-----`,
        // ! xx
        proximoTexto: '?',
      },
    ],
  },
];

export { novoJogo };
