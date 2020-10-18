//DOM ELEMENTS
let containerTextoElement;
let containerEsquerdaElement;
let textoElement;
let botoesElement;
//ESTADOS
let tired;
let fear;
let excited;
let gun;
//TRILHAS
let mar;
let barulho;
let trilha3;
let trilha51;
let trilha72;
let trilha75;
let trilhaFinal;
//SKETCHS
let tiroElement;
let flashingElement;
let walkerElement;
let entradaElement;
//IMAGENS
let rodaGiganteElement;
let hotelElement;
let ervasElement;
let maresiaElement;
let ruaElement;
let letreiroEntradaElement;
let letreiroHotelElement;

let estadosElement = [];
let estado = {};


let jogoElement = document.querySelector('.jogo');

function estruturarElementos() {
  jogoElement.classList.toggle('hide');
  //DOM ELEMENTS
  containerTextoElement = document.querySelector('.container-texto');
  containerEsquerdaElement = document.querySelector('.container-esquerda');
  textoElement = document.querySelector('.text');
  botoesElement = document.querySelector('.option-buttons');
  //ESTADOS
  tired = document.querySelector(".tired");
  fear = document.querySelector(".fear");
  excited = document.querySelector(".excited");
  gun = document.querySelector(".gun");
  //SKETCHS
  tiroElement = document.querySelector("#tiro");
  flashingElement = document.querySelector("#flashing");
  walkerElement = document.querySelector("#walker");
  entradaElement = document.querySelector('#entrada');
  //IMAGENS
  rodaGiganteElement = document.querySelector(".roda-gigante");
  hotelElement = document.querySelector('.hotel');
  ervasElement = document.querySelector('.ervas');
  maresiaElement = document.querySelector('.maresia');
  ruaElement = document.querySelector('.rua');
  letreiroEntradaElement = document.querySelector('.letreiro-entrada');
  letreiroHotelElement = document.querySelector('.letreiro-hotel');
  //TRILHAS
  mar = document.querySelector(".mar");
  barulho = document.querySelector(".barulho");
  trilha3 = document.querySelector(".cena1");
  trilha51 = document.querySelector(".cena51");
  trilha72 = document.querySelector(".cena72");
  trilha75 = document.querySelector(".cena75");
  trilhaFinal = document.querySelector(".cena-final");
}

function novoJogo() {
  estado = {};
  estruturarElementos();
  mostrarTexto(3);
}

function mostrarTexto(indexFragmentosDeTexto) {
  window.scrollTo(0, 0);
  if (indexFragmentosDeTexto != 1) {
    fadeIn(containerTextoElement, 2);
    fadeIn(containerEsquerdaElement, 2);
  }
  aplicarEventos(indexFragmentosDeTexto);
  const texto = fragmentosDeTexto.find(
    (fragmentosDeTexto) => fragmentosDeTexto.id == indexFragmentosDeTexto
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

function aplicarEventos(index){
  switch (index) {
    case 3:
      tocar(trilha3);
      break;
    case 4:
      toggleHide(walkerElement);
      break;
    case 9:
      tocar(mar);
      break;
    case 13:
      toggleHide(walkerElement);
      break;
    case 16:
      toggleHide(maresiaElement);
      break;
    case '16c':
      toggleHide(maresiaElement);
      break;
    case 19:
      toggleHide(rodaGiganteElement);
      break;
    case 23:
      toggleHide(rodaGiganteElement);
      break;
    case 24:
      toggleHide(letreiroEntradaElement);
      break;
    case 26:
      toggleHide(letreiroEntradaElement);
      toggleHide(entradaElement);
      break;   
    case 32:
      toggleHide(entradaElement);
      break;
    case 46:
      toggleHide(ervasElement);
      break;
    case 48:
      toggleHide(ervasElement);
      toggleHide(hotelElement);
      break;
    case '48b':
      toggleHide(hotelElement);
      toggleHide(ruaElement);
      break;
    case '49c':
      toggleHide(ruaElement);
      break;
    case 49:
      toggleHide(hotelElement);
      toggleHide(letreiroHotelElement);
      break;
    case 50:
      toggleHide(letreiroHotelElement);
      break;
    case 51:
      tocar(trilha51);
      break;
    case '49e':
      tocar(trilha51);
      break;
    case 56:
      tocar(barulho);
      break;
    case 62:
      toggleHide(flashingElement);
      break;
    case 66:
      toggleHide(flashingElement);
      break;
    case 71:
      tocar(trilha72);
      break;
    case 75:
      tocar(trilha75);
      break;
    case 98:
      tocar(trilhaFinal);
      toggleHide(tiroElement);
      break;
    case 99:
      toggleHide(tiroElement);
      break;
  }
}

function mostrarOpcao(opcao) {
  return opcao.checarEstado == null || opcao.checarEstado(estado);
}

function toggleHide(element){
  element.classList.toggle('hide');
}

function ativarEstado(element){
  if (!element.classList.contains('ativo')){
    element.classList.toggle('ativo');
}
}

function desativarEstado(element){
  if (element.classList.contains('ativo')){
    element.classList.toggle('ativo');
}
}

function selecionouOpcao(opcao) {
  fadeOut(containerTextoElement, 2);
  fadeOut(containerEsquerdaElement, 2);
  setTimeout(function () {
    const proximoFragmentoDeTextoId = opcao.proximoTexto;
    estado = Object.assign(estado, opcao.definirEstado);
    mostrarTexto(proximoFragmentoDeTextoId);
    if (opcao.ativar != undefined){
      opcao.ativar();
    };
    if (opcao.desativar != undefined){
      opcao.desativar();
    };
  }, 2000);
}

function tocar(musica) {
  musica.play();
}

function parar(musica){
  musica.pause();
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
    texto: `...if there's a day I never imagined living, this is definitely it...


    ...how long have I been walking?...
    If my feet could answer that question they'd say, "FOR TOO LOOOONG!"
    
    `,
    opcoes: [
      {
        texto: 'keep walking',
        ativar: function(){
          ativarEstado(tired);
        },
        proximoTexto: 4,
      },
    ],
  },
  {
    id: 4,
    texto: `...well, I think I've walked far enough not to go back...

    ...at least not tonight...`,
    opcoes: [
      {
        texto: 'keep walking',
        proximoTexto: 5,
      },
    ],
  },
  {
    id: 5,
    texto: `...what am I doing?



    ...where am I going?!




    `,
    opcoes: [
      {
        texto: `...can't answer, can't stop..`,
        proximoTexto: 6,
        toggleEstado: function(){
          toggleAtivo(fear);
        },
      },
    ],
  },
  {
    id: 6,
    texto: `...dear God...I think I need to catch my breath....`,
    opcoes: [
      {
        texto: 'stop for a while',
        desativar: function(){
          desativarEstado(tired);
        },
        proximoTexto: 8,
      },
      {
        texto: 'keep walking',
        proximoTexto: 7,
      },
    ],
  },
  {
    id: 7,
    texto: `...just gotta keep going...don't overthink this...just walk...
    `,
    opcoes: [
      {
        texto: 'hum a song and keep going',
        proximoTexto: 10,
      },
    ],
  },
  {
    id: 8,
    texto: `...I'm not that young anymore... this body is so...

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
    
    ...maybe I should just go back...I can deal with it...I can solve this latest mess...as I always do....
    ...I don't know... I guess I could...
    `,
    opcoes: [
      {
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
    texto: `...I guess I could solve the mess, once more, but I don't really want to...
    ...yeah, I don't want to...
    ...I don't want to...
    
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
    id: 11,
    texto: `...why?...ok...you miss her...you miss him...but he's not dealing with the problems he brought upon our family...and I'm tired...I'm tired of being the shield...I need space... `,
    opcoes: [
      {
        texto: 'what about her',
        proximoTexto: '11b',
      },
    ],
  },
  {
    id: '11b',
    texto: `...she's a resilient woman now...she'll understand...she'll be fine...I know it...I hope so...is it selfish to put myself first?...for once?...
    `,
    opcoes: [
      {
        texto: `...I don't know...`,
        proximoTexto: '11c',
      },
    ],
  },
  {
    id: '11c',
    texto: `...oh, the sound of the waves! Looks like I'm close to the beach! Ohh, that could be nice... an old hag like me skinny dipping in the dark!! hahahahaha...
    `,
    opcoes: [
      {
        texto: `...don't even dare the thought...`,
        ativar: function(){
          ativarEstado(fear);
        },
        proximoTexto: 13,
      },
    ],
  },
  {
    id: 12,
    texto: `...so many years I've spent with him, and now I just can't take it anymore...

    ...I just gotta put a stop to it...I've got nothing to do with all that...I just want to have a quiet life...
    
    ...oh, the sound of the waves! Looks like I'm close to the beach! Ohh, that could be nice... an old hag like me skinny dipping in the dark!! hahahahaha...
     
    `,
    opcoes: [
      {
        texto: `...don't even dare the thought...`,
        proximoTexto: 13,
      },
    ],
  },
  {
    id: 13,
    texto: `...what's that strange noise?...maybe it's just the wind...but it sounds creepier than that...

    ...dear God...creepy noises and this old woman all alone in the dark...who am I?! Not even when I was 15 did I do such things!
    
    ...oh fuck it! Holy shit! Now I'm swearing! I never swear.
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
    texto: `...it's probably the sound of something big being blown around by the wind...that could mean shelter for tonight...`,
    opcoes: [
      {
        texto: 'follow the wind sound',
        proximoTexto: 15,
      },
      {
        texto: `could be nice to check the sea.`,
        desativar: function(){
          desativarEstado(tired);
        },
        ativar: function(){
          ativarEstado(excited);
        },
        proximoTexto: 16,
      },
    ],
  },
  {
    id: 15,
    texto: `...I just wish I had a quiet and clean place to sit and put my feet up...but yeah... I guess even that's too much to ask for right now...

    ...I don't even know what time it is...
    
    `,
    opcoes: [
      {
        texto: 'guess what time it is',
        proximoTexto: 17,
      },
    ],
  },
  {
    id: 16,
    texto: `...oh yessss...the smell...the salt...oh my...it feels so good to be here...

    ...too dark to see anything...just a veil of moonlight... but ain't it something?...complete darkness and the mist of the waves sprinkling over me now and then...
    `,
    //!+EXCITED -TIRED
    opcoes: [
      {
        texto: 'stay a bit longer',
        proximoTexto: '16b',
      },
    ],
  },
  {
    id: '16b',
    texto: `...I'm always impressed by the strenght of the ocean...
    ...it comes and goes, making everything churn on the surface, but deep down it hosts this amazing party of invisible lives...
    
    ...it appears dark, but if I were a light little fish, I'd be just swimming  after some little plant...
    
    ...do fish eat plants?...
    `,
    opcoes: [
      {
        texto: 'answer',
        proximoTexto: '16c',
      },
    ],
  },
  {
    id: '16c',
    texto: `...I never really thought about what fish eat, I've always eaten them without considering what they, themselves eat...

    ...oh my...now I feel terrible about it...Jina's right, I don't need to eat these blessed animals...I can get by on plants and other things... well, changing my diet seems too much to think about when I don't even have a bed, or stove...
    `,
    opcoes: [
      {
        texto: 'keep searching for shelter',
        proximoTexto: 15,
      },
    ],
  },
  {
    id: 17,
    texto: `...time to find a place to spend the night...

    ...well, I'm not sure if I should be in a hurry for that, or if it just doesn't matter anymore...
    `,
    opcoes: [
      {
        texto: 'keep walking towards the noises',
        ativar: function(){
          ativarEstado(excited);
        },
        proximoTexto: 18,
      },
    ],
  },
  {
    id: 18,
    texto: `...anyway, the sound of the waves calmed me down a bit...

    (sigh)
    
    ...Seems like these creepy noises are coming from somewhere nearby, maybe they'll lead me to shelter...
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
    texto: `...dear God!... That's... that's the source of the noise? `,
    opcoes: [
      {
        texto: 'observe further',
        proximoTexto: 20,
      },
    ],
  },
  {
    id: 20,
    texto: `A ferris wheel!

    If there's one thing I didn't expect to see on such terrible day is a ferris wheel.
    
    (smiles briefly)
  
    ...in an amusement park...   
    ...how ironic.
    `,
    opcoes: [
      {
        texto: 'find the entrance to the park',
        ativar: function(){
          ativarEstado(tired);
        },
        proximoTexto: 21,
      },
      {
        //TODO + FEAR 
        texto: `"am I alone here?"`,
        definirEstado: { fear: true },
        proximoTexto: 22,
      },
    ],
  },
  {
    id: 21,
    texto: `...these damn feet hurt like hell...
    I've got to find the entrance... 
    
    Hmmm.. If the sea is that way, I should probably head the other way around. If I designed this park, I'd have a street-side entrance...that's where the cars would be, right? `,
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
    texto: `Oh, now that's one old entrance! No wonder the ferris wheel creeks so much...

    ...I like the feeling of it though...the orange and green paint job is a nice touch...
    
    ...I remember when I was a little girl and my dad would bring me to parks like these... and certainly I wasn't the only one having fun... the old man loved playing for prizes!
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
    ...if I could, I'd definitely choose to live again...
    (sigh)
    
    ok, so let me check if there's a way in.
    `,
    opcoes: [
      {
        texto: 'check the gate and see if it opens',
        desativar: function(){
          desativarEstado(excited);
        },
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
    texto: `...oh my, this park must be big, I've been walking around for a while...
    ...it's so dark in there, I'm not sure if there's a better way to get in other than that gate I saw...
    ...oh wait, there's a sign there...
    [ PRIVATE PROPERTY | DO NOT ENTER | MAD DOG ] 
    ...wow...didn't see that coming...
    ...it could be true, but it also could be just a sign to scare away people like me...`,
    opcoes: [
      {
        texto: 'go back to the gate and see if it opens',
        desativar: function(){
          desativarEstado(excited);
        },
        proximoTexto: 26,
      },
      {
        texto: `keep investigating`,
        proximoTexto: '25b',
      },
    ],
  },
  {
    //TODO [ [pass under the gates| frase seguinte na mesma tela, não leva a um novo lugar] ] uh... I don't think I'd be able to pass underneath it, I wouldn't fit...

    id: '25b',
    texto: `...there are some holes someone seems to have dug under these gates... I think they entered through those passages...

    ...but it's so dark in there... what the hell am I doing?`,
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
    
    ...this gate's all rusty, along with all the rest... It must be abandoned for a really long time...
    
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
    texto: `...this rusty noise is less creepy now... I don't know... but there's this energy in the air...

    ...I just can't tell if it's good or bad...
    `,
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
    ...it's all dark and abandoned, maybe there could be people inside... maybe it's that kind of place where people get murdered...maybe men hide there to awaken their shadows...

    ...but somehow this is not what I feel deep deep down... I'm not the bravest person when it comes to invading an abandoned amusement park in the middle of the night... and here I am.
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
    texto: `...ok...remember when you were a kid and invading Mrs. Figg's was a piece of cake?... Now, think, how would I enter Mrs. Figg's amusement park?

    ...no doorbells...there's only a chain and a lock...ok...I could try to break the chain...
    
    ...that's crazy...how am I supposed to do that?!
    `,
    opcoes: [
      {
        texto: 'try to find something to cut the chain',
        ativar: function(){
          ativarEstado(tired);
        },
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
    texto: `BUT WHERE???`,
    opcoes: [
      {
        texto: 'check the ticket booth',
        proximoTexto: 32,
      },
    ],
  },
  {
    id: 32,
    texto: `
    ...wow...to think that so many people spent their money here...

    ...I bet Tata would love to see this...

    ...looks like there's a door behind that faded elephant painting...`,
    opcoes: [
      {
        texto: 'open the door',
        ativar: function(){
          ativarEstado(excited);
        },
        proximoTexto: 33,
      },
    ],
  },
  {
    //TODO +EXCITED
    id: 33,
    texto: `...good Lord!...it's open!...

    ...oh my...entering an abandoned amusement park in the middle of a Tuesday night...WHO AM I?!
    
    ...what if there's someone inside?...shouldn't I have some kind of weapon to defend myself, just in case?...`,
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
    texto: `...holy Mary!...that's a gorgeous ferris wheel! It feels like a dream!...


    ...it's hypnotizing to watch...
    `,
    opcoes: [
      {
        texto: `contemplate the ferris wheel`,
        proximoTexto: 38,
      },
      {
        texto: `take a walk around`,
        desativar: function(){
          desativarEstado(fear);
        },
        proximoTexto: 39,
      },
    ],
  },
  {
    id: 35,
    texto: `...I'm too distracted for a woman alone in the dark...
    ...there were some stones close to the gate...they were probably part of the wall...I remember seeing some painting on it...
    ...oh, there's also this piece of iron from the gate on the floor... won't do much, but it might be a bit more terrifying than just me...`,
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
    texto: `...it's a bit heavy, but I can throw at anyone who dares interrupt my journey tonight...
    `,
    opcoes: [
      {
        texto: 'take a walk in the park',
        desativar: function(){
          desativarEstado(fear);
        },
        proximoTexto: 39,
      },
    ],
  },
  {
    //TODO - FEAR + EXCITED IRON BAR
    id: 37,
    texto: `...if I hit someone with this it'll probably bend and do no harm...but at least they'll get a piece of me, anyway...I'm more than just an old hag...I'M AN OLD HAG WITH AN IRON BAR!...
    `,
    opcoes: [
      {
        texto: 'take a walk in the park',
        desativar: function(){
          desativarEstado(fear);
        },
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
        desativar: function(){
          desativarEstado(fear);
        },
        proximoTexto: 39,
      },
    ],
  },
  {
    id: 39,
    texto: `...I guess this wide street will take me to the ferris wheel...
    ...hmmm...there's also this little stone path on the right...looks like somewhere over the rainbow...maybe it will take me somewhere nice...well...back in the days I'd say so, tonight I'm not so sure...
    
    `,
    opcoes: [
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
    id: 43,
    texto: `...this park must have been beautiful back in the old days...all these stands...bet there were fishing, shooting, and ring throwing stands...
    ...oh look...in that one there are still some teddy bears...oh my dear God...that looks a bit creepy and sad...
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
    texto: `...I feel butterflies in my stomach just watching it... Jina would love it...
    ...WHAT'S THAT SOUND?!
    ...I can't see anyone...I don't see anything different...Oh god oh god oh god...
    `,
    opcoes: [
      {
        texto: 'go down the stone path',
        proximoTexto: 46,
      },
    ],
  },
  {
    id: 46,
    //TODO +FEAR
    texto: `...all these weeds taking over the path...so beautiful...so calm...and...this cobblestone way reminds me of Yota...we'd walk to school everyday and he had this bag with wheels...instead of just carrying it, he'd just pull it on the stones and the noise was just so loud!...hahahahaha....oh my...such a stubborn little brat...I miss him...
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
    texto: `...there are so many bottles on the floor... this is, or was, a place for people to gather and have some drinks...oh...well, for me it would be drinks....but people these days do all kinds of things...I don't even know what it could be now...

    ...hmmm...it doesn't smell good here...and I just wanted a quiet and clean place...what a luxury!...
    ...there's something ahead...
       `,
    opcoes: [
      {
        texto: 'move carefully towards it',
        proximoTexto: 48,
      },
    ],
  },
  {
    id: 48,
    // TODO +EXCITED
    texto: `...seems like there's anyone here either...oh my...I'm lucky I guess...at least this!...

    ...it's some kind of house I guess...wait...there's something written there...I can't see...
    `,
    opcoes: [
      {
        texto: 'approach to read',
        proximoTexto: 49,
      },
      {
        texto: 'take a walk around it first',
        proximoTexto: '48b',
      },
    ],
  },
  {
    id: '48b',
    texto: `...it's a big place...seems completely abandoned...there are many bronken windows around here...
    `,
    opcoes: [
      {
        texto: 'move on',
        proximoTexto: '49b',
      },
    ],
  },
  {
    id: '49b',
    texto: `...these windows are so dusty it's difficult to see inside...but looks like there's some old furniture...actually they are pretty stylish...must have been another atraction of the park...
    `,
    opcoes: [
      {
        texto: 'check the door in the back',
        proximoTexto: '49c',
      },
    ],
  },
  {
    id: '49c',
    texto: `...a backyard with what should have been a garden...let me check if this door is open...yes...it is...ok...walk in carefully...you can do this...
    `,
    opcoes: [
      {
        texto: 'get in',
        proximoTexto: '49d',
      },
    ],
  },
  {
    id: '49d',
    texto: `...look at this creepy little hall we have here...better not scare me more than this, my darling...oh my...so many mirrors all around...some of this dust looks fake though...
    `,
    opcoes: [
      {
        texto: '...is this a horror hotel?..',
        proximoTexto: '49e',
      },
    ],
  },
  {
    id: '49e',
    texto: `...some tarnished machines in the corner holding some old puppets...oh they look sad and defeated...yeah boys, momma understands you...momma really does...
    `,
    opcoes: [
      {
        texto: '...is that a kitchen?..',
        proximoTexto: 53,
      },
      {
        texto: '...is that a living room?..',
        desativar: function(){
          desativarEstado(tired);
        },
        proximoTexto: 52,
      },
    ],
  },
  {
    id: 49,
    texto: `[ HOTEL ]
    ...oh dear...it's a hotel!...
    
    ...hahahaha...it must be a scary one...I can't imagine better scenery for it...this gives me the creeps...
    ...but yeah...could be a good shelter...gee!...really?...a haunted house as my shelter?...my life is becoming a joke...
     `,
    opcoes: [
      {
        texto: `check if it's open`,
        proximoTexto: 50,
      },
    ],
  },
  {
    //! +FEAR +EXCITED
    id: 50,
    texto: `...why does every creepy hotel have a huge staircase in the front?...probably for people to trip and fall on their necks and, bye bye!...guess so...damn, my feet hurt...

    ...ok old door...let's see if you open...don't you dare stand in my way...
    
    ...yes! my lovely vintage door! open to momma! momma loves you too... hell yeah...let's see what I can find in here...
    
     `,
    opcoes: [
      {
        texto: `enter hotel`,
        proximoTexto: 51,
      },
      {
        texto: `...I'm not ready for that yet...`,
        proximoTexto: '48b',
      },
    ],
  },
  {
    id: 51,
    texto: `...look at this is a creepy little hall we have here...better not scare me more than this, my darling...oh my...so many mirrors all around...don't I look like I've had a bad day?...hahahaha...it's so bad that it's even funny...

    ...some tarnished machines in the corner holding some old puppets...oh they look sad and defeated...yeah boys, momma understands you...momma really does...
     `,
    opcoes: [
      {
        texto: `...is that a kitchen?..`,
        proximoTexto: 53,
      },
      {
        texto: `...is that a living room?..`,
        proximoTexto: 52,
      },
    ],
  },
  {
    id: 52,
    texto: `...oh dear Lord...oh my dear dear dear God...I can't believe there's a couch here...yes oh yes!..lemme try it...ohhh it's sleepable and restable...do those words even exist?...I have a dirty smelly couch to spend the night on... 

    ...it's warm in here and doesn't feel like anyone has been visiting this place...I think I'm safe...holy Mary...I think I'm safe...
     `,
    opcoes: [
      {
        texto: `...is that a kitchen?..`,
        proximoTexto: 53,
      },
      {
        texto: `...is that the backyard?..`,
        proximoTexto: 55,
      },
    ],
  },
  {
    
    //! -HUNGRY
    //! +EXCITED
    //! -FEAR
    id: 53,
    texto: `...a real kitchen in a fake hotel?!..how is that even possible? ...I've always thought haunted houses were just theater...well...seems like I got that one wrong...

    ...it's dusty but there's a tap there...imagine if there's water...lemme check it...HOLY! there's water...ok...brown water, but I'll leave it open to let it wash itself out...
     `,
    opcoes: [
      {
        texto: `open cupboards`,
        proximoTexto: 54,
      },
    ],
  },
  {
    id: 54,
    //! +EXCITED -FEAR
    texto: `...nothing here...oh, dead cockroaches...rat poop...wait...there's something at the back there...

    ...momma oh holy momma!!! ain't that some canned food?!...they should make a reality show out of my mad adventure right now...momma is giving a little food dance to y'all!..aham...oh yeah...all right!...
    
     `,
    opcoes: [
      {
        texto: `...is that a living room?..`,
        proximoTexto: 52,
      },
      {
        texto: `...is that the backyard?..`,
        proximoTexto: 55,
      },
    ],
  },
  { id: 55,
    texto: `...ahhh...feels good to get some fresh air now that I have a place to stay...I just need to keep focused in my goal...hmmm...which is...hmmm...not to go back...yes...can't go back...swear to me you won't go back momma...you won't go back...

    ...look at this sky...the stars are watching you...they hear you...you won't go back...you'll find your own way...your own life...you'll get it together...
    
     `,
    opcoes: [
      {
        //!SOM DE MAQUINA LIGANDO
        texto: `a loud thud breaks silence`,
        desativar: function(){
          desativarEstado(excited);
        },
        ativar: function(){
          ativarEstado(fear);
        },
        proximoTexto: 56,
      },
    ],
  },
  {
    id: 56,
    //! +FEAR
    texto: `...what the heck was that?!?!...
    ...I should've known it was too early to celebrate safety...
    
    ...think momma...think...pretend you're braver than you are...what are you gonna do?!...`,
    opcoes: [
      {
        texto: `find the source of the noise`,
        proximoTexto: 60,
      },
      {
        texto: `....I'm not moving a finger...`,
        proximoTexto: 57,
      },
    ],
  },
  { id: 57,
    texto: `...boy oh boy...what the heck is this sound?...it's somewhere close to here but I don't think it's in the hotel...at least that much...but it could come for me, yes...but I'm better off here than anywhere else...just keep on minding your own business and let this loud noise die on its own...

    ...it's gonna be fine...we'll be fine, momma...
    
     `,
    opcoes: [
      {
        texto: `...not going out there...`,
        proximoTexto: 58,
      },
    ],
  },
  { 
    id: 58,
    //! +FEAR
    texto: `----sound is super loud and continuous-----

    ...it's not gonna stop...this noise is not gonna stop...what if it's a mad guy with a chainsaw, momma's gonna be in pieces in a blink of an eye...dear God...
    
    ...it's a machine...it's definitely a machine...maybe I should get inside and find a place to hide...
    
     `,
    opcoes: [
      {
        texto: `...but how will I sleep?..`,
        proximoTexto: 59,
      },
    ],
  },
  { 
    id: 59,
    texto: `...how will I sleep knowing there's something out there?..or someone...or some mad thing...or what if there are people coming at night for secret rituals and they find me at the climax of their crazy dances!?..

    ...ohhh my my...momma's gotta see with her own eyes..yes...I gotta get a peek at it...to know what I'm up against...yes...this is what they'd do in the movies...so I'm doing it too...
     `,
    opcoes: [
      {
        texto: `listen to sound and follow it`,
        proximoTexto: 60,
      },
    ],
  },
  { 
    id: 60,
    texto: `...step by step...slowly...yes...slowly...

    ...holy! what was that?...was that a person?..I think I saw someone moving out there...oh my...
    
    ...could have been a bird or a cat too...yeah, probably a cat hunting something for the night, yeah...
    `,
    //! +FEAR
    opcoes: [
      {
        texto: `carefully move towards the sound`,
        proximoTexto: 61,
      },
    ],
  },
  { 
    id: 61,
    texto: `...I'm getting closer to it...sounds like a machine that's turned on...like an old fridge...but why would a machine start up in the middle of the night?...maybe it's just some old electric system...

    ...oh dear God...there's light on the opposite side of the ferris wheel... oh my oh my...there's definitely something going on over there...`,
    //! +FEAR
    opcoes: [
      {
        texto: `stay firm and move on`,
        proximoTexto: 62,
      },
    ],
  },
  { 
    id: 62,
    texto: `...it's an old stand...I can see light under the awning...it's definitely on and...is it working?!
    ...what if it's working..there's probably someone there!..
    
    ...there's this other sound though...I don't reckon it...
    `,
    //! +FEAR
    opcoes: [
      {
        texto: `approach carefully`,
        proximoTexto: 63,
      },
    ],
  },
  { 
    id: 63,
    texto: `...oh...it's an old shooting stand!...it looks just like they did in the old days...there are the tracks where the targets should be...I used to watch my dad shoot clowns...it looks empty though...yes...should I say something out loud?..or shout?...oh my...I don't dare do it...

    `,
    opcoes: [
      {
        texto: `observe the stand`,
        proximoTexto: '63b',
      },
    ],
  },
  { 
    id: '63b',
    texto: `...it looks beautiful, actually...there's some nostalgia to it...these faded colors, these hooks for the prizes on the wall...these stools to aim and shoot...

    ...my oh my...why are you working, my dear?...
    
    `,
    opcoes: [
      {
        texto: `look around`,
        proximoTexto: '64',
      },
      {
        texto: `try to enter in there`,
        proximoTexto: 65,
      },
    ],
  },
  { 
    id: 64,
    texto: `...there must be someone around here who turned this thing on?...

    ...oh! there's that weird sound again!...it's like a voice...yes...is it laughing?...
    `,
    opcoes: [
      {
        texto: `looks carefully at the tracks`,
        proximoTexto: 66,
      },
    ],
  },
  { 
    id: 65,
    texto: `----thinking if she can jump or if there's another way----

    ----sound again, a laughter?-----
    ----new sound together - target raising and moving-----
    
    
    ...I can't jump over the counter...not gonna happen...what if I trip and break a leg here...oh my---my stomach just churned---what is this noise?
    
    `,
    opcoes: [
      {
        texto: `looks at the tracks`,
        proximoTexto: 66,
      },
    ],
  },
  { 
    id: 66,
    texto: `...where is this laughter coming from?! it's creepy! there's nobody around here! I can't see anything!...

    ...another noise--wait, there's something moving on the tracks...is it...is it...it is...it is a target...rising on the top track...holy Mary!...it's a wooden target moving from side to side...and there's a painting on it---    
    `,
    opcoes: [
      {
        texto: `look quickly around you`,
        proximoTexto: 67,
      },
    ],
  },
  { 
    id: 67,
    texto: `...it's a shape of a human figure...yeah...it looks like a man smirking at me...oh my...he's definitely smirking at me...actually...his eyes...there's something in them...they look...they seem...they're staring at me...
    `,
    //! +FEAR
    opcoes: [
      {
        texto: `what the hell?!`,
        proximoTexto: 68,
      },
    ],
  },
  { 
    id: 68,
    texto: `...oh...it sounds like he's laughing...the sound of laughter...what?!...am I losing it?...

    ...I see nothing else illuminated though...and I get the sense that the figure is really interested in me...
    
    `,
    //! +FEAR
    opcoes: [
      {
        texto: `paralyzed`,
        proximoTexto: 69,
      },
    ],
  },
  { 
    id: 69,
    texto: `...his eyes are focused on me as he moves from left to right, from right to left...the machine is working as if it's just another normal night at the carnival...

    ...wait a minute...
    
    ...this guy on the painting actually seems familiar to me...    
    `,
    opcoes: [
      {
        texto: `...is it possible?..`,
        proximoTexto: 70,
      },
    ],
  },
  { 
    id: 70,
    texto: `...no way...it really looks like him...but no...it couldn't be...how could this pig appear like this?!...why does this pig never leave me be?!

    ...I'm losing it...I'm losing it...    
    `,
    //! +FEAR
    opcoes: [
      {
        texto: `what does this mean?`,
        proximoTexto: 71,
      },
    ],
  },
  { 
    id: 71,
    texto: `it's him it is it's definitely him I don't know if this is my mind playing tricks on me or if I'm dreaming or whatever the fuck this is I just can't believe I'm facing this pig tonight today what is going on what the hell is going on I look around but I see nothing alive but I see a target in an old shooting stand that resembles oh resembles ahh I can't really breathe I oh my I yeah I should I don't hmm what is I just I was so young I didn't I never told I can't believe 
    `,
    opcoes: [
      {
        texto: `go back to hotel`,
        ativar: function(){
          ativarEstado(tired);
        },
        proximoTexto: 72,
      },
      {
        texto: `can't move`,
        proximoTexto: 73,
      },
    ],
  },
  { 
    id: 72,
    //! + TIRED
    texto: `I'm gonna go back to hotel yes I will stay there I can just go and sleep or wake up I don't know this must be a nightmare yes a nightmare a girl I was and wait is it screaming it is it is screaming or smirking I don't know that pig dares to interact with me that pig dares to I won't I'm not and A girl I won't Wait What there's something Oh I didn't see that before What there is something yes on the counter yes there is something just appeared out of the blue oh my out of the blue    
    `,
    opcoes: [
      {
        texto: `what is it?`,
        ativar: function(){
          ativarEstado(excited);
        },
        proximoTexto: 74,
      },
    ],
  },
  { 
    id: 73,
    texto: `I can't move no I can't feel my body I've felt this before I couldn't do anything I was weak I oh Lord no yes I couldn't oh that pig he's gotta pay for it he will pay for it I am not leaving it this time no I know you pig I do know you and I am what wait there's something oh I didn't see that before what there is something yes on the counter yes there is something just appeared out of the blue oh my out of the blue
    `,
    opcoes: [
      {
        texto: `what is it?`,
        ativar: function(){
          ativarEstado(excited);
        },
        proximoTexto: 74,
      },
    ],
  },
  { 
    id: 74,
    texto: `it's glowing oh yes was not there before the gun oh in a shooting stand shotgun and this pig is laughing harder shotgun to shoot oh I can feel it calling it is calling me yes he smirkes he challenges and he doesn't think I can but I was sleeping back then and I couldn't sleep later now I still can't and here I am with a shotgun calling me and a pig smirking it is him yes it is a shotgun yes it is a shooting stand and I'm a clown in a freaky circus a clown oh no can't laugh what is this place no no no not abandoned all dark but alive
    `,
    //!+EXCITED
    opcoes: [
      {
        texto: `grab shotgun`,
        ativar: function(){
          ativarEstado(gun);
        },
        proximoTexto: 75,
      },
    ],
  },
  { 
    id: 75,
    texto: `whoever is doing this to me wants me to shoot at this pig yes it is staring at me provoking I remember the nights I remember I don't want to and it moves like all of them moves nothing stops nothing stops pigs all of you pigs disgusting nothing stops

    `,
    //!+ANGRY
    opcoes: [
      {
        texto: `I cant stop it`,
        proximoTexto: 76,
      },
    ],
  },
  { 
    id: 76,
    texto: `I can stop it now it is just a wooden board but yeah I can stop it no smirking no I can stop it you laugh keep laughing I CAN STOP YOU YES I CAN STOP YOU 
    `,
    opcoes: [
      {
        texto: `you little shit`,
        desativar: function(){
          desativarEstado(tired);
        },
        desativar: function(){
          desativarEstado(fear);
        },
        proximoTexto: 77,
      },
    ],
  },
  { 
    id: 77,
    //!+EXCITED -FEAR -TIRED
    texto: `shotgun in my hands feels good it is warm it is cozy I feel I've shot before yes it is cozy keep smirking I am cozy
    `,
    opcoes: [
      {
        texto: `shoot at once`,
        proximoTexto: 80,
      },
      {
        texto: `...I can't shoot at it...`,
        proximoTexto: 78,
      },
    ],
  },
  { 
    id: 78,
    texto: `trigger just press the trigger do it why not do it for all those nights for you do it trigger just press the trigger
    `,
    opcoes: [
      {
        texto: `...I can't...`,
        proximoTexto: 79,
      },
    ],
  },
  { 
    id: 79,
    texto: `you can you have to you are not the only one he is not the only one for all girls for your daughter yes for her these pigs can't live you can stop it shoot just shoot 
    `,
    //! + EXCITED + TIRED
    opcoes: [
      {
        texto: `shoot at once`,
        proximoTexto: 80,
      },
    ],
  },
  { 
    id: 80,
    texto: `shit I missed it fuck it shoot I missed it but just shoot
    `,
    //! + ++EXCITED
    opcoes: [
      {
        texto: `shoot again`,
        proximoTexto: 81,
      },
    ],
  },
  { 
    id: 81,
    texto: `no I missed it again my hands are shaking shit can't control my mind no girl I see you yes stop him yes stop him with my own hands you keep smirking

    `,
    //! + ++EXCITED
    opcoes: [
      {
        texto: `shoot`,
        proximoTexto: 82,
      },
    ],
  },
  { 
    id: 82,
    texto: `YES! 
    Smirk now! 
    SMIRK YOU PIG! 
    Fall and stay there forever!...
    
    ...catch my breath...
    `,
    opcoes: [
      {
        texto: `silence`,
        proximoTexto: 83,
      },
    ],
  },
  { 
    id: 83,
    texto: `...just breathe...

    `,
    opcoes: [
      {
        texto: `what now?`,
        ativar: function(){
          ativarEstado(tired);
        },
        desativar: function(){
          desativarEstado(excited);
        },
        proximoTexto: 84,
      },
    ],
  },
  { 
    id: 84,
    //!+TIRED -EXCITED

    texto: `...is it over?...

    ...I'm exhausted...

    `,
    opcoes: [
      {
        texto: `go to hotel?`,
        proximoTexto: 85,
      },
    ],
  },
  { 
    id: 85,
    //!+TIRED

    texto: `...I remember now that sentence at the entrance...you only live once...(sighs)...I feel like this is my third though...I need to lie down...

    ...more noises?...sounds like the machine is turning on again...I have to see...what if...oh just look...no...another target is rising...smirking...it's different...
    
    `,
    opcoes: [
      {
        texto: `but...wait...is that...?`,
        proximoTexto: 86,
      },
    ],
  },
  { 
    id: 86,
    //!+EXHAUSTED

    texto: `...there are two of them now!...but wait...it's that same pig!..but there's...it's...one of them is on a red wooden board and he's creepier than the other one...despicable...I just wanna destroy all of these pigs they mess with my liver it's all acid I'm blind and this red it's different it's alive I can tell I can feel it
    
    `,
    opcoes: [
      {
        texto: `smirk`,
        proximoTexto: 87,
      },
    ],
  },
  { 
    id: 87,
    texto: `no need for sense just shoot

    `,
    opcoes: [
      {
        texto: `shoot red target`,
        proximoTexto: 89,
      },
      {
        texto: `shoot same target as before`,
        proximoTexto: 88,
      },
    ],
  },
  { 
    id: 88,
    texto: `oh no I

    I...
    
    I shot the red one
    `,
    opcoes: [
      {
        texto: `deep silence`,
        desativar: function(){
          desativarEstado(gun);
        },
        proximoTexto: 90,
      },
    ],
  },
  { 
    id: 89,
    texto: `....
    `,
    opcoes: [
      {
        texto: `deep silence`,
        desativar: function(){
          desativarEstado(gun);
        },
        proximoTexto: 90,
      },
    ],
  },
  { 
    id: 90,
    texto: `....
    `,
    opcoes: [
      {
        texto: `...it's painful...`,
        proximoTexto: 91,
      },
    ],
  },
  { 
    id: 91,
    texto: `....
    `,
    opcoes: [
      {
        texto: `...oh...I think I'm lying on the floor...
        `,
        proximoTexto: 92,
      },
    ],
  },
  { 
    id: 92,
    texto: `...what happened?...I'm on the floor...for how long?...was I dreaming?...look around...go..look...oh my...I'm in that park...ferris wheel...shooting stand...I guess I need to get up...AY!...painful...get up...you gotta see it...
    `,
    opcoes: [
      {
        texto: `get up
        `,
        proximoTexto: 93,
      },
    ],
  },
  { 
    id: 93,
    texto: `...it's empty...it looks normal...they're not there though...oh...the tracks...there's something there...is it blood?...a thin trickle of blood is running down to the floo----a pool of blood...dear God!...it's a pool of blood!...pieces of wood all over...drenched in blood...
    `,
    opcoes: [
      {
        texto: `hold scream
        `,
        ativar: function(){
          ativarEstado(fear);
        },
        proximoTexto: 94,
      },
    ],
  },
  { 
    id: 94,
    texto: `...what is going on?...

    `,
    // ! +FEAR
    opcoes: [
      {
        texto: `machine turns on again
        `,
        ativar: function(){
          ativarEstado(gun);
        },
        proximoTexto: 95,
      },
    ],
  },
  { 
    id: 95,
    texto: `...it can't be...this machine is never gonna sto----it's a different figure and----oh----my legs...I'm weak...it's not just one...there are many of them...I don't know if I should look---uncle?...Pastor John?...that boy...from the neighbourhood----it's horr---
    `,
    // ! +FEAR +TIRED
    opcoes: [
      {
        texto: `all men?`,
        proximoTexto: 96,
      },
    ],
  },
  { 
    id: 96,
    texto: `so much pain weaker and weaker but
    `,
    // ! +TIRED
    opcoes: [
      {
        texto: `they need to be stopped--I need...`,
        ativar: function(){
          ativarEstado(excited);
        },
        proximoTexto: 97,
      },
    ],
  },
  { 
    id: 97,
    texto: `-----picks up shotgun...she will never tolerate such pigs in her life ever again!!!!

    SHOTGUN
    COZY
    STOP
    SHOOT    
    `,
    // ! +++EXCITED+++++TIRED
    opcoes: [
      {
        texto: `SHOOOOOOOOOOOOOOOOOOOOOT THEM ALLLLLLLL!!!!`,
        proximoTexto: 98,
      },
    ],
  },
  { 
    id: 98,
    texto: `!!!!!!!`,
    opcoes: [
      {
        texto: `to be continued...`,
        proximoTexto: 99,
      },
    ],
  },
  { 
    id: 99,
    texto: `   
    don't worry, it's just a game.`,
    opcoes: [
      {
        //!piscar essa frase e apagar tudo
        texto: `Restart`,
        proximoTexto: 3,
      },
    ],
  },
];

export { novoJogo };
