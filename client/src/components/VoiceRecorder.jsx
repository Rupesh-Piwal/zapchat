import { useState, useRef } from "react";
import { Mic, Square, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function VoiceRecorder({ onRecordingComplete }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(blob);
        setAudioBlob(blob);
        onRecordingComplete(audioUrl);
        chunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const clearRecording = () => {
    setAudioBlob(null);
    onRecordingComplete(null);
  };

  const handleMicClick = () => {
    toast("Audio functionality is under development 🎤", {
      icon: "🚧",
      duration: 4000,
      style: {
        borderRadius: "10px",
        background: "#17191C",
        color: "#337EFF",
        width: "400px", 
        maxWidth: "95%", 
        padding: "16px", 
        fontSize: "14px", 
        fontWeight: "500", 
        border: "1px solid #337EFF", 
      },
    });
  };

  return (
    <div className="flex items-center gap-2 bg-[#272A30] p-2 rounded-full">
      <button
        onClick={handleMicClick}
        className={`p-2 rounded-full cursor-pointer ${
          isRecording
            ? "bg-red-500/20 hover:bg-red-500/30"
            : "bg-[#337EFF]/20 hover:bg-[#337EFF]/30"
        } transition-colors`}
      >
        {isRecording ? (
          <Square className="md:h-5 md:w-5 text-red-500" />
        ) : (
          <Mic className="md:h-5 md:w-5 text-[#337EFF]" />
        )}
      </button>

      {audioBlob && (
        <button
          onClick={clearRecording}
          className="text-[#747881] hover:text-red-500 transition-colors cursor-pointer"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
