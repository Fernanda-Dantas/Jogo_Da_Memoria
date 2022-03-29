let imagens = [];
for (let i = 0; i <= 8; i++) imagens.push(`http://picsum.photos/id/${i}/80`);

let imagemDeFundo = 'http://picsum.photos/80?grayscale';


let cartas = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]; 
let cliquesTravados = false;
let temCartaVirada = false;
let posicaoCartaVirada = -1;
let valorCartaVirada = 0; 
let pontos = 0; 
const tempoDoJogo = new timer('#timer');

// Carrega as imagens de fundo das cartas
onload = () => {
let elemImagens = document.querySelectorAll('#memoria img'); 
elemImagens.forEach(
  (img, i) => {
    img.src = imagemDeFundo;
    img.setAttribute('data-valor', i);
    img.style.opacity = 0.5;
  });


document.querySelector('#btnInicio').onclick = iniciaJogo
};

// ----------------------
// INICIA JOGO
// ----------------------
const iniciaJogo = () => {

  
  for (let i = 0; i < cartas.length; i++) {
    let numeroSorteado = Math.trunc(Math.random() * cartas.length); 
    let armazenaNum = cartas[numeroSorteado];
    cartas[numeroSorteado] = cartas[i];
    cartas[i] = armazenaNum;
  }

 
  let elemImagens = document.querySelectorAll('#memoria img'); 
  elemImagens.forEach((img, i) => {
    img.onclick = cliqueDaImagem;
    img.style.opacity = 1;
    img.src = imagemDeFundo;
  });

  reiniciaJogo();
   document.querySelector('#btnInicio').disabled = true;
   document.querySelector('#timer').style.backgroundColor = 'rgba(255, 35, 35, 0.808)';
   tempoDoJogo.iniciaContador();
  };

  function reiniciaJogo() {
    cliquesTravados = false;
    temCartaVirada = false;
    posicaoCartaVirada = -1;
    valorCartaVirada = 0;
    pontos = 0; 
  }

// ----------------------
//  PROCESSA CLIQUE DA IMAGEM
// ----------------------

const cliqueDaImagem = (evento) => {
  if (cliquesTravados) return;
  const posicaoVetor = parseInt(evento.target.getAttribute('data-valor'));
  const valor = cartas[posicaoVetor];
  evento.target.src = imagens[valor -1];
  evento.target.onclick = null;

  if (!temCartaVirada) {
    temCartaVirada = true;
    posicaoCartaVirada = posicaoVetor; 
    valorCartaVirada = valor; 
    } else {
    if (valor == valorCartaVirada) { 
      pontos++;
    } else { 
      const valorInicial = posicaoCartaVirada;
      cliquesTravados = true;
      setTimeout(() => { 
        evento.target.src = imagemDeFundo;
        evento.target.onclick = cliqueDaImagem;
        console.log(valorInicial)
        let img = document.querySelector('#memoria #i' + valorInicial);
        img.src = imagemDeFundo;
        img.onclick = cliqueDaImagem; 
        cliquesTravados = false;
      }, 1000 );
    
    }
    temCartaVirada = false;
    posicaoCartaVirada = -1;
    valorCartaVirada = 0;
  }

  if (pontos == 8) {
    document.querySelector('#btnInicio').disabled = false;
    document.querySelector('#timer').style.backgroundColor = 'lightgreen';
    tempoDoJogo.finalizaContador();
  }

};

// ----------------------
//  TIMER
// ---------------------- 
  function timer(e) {
    this.elemento = e;
    this.controlaTempo = 0;
    this.contador = null;
    this.iniciaContador = () => {
      this.controlaTempo = 0;
      this.contador = setInterval( () => {
        this.controlaTempo++;
        const minutos = Math.trunc(this.controlaTempo/60);
        const segundos = this.controlaTempo % 60;
        document.querySelector(this.elemento).innerHTML = 
        (minutos < 10 ? '0' : '') +
        minutos + 
        ':' + 
        (segundos < 10 ? '0' : '') +
        segundos;
      }, 1000);
    };
    this.finalizaContador = () => {
      clearInterval(this.contador);
      this.contador = null;
    }
  };
