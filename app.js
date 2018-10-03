/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, activePlayer, dice1,dice2, currentScore,winScore,winner=-1,playe1,player2;
newGame();
document.querySelector('.btn-roll').addEventListener('click', function () {

    var diceDom1 = document.querySelector('.dice1');
    var diceDom2 = document.querySelector('.dice2');
    diceDom1.style.display = 'block';
    diceDom2.style.display = 'block';
    
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;
    if(dice2 == 6 && dice1 == 6){
        score[activePlayer] = 0;
        currentScore = 0;
        diceDom1.src = 'dice-' + dice1 + '.png';
        diceDom2.src = 'dice-' + dice2 + '.png';
        dice1 = dice2 = 0;
        document.getElementById('current-' + activePlayer).textContent = dice1;
        nextPlayer();
    }else{
    if (dice1 != 1 && dice2!=1) {
        currentScore += dice1+dice2
        diceDom1.src = 'dice-' + dice1 + '.png'
        diceDom2.src = 'dice-' + dice2 + '.png';
        document.getElementById('current-' + activePlayer).textContent = currentScore;
    }
    else {
        currentScore = 0;

        diceDom1.src = 'dice-' + dice1 + '.png';
        diceDom2.src = 'dice-' + dice2 + '.png';
        dice1 =dice2 = 0;
        document.getElementById('current-' + activePlayer).textContent = dice1;
        nextPlayer();
    }
 }
});

//toggle the nextPLayer
document.querySelector('.btn-hold').addEventListener('click', function () {
    nextPlayer();
});
//
function nextPlayer() {
    var status = scoreUpdate();
    if(status!=="GameOver")
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    
}

//toggle the active player( one or two)
function toggle() {
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
}

//update the ScoreBoard
function scoreUpdate() {
    score[activePlayer] = score[activePlayer] + currentScore;
    document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
    document.getElementById('current-' + activePlayer).textContent = '0'
    currentScore = 0
    previousScore = 0
    if (score[activePlayer] >= winScore) {
        winner = activePlayer
        document.querySelector('#name-' + activePlayer).textContent = 'Winner';
        disableButtons(true);
        return "GameOver";
    }
    toggle();
    return "GameNotOver";
}
document.querySelector('.btn-new').addEventListener('click', function () {
    newGame();
})

//Start a new game
function newGame() {
    
    winScore = prompt("Enter the Winning Score");
    player1=prompt("Name of Player 1");
    player2=prompt("Name of Player 2");

    score = [0, 0];
    currentScore = 0;
    previousScore = 0;
    if(winner == 1 || activePlayer==1){
        toggle();
        console.log("toggling")
    }
    
    activePlayer = Math.floor(Math.random() *2);
    
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.querySelector('#name-0').textContent = player1;
    document.querySelector('#name-1').textContent = player2;
    var counter=0;
    (function tog(){
        setTimeout(function(){
            if(counter++ <10){
                toggle();
                tog();
            }
        },300);
    })();
    if(activePlayer ==1)
        toggle();
    
    disableButtons(false)

}



//disable the Rolll and Hold Button
function disableButtons(value) {
    document.querySelector('.btn-roll').disabled = value;
    document.querySelector('.btn-hold').disabled = value;
}
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

  
