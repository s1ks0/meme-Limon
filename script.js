document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded'); // Для отладки
    const video = document.getElementById('memeVideo');
    const loader = document.getElementById('loader');

    if (!video || !loader) {
        console.error('Element not found:', { video, loader });
        return;
    }

    // Проверяем, была ли страница уже загружена
    const isReloaded = sessionStorage.getItem('reloaded');

    if (!isReloaded) {
        // Первая загрузка: устанавливаем флаг и перезагружаем через 1 секунду
        console.log('First load, reloading page');
        sessionStorage.setItem('reloaded', 'true');
        setTimeout(() => {
            window.location.reload();
        }, 1000); // Задержка 1 секунда, как на sndtag.ru
    } else {
        // Вторая загрузка: запускаем видео
        console.log('Second load, starting video');
        loader.style.display = 'none';
        video.style.display = 'block';
        video.volume = 0;
        video.muted = false;

        video.play().then(() => {
            console.log('Video started');
            increaseVolume();
            // Очищаем флаг, чтобы цикл начинался заново при следующем визите
            sessionStorage.removeItem('reloaded');
        }).catch(error => {
            console.error('Playback error:', error);
            video.muted = true;
            video.play().then(() => {
                video.muted = false;
                increaseVolume();
                sessionStorage.removeItem('reloaded');
            });
        });
    }

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