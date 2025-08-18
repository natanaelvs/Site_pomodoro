// --- Selecionando os elementos do HTML ---
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

// --- Variáveis do Cronômetro ---
const WORK_MINUTES = 25; // Definindo o tempo de trabalho como uma constante
let minutes = WORK_MINUTES;
let seconds = 0;
let isPaused = true;
let timerInterval = null; // Iniciar o intervalo como nulo

// --- Funções ---

// Função para atualizar o visor do cronômetro
function updateDisplay() {
    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).padStart(2, '0');
    timerDisplay.textContent = `${displayMinutes}:${displaySeconds}`;
    document.title = `${displayMinutes}:${displaySeconds}`; // Bônus: atualiza o título da aba
}

// Função que para o cronômetro
function stopTimer() {
    clearInterval(timerInterval); // Limpa o intervalo
    timerInterval = null; // Define o intervalo como nulo para garantir que ele possa ser iniciado novamente
    isPaused = true;
}

// Função principal que faz a contagem regressiva
function countdown() {
    if (seconds > 0) {
        seconds--;
    } else if (minutes > 0) {
        minutes--;
        seconds = 59;
    } else {
        // Quando o tempo acaba
        stopTimer();
        alert("Pomodoro finalizado! Hora de uma pausa.");
        return;
    }
    updateDisplay();
}

// --- Event Listeners (O que acontece quando clicamos nos botões)---

startBtn.addEventListener('click', () => {
    // Só inicia um novo intervalo se o timer não estiver rodando
    if (timerInterval === null) {
        isPaused = false;
        // A função countdown será executada a cada 1000 milissegundos (1 segundo)
        timerInterval = setInterval(countdown, 1000);
    }
});

pauseBtn.addEventListener('click', () => {
    // Simplesmente para o timer
    stopTimer();
});

resetBtn.addEventListener('click', () => {
    stopTimer(); // Para o cronômetro atual
    minutes = WORK_MINUTES; // Reseta os minutos
    seconds = 0;
    updateDisplay(); // Reseta o visor para o tempo inicial
});

// --- Iniciar o visor com o tempo padrão ---
updateDisplay();