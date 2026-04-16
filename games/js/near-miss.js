const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const btnSpin = document.getElementById('btn-spin');
const statFichas = document.getElementById('stat-fichas');
const statNear = document.getElementById('stat-near');
const statWins = document.getElementById('stat-wins');
const resultMsg = document.getElementById('result-msg');

const symbols = ['🍒', '🍋', '⭐', '💎', '7️⃣'];
let fichas = 1000;
let nearMisses = 0;
let wins = 0;

// Populate reels
function populateReels() {
    [reel1, reel2, reel3].forEach(reel => {
        reel.innerHTML = '';
        // Add many symbols for spinning effect
        for (let i = 0; i < 30; i++) {
            const sym = document.createElement('div');
            sym.className = 'symbol';
            sym.innerText = symbols[Math.floor(Math.random() * symbols.length)];
            reel.appendChild(sym);
        }
    });
}

populateReels();

btnSpin.onclick = async () => {
    if (fichas < 10) return;
    
    fichas -= 10;
    statFichas.innerText = fichas;
    btnSpin.disabled = true;
    resultMsg.innerText = '';
    resultMsg.style.color = '#fff';

    // Reset positions
    [reel1, reel2, reel3].forEach(reel => {
        reel.style.transition = 'none';
        reel.style.top = '0';
    });

    // Re-populate to change end results
    populateReels();

    // Trigger animation
    setTimeout(() => {
        [reel1, reel2, reel3].forEach((reel, idx) => {
            reel.style.transition = `top ${2 + idx * 0.5}s cubic-bezier(0.45, 0.05, 0.55, 0.95)`;
            // Each symbol is 120px. We want to stop at the 25th symbol.
            reel.style.top = `-${24 * 120}px`;
        });
    }, 10);

    await new Promise(r => setTimeout(r, 3500));

    // Get final symbols (the ones at index 24)
    const res1 = reel1.children[24].innerText;
    const res2 = reel2.children[24].innerText;
    const res3 = reel3.children[24].innerText;

    if (res1 === res2 && res2 === res3) {
        wins++;
        const prize = res1 === '7️⃣' ? 500 : 100;
        fichas += prize;
        resultMsg.innerText = `🎰 ¡JACKPOT! +${prize} fichas 🎰`;
        resultMsg.style.color = 'var(--gold)';
    } else if (res1 === res2 || res2 === res3 || res1 === res3) {
        nearMisses++;
        resultMsg.innerText = '¡Casi lo logras! No te rindas... (o sí)';
        resultMsg.style.color = 'var(--red)';
    } else {
        resultMsg.innerText = 'Sigue intentando.';
    }

    statFichas.innerText = fichas;
    statNear.innerText = nearMisses;
    statWins.innerText = wins;
    btnSpin.disabled = false;
};
