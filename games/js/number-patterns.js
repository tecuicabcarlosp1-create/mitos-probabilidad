const numberDisplay = document.getElementById('number-display');
const btnSpin = document.getElementById('btn-spin');
const predictionInput = document.getElementById('prediction');
const statFichas = document.getElementById('stat-fichas');
const statHits = document.getElementById('stat-hits');
const statTotal = document.getElementById('stat-total');
const ctx = document.getElementById('freqChart').getContext('2d');

let fichas = 1000;
let hits = 0;
let total = 0;
let frequencies = Array(10).fill(0);

// Initialize Chart.js
const freqChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        datasets: [{
            label: 'Frecuencia de números',
            data: frequencies,
            backgroundColor: 'rgba(255, 215, 0, 0.5)',
            borderColor: '#ffd700',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: { beginAtZero: true, grid: { color: '#333' }, ticks: { color: '#888' } },
            x: { grid: { display: false }, ticks: { color: '#888' } }
        },
        plugins: {
            legend: { display: false }
        }
    }
});

btnSpin.onclick = async () => {
    if (fichas < 10) return;
    
    const pred = parseInt(predictionInput.value);
    if (isNaN(pred) || pred < 1 || pred > 10) {
        alert("Selecciona un número del 1 al 10");
        return;
    }

    btnSpin.disabled = true;
    numberDisplay.innerText = '...';
    
    // Fake rolling animation
    let count = 0;
    const interval = setInterval(() => {
        numberDisplay.innerText = Math.floor(Math.random() * 10) + 1;
        count++;
        if (count > 10) clearInterval(interval);
    }, 100);

    await new Promise(r => setTimeout(r, 1200));
    
    const result = Math.floor(Math.random() * 10) + 1;
    numberDisplay.innerText = result;
    
    total++;
    frequencies[result-1]++;
    
    if (result === pred) {
        hits++;
        fichas += 10;
        numberDisplay.style.color = 'var(--green)';
    } else {
        fichas -= 10;
        numberDisplay.style.color = 'var(--gold)';
    }

    statFichas.innerText = fichas;
    statHits.innerText = hits;
    statTotal.innerText = total;
    
    freqChart.data.datasets[0].data = frequencies;
    freqChart.update();
    
    btnSpin.disabled = false;
};
