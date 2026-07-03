// -------------------
// Global Variables
// -------------------
let scanProgress = 0;
let scanRunning = false;
let soundEnabled = true;
let scanInterval;
let statsInterval;

// -------------------
// Elements
// -------------------
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const scanLog = document.getElementById('scanLog');
const resultPopup = document.getElementById('resultPopup');
const resultTitle = document.getElementById('resultTitle');
const resultMessage = document.getElementById('resultMessage');
const removeBtn = document.getElementById('removeBtn');
const restartBtn = document.getElementById('restartBtn');
const soundToggle = document.getElementById('soundToggle');
const scanSound = document.getElementById('scanSound');
const alertSound = document.getElementById('alertSound');
const datetimeEl = document.getElementById('datetime');
const cpuEl = document.getElementById('cpuValue');
const ramEl = document.getElementById('ramValue');
const storageEl = document.getElementById('storageValue');

// -------------------
// Update Date & Time
// -------------------
function updateDateTime() {
    const now = new Date();
    datetimeEl.textContent = now.toLocaleString();
}
setInterval(updateDateTime, 1000);
updateDateTime();

// -------------------
// Animate System Stats
// -------------------
function updateStats() {
    const cpu = Math.floor(Math.random() * 25) + 50;
    const ram = Math.floor(Math.random() * 20) + 60;
    const storage = (scanProgress / 100 * 500).toFixed(1);
    cpuEl.textContent = `${cpu}%`;
    ramEl.textContent = `${ram}%`;
    storageEl.textContent = `${storage} GB`;
}
statsInterval = setInterval(updateStats, 1200);

// -------------------
// Background Particles
// -------------------
function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 80; i++) {
        const p = document.createElement('div');
        p.style.position = 'absolute';
        p.style.width = `${Math.random() * 2 + 1}px`;
        p.style.height = p.style.width;
        p.style.background = 'rgba(0, 255, 128, 0.6)';
        p.style.borderRadius = '50%';
        p.style.boxShadow = '0 0 8px rgba(0, 255, 128, 0.8)';
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        p.style.animation = `float ${Math.random() * 6 + 3}s linear infinite`;
        container.appendChild(p);
    }
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0); opacity: 0.2; }
            50% { opacity: 0.8; }
            100% { transform: translateY(-100vh); opacity: 0.2; }
        }
    `;
    document.head.appendChild(style);
}
createParticles();

// -------------------
// Sound Controls
// -------------------
soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggle.textContent = soundEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
    soundEnabled ? scanSound.play() : scanSound.pause();
});

// -------------------
// Scan Log Entries
// -------------------
const scanEntries = [
    "✓ Scanning system files...",
    "✓ Checking boot sectors...",
    "✓ Analyzing registry entries...",
    "✓ Scanning temporary folders...",
    "✓ Checking network connections...",
    "⚠️ Suspicious file pattern detected...",
    "✓ Verifying system integrity...",
    "⚠️ Possible risk found: generic.unwanted.01",
    "✓ Scanning program directories...",
    "⚠️ High-risk signature detected: trojan.fake.prank",
    "✓ Checking memory processes...",
    "⚠️ Multiple suspicious entries found...",
    "✓ Scanning compressed archives...",
    "⚠️ Potential malware behavior identified...",
    "✓ Final system verification..."
];

// -------------------
// Start Scan
// -------------------
function startScan() {
    scanProgress = 0;
    scanRunning = true;
    scanLog.innerHTML = "";
    resultPopup.classList.add('hidden');
    removeBtn.classList.remove('hidden');
    restartBtn.classList.add('hidden');
    resultTitle.textContent = "⚠️ THREATS DETECTED";
    resultMessage.textContent = "Your system appears to be infected with potentially unwanted programs and security risks.";
    resultTitle.classList.remove('glitch');

    if (soundEnabled) scanSound.play();

    scanInterval = setInterval(() => {
        if (scanProgress < 100) {
            scanProgress += Math.random() * 2 + 0.8;
            if (scanProgress > 100) scanProgress = 100;

            progressFill.style.width = `${scanProgress}%`;
            progressText.textContent = `${Math.round(scanProgress)}%`;

            if (Math.random() > 0.7) {
                const entry = scanEntries[Math.floor(Math.random() * scanEntries.length)];
                const logLine = document.createElement('div');
                logLine.textContent = entry;
                if (entry.includes("⚠️")) logLine.style.color = "#ff8090";
                scanLog.appendChild(logLine);
                scanLog.scrollTop = scanLog.scrollHeight;
            }
        } else {
            finishScan();
        }
    }, 200);
}

// -------------------
// Finish Scan
// -------------------
function finishScan() {
    clearInterval(scanInterval);
    scanSound.pause();
    scanRunning = false;
    if (soundEnabled) alertSound.play();
    resultPopup.classList.remove('hidden');
    resultTitle.classList.add('glitch');
}

// -------------------
// Remove Button Action
// -------------------
removeBtn.addEventListener('click', () => {
    resultTitle.classList.remove('glitch');
    resultTitle.textContent = "✅ SYSTEM SAFE";
    resultMessage.innerHTML = "😂 PRANK! Your device is completely safe.<br><br>This website is only a harmless simulation — no changes were made to your system, no data collected, and no real threats exist.";
    removeBtn.classList.add('hidden');
    restartBtn.classList.remove('hidden');
});

// -------------------
// Restart Scan
// -------------------
restartBtn.addEventListener('click', startScan);

// -------------------
// Start Automatically
// -------------------
window.addEventListener('load', startScan);
