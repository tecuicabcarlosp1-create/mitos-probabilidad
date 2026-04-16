const coin = document.getElementById('coin');
const btnFlip = document.getElementById('btn-flip');
const btnFlip20 = document.getElementById('btn-flip-20');
const predCara = document.getElementById('pred-cara');
const predCruz = document.getElementById('pred-cruz');
const historyContainer = document.getElementById('history');
const statTotal = document.getElementById('stat-total');
const statCara = document.getElementById('stat-cara');
const statCruz = document.getElementById('stat-cruz');
const statHits = document.getElementById('stat-hits');
const conclusion = document.getElementById('conclusion');

let total = 0;
let caras = 0;
let cruces = 0;
let hits = 0;
let prediction = 'cara'; // default
let history = [];

predCara.addEventListener('click', () => setPrediction('cara'));
predCruz.addEventListener('click', () => setPrediction('cruz'));

function setPrediction(p) {
    prediction = p;
    predCara.classList.toggle('selected-prediction', p === 'cara');
    predCruz.classList.toggle('selected-prediction', p === 'cruz');
}

// Init prediction UI
setPrediction('cara');

btnFlip.addEventListener('click', () => flipCoin());
btnFlip20.addEventListener('click', () => flipMultiple(20));

async function flipCoin() {
    btnFlip.disabled = true;
    btnFlip20.disabled = true;
    
    coin.classList.add('flipping');
    coin.innerText = '?';
    
    // Simulate animation time
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const result = Math.random() < 0.5 ? 'cara' : 'cruz';
    
    coin.classList.remove('flipping');
    coin.innerText = result.toUpperCase();
    coin.style.backgroundColor = result === 'cara' ? 'var(--gold)' : '#c0c0c0';
    
    updateStats(result);
    
    btnFlip.disabled = false;
    btnFlip20.disabled = false;
}

function flipMultiple(count) {
    for (let i = 0; i < count; i++) {
        const result = Math.random() < 0.5 ? 'cara' : 'cruz';
        updateStats(result);
    }
    // Show last result on big coin
    const lastResult = history[history.length - 1];
    coin.innerText = lastResult.toUpperCase();
    coin.style.backgroundColor = lastResult === 'cara' ? 'var(--gold)' : '#c0c0c0';
}

function updateStats(result) {
    total++;
    if (result === 'cara') caras++;
    else cruces++;
    
    if (result === prediction) hits++;
    
    history.push(result);
    if (history.length > 30) history.shift();
    
    renderHistory();
    
    statTotal.innerText = total;
    statCara.innerText = caras;
    statCruz.innerText = cruces;
    statHits.innerText = hits;
    
    if (total >= 50) {
        conclusion.style.display = 'block';
    }
}

function renderHistory() {
    historyContainer.innerHTML = '';
    history.forEach(res => {
        const div = document.createElement('div');
        div.className = `history-item item-${res}`;
        div.innerText = res[0].toUpperCase();
        historyContainer.appendChild(div);
    });
}
