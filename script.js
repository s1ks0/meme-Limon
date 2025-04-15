document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded'); // Для отладки
    const video = document.getElementById('memeVideo');
    const prompt = document.getElementById('prompt');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');

    if (!video || !prompt || !yesBtn || !noBtn) {
        console.error('Element not found:', { video, prompt, yesBtn, noBtn });
        return;
    }

    function startVideo() {
        console.log('Button clicked, starting video'); // Для отладки
        prompt.style.display = 'none';
        video.style.display = 'block';
        video.volume = 0; // Устанавливаем начальную громкость
        video.muted = false; // Убедимся, что звук включён

        video.play().then(() => {
            console.log('Video started'); // Для отладки
            increaseVolume();
        }).catch(error => {
            console.error('Playback error:', error);
            // Пробуем запустить без звука, затем включить
            video.muted = true;
            video.play().then(() => {
                video.muted = false;
                increaseVolume();
            });
        });
    }

    yesBtn.addEventListener('click', startVideo);
    noBtn.addEventListener('click', startVideo);

    function increaseVolume() {
        console.log('Starting volume increase'); // Для отладки
        let volume = 0;
        const duration = 1000; // 1 секунда в миллисекундах
        const startTime = performance.now();

        function updateVolume() {
            const elapsed = performance.now() - startTime;
            volume = Math.min(elapsed / duration, 1); // Линейно от 0 до 1
            video.volume = volume;
            console.log('Volume set to:', volume); // Для отладки
            if (volume < 1) {
                requestAnimationFrame(updateVolume);
            } else {
                console.log('Volume reached 100%'); // Для отладки
            }
        }
        requestAnimationFrame(updateVolume);
    }
});