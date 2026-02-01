let noClickCount = 0;

// Attach events AFTER DOM loads
document.addEventListener('DOMContentLoaded', () => {
    displayCat();

    document.getElementById('yes-button').addEventListener('click', () => selectOption('yes'));
    document.getElementById('no-button').addEventListener('click', () => selectOption('no'));
});

function selectOption(option) {
    const yesBtn = document.getElementById('yes-button');
    const noBtn = document.getElementById('no-button');

    if (option === 'yes') {
        playSong();
        heartsConfetti();

        document.getElementById('question').style.display = 'none';
        document.getElementById('options').style.display = 'none';

        displayCatHeart();
    } else {
        noClickCount++;

        // Grow Yes button
        const size = parseFloat(getComputedStyle(yesBtn).fontSize);
        yesBtn.style.fontSize = (size * 1.8) + 'px';

        const messages = [
            "What if I begged :((",
            "Sige na po pleasee :((",
            "Awhh why not :((",
            "Baby pleasee :((",
            "Pleasee :(("
        ];

        noBtn.innerText = messages[Math.min(noClickCount - 1, messages.length - 1)];
    }
}

// 🎵 AUDIO (works because triggered by click)
function playSong() {
    const audio = document.getElementById('iris-audio');
    audio.currentTime = 0;
    audio.volume = 0.6;
    audio.play().catch(err => console.log("Audio blocked:", err));
}

// ❤️ HEART CONFETTI
function heartsConfetti() {
    for (let i = 0; i < 120; i++) {
        const heart = document.createElement('div');
        heart.innerText = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.fontSize = Math.random() * 20 + 14 + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.transition = 'all 1.6s ease-out';

        document.body.appendChild(heart);

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 350 + 100;

        setTimeout(() => {
            heart.style.transform =
                `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
            heart.style.opacity = '0';
        }, 50);

        setTimeout(() => heart.remove(), 1800);
    }
}

// 🐱 Initial cat
function displayCat() {
    const container = document.getElementById('image-container');
    container.innerHTML = '';

    const img = new Image();
    img.src = 'cat.gif';
    img.onload = () => container.appendChild(img);
}

// ⌨️ SLOWER TYPING EFFECT
function typeText(element, text, speed = 45) { // ← slower here
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text[i];
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// 💖 Cat-heart first, letter AFTER delay
function displayCatHeart() {
    const container = document.getElementById('image-container');
    container.innerHTML = '';

    const img = new Image();
    img.src = 'cat-heart.gif';

    const text = document.createElement('div');
    text.className = 'love-text';

    const letter =
`Thank you so much for accepting to be my Valentine. Kahit na siguro pinindot mo yung no for some time, or maybe not, I still want you to know how much this truly means to me. Knowing that you chose me, even just for this one day, makes my heart so happy.

Even if we are not able to spend Valentine’s Day together, I still want this day to feel more special than any other, because you deserve it.

In these past few months, I have never been more sure of anyone else in my entire life. Thank you for making me into a better version of myself and the warmth you bring into my life without even trying. You do not just make me happy, you make me feel seen, and that means more to me than I can put into words.

From the first time I met you until today, I cannot help but feel grateful for every moment that led us here.
I hope I can bring you even more joy in the future and be there for you every single time you need someone. I am willing to wait until you are ready to be in a relationship,

because I am genuinely happy just talking to you every day. Being able to share my thoughts, my time, and my feelings with you already feels like something special.

I hope you can be patient with me too. I know I can be dumb sometimes, and not able to read you but I promise that I always trying my best. I love you so much, and I hope ill never make you feel unlovable. You are such an amazing person, and loving you is something I am most proud of. I would love nothing more than to spend my entire life with you.

 CHOOSING YOU IS THE EASIEST DECISION I HAVE EVER MADE`;

    img.onload = () => {
        container.appendChild(img);
        container.appendChild(text);

        // ⏳ WAIT 2.5 SECONDS before typing starts
        setTimeout(() => {
            typeText(text, letter, 45);
        }, 2500);
    };
}

