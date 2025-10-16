class HomeAudioPlayer {
    constructor() {
        this.audio = document.getElementById('song-audio');
        this.playBtn = document.getElementById('audio-play-btn');
        this.playIcon = document.querySelector('.play-icon');
        this.pauseIcon = document.querySelector('.pause-icon');
        this.timeDisplay = document.getElementById('song-time');
        this.nowPlaying = document.getElementById('now-playing');
        this.songPlayer = document.querySelector('.song-player');
        this.video = document.querySelector('.song-background video');
        
        this.isPlaying = false;
        this.videoInitialized = false;
        this.init();
    }

    init() {
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.setupAudioEvents();
        this.setupVideo();
        this.updateDisplay();
    }

    setupVideo() {
        if (!this.video) return;
        
        // Video configuration
        this.video.muted = true;
        this.video.loop = true;
        this.video.playsInline = true;
        
        // Attempt to preload and play video
        this.video.addEventListener('loadeddata', () => {
            this.videoInitialized = true;
            this.songPlayer.classList.remove('loading');
            console.log('Video background loaded successfully');
        });

        this.video.addEventListener('error', (e) => {
            console.error('Video background failed to load:', e);
            this.songPlayer.classList.remove('loading');
            // Fallback to static background if video fails
            this.songPlayer.style.background = "url('/assets/images/fallback-bg.jpg') center/cover";
        });

        // Set video to first frame and pause initially
        this.video.currentTime = 0;
        this.video.pause();
    }

    setupAudioEvents() {
        this.audio.addEventListener('timeupdate', () => {
            this.updateTimeDisplay();
        });

        this.audio.addEventListener('ended', () => {
            this.isPlaying = false;
            this.updateDisplay();
        });

        this.audio.addEventListener('play', () => {
            this.isPlaying = true;
            this.updateDisplay();
        });

        this.audio.addEventListener('pause', () => {
            this.isPlaying = false;
            this.updateDisplay();
        });
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    async play() {
        try {
            // Start video first if available
            if (this.video && this.videoInitialized) {
                await this.video.play();
            }
            
            // Then start audio
            await this.audio.play();
            this.isPlaying = true;
            this.updateDisplay();
            
        } catch (error) {
            console.error('Error playing media:', error);
            
            // If video fails but audio works, continue with audio only
            if (this.audio.paused) {
                await this.audio.play();
                this.isPlaying = true;
                this.updateDisplay();
            }
        }
    }

    pause() {
        this.audio.pause();
        
        // Pause video but keep it at current frame
        if (this.video) {
            this.video.pause();
        }
        
        this.isPlaying = false;
        this.updateDisplay();
    }

    updateDisplay() {
        if (this.isPlaying) {
            // Playing state
            this.playBtn.classList.add('playing');
            this.playIcon.style.display = 'none';
            this.pauseIcon.style.display = 'block';
            this.songPlayer.classList.add('playing');
            this.nowPlaying.style.display = 'block';
            
            // Ensure video is playing and synced
            if (this.video && this.videoInitialized && this.video.paused) {
                this.video.play().catch(e => {
                    console.log('Video play failed, continuing with audio only:', e);
                });
            }
            
        } else {
            // Paused state
            this.playBtn.classList.remove('playing');
            this.playIcon.style.display = 'block';
            this.pauseIcon.style.display = 'none';
            this.songPlayer.classList.remove('playing');
            this.nowPlaying.style.display = 'none';
            
            // Pause video but don't reset it
            if (this.video && !this.video.paused) {
                this.video.pause();
            }
        }
    }

    updateTimeDisplay() {
        this.timeDisplay.textContent = this.formatTime(this.audio.currentTime);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Optional: Sync video with audio (for visualizers, etc.)
    syncVideoWithAudio() {
        if (this.video && this.isPlaying) {
            // Keep video in sync with audio (simple version)
            const audioTime = this.audio.currentTime;
            const videoDuration = this.video.duration;
            
            if (videoDuration && !isNaN(videoDuration)) {
                // Loop video to match audio progress
                const videoTime = audioTime % videoDuration;
                this.video.currentTime = videoTime;
            }
        }
    }

    // Method to change video source dynamically
    changeVideoSource(newVideoSrc) {
        if (this.video) {
            this.videoInitialized = false;
            this.songPlayer.classList.add('loading');
            
            this.video.src = newVideoSrc;
            this.video.load();
            
            this.video.addEventListener('loadeddata', () => {
                this.videoInitialized = true;
                this.songPlayer.classList.remove('loading');
                
                // If audio was playing, restart video
                if (this.isPlaying) {
                    this.video.play().catch(console.error);
                }
            }, { once: true });
        }
    }
}

// Enhanced initialization with error handling
function initializeHomeAudioPlayer() {
    try {
        // Check if we're on home page and required elements exist
        if (!document.body.classList.contains('home')) {
            return;
        }

        const audioElement = document.getElementById('song-audio');
        if (!audioElement) {
            console.warn('Audio element not found on home page');
            return;
        }

        // Initialize the player
        const player = new HomeAudioPlayer();
        
        // Add global reference for debugging (optional)
        window.homeAudioPlayer = player;
        
        console.log('Home audio player initialized successfully');
        
    } catch (error) {
        console.error('Failed to initialize home audio player:', error);
    }
}

// Initialize only on home page
document.addEventListener('DOMContentLoaded', initializeHomeAudioPlayer);

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HomeAudioPlayer;
}