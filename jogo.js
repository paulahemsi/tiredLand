const textoElement = document.querySelector("#text");    
const botoesElement = document.querySelector("#option-buttons");

//objeto que guarda estato da personagem
let estado = {};

function novoJogo(){
    estado = {};
    mostrarTexto(1);
}

function mostrarTexto(indexFragmentosDeTexto) {
    //O método find() retorna o valor do primeiro elemento do array que satisfizer a função de teste provida. Caso contrario, undefined é retornado.
    // const texto = fragmentosDeTexto.find(callback(element[, index[, array]])[, thisArg])
    const texto = fragmentosDeTexto.find(fragmentosDeTexto => fragmentosDeTexto.id === indexFragmentosDeTexto);
    textoElement.innerText = texto.texto;
    while (botoesElement.firstChild){
        botoesElement.removeChild(botoesElement.firstChild);
    }

    texto.opcoes.forEach(opcao => {
        if (mostrarOpcao(opcao)){
            const botao = document.createElement('button');
            botao.innerText = opcao.texto;
            botao.classList.add('btn');
            botao.addEventListener('click', function selecionou() {
                selecionouOpcao(opcao);
            })
            botoesElement.appendChild(botao);
         }
    })
}

function mostrarOpcao(opcao){
    return opcao.condicao == null || opcao.condicao(estado);
}

function selecionouOpcao(opcao){
    const proximoFragmentoDeTextoId = opcao.proximoTexto;
    estado = Object.assign(estado, opcao.definirEstado);
    mostrarTexto(proximoFragmentoDeTextoId);
}

const fragmentosDeTexto = [
    {
        id: 1,
        texto: 'Em uma das noites de sua fuga, ela estava seguindo pela praia, quando começou a ouvir uns rangidos bem alto e próximo a ela. Talvez o vento estivesse trazendo aquele som como uma pista a ser seguida? Um abrigo para mais uma noite sem rumo?',
        opcoes: [
            {
                texto: 'seguir os rangidos',
                definirEstado: { medo: true },
                proximoTexto: 2,
            },
            {
                texto: 'ir para a praia',
                proximoTexto: 2,
            },
        ],
    },
    {
        id: 2,
        texto: 'Ao seguir os sons de máquina quando sofre, ela se deparou com um lugar abandonado. Um parque de diversões antigo e desativado. Havia uma roda-gigante no centro, rangendo e movendo um pouco pra lá e pra cá de acordo com o vento. Nas ruas de acesso a ela, tinham barracas vazias, umas com brinquedos de pelúcia com a espuma exposta, sujos, tristes? Ainda assim, ela achou aquilo engraçado. Como pode ter encontrado um lugar desses?',
        opcoes: [
            {
                texto: 'dar alguns passos atrás e voltar para casa (e pegar uma pedra no chão, just in case...)',
                condicao: function verificarEstado(estadoAtual) { 
                    return estadoAtual.medo;
                },
                definirEstado: { medo: false, pedra: true},
                proximoTexto: 3,

            },
            {
                texto: 'andar mais um pouco pelo parque (e ficar com o guarda-chuva na mão, just in case...)',
                condicao: function verificarEstado(estadoAtual) { 
                    return estadoAtual.medo;
                },
                definirEstado: { medo: false, guardaChuva: true},
                proximoTexto: 4,

            },
            {
                texto: 'curiosa, você começa a se embrenhar no parque',
                proximoTexto: 4,

            }
        ]
    },
    {
        id: 3,
        texto: 'Ao dar meia volta, você escuta um barulho de máquina ligando. Assustada, aguça seus sentidos para perceber de onde vem aquele barulho. “Será que tem alguém aqui?” ',
        opcoes: [
            {
                texto:'Você para e apura os ouvidos',
                proximoTexto: 5,
            },
            {
                texto:'Acho que é hora de dar meia volta...',
                proximoTexto: 4,
            },
            {
                texto:'Parece que o som vem da esquerda, você caminha tentando segui-lo',
                proximoTexto: 7,
            },
        ]
    },
    {
        id: 4,
        texto: 'Você descobre um hotel ”do horror”, ele tem camas, cozinha, alguns enlatados e água corrente. É possível ouvir o som do mar.',
        opcoes: [
            {
                texto:'Que agradável... você resolve passar alguns dias ali',
                proximoTexto: 5,
            },
            {
                texto:'Continua andando pelo parque',
                proximoTexto: 3,
            },
        ]
    },
]

novoJogo();