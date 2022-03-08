// list of words
const words = [
    {
        category: 'animals',
        word: 'HORSE'
    },
    {
        category: 'objects',
        word: 'WINDOW'
    },
    {
        category: 'utensils',
        word: 'SCISSORS'
    },
    {
        category: 'animals',
        word: 'MOUSE'
    },
    {
        category: 'body',
        word: 'STOMACH'
    }
];

let chosenWord = "";
let visible = [];
let wordLength = 0;
let wrongAnswers = 0;
const wordDisplay = document.getElementById("word");
const categoryDisplay = document.getElementById("category");

// drawing hangman
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = '#294353';

function pole() {
    ctx.beginPath();
    ctx.moveTo(20, 280);
    ctx.lineTo(60, 280);
    ctx.stroke();
    ctx.moveTo(40, 280);
    ctx.lineTo(40, 20);
    ctx.stroke();
    ctx.moveTo(20, 20);
    ctx.lineTo(200, 20);
    ctx.stroke();
    ctx.lineTo(200, 50);
    ctx.stroke();
}
function head() {
    ctx.moveTo(200, 50);
    ctx.beginPath();
    ctx.arc(200, 75, 25, 0, Math.PI / 180 * 360);
    ctx.stroke();
}
function body() {
    ctx.moveTo(200, 100);
    ctx.lineTo(200, 200);
    ctx.stroke();
}
function leftHand() {
    ctx.moveTo(200, 115);
    ctx.lineTo(180, 150);
    ctx.stroke();
}
function rigthHand() {
    ctx.moveTo(200, 115);
    ctx.lineTo(220, 150);
    ctx.stroke();
}
function leftLeg() {
    ctx.moveTo(200, 200);
    ctx.lineTo(180, 235);
    ctx.stroke();
}
function rightLeg() {
    ctx.moveTo(200, 200);
    ctx.lineTo(220, 235);
    ctx.stroke();
}
const drawHangman = [head, body, leftHand, rigthHand, leftLeg, rightLeg];

// getting the alphabet buttons
const letters = document.querySelectorAll(".alph-btn");
letters.forEach(button => button.addEventListener('click', checkLetter));

function checkLetter() {
    let letter = this.textContent;
    console.log(`Letter ${letter} was clicked`);
    this.disabled = true;
    let answer = chosenWord.indexOf(letter);
    if (answer == -1) {
        drawHangman[wrongAnswers]();
        wrongAnswers += 1;
        console.log('Number of wrong answers: ' + wrongAnswers);
        if (wrongAnswers == drawHangman.length) {
            let lostAlert = document.getElementById('lost');
            lostAlert.style.display = "block";
            letters.forEach(lett => lett.disabled = true)
        }
    } else {
        for (let i = 0; i < wordLength; i++) {
            if (letter == chosenWord[i]) {
                visible[i] = letter;
            }
        }
        
        wordDisplay.textContent = '';
        for (let i = 0; i < wordLength; i++) {
        wordDisplay.textContent += visible[i];
        if (i == wordLength - 1) { continue };
        wordDisplay.textContent += ' ';
        }
    }
    let score = visible.indexOf('_');
        if (score == -1) {
            let winAlert = document.getElementById('win');
            winAlert.style.display = "block";
            letters.forEach(lett => lett.disabled = true)
    };
    //console.log(JSON.stringify(visible));
    
}

//starting game
function startGame() {
    resetGame();
    console.log('Starting new game');
    pole();
    //drawin word
    let numbOfWords = words.length;
    let random = Math.floor(Math.random() * numbOfWords);
    chosenWord = words[random]["word"];
    wordLength = chosenWord.length;
    let category = words[random]["category"];
    categoryDisplay.textContent = category;
    console.log(`Category ${category}`);
    console.log(`Chosen words is ${chosenWord}`);
    //hidden letters
    visible = Array(wordLength).fill('_');
    wordDisplay.textContent = visible.join(' ');
    
};

window.onload = startGame;

// reseting game
function resetGame() {
    console.log('Reseting game')
    letters.forEach(arr => arr.disabled = false);
    ctx.clearRect(0, 0, 300, 300);
    pole();
    wrongAnswers = 0;
    visible = Array(wordLength).fill('_');
    wordDisplay.textContent = visible.join(' ');
};
