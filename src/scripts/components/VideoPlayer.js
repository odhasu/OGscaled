// Video Player Component
// Handles video playback with custom controls

class VideoPlayer {
  constructor(container) {
    this.container = container;
    this.video = container.querySelector('video');
    this.playButton = container.querySelector('.play-button');
    this.overlay = container.querySelector('.video-overlay');
    
    this.init();
  }

  init() {
    if (!this.video || !this.playButton) return;

    // Add event listeners
    this.playButton.addEventListener('click', () => this.togglePlay());
    this.video.addEventListener('click', () => this.togglePlay());
    this.video.addEventListener('ended', () => this.handleEnd());
    this.video.addEventListener('loadedmetadata', () => this.handleLoad());
  }

  togglePlay() {
    if (this.video.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  play() {
    // Pause all other videos first
    VideoPlayer.pauseAll(this.video);
    
    this.video.play();
    this.playButton.style.opacity = '0';
    if (this.overlay) {
      this.overlay.classList.remove('bg-black/40');
      this.overlay.classList.add('bg-black/0');
    }
  }

  pause() {
    this.video.pause();
    this.playButton.style.opacity = '1';
    if (this.overlay) {
      this.overlay.classList.remove('bg-black/0');
      this.overlay.classList.add('bg-black/40');
    }
  }

  handleEnd() {
    this.playButton.style.opacity = '1';
    if (this.overlay) {
      this.overlay.classList.remove('bg-black/0');
      this.overlay.classList.add('bg-black/40');
    }
    this.video.currentTime = 0;
  }

  handleLoad() {
    this.container.classList.add('loaded');
  }

  static pauseAll(exceptVideo = null) {
    document.querySelectorAll('.video-container video').forEach(video => {
      if (video !== exceptVideo && !video.paused) {
        const container = video.closest('.video-container');
        const player = new VideoPlayer(container);
        player.pause();
      }
    });
  }

  static initAll() {
    const containers = document.querySelectorAll('.video-container');
    containers.forEach(container => new VideoPlayer(container));
  }
}

export default VideoPlayer;
