import moviepy.editor as mp
from pydub import AudioSegment
from pydub.effects import normalize
from pydub.playback import play
import numpy as np
import librosa
import soundfile as sf

def apply_auto_tune(audio_segment):
    # Convert audio segment to numpy array
    samples = np.array(audio_segment.get_array_of_samples())
    
    # Apply pitch shifting (example: shifting down by 4 semitones for male vocals)
    pitch_shifted = librosa.effects.pitch_shift(samples.astype(float), sr=audio_segment.frame_rate, n_steps=-4)
    
    # Apply a simple form of vocal tuning (e.g., using a low-pass filter)
    tuned_audio_segment = AudioSegment(
        pitch_shifted.tobytes(),
        frame_rate=audio_segment.frame_rate,
        sample_width=audio_segment.sample_width,
        channels=audio_segment.channels
    ).low_pass_filter(3000)  # Low-pass filter to smooth out high frequencies
    
    return tuned_audio_segment

def extract_audio(video_file, audio_file, start_time, end_time):
    # Load the video file
    video = mp.VideoFileClip(video_file)
    
    # Extract audio and subclip it
    audio = video.audio.subclip(start_time, end_time)
    
    # Write the audio to a temporary WAV file
    temp_audio_file = 'temp_audio.wav'
    audio.write_audiofile(temp_audio_file)

    # Load the audio file with pydub
    audio_segment = AudioSegment.from_wav(temp_audio_file)
    
    # tuned_audio = apply_auto_tune(audio_segment)
    # # Normalize the audio
    # final_audio = normalize(tuned_audio)
    # # Export the final audio as MP3
    # final_audio.export(audio_file, format='mp3')

    # # Apply Echo effect
    # echo_audio = audio_segment + audio_segment.fade_in(500).fade_out(500)
    # # Apply Lo-Fi effect (reduce sample rate and add noise)
    lo_fi_audio = audio_segment
    # .set_frame_rate(22050).set_sample_width(1)
    # Pitch shifting (lowering the pitch)
    pitch_shifted = lo_fi_audio._spawn(lo_fi_audio.raw_data, overrides={"frame_rate": int(lo_fi_audio.frame_rate * 0.9)}).set_frame_rate(lo_fi_audio.frame_rate)
    # Equalization: Boosting bass and treble
    bass_boosted = pitch_shifted + 6  # Increase bass
    treble_boosted = bass_boosted.high_pass_filter(3000) + 3  # Boost treble
    noise_reduced_audio = treble_boosted.low_pass_filter(3000)  # Adjust the cutoff frequency as needed
    # Normalize the audio
    final_audio = normalize(pitch_shifted)
    # Export the final audio as MP3
    final_audio.export(audio_file, format='mp3')

    # Close the video object
    video.close()

# Example usage
extract_audio('./PXL_20240429_103212039.mp4', './audio1.mp3', start_time=22, end_time=52)