import { supabase } from './supabase-config.js';
import { isAdmin, getCurrentUser } from './supabase-auth.js';

console.log('🔧 Admin Manager Initialized');

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const songForm = document.getElementById('song-form');
  const titleInput = document.getElementById('song-title');
  const audioInput = document.getElementById('audio-file');
  const videoInput = document.getElementById('video-file');
  const audioPreview = document.getElementById('audio-preview');
  const videoPreview = document.getElementById('video-preview');
  const uploadBtn = document.getElementById('upload-btn');
  const statusDiv = document.getElementById('status');
  const charCounter = document.getElementById('char-counter');

  // --- Admin check ---
  if (!isAdmin()) {
    alert('Access denied: you are not an admin.');
    window.location.href = 'index.html';
    return;
  }

  // --- Character counter ---
  titleInput.addEventListener('input', () => {
    charCounter.textContent = `${titleInput.value.length}/100`;
  });

  // --- File previews ---
  audioInput.addEventListener('change', () => {
    const file = audioInput.files[0];
    audioPreview.textContent = file ? `Selected: ${file.name}` : '';
  });

  videoInput.addEventListener('change', () => {
    const file = videoInput.files[0];
    videoPreview.textContent = file ? `Selected: ${file.name}` : '';
  });

  // --- Upload & update handler ---
  uploadBtn.addEventListener('click', async () => {
    const title = titleInput.value.trim();
    const audioFile = audioInput.files[0];
    const videoFile = videoInput.files[0];

    if (!title || !audioFile || !videoFile) {
      statusDiv.textContent = '⚠️ Please fill all fields and select both files.';
      return;
    }

    try {
      statusDiv.textContent = '⏳ Uploading files...';

      // --- Generate unique file paths ---
      const timestamp = Date.now();
      const audioPath = `song-files/audio-${timestamp}-${audioFile.name}`;
      const videoPath = `song-files/video-${timestamp}-${videoFile.name}`;

      // --- Upload Audio ---
      let { error: audioError } = await supabase.storage
        .from('song-files')
        .upload(audioPath, audioFile, { cacheControl: '3600', upsert: true });

      if (audioError) throw audioError;

      // --- Upload Video ---
      let { error: videoError } = await supabase.storage
        .from('song-files')
        .upload(videoPath, videoFile, { cacheControl: '3600', upsert: true });

      if (videoError) throw videoError;

      // --- Get public URLs ---
      const { publicUrl: audioUrl } = supabase.storage.from('song-files').getPublicUrl(audioPath);
      const { publicUrl: videoUrl } = supabase.storage.from('song-files').getPublicUrl(videoPath);

      // --- Update database ---
      const { data, error: dbError } = await supabase
        .from('song_of_the_week')
        .insert([{ title, audio_url: audioUrl, video_url: videoUrl }]);

      if (dbError) throw dbError;

      statusDiv.textContent = '✅ Song updated successfully!';
      titleInput.value = '';
      audioInput.value = '';
      videoInput.value = '';
      audioPreview.textContent = '';
      videoPreview.textContent = '';
      charCounter.textContent = '0/100';

    } catch (err) {
      console.error('Upload error:', err);
      statusDiv.textContent = '❌ Error updating song: ' + err.message;
    }
  });
});
