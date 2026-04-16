const tombola = document.getElementById('tombola');
const resultText = document.getElementById('result-text');
const btnTry = document.getElementById('btn-try');
const progressBar = document.getElementById('progress-bar');
const statFichas = document.getElementById('stat-fichas');
const statAttempts = document.getElementById('stat-attempts');
const statWins = document.getElementById('stat-wins');
const winAnim = document.getElementById('win-anim');

let fichas = 1000;
let attempts = 0;
let wins = 0;

btnTry.onclick = async () => {
    if (fichas < 10) {
        alert("¡No tienes fichas suficientes!");
        return;
    }

    fichas -= 10;
    attempts++;
    statFichas.innerText = fichas;
    statAttempts.innerText = attempts;
    
    // Progress bar fills up to 100 attempts
    const progress = Math.min((attempts % 100) / 100 * 100, 100);
    progressBar.style.width = progress + '%';

    btnTry.disabled = true;
    tombola.classList.add('spinning');
    resultText.innerText = 'Buscando premio...';
    winAnim.style.display = 'none';

    await new Promise(r => setTimeout(r, 800));
    
    tombola.classList.remove('spinning');
    
    if (Math.random() < 0.05) {
        wins++;
        statWins.innerText = wins;
        resultText.innerText = '¡LO LOGRASTE!';
        winAnim.style.display = 'block';
    } else {
        resultText.innerText = 'Nada por ahora...';
    }

    btnTry.disabled = false;
};
