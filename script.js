document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded'); // Для отладки
    const video = document.getElementById('memeVideo');
    const lemonBtn = document.getElementById('lemonBtn');

    if (!video || !lemonBtn) {
        console.error('Element not found:', { video, lemonBtn });
        return;
    }

    // Ждём клика на лимон
    lemonBtn.addEventListener('click', () => {
        console.log('Lemon clicked, starting video');
        lemonBtn.style.display = 'none';
        video.style.display = 'block';
        video.volume = 0;
        video.muted = false;

        video.play().then(() => {
            console.log('Video started');
            increaseVolume();
        }).catch(error => {
            console.error('Playback error:', error);
            video.muted = true;
            video.play().then(() => {
                video.muted = false;
                increaseVolume();
            });
        });
    });

    function increaseVolume() {
        console.log('Starting volume increase');
        let volume = 0;
        const duration = 1000; // 1 секунда
        const startTime = performance.now();

        function updateVolume() {
            const elapsed = performance.now() - startTime;
            volume = Math.min(elapsed / duration, 1);
            video.volume = volume;
            console.log('Volume set to:', volume);
            if (volume < 1) {
                requestAnimationFrame(updateVolume);
            } else {
                console.log('Volume reached 100%');
            }
        }
        requestAnimationFrame(updateVolume);
    }
});