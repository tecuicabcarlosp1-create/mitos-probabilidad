const deckContainer = document.getElementById('deck');
const freqContainer = document.getElementById('frequency');
const cardVal = document.getElementById('card-val');
const btnDraw = document.getElementById('btn-draw');
const btnDraw20 = document.getElementById('btn-draw-20');
const statFichas = document.getElementById('stat-fichas');
const statHits = document.getElementById('stat-hits');
const statTotal = document.getElementById('stat-total');
const conclusion = document.getElementById('conclusion');

let selectedCards = [1];
let fichas = 1000;
let hits = 0;
let totalDraws = 0;
let frequencies = Array(21).fill(0);
let lastSeen = Array(21).fill(0);

// Initialize deck
for (let i = 1; i <= 20; i++) {
    const card = document.createElement('div');
    card.className = 'card-mini' + (i === 1 ? ' selected' : '');
    card.innerText = i;
    card.onclick = () => selectCard(i);
    deckContainer.appendChild(card);
}

function selectCard(num) {
    selectedCards = [num];
    const cards = document.querySelectorAll('.card-mini');
    cards.forEach((c, idx) => {
        c.classList.toggle('selected', (idx + 1) === num);
    });
}

function updateFreqUI() {
    freqContainer.innerHTML = '';
    for (let i = 1; i <= 20; i++) {
        const item = document.createElement('div');
        item.className = 'freq-item';
        const missing = totalDraws - lastSeen[i];
        let bait = '';
        if (missing > 15) {
            bait = `<span class="bait-badge" style="display:inline">x3 BONUS!</span>`;
        } else if (missing > 8) {
            bait = `<span class="bait-badge" style="display:inline">x2 BONUS!</span>`;
        }
        item.innerHTML = `Card ${i}: ${frequencies[i]} times ${bait}`;
        freqContainer.appendChild(item);
    }
}

async function draw(isBatch = false) {
    if (fichas < 10) return;
    
    btnDraw.disabled = true;
    btnDraw20.disabled = true;
    
    const count = isBatch ? 20 : 1;
    
    for (let i = 0; i < count; i++) {
        const result = Math.floor(Math.random() * 20) + 1;
        totalDraws++;
        frequencies[result]++;
        lastSeen[result] = totalDraws;
        
        cardVal.innerText = result;
        
        let multiplier = 1;
        const missing = (totalDraws - 1) - lastSeen[selectedCards[0]];
        if (missing > 15) multiplier = 3;
        else if (missing > 8) multiplier = 2;

        if (selectedCards.includes(result)) {
            hits++;
            fichas += 10 * multiplier;
            // Visual feedback for win
            cardVal.style.color = 'var(--green)';
        } else {
            fichas -= 10;
            cardVal.style.color = '#000';
        }
        
        statFichas.innerText = fichas;
        statHits.innerText = hits;
        statTotal.innerText = totalDraws;
        
        if (!isBatch) {
            await new Promise(r => setTimeout(r, 200));
        }
    }
    
    updateFreqUI();
    if (totalDraws >= 40) conclusion.style.display = 'block';
    
    btnDraw.disabled = false;
    btnDraw20.disabled = false;
}

btnDraw.onclick = () => draw(false);
btnDraw20.onclick = () => draw(true);

updateFreqUI();
