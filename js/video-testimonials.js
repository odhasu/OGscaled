// Handle video play/pause functionality
document.addEventListener('DOMContentLoaded', () => {
    const videoContainers = document.querySelectorAll('.video-container');

    videoContainers.forEach(container => {
        const video = container.querySelector('video');
        const playButton = container.querySelector('.play-button');
        const overlay = container.querySelector('.bg-black\\/40');

        playButton.addEventListener('click', () => {
            if (video.paused) {
                // Pause all other videos first
                document.querySelectorAll('.video-container video').forEach(v => {
                    if (!v.paused && v !== video) {
                        v.pause();
                        const otherContainer = v.closest('.video-container');
                        otherContainer.querySelector('.play-button').style.opacity = '1';
                        otherContainer.querySelector('.bg-black\\/40').classList.remove('bg-black/0');
                        otherContainer.querySelector('.bg-black\\/40').classList.add('bg-black/40');
                    }
                });

                // Play this video
                video.play();
                playButton.style.opacity = '0';
                overlay.classList.remove('bg-black/40');
                overlay.classList.add('bg-black/0');
            } else {
                // Pause this video
                video.pause();
                playButton.style.opacity = '1';
                overlay.classList.remove('bg-black/0');
                overlay.classList.add('bg-black/40');
            }
        });

        // Reset play button when video ends
        video.addEventListener('ended', () => {
            playButton.style.opacity = '1';
            overlay.classList.remove('bg-black/0');
            overlay.classList.add('bg-black/40');
        });
    });
});