const roulette = document.getElementById('roulette');
const rouletteText = document.getElementById('roulette-text');
const btnSpin = document.getElementById('btn-spin');
const btnQuit = document.getElementById('btn-quit');
const statFichas = document.getElementById('stat-fichas');
const statHouse = document.getElementById('stat-house');
const betAmountSelect = document.getElementById('bet-amount');
const finalStats = document.getElementById('final-stats');
const finalMoney = document.getElementById('final-money');
const finalMsg = document.getElementById('final-msg');

let fichas = 100;
let houseProfit = 0;
let selectedColor = 'red';
let isSpinning = false;
let rotation = 0;

// Color buttons
const betRed = document.getElementById('bet-red');
const betBlack = document.getElementById('bet-black');
const betGreen = document.getElementById('bet-green');

function selectColor(color) {
    selectedColor = color;
    betRed.classList.toggle('selected-bet', color === 'red');
    betBlack.classList.toggle('selected-bet', color === 'black');
    betGreen.classList.toggle('selected-bet', color === 'green');
}

betRed.addEventListener('click', () => selectColor('red'));
betBlack.addEventListener('click', () => selectColor('black'));
betGreen.addEventListener('click', () => selectColor('green'));

// Init
selectColor('red');

btnSpin.addEventListener('click', () => {
    if (isSpinning) return;
    if (fichas <= -1000) {
        alert("¡Has llegado al límite de deuda de -1000 fichas! El casino te ha echado.");
        return;
    }
    
    const betAmount = parseInt(betAmountSelect.value);
    spin(betAmount);
});

btnQuit.addEventListener('click', () => {
    finalStats.style.display = 'block';
    finalMoney.innerText = fichas;
    finalMsg.innerText = fichas < 100 ? "Has perdido contra el casino." : (fichas > 100 ? "¡Tuviste suerte esta vez! Pero a la larga..." : "Te retiraste sin cambios.");
    btnSpin.disabled = true;
});

function spin(bet) {
    isSpinning = true;
    btnSpin.disabled = true;
    
    // Random spin (3 to 6 full rotations + random angle)
    const extraDegrees = Math.floor(Math.random() * 360);
    rotation += 1080 + extraDegrees;
    
    roulette.style.transform = `rotate(${rotation}deg)`;
    rouletteText.style.transform = `rotate(${-rotation}deg)`;
    rouletteText.innerText = '...';
    
    setTimeout(() => {
        const resultAngle = rotation % 360;
        let resultColor;
        let resultNum;

        // Simplified Roulette logic for demonstration:
        // 0-10 deg: Green (0)
        // 10-185 deg: Red
        // 185-360 deg: Black
        if (resultAngle < 10) {
            resultColor = 'green';
            resultNum = 0;
        } else if (resultAngle < 185) {
            resultColor = 'red';
            resultNum = Math.floor(Math.random() * 18) + 1;
        } else {
            resultColor = 'black';
            resultNum = Math.floor(Math.random() * 18) + 19;
        }

        rouletteText.innerText = resultNum;
        
        if (resultColor === selectedColor) {
            // Win
            fichas += bet;
            houseProfit -= bet;
        } else {
            // Lose
            fichas -= bet;
            houseProfit += bet;
        }

        statFichas.innerText = fichas;
        statHouse.innerText = houseProfit;
        
        isSpinning = false;
        btnSpin.disabled = false;
        
    }, 3000);
}
