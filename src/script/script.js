const coins = ['bnb.png', 'bnb.png', 'avax.png', 'avax.png',
'btc.png', 'btc.png', 'doge.png', 'doge.png', 'eth.png',
'eth.png', 'sol.png', 'sol.png', 'usdc.png', 'usdc.png',
'usdt.png', 'usdt.png', 'xrp.png', 'xrp.png', 'ada.png', 'ada.png']


let openCards = [];

let timerInterval;
let seconds = 0;

const imageDirectory = `src/assets/img/`;


function createCards() {
    let shuffleImages = coins.sort(() => Math.random() - 0.5);

    for (let i = 0;i < shuffleImages.length;i++) {
        let box = document.createElement('div');
        box.className = 'item';

        let img = document.createElement('img');
        img.src = imageDirectory + shuffleImages[i];
        img.alt = 'Imagem';

        box.appendChild(img);

        box.onclick = handleClick;
        document.querySelector('.game').appendChild(box);
    }
}


document.addEventListener('DOMContentLoaded', function () {
    fetch(imageDirectory)
        .then(response => response.text())
        .then(text => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const images = doc.querySelectorAll('img');

            images.forEach(image => {
                const imageName = image.getAttribute('src');
                coins.push(imageName);
            });

            createCards(); 
            startTimer(); // Iniciar o temporizador após a criação das cartas
        })
        .catch(error => console.error('Erro ao obter imagens:', error));
});

function handleClick() {
    if (openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if (openCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if (openCards[0].querySelector('img').src === openCards[1].querySelector('img').src) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    openCards = [];

    if (document.querySelectorAll(".boxMatch").length === coins.length) {
        openVictoryModal();
    }
}



function startTimer() {
    timerInterval = setInterval(function () {
        seconds++;
        document.getElementById('time').innerText = seconds;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    document.getElementById('time').innerText = seconds;
}

function resetGame() {
    const gameContainer = document.querySelector('.game');
    gameContainer.innerHTML = ''; 

    createCards(); 

    resetTimer();

    const victoryModal = document.getElementById('victoryModal');
    victoryModal.style.display = 'none';

    startTimer();
}
