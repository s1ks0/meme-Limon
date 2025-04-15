document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('memeVideo');
    const prompt = document.getElementById('prompt');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');

    function startVideo() {
        prompt.style.display = 'none';
        video.style.display = 'block';
        video.volume = 0;

        video.play().then(() => {
            increaseVolume();
        }).catch(error => {
            console.log('Playback error:', error);
        });
    }

    yesBtn.addEventListener('click', startVideo);
    noBtn.addEventListener('click', startVideo);

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
});