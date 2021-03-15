//Global Variables
const overlay = document.querySelector('#overlay');
const h2 = document.querySelector('h2');
const a = document.querySelector('a');
const btnReset = document.querySelector('.btn__reset');
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const button = document.querySelectorAll('button');
const ul = document.querySelector('ul');
const letter = document.getElementsByClassName('letter');
const show = document.getElementsByClassName('show');
const img = document.querySelectorAll('img');

//Hide overlay on start screen
btnReset.addEventListener('click', () => {
    overlay.style.display = 'none';
});


let missed = 0;
const phrases = [
    "Frankly my dear I dont give a Damn",
    "Im gonna make him an offer he cant refuse", 
    "Toto I have a feeling we are not in Kansas anymore",
    "May the Force be with you",
    "What we got here is failure to communicate",
    "Your gonna need a bigger boat",
    "Soylent Green is people",
    "Im king of the world"
];

//create a getRandomPhrasesAsArray function
function getRandomPhraseAsArray(arr) {
    let randomPhrase = arr[Math.floor(Math.random()*arr.length)];
    return randomPhrase.toString().split('');
}

const randomPhraseArr = getRandomPhraseAsArray(phrases).map(phrase => phrase.toLowerCase());

//Set the game display
function addPhraseToDisplay(arr) {
     for (let i = 0; i < arr.length; i++) {
         const li = document.createElement('li');
         li.textContent = arr[i];
         ul.appendChild(li);
         if (arr[i] !== ' ') {
            li.className = 'letter';
         } else {
            li.className = 'space';
         }
     }
}

addPhraseToDisplay(randomPhraseArr);

//Create a checkletter function
function checkLetter(clickedBtn) {
    let result = null;
    for (let i = 0; i < letter.length; i++) {
        if (letter[i].textContent === clickedBtn) {
            letter[i].classList.add('show');
            result = clickedBtn;
        }
    }
    return result;
}

//add an addEventListener to the keyboard
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON') {
        e.target.className = 'chosen';
        e.target.disabled = true;
        const letterFound = checkLetter(e.target.textContent);
        if (letterFound === null) {
            img[missed].setAttribute('src', 'images/lostHeart.png');
            missed++;
        }
    }
    checkWin();
});

// add checkWin function
function checkWin() {
    if (letter.length === show.length) {
        overlay.classList.add('win');
        h2.textContent = 'You are the Winner! Great Work!';
        overlay.style.display = 'flex';
        a.style.display = 'none';
        const p = document.createElement('p');
        p.textContent = 'Please refresh the browser to reset.'
        overlay.appendChild(p);
    } else if (missed > 4) {
        overlay.classList.add('lose');
        h2.textContent = 'You have failed miserably!';
        overlay.style.display = 'flex';
        a.style.display = 'none';
        const p = document.createElement('p');
        p.textContent = 'Please refresh the browser to reset.'
        overlay.appendChild(p);
    }
}