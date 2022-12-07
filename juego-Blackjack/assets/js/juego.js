// patron modulo
(()=>{

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0, 
    puntosComputadora =0;

// referencias html
const btnpedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const puntosHTML = document.querySelectorAll('small');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const crearDeck = ()=>{

  for(let i = 2; i <= 10; i++){
    // ciclo por cada bloque de tipos
    for(let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  // repeticion de cada array por cada indice tipos
  for(let tipo of tipos){

    for(let esp of especiales){
      deck.push(esp + tipo)
    }
  }

  // console.log(deck);
  // algoritmo de datos aleatorios
  // TODO: muy similares los datos aleatorios, verificar
  deck = deck.sort(()=> Math.random() - 0.5);
  // console.log(deck);
}

crearDeck();

// funcion que me permite pedir carta
const pedirCarta = () =>{
  // validacion de error en caso de que el deck sea 0
  if (deck.length === 0) {
    throw 'No ahi cartas en el deck';
  }
  // eliminamos y retornamos el primer elemento
  const carta = deck.shift();
  // console.log(deck);
  return carta;
}

const valorCarta = (carta)=>{
  // indicamos la longitud de los campos o datos que queremos extraer
  const valor = carta.substring(0,carta.length - 1);

  // intenta convertir un dato a number
  // isNaN() si logra convertirlo retorna false
  // si no logra convertirlo retorna true
  return (isNaN(valor)) 
          // asignamos los valores a las cartas especiales 
          ? (valor === 'A') ? 11 : 10 
          : valor * 1; 
}

// turno de la compotadora
const turnoComputadora = (puntosMinimos)=>{
  do {
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHTML[1].innerText = puntosComputadora;
    // console.log(carta);
    // console.log(puntosComputadora);
  
    // insercion de img
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasComputadora.append(imgCarta);
    
    if (puntosMinimos > 21 || puntosMinimos === 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && (puntosMinimos <= 21));
  
  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      alert('Nadie gana..');
    }else if(puntosMinimos > 21){
      alert('Computadora gana');
    }else if(puntosComputadora > 21){
      alert('Jugador gana');
    }
    // else{
    //   alert('Computadora gana');
    // }
  }, 500);
}


// Eventos
btnpedir.addEventListener('click', ()=>{
  // proceso de carta y puntos
  const carta = pedirCarta();
  puntosJugador = puntosJugador + valorCarta(carta);
  puntosHTML[0].innerText = puntosJugador;
  // console.log(carta);
  // console.log(puntosJugador);

  // insercion de img
  const imgCarta = document.createElement('img');
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add('carta');
  divCartasJugador.append(imgCarta);

  // proceso de puntos 
  if (puntosJugador > 21) {
    // console.warn('Lo sentimos Perdiste');
    btnpedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }else if(puntosJugador === 21 ){
    // console.warn('21, genial');
    setTimeout(() => {
      alert('Felicidades ganaste');
    }, 500);
    btnpedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

btnDetener.addEventListener('click',()=>{
  btnDetener.disabled = true;
  btnpedir.disabled = true;
  btnNuevo.diabled = true;
  turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', ()=>{
  console.clear();
  btnDetener.disabled = false;
  btnpedir.disabled = false;
  deck = [];
  crearDeck();
  divCartasComputadora.innerHTML = '';
  divCartasJugador.innerHTML = '';
  puntosComputadora = 0;
  puntosJugador = 0;
  puntosHTML[0].innerText = 0;
  puntosHTML[1].innerText = 0;
})

})();

