var inimigos = [];
var inimigosMedio = [];
var inimigosAlto = [];
var larguraInimigos = 35;
var alturaInimigos = 65;
var eixoBaixo;
var eixoMedio;
var eixoAlto;
var pontos = 0;
var miraCursor;
var miraCursor2;

function preload() {
    miraCursor = loadImage("./mira.png");
    miraCursor2 = loadImage("./mira2.png");
}

function setup() {
    rectMode(CENTER);
    var canvas = createCanvas(windowWidth, windowHeight);
    var p5 = document.querySelector(".p5");
    canvas.parent(p5);
    noCursor();
    eixoBaixo = createVector(width, height / 1.2);
    eixoMedio = createVector(width, height / 2);
    eixoAlto = createVector(width, height / 5);
    novoInimigo(eixoMedio);
    novoInimigo(eixoAlto);
    novoInimigo(eixoBaixo);
}

function criarEixos() {
    strokeWeight(1.5);
    line(0, eixoBaixo.y, width, eixoBaixo.y);
    line(0, eixoMedio.y, width, eixoMedio.y);
    line(0, eixoAlto.y, width, eixoAlto.y);
}

function draw() {
    background(220);
    criarEixos();
    for (let i = 0; i < inimigos.length; i++) {
        inimigos[i].mostrar();
        inimigos[i].mover();
        if (inimigos[i].saiuDaTela()) {
            destruirInimigo(i);
        }
    }

    acrescentarInimigos();
    verificarEixos();
    mira();
}

function mira() {

    imageMode(CENTER);
    image(miraCursor, mouseX, mouseY, 65, 65);
    // noFill();
    // circle(mouseX, mouseY, 35);
    // circle(mouseX, mouseY, 25);
    // circle(mouseX, mouseY, 15);
    // circle(mouseX, mouseY, 5);
    for (let i = 0; i < inimigos.length; i++) {
        if (inimigos[i].mirando(mouseX, mouseY)) {
            image(miraCursor2, mouseX, mouseY, 65, 65);

            //       fill(255, 0, 0);
            //       push();
            //       stroke(255, 0, 0);
            //       circle(mouseX, mouseY, 5);
            //       pop();
        }
    }
}

function acrescentarInimigos() {
    for (let i = 0; i < inimigos.length; i++) {
        if (inimigos[i].x == width / 1.5) {
            if (inimigos[i].eixo === eixoBaixo) {
                novoInimigo(eixoBaixo);
            } else if (inimigos[i].eixo === eixoMedio) {
                novoInimigo(eixoMedio);
            } else if (inimigos[i].eixo === eixoAlto) {
                novoInimigo(eixoAlto);
            }
        }
    }
}

function novoInimigo(eixo) {
    let inimigo = new Inimigo(eixo);
    inimigos.push(inimigo);
}

function destruirInimigo(i) {
    inimigos.splice(i, 1);
}

function verificarEixos() {

    //   for (let i = 0; i < inimigos.length; i++) {

    //   (inimigos[i].eixo === eixoAlto);
    //     if (inimigos[i].eixo) {
    //     novoInimigo(eixoMedio);
    //     novoInimigo(eixoAlto);
    //     novoInimigo(eixoBaixo);
    //   }
}


function mousePressed() {
    for (let i = 0; i < inimigos.length; i++) {
        if (inimigos[i].mirando(mouseX, mouseY)) {
            novoInimigo(inimigos[i].eixo);
            destruirInimigo(i);
        }
    }
}

class Inimigo {

    constructor(eixo) {
        this.eixo = eixo;
        this.x = eixo.x;
        this.y = eixo.y;
        this.yEixo = eixo.y;
        this.velocidadeX = 1;
        this.velocidadeY = 1;
        this.r = larguraInimigos;
    }

    mostrar() {
        rectMode(CENTER);
        noFill();
        rect(this.x, this.y, larguraInimigos, alturaInimigos);
    }

    mover() {
        this.x -= this.velocidadeX;
        this.y += this.velocidadeY;
        if ((this.y >= this.yEixo + 20) || (this.y <= this.yEixo - 20)) {
            this.velocidadeY *= -1;
        }
    }

    saiuDaTela() {
        return (this.x < 0 - this.r / 2);
    }

    mirando(mousex, mousey) {
        let distancia = dist(mousex, mousey, this.x, this.y);
        return (distancia < 65 / 2);
    }

}