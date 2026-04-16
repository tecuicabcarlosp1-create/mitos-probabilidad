const gridContainer = document.getElementById('grid');
const probSlider = document.getElementById('prob-slider');
const probVal = document.getElementById('prob-val');
const contactSlider = document.getElementById('contact-slider');
const contactVal = document.getElementById('contact-val');
const btnNext = document.getElementById('btn-next');
const btnReset = document.getElementById('btn-reset');
const statFichas = document.getElementById('stat-fichas');
const statInfected = document.getElementById('stat-infected');
const statRound = document.getElementById('stat-round');

let grid = [];
let fichas = 100;
let round = 0;
let selectedPos = null;

probSlider.oninput = () => probVal.innerText = probSlider.value + '%';
contactSlider.oninput = () => contactVal.innerText = contactSlider.value;

function initGrid() {
    gridContainer.innerHTML = '';
    grid = [];
    round = 0;
    selectedPos = null;
    statInfected.innerText = 1;
    statRound.innerText = 0;
    
    for (let i = 0; i < 25; i++) {
        const person = document.createElement('div');
        person.className = 'person healthy';
        person.innerText = '👤';
        person.onclick = () => selectPerson(i);
        gridContainer.appendChild(person);
        grid.push({ status: 'healthy', element: person });
    }
    
    // Initial infected (middle)
    grid[12].status = 'infected';
    grid[12].element.className = 'person infected';
    grid[12].element.innerText = '🤮';
}

function selectPerson(idx) {
    if (grid[idx].status === 'infected') return;
    
    if (selectedPos !== null) {
        grid[selectedPos].element.classList.remove('selected');
    }
    
    selectedPos = idx;
    grid[idx].element.classList.add('selected');
}

function nextRound() {
    if (round >= 20 || fichas <= 0) return;
    
    const newInfected = [];
    const probability = probSlider.value / 100;
    const maxContacts = parseInt(contactSlider.value);
    
    // Find all neighbors of infected people
    grid.forEach((p, idx) => {
        if (p.status === 'infected') {
            const neighbors = getNeighbors(idx);
            let contagions = 0;
            
            neighbors.forEach(nIdx => {
                if (grid[nIdx].status === 'healthy' && contagions < maxContacts) {
                    if (Math.random() < probability) {
                        newInfected.push(nIdx);
                        contagions++;
                    }
                }
            });
        }
    });

    // Update grid
    const uniqueInfected = [...new Set(newInfected)];
    let hitFound = false;
    
    uniqueInfected.forEach(idx => {
        grid[idx].status = 'infected';
        grid[idx].element.className = 'person infected';
        grid[idx].element.innerText = '🤮';
        if (idx === selectedPos) hitFound = true;
    });

    // Scoring
    if (selectedPos !== null) {
        if (hitFound) {
            fichas += 10;
            grid[selectedPos].element.style.borderColor = 'var(--green)';
        } else {
            fichas -= 10;
        }
    }
    
    selectedPos = null;
    round++;
    statFichas.innerText = fichas;
    statRound.innerText = round;
    statInfected.innerText = grid.filter(p => p.status === 'infected').length;
    
    if (grid.every(p => p.status === 'infected')) {
        btnNext.disabled = true;
    }
}

function getNeighbors(idx) {
    const neighbors = [];
    const row = Math.floor(idx / 5);
    const col = idx % 5;
    
    if (row > 0) neighbors.push(idx - 5);
    if (row < 4) neighbors.push(idx + 5);
    if (col > 0) neighbors.push(idx - 1);
    if (col < 4) neighbors.push(idx + 1);
    
    return neighbors;
}

btnNext.onclick = nextRound;
btnReset.onclick = initGrid;

initGrid();
