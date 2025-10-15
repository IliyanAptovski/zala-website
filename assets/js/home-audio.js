// assets/js/home-audio.js - HOME PAGE ONLY
class HomeAudioPlayer {
    constructor() {
        this.audio = document.getElementById('song-audio');
        this.playBtn = document.getElementById('audio-play-btn');
        this.playIcon = document.querySelector('.play-icon');
        this.pauseIcon = document.querySelector('.pause-icon');
        this.timeDisplay = document.getElementById('song-time');
        this.nowPlaying = document.getElementById('now-playing');
        this.songPlayer = document.querySelector('.song-player');
        
        this.isPlaying = false;
        this.init();
    }

    init() {
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.setupAudioEvents();
        this.updateDisplay();
    }

    setupAudioEvents() {
        this.audio.addEventListener('timeupdate', () => {
            this.updateTimeDisplay();
        });

        this.audio.addEventListener('ended', () => {
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

    play() {
        this.audio.play().then(() => {
            this.isPlaying = true;
            this.updateDisplay();
        }).catch(error => {
            console.error('Error playing audio:', error);
        });
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updateDisplay();
    }

    updateDisplay() {
        if (this.isPlaying) {
            this.playBtn.classList.add('playing');
            this.playIcon.style.display = 'none';
            this.pauseIcon.style.display = 'block';
            this.songPlayer.classList.add('playing');
            this.nowPlaying.style.display = 'block';
        } else {
            this.playBtn.classList.remove('playing');
            this.playIcon.style.display = 'block';
            this.pauseIcon.style.display = 'none';
            this.songPlayer.classList.remove('playing');
            this.nowPlaying.style.display = 'none';
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
}

// Initialize only on home page
if (document.body.classList.contains('home')) {
    document.addEventListener('DOMContentLoaded', () => {
        new HomeAudioPlayer();
    });
}