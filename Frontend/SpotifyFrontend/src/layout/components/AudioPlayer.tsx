import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const prevSongRef = useRef<string | null>(null);

    const { currentSong, isPlaying, playNext } = usePlayerStore();

    // 1. Handle Play/Pause logic
    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play().catch((err) => console.log("Playback blocked:", err));
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying]);

    // 2. Handle Song End (Auto-play next)
    useEffect(() => {
        const audio = audioRef.current;
        const handleEnded = () => playNext();

        audio?.addEventListener("ended", handleEnded);
        return () => audio?.removeEventListener("ended", handleEnded);
    }, [playNext]);

    // 3. Handle Song Change and Source Loading
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !currentSong) return;

        // Check if the source actually changed
        if (prevSongRef.current !== currentSong.audioUrl) {
            audio.src = currentSong.audioUrl;

			audio.muted = false; // Force unmute
        	audio.volume = 1.0;  // Force max volume
			

            audio.currentTime = 0;
            prevSongRef.current = currentSong.audioUrl;

            // Crucial: Reload the audio element with the new source
            audio.load();

            // If we are in 'playing' state, start the new song immediately
            if (isPlaying) {
                audio.play().catch((err) => console.log("Playback failed:", err));
            }
        }
    }, [currentSong, isPlaying]);

    return <audio ref={audioRef} preload="auto" />;
};

export default AudioPlayer;