// patron modulo
const miModulo = (()=>{
'use strict'

  let deck = [];
  const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

  // let puntosJugador = 0, 
  //     puntosComputadora =0;
  let puntosJugadores = [];

  // referencias html
  const btnpedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo'),
        puntosHTML = document.querySelectorAll('small');

  const divCartasJugadores = document.querySelectorAll('.divCartas');

  // Esta funcion inicializa el juego
  const inicializarJuego = (numJugadores = 2)=>{
    deck = crearDeck();
    puntosJugadores = [];

    for(let i = 0; i < numJugadores; i++){
      puntosJugadores.push(0);

      puntosHTML.forEach(element => element.innerText = 0);
      divCartasJugadores.forEach(element => element.innerHTML = '');
      btnDetener.disabled = false;
      btnpedir.disabled = false;
    }
  }

  // creacion de un nuevo deck
  const crearDeck = ()=>{
    deck = [];
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

    // algoritmo de datos aleatorios
    // TODO: muy similares los datos aleatorios, verificar
    return deck.sort(()=> Math.random() - 0.5);
  }

  // funcion que me permite pedir carta
  const pedirCarta = () =>{
    // validacion de error en caso de que el deck sea 0
    if (deck.length === 0) {
      throw 'No ahi cartas en el deck';
    }
    // eliminamos y retornamos el primer elemento
    return deck.shift();  
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

  // turno: 0 = primer jugador y el ultimo sera la pc
  const acumularPuntos = (carta, turno)=>{  
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  }

  const crearCarta = (carta, turno)=>{
    const imgCarta = document.createElement('img');
      imgCarta.src = `assets/cartas/${carta}.png`;
      imgCarta.classList.add('carta');
      divCartasJugadores[turno].append(imgCarta);
  }

  // determinar ganador
  const determinarGanador = ()=> {
    const [puntosMinimos, puntosComputadora]= puntosJugadores;
    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert('Nadie gana..');
      }else if(puntosMinimos > 21){
        alert('Computadora gana');
      }else if(puntosComputadora > 21){
        alert('Jugador gana');
      }else{
        alert('computadora gana');
      }
    }, 500);
  }
  // turno de la compotadora
  const turnoComputadora = (puntosMinimos)=>{
    let puntosComputadora = 0;
    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1);
      crearCarta(carta, puntosJugadores.length -1);

    } while (puntosComputadora < puntosMinimos && (puntosMinimos <= 21));

    determinarGanador();
  }

  // Eventos
  btnpedir.addEventListener('click', ()=>{
    // proceso de carta y puntos
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);

    // insercion de img
    crearCarta(carta, 0);

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
    turnoComputadora(puntosJugadores[0]);
  });

  btnNuevo.addEventListener('click', ()=>{
    inicializarJuego();
  });

  // retornamos un objeto para mandar a llamar nuestro inicializador desde fuera de nuestra funcion autoinvocada
  return {
    nuevoJuego : inicializarJuego
  };
})();// 159 lineas de codigo