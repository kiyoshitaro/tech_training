import yt_dlp
import os

def time_to_seconds(time_str):
    h, m, s = time_str.split(':')
    return float(h) * 3600 + float(m) * 60 + float(s)

def download_subtitles_only(url, output_path='./', start_time=None, end_time=None, custom_filename=None):
    ydl_opts = {
        'format': 'best',
        'writesubtitles': True,  # Enable subtitle downloading
        'writeautomaticsub': True,  # Download automatic subtitles if available
        'subtitleslangs': ['en'],  # Change this to the desired language code
        'subtitlesformat': 'vtt',  # Set subtitle format
        'outtmpl': output_path + (custom_filename or '%(title)s') + '.%(ext)s',
        'noplaylist': True,  # Avoid downloading playlists
    }
    
    if start_time and end_time:
        ydl_opts['download_ranges'] = lambda info, _: [{'start_time': time_to_seconds(start_time), 'end_time': time_to_seconds(end_time)}]
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        base_filename = os.path.splitext(ydl.prepare_filename(info))[0]
        subtitle_filename = f"{base_filename}.en.vtt"  # Adjust based on language
        return subtitle_filename
youtube_url = 'https://youtu.be/GHbKK4alWIA?si=VzfuB5g8ZbmskhOx'
subtitle_file = download_subtitles_only(youtube_url, './')


# def download_mp3_and_subtitles(url, output_path='./', start_time=None, end_time=None, custom_filename=None):
#     ydl_opts = {
#         'format': 'bestaudio/best',
#         'postprocessors': [{
#             'key': 'FFmpegExtractAudio',
#             'preferredcodec': 'mp3',
#             'preferredquality': '192',
#         }, {
#             'key': 'FFmpegFilter',
#             'filters': [
#                 # Boost bass
#                 'bass=g=5:f=110:w=0.6',
#                 # Lo-fi effect (add slight distortion and reduce high frequencies)
#                 'highpass=f=200,lowpass=f=3000',
#                 # Add vinyl noise
#                 'aeval=\'random(0)*0.05\':c=same',
#                 # Slight compression
#                 'acompressor=threshold=-10dB:ratio=3:attack=200:release=1000'
#             ]
#         }],
#         'outtmpl': output_path + (custom_filename or '%(title)s') + '.%(ext)s',
#         # 'writesubtitles': True,
#         # 'writeautomaticsub': True,
#         # 'subtitleslangs': ['en'],  # Change this to the desired language code
#         # 'subtitlesformat': 'vtt',
#     }
    
#     if start_time and end_time:
#         ydl_opts['download_ranges'] = lambda info, _: [{'start_time': time_to_seconds(start_time), 'end_time': time_to_seconds(end_time)}]
#         ydl_opts['outtmpl'] = output_path + (custom_filename or '%(title)s') + f'_{start_time}-{end_time}' + '.%(ext)s'
#         ydl_opts['force_keyframes_at_cuts'] = True
    
#     with yt_dlp.YoutubeDL(ydl_opts) as ydl:
#         # ydl.download([url])
#         info = ydl.extract_info(url, download=True)
#         filename = ydl.prepare_filename(info)
#         base_filename = os.path.splitext(filename)[0]
#         subtitle_filename = f"{base_filename}.en.vtt"
#         return base_filename + '.mp3', subtitle_filename

# # # Example usage
# # youtube_url = 'https://youtu.be/kAP_x0krk7A?si=HRvGmXk4e4OR8X7n'
# # audio_file, subtitle_file = download_mp3_and_subtitles(youtube_url, './', start_time='00:01:07', end_time='00:01:30')
# # print(f"Audio downloaded: {audio_file}")
# # print(f"Subtitles downloaded: {subtitle_file}")

# from moviepy.editor import *
# import os

# def create_tiktok_video(audio_path, image_folder, output_path, duration=60):
#     # Load the audio file
#     try:
#         audio = AudioFileClip(audio_path)
#         print(f"Audio duration: {audio.duration} seconds")  # Debug statement
#     except Exception as e:
#         print(f"Error loading audio: {e}")
#         return
    
#     # If audio is longer than duration, trim it
#     if audio.duration > duration:
#         audio = audio.subclip(0, duration)
#         print(f"Trimmed audio duration: {audio.duration} seconds")  # Debug statement
    
#     # Get all image files from the folder
#     image_files = [f for f in os.listdir(image_folder) if f.endswith(('.png', '.jpg', '.jpeg'))]
#     image_files.sort()  # Sort files to ensure consistent order
#     print(f"Image files: {image_files}")  # Debug statement
    
#     if not image_files:
#         print("No image files found in the specified folder.")
#         return
    
#     # Calculate duration for each image
#     image_duration = audio.duration / len(image_files)
#     print(f"Image duration: {image_duration} seconds per image")  # Debug statement
    
#     # Create image clips
#     image_clips = []
#     for img in image_files:
#         try:
#             clip = ImageClip(os.path.join(image_folder, img)).set_duration(image_duration)
#             image_clips.append(clip)
#         except Exception as e:
#             print(f"Error loading image {img}: {e}")
    
#     if not image_clips:
#         print("No valid image clips created.")
#         return
    
#     # Concatenate image clips
#     try:
#         video = concatenate_videoclips(image_clips, method="compose")
#     except Exception as e:
#         print(f"Error concatenating image clips: {e}")
#         return
    
#     # Set the audio of the video
#     try:
#         final_video = video.set_audio(audio)
#         print("Audio set to video")  # Debug statement
#     except Exception as e:
#         print(f"Error setting audio to video: {e}")
#         return
    
#     # Resize video to TikTok dimensions (1080x1920)
#     try:
#         print(f"Original video size: {final_video.size}")  # Debug statement
#         final_video = final_video.resize(height=1920)
#         print(f"Resized video size: {final_video.size}")  # Debug statement
#         # Ensure the width is at least 1080 before cropping
#         if final_video.w < 1080:
#             final_video = final_video.resize(width=1080)
#             print(f"Adjusted video width: {final_video.size}")  # Debug statement
#         final_video = final_video.crop(x_center=final_video.w/2, y_center=final_video.h/2, width=1080, height=1920)
#         print(f"Cropped video size: {final_video.size}")  # Debug statement
#     except Exception as e:
#         print(f"Error resizing/cropping video: {e}")
#         return    
#     # Write the result to a file
#     try:
#         final_video.write_videofile(output_path, fps=30)
#         print(f"Video saved to {output_path}")  # Debug statement
#     except Exception as e:
#         print(f"Error writing video file: {e}")


# songname = '50namvesaubass'
# # Example usage
# youtube_url = 'https://youtu.be/9oXnORalpZo?si=NjCVSiWvxNVvrshH'
# audio_file, subtitle_file = download_mp3_and_subtitles(youtube_url, './', start_time='00:03:13', end_time='00:04:13', custom_filename=songname)
# print(f"Audio downloaded: {audio_file}")

# # # Example usage
# # # audio_file = "./test.mp3"
# # image_folder = "./assets/"
# # output_file = (songname or 'default_video') + '.mp4'
# # create_tiktok_video(audio_file, image_folder, output_file)
