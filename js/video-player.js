// Video Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    const videoContainers = document.querySelectorAll('.video-container');
    
    videoContainers.forEach(container => {
        const video = container.querySelector('video');
        const playButton = container.querySelector('.play-button');
        
        if (!video || !playButton) return;

        // Add play/pause functionality
        playButton.addEventListener('click', function() {
            if (video.paused) {
                // Stop all other videos
                videoContainers.forEach(otherContainer => {
                    const otherVideo = otherContainer.querySelector('video');
                    const otherButton = otherContainer.querySelector('.play-button');
                    if (otherVideo !== video && !otherVideo.paused) {
                        otherVideo.pause();
                        otherButton.style.display = 'flex';
                    }
                });
                
                video.play();
                playButton.style.display = 'none';
            } else {
                video.pause();
                playButton.style.display = 'flex';
            }
        });

        // Handle video end
        video.addEventListener('ended', function() {
            playButton.style.display = 'flex';
            video.currentTime = 0;
        });

        // Handle click outside of play button
        video.addEventListener('click', function(e) {
            e.preventDefault();
            if (video.paused) {
                playButton.click();
            } else {
                video.pause();
                playButton.style.display = 'flex';
            }
        });

        // Preload video metadata
        video.addEventListener('loadedmetadata', function() {
            // Video metadata is loaded and ready
            container.classList.add('loaded');
        });
    });
});