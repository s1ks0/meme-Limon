document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('memeVideo');
    video.volume = 0;

    video.play().catch(error => {
        console.log('Autoplay blocked:', error);
        video.muted = true;
        video.play().then(() => {
            video.muted = false;
            increaseVolume();
        });
    });

    function increaseVolume() {
        let volume = 0;
        const startTime = performance.now();
        function updateVolume() {
            const elapsed = (performance.now() - startTime) / 1000;
            volume = Math.min(elapsed, 1);
            video.volume = volume;
            if (volume < 1) {
                requestAnimationFrame(updateVolume);
            }
        }
        requestAnimationFrame(updateVolume);
    }
    increaseVolume();
});