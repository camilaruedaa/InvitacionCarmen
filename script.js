function abrirInvitacion() {
    const envelope = document.getElementById('envelope');
    const card = document.getElementById('card');
    const tapText = document.getElementById('tap-text');
    const musica = document.getElementById('musica');

    musica.play().catch(e => console.log("Audio listo tras interacción"));

    envelope.classList.add('open');
    card.classList.add('reveal');
    tapText.style.opacity = '0';

    setTimeout(() => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#d4af37', '#800020', '#ffffff']
        });
    }, 1000);
}

const countdown = () => {
    const countDate = new Date('February 15, 2026 09:15:00').getTime();
    const now = new Date().getTime();
    const gap = countDate - now;
    const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;

    if(document.getElementById('days')) {
        document.getElementById('days').innerText = Math.max(0, Math.floor(gap / day));
        document.getElementById('hours').innerText = Math.max(0, Math.floor((gap % day) / hour));
        document.getElementById('minutes').innerText = Math.max(0, Math.floor((gap % hour) / minute));
    }
};
setInterval(countdown, 1000);

// Calendario: 9:15 AM a 1:15 PM (13:15)
document.getElementById('calendar-btn').addEventListener('click', function(e) {
    e.preventDefault();
    const titulo = encodeURIComponent("Desayuno Carmen Rueda ✨");
    const lugar = encodeURIComponent("Fiesta Inn Coatzacoalcos, Mal. Costero No. 801, Santa Isabel, 96538 Coatzacoalcos, Ver.");
    const inicio = "20260215T091500";
    const fin = "20260215T131500";
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titulo}&dates=${inicio}/${fin}&location=${lugar}`;
    window.open(googleUrl, '_blank');
});

// Grabador de voz con Descarga Automática
let mediaRecorder;
let audioChunks = [];
const recordBtn = document.getElementById('record-btn');
const statusText = document.getElementById('record-status');
const playbackSection = document.getElementById('audio-playback');
const audioPreview = document.getElementById('audio-preview');

recordBtn.addEventListener('click', async () => {
    if (!mediaRecorder || mediaRecorder.state === "inactive") {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
            mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
                audioPreview.src = URL.createObjectURL(audioBlob);
                playbackSection.style.display = 'block';
                statusText.innerText = "¡Mensaje listo! 🎤✨";
            };
            mediaRecorder.start();
            recordBtn.classList.add('recording');
            statusText.innerText = "Grabando... (Toca para detener)";
        } catch (err) {
            alert("Por favor, activa el micrófono para grabar tu sorpresa.");
        }
    } else {
        mediaRecorder.stop();
        recordBtn.classList.remove('recording');
    }
});

// Lógica de envío y descarga automática al Grupo de WhatsApp
document.getElementById('send-audio-btn').addEventListener('click', () => {
    const linkGrupo = "https://chat.whatsapp.com/GRXDrC1i738DHcCrbHEiaz"; 
    
    // 1. Descarga automática del audio
    const audioUrl = audioPreview.src;
    const downloadLink = document.createElement('a');
    downloadLink.href = audioUrl;
    downloadLink.download = "Mensaje_Sorpresa_Carmen.mp3";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // 2. Instrucción clara para el invitado
    alert("¡Audio guardado! ✅\n\nSe abrirá el grupo de WhatsApp. Solo adjunta el archivo que acabamos de descargar y envíalo. ¡Le va a encantar! ✨");
    
    // 3. Redirección al grupo
    window.location.href = linkGrupo;
});
