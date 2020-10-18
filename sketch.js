var tiro = function(p) {

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

p.preload = function() {
    miraCursor = p.loadImage("./mira.png");
    miraCursor2 = p.loadImage("./mira2.png");
}

p.setup = function () {
    p.rectMode(p.CENTER);
    var canvas = p.createCanvas(600, 600);
    // var p5 = document.querySelector(".tiro");
    // canvas.parent(p5);
    p.noCursor();
    eixoBaixo = p.createVector(p.width, p.height / 1.2);
    eixoMedio = p.createVector(p.width, p.height / 2);
    eixoAlto = p.createVector(p.width, p.height / 5);
    novoInimigo(eixoMedio);
    novoInimigo(eixoAlto);
    novoInimigo(eixoBaixo);
}

function criarEixos() {
    p.strokeWeight(1.5);
    p.line(0, eixoBaixo.y, p.width, eixoBaixo.y);
    p.line(0, eixoMedio.y, p.width, eixoMedio.y);
    p.line(0, eixoAlto.y, p.width, eixoAlto.y);
}

p.draw = function() {
    p.background(220);
    criarEixos();
    for (let i = 0; i < inimigos.length; i++) {
        inimigos[i].mostrar();
        inimigos[i].mover();
        if (inimigos[i].saiuDaTela()) {
            destruirInimigo(i);
        }
    }

    acrescentarInimigos();
    mira();
}

function mira() {

    p.imageMode(p.CENTER);
    p.image(miraCursor, p.mouseX, p.mouseY, 65, 65);
    for (let i = 0; i < inimigos.length; i++) {
        if (inimigos[i].mirando(p.mouseX, p.mouseY)) {
            p.image(miraCursor2, p.mouseX, p.mouseY, 65, 65);
        }
    }
}

function acrescentarInimigos() {
    for (let i = 0; i < inimigos.length; i++) {
        if (inimigos[i].x == p.width / 1.5) {
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


p.mousePressed = function() {
    for (let i = 0; i < inimigos.length; i++) {
        if (inimigos[i].mirando(p.mouseX, p.mouseY)) {
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
        p.rectMode(p.CENTER);
        p.noFill();
        p.rect(this.x, this.y, larguraInimigos, alturaInimigos);
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
        let distancia = p.dist(mousex, mousey, this.x, this.y);
        return (distancia < 65 / 2);
    }

}
}

var myp5 = new p5(tiro, "tiro");


var flashing = function(p) {

p.setup = function() {
    var canvas = p.createCanvas(600, 600);
    // var p5 = document.querySelector(".flashing");
    // canvas.parent(p5);
    p.noCursor();
  }
  
  p.draw = function() {
    let vermelho = p.map(p.mouseY, 0, p.height, 50, 255);
    p.background(220);
    p.frameRate(10);
    let azul = p.map(p.mouseX, 0, p.width, 50, 255);
  
    for (var x = 0; x < p.width; x = x + 20) {
      for (var y = 0; y < p.width; y = y + 20) {
        //var d = dist(0, 0, x, y);
  
        p.stroke(255);
        p.strokeWeight(1);
        // noStroke();
        p.fill(vermelho, 0, p.random(50, azul));
        p.rect(x, y, 20, 20);
      }
  
    }
  }
}

var myp5 = new p5(flashing, "flashing");