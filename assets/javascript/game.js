//Word List
var wordsLibrary = ["asset", "bankruptcy", "amortization", "capital", "cumulative", "commodity", "defecit", "depreciation", "dividend", "equity", "entrepreneur", "leverage", "liability", "mortgage", "portfolio", "premium", "recession", "revenue", "volatility", "tycoon", "shareholder", "return", "broker"];

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

//Stores the wrong letters user guessed
var wrongLetters = [];

//Letters that are correctly guessed in each round
var correctLetters = [];

//The current word playing
var wordPlaying;

//This is the line of underscore before the word is guessed
var underscores = "";

//Maximum number of tries user has
var numOfGuess = 10;

//How many wins user piled up
var wins = 0;


document.querySelector('#numWin').innerText = wins;
document.querySelector('#numGuess').innerText = numOfGuess;

wordPlaying = wordsLibrary[Math.floor(Math.random()*wordsLibrary.length)];
for (x = 0; x < wordPlaying.length; x++) {
    underscores += "_";
    document.querySelector("#currentWord").innerText = underscores;
}
document.querySelector("#gameImage").src = "assets/images/" + wordPlaying + ".png";


function keyPressed(event){
    var k = event.key;
    
    if (alphabet.indexOf(k) != -1 && numOfGuess > -1 && wrongLetters.indexOf(k) == -1 && wordPlaying.indexOf(k) != -1){
        correctLetters.push(k);
        var guessInProgress = "";
        for (i=0; i<wordPlaying.length; i++) {
            if (correctLetters.indexOf(wordPlaying[i]) != -1){
                guessInProgress += wordPlaying[i];
            }else{
                guessInProgress += "_";
            }
        }
        document.querySelector("#currentWord").innerText = guessInProgress;
    }else if (alphabet.indexOf(k) != -1 && numOfGuess > -1 && wrongLetters.indexOf(k) == -1 && wordPlaying.indexOf(k) == -1){
        wrongLetters.push(k);
        document.querySelector("#lettersGuessed").innerText = wrongLetters;
        numOfGuess --;
        document.querySelector('#numGuess').innerText = numOfGuess;
    }

    if (alphabet.indexOf(k) != -1 && numOfGuess < 1){
        setTimeout(function(){
            alert('Game Over!');
            document.querySelector("#loseAudio").play();
            wordPlaying = wordsLibrary[Math.floor(Math.random()*wordsLibrary.length)];
            underscores = "";
            for (x = 0; x < wordPlaying.length; x++) {
                underscores += "_";
                document.querySelector("#currentWord").innerText = underscores;
            }
            wrongLetters = [];
            correctLetters = [];
            numOfGuess = 10;
            document.querySelector("#lettersGuessed").innerText = wrongLetters;
            document.querySelector('#numGuess').innerText = numOfGuess;
            document.querySelector('#numWin').innerText = wins;
        }, 300);
    }

    if (guessInProgress == wordPlaying){
        wins ++;
        document.querySelector('#numWin').innerText = wins;
        setTimeout(function(){
            alert("Congratulations! You won!")
            document.querySelector("#winAudio").play();
            wordPlaying = wordsLibrary[Math.floor(Math.random()*wordsLibrary.length)];
            underscores = "";
            for (x = 0; x < wordPlaying.length; x++) {
                underscores += "_";
                document.querySelector("#currentWord").innerText = underscores;
            }
            wrongLetters = [];
            correctLetters = [];
            numOfGuess = 10;
            document.querySelector("#lettersGuessed").innerText = wrongLetters;
            document.querySelector('#numGuess').innerText = numOfGuess;
        }, 1000);
    }
}
document.onkeyup = keyPressed;
