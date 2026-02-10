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

document.getElementById('calendar-btn').addEventListener('click', function(e) {
    e.preventDefault();
    const titulo = encodeURIComponent("Desayuno Carmen Rueda ✨");
    const lugar = encodeURIComponent("Fiesta Inn Coatzacoalcos, Mal. Costero No. 801, Santa Isabel, 96538 Coatzacoalcos, Ver.");
    const inicio = "20260215T091500";
    const fin = "20260215T121500";
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titulo}&dates=${inicio}/${fin}&location=${lugar}`;
    window.open(googleUrl, '_blank');
});

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
                statusText.innerText = "¡Quedó genial! ✨";
            };
            mediaRecorder.start();
            recordBtn.classList.add('recording');
            statusText.innerText = "Grabando... (Toca para detener)";
        } catch (err) {
            alert("Activa el micrófono para grabar tu mensaje.");
        }
    } else {
        mediaRecorder.stop();
        recordBtn.classList.remove('recording');
    }
});

document.getElementById('send-audio-btn').addEventListener('click', () => {
    const linkGrupo = "https://chat.whatsapp.com/GRXDrC1i738DHcCrbHEiaz"; 
    alert("¡Qué detalle! Al cerrar este mensaje se abrirá el grupo de WhatsApp. ¡Pega o comparte tu audio ahí! ✨");
    window.location.href = linkGrupo;
});
