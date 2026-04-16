const boxDisplay = document.getElementById('box-display');
const btnPack1 = document.getElementById('btn-pack-1');
const btnPack10 = document.getElementById('btn-pack-10');
const statFichas = document.getElementById('stat-fichas');
const statMazos = document.getElementById('stat-mazos');
const statLegendary = document.getElementById('stat-legendary');
const legendaryAlert = document.getElementById('legendary-alert');

let fichas = 1000;
let mazos = 0;
let legendaries = 0;

async function openPack(count) {
    const cost = count === 1 ? 10 : 90;
    if (fichas < cost) {
        alert("¡No tienes suficientes fichas!");
        return;
    }

    fichas -= cost;
    mazos += count;
    statFichas.innerText = fichas;
    statMazos.innerText = mazos;

    btnPack1.disabled = true;
    btnPack10.disabled = true;
    boxDisplay.innerHTML = '';
    legendaryAlert.style.display = 'none';

    // Pack of 10 cards per mazo
    const totalCards = count * 10;
    
    for (let i = 0; i < totalCards; i++) {
        const rand = Math.random() * 100;
        let rarity = 'common';
        let label = 'COMÚN';
        
        if (rand < 5) {
            rarity = 'legendary';
            label = 'LEGENDARIA';
            legendaries++;
            legendaryAlert.style.display = 'block';
        } else if (rand < 20) {
            rarity = 'epic';
            label = 'ÉPICA';
        } else if (rand < 50) {
            rarity = 'rare';
            label = 'RARA';
        }

        const card = document.createElement('div');
        card.className = `card ${rarity}`;
        card.innerHTML = `<strong>${label}</strong><br>⭐`;
        boxDisplay.appendChild(card);
        
        statLegendary.innerText = legendaries;
        
        if (count === 1) await new Promise(r => setTimeout(r, 50));
    }

    btnPack1.disabled = false;
    btnPack10.disabled = false;
}

btnPack1.onclick = () => openPack(1);
btnPack10.onclick = () => openPack(10);
