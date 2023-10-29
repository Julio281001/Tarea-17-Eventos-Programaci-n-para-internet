const p1 = {
  score: 0,
  button: document.querySelector("#p1Button"),
  display: document.querySelector("#p1Score"),
};
const p2 = {
  score: 0,
  button: document.querySelector("#p2Button"),
  display: document.querySelector("#p2Score"),
};

const resetButton = document.querySelector("#reset");
const winningScoreSelect = document.querySelector("#maxPoints");
let winningScore;
let isGameOver = false;

window.addEventListener("load", function () {
  winningScore = parseInt(winningScoreSelect.value);
  isGameOver = false;
});

//agregar a la propiedad button de p1 la función updateScores al hacer click
p1.button.addEventListener("click", function () {
  updateScores(p1, p2);
});

//agregar a la propiedad button de p2 la función updateScores al hacer click
p2.button.addEventListener("click", function () {
  updateScores(p2, p1);
});

function updateScores(player, opponent) {
  //Si el juego no ha terminado
  if (!isGameOver) {
    ////Aumentar puntuación del jugador
    player.score++;
    ////Si el jugador gana
    if (player.score === Number(winningScore)) {
      //////Terminar el juego
      isGameOver = true;
      //////Agregar la clase ganar al jugador
      player.display.classList.add("won");
      //////Agregar la clase perder al oponente
      opponent.display.classList.add("lost");
      //////Desactivar los botones de los jugadores con .button.disabled=true
      player.button.disabled = true;
      opponent.button.disabled = true;
    }
  }
  ////Actualizar el contenido del texto del jugador a su puntaje
  player.display.textContent = player.score;
}

winningScoreSelect.addEventListener("change", function () {
  //Al cambiar los puntos cambiar la variable winningScore al valor de "this", tienen que convertirlo a entero
  winningScore = Number(this.value);
  //Una vez cambiando el valor llamar a reset
  reset();
});

//Agregar a resetButton la función reset al dar click
resetButton.addEventListener("click", reset);

function reset() {
  //Reiniciar la variable de juego terminado a falso
  isGameOver = false;
  const players = [p1, p2];
  //Por cada jugador
  players.forEach((player) => {
    //Cambiar la puntuación a 0
    player.score = 0;
    //Cambiar el texto los puntos a 0
    player.display.textContent = 0;
    //Remover las clases de ganar y perder
    player.display.classList.remove("won");
    player.display.classList.remove("lost");
    //habilitar nuevamente los botones (con la propiedad disabled)
    player.button.disabled = false;
  });
}

/*Calificación
	20-Al presionar los botones de los jugadores aumenta el contador.
	20-Se termina el juego al llegar a las rondas seleccionadas.
	20-Al ganar se agregan las clases a los jugadores y se bloquean los botones
	20-Al reiniciar se cambian los textos y se habilitan los botones
	20-Si se cambian las rondas se reinicia el juego y el puntaje necesario para ganar
*/
