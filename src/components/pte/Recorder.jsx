import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, RefreshCw, AlertCircle } from 'lucide-react';

const Recorder = () => {
    const [status, setStatus] = useState('idle'); // idle, recording, completed
    const [audioUrl, setAudioUrl] = useState(null);
    const [error, setError] = useState(null);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            chunksRef.current = [];

            // Visualizer Setup
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);
            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const draw = () => {
                if (status === 'completed') return;
                animationRef.current = requestAnimationFrame(draw);
                analyser.getByteFrequencyData(dataArray);

                const canvas = canvasRef.current;
                if (!canvas) return;
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const barWidth = (canvas.width / bufferLength) * 2.5;
                let barHeight;
                let x = 0;

                for (let i = 0; i < bufferLength; i++) {
                    barHeight = dataArray[i];
                    ctx.fillStyle = `rgb(59, 130, 246)`; // Blue-500
                    ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
                    x += barWidth + 1;
                }
            };

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);
                setAudioUrl(url);
                stream.getTracks().forEach(track => track.stop());
                cancelAnimationFrame(animationRef.current);
            };

            mediaRecorderRef.current.start();
            setStatus('recording');
            draw();

        } catch (err) {
            console.error("Mic Error:", err);
            setError("Microphone access denied. Please allow permission.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && status === 'recording') {
            mediaRecorderRef.current.stop();
            setStatus('completed');
        }
    };

    const reset = () => {
        setAudioUrl(null);
        setStatus('idle');
        setError(null);
    };

    useEffect(() => {
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        }
    }, []);

    return (
        <div className="bg-slate-100 p-6 rounded border border-slate-300 w-full max-w-2xl mx-auto text-center shadow-sm">
            <div className="text-lg font-bold mb-4 text-slate-700">Recorded Answer</div>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm flex items-center justify-center gap-2">
                    <AlertCircle size={16} /> {error}
                </div>
            )}

            {/* Visualizer / Status Area */}
            <div className="mb-6 h-24 bg-white border border-slate-300 rounded flex items-center justify-center relative overflow-hidden">
                {status === 'recording' ? (
                    <canvas ref={canvasRef} width="600" height="100" className="w-full h-full"></canvas>
                ) : status === 'completed' ? (
                    <div className="flex items-center gap-4">
                        <audio controls src={audioUrl} className="h-10" />
                    </div>
                ) : (
                    <span className="text-slate-400 text-sm flex items-center gap-2">
                        <Mic size={16} /> Waiting for microphone...
                    </span>
                )}
            </div>

            <div className="text-sm font-bold mb-4">
                Status: <span className={status === 'recording' ? "text-red-500 animate-pulse" : "text-slate-600"}>
                    {status === 'idle' ? 'Ready' : status === 'recording' ? 'Recording...' : 'Completed'}
                </span>
            </div>

            <div className="flex justify-center gap-4">
                {status === 'idle' && (
                    <button onClick={startRecording} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-bold flex items-center gap-2 transition-colors">
                        <Mic size={18} /> Start Recording
                    </button>
                )}

                {status === 'recording' && (
                    <button onClick={stopRecording} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-bold flex items-center gap-2 transition-colors">
                        <Square size={18} fill="currentColor" /> Stop
                    </button>
                )}

                {status === 'completed' && (
                    <button onClick={reset} className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded font-bold flex items-center gap-2 transition-colors">
                        <RefreshCw size={18} /> Redo
                    </button>
                )}
            </div>
        </div>
    );
};

export default Recorder;
