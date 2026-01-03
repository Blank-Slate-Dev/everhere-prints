// src/lib/audioProcessor.ts
// Audio processing utilities for extracting waveform data

import { WAVEFORM_BAR_COUNT } from "./soundWaveConfig";

export interface AudioProcessingResult {
  waveformData: number[];
  duration: number;
  fileName: string;
}

/**
 * Process an audio file and extract normalized waveform data
 * Uses Web Audio API to decode audio and sample amplitudes
 */
export async function processAudioFile(
  file: File
): Promise<AudioProcessingResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target?.result as ArrayBuffer;

        if (!arrayBuffer) {
          reject(new Error("Failed to read audio file"));
          return;
        }

        const result = await processArrayBuffer(arrayBuffer);
        resolve({
          ...result,
          fileName: file.name,
        });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read audio file"));
    };

    reader.readAsArrayBuffer(file);
  });
}

/**
 * Process audio from a URL (e.g., iTunes preview)
 * Uses our API proxy to handle CORS
 */
export async function processAudioFromUrl(
  url: string,
  fileName: string = "preview"
): Promise<AudioProcessingResult> {
  try {
    // Use our proxy to fetch the audio (handles CORS)
    const proxyUrl = `/api/music/preview?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch audio: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const result = await processArrayBuffer(arrayBuffer);

    return {
      ...result,
      fileName,
    };
  } catch (error) {
    console.error("Error processing audio from URL:", error);
    throw error;
  }
}

/**
 * Process an ArrayBuffer containing audio data
 */
async function processArrayBuffer(
  arrayBuffer: ArrayBuffer
): Promise<{ waveformData: number[]; duration: number }> {
  // Create audio context
  const audioContext = new (window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

  try {
    // Decode audio data
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Extract waveform data
    const waveformData = extractWaveformData(audioBuffer, WAVEFORM_BAR_COUNT);

    return {
      waveformData,
      duration: audioBuffer.duration,
    };
  } finally {
    // Clean up
    await audioContext.close();
  }
}

/**
 * Extract normalized waveform data from an AudioBuffer
 * Returns an array of values between 0 and 1 representing amplitude
 */
function extractWaveformData(
  audioBuffer: AudioBuffer,
  barCount: number
): number[] {
  // Get the audio data from the first channel (mono) or mix down stereo
  const channelData = audioBuffer.numberOfChannels > 1
    ? mixDownToMono(audioBuffer)
    : audioBuffer.getChannelData(0);

  const samplesPerBar = Math.floor(channelData.length / barCount);
  const waveformData: number[] = [];

  for (let i = 0; i < barCount; i++) {
    const start = i * samplesPerBar;
    const end = start + samplesPerBar;

    // Calculate RMS (Root Mean Square) for this segment
    // This gives a better representation of perceived loudness
    let sum = 0;
    for (let j = start; j < end && j < channelData.length; j++) {
      sum += channelData[j] * channelData[j];
    }
    const rms = Math.sqrt(sum / samplesPerBar);

    waveformData.push(rms);
  }

  // Normalize the waveform data to 0-1 range
  const maxValue = Math.max(...waveformData, 0.001); // Avoid division by zero
  const normalizedData = waveformData.map((value) => value / maxValue);

  // Apply some smoothing to make the visualization more pleasing
  return smoothWaveform(normalizedData);
}

/**
 * Mix stereo audio down to mono
 */
function mixDownToMono(audioBuffer: AudioBuffer): Float32Array {
  const left = audioBuffer.getChannelData(0);
  const right = audioBuffer.getChannelData(1);
  const mono = new Float32Array(left.length);

  for (let i = 0; i < left.length; i++) {
    mono[i] = (left[i] + right[i]) / 2;
  }

  return mono;
}

/**
 * Apply simple moving average smoothing to waveform
 */
function smoothWaveform(data: number[], windowSize: number = 3): number[] {
  const smoothed: number[] = [];

  for (let i = 0; i < data.length; i++) {
    let sum = 0;
    let count = 0;

    for (let j = -windowSize; j <= windowSize; j++) {
      const index = i + j;
      if (index >= 0 && index < data.length) {
        sum += data[index];
        count++;
      }
    }

    smoothed.push(sum / count);
  }

  // Re-normalize after smoothing
  const maxValue = Math.max(...smoothed, 0.001);
  return smoothed.map((v) => v / maxValue);
}

/**
 * Format duration in seconds to MM:SS format
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Validate if a file is a supported audio format
 */
export function isValidAudioFile(file: File): boolean {
  const validTypes = [
    "audio/mpeg",      // MP3
    "audio/mp3",       // MP3 (alternative)
    "audio/wav",       // WAV
    "audio/wave",      // WAV (alternative)
    "audio/x-wav",     // WAV (alternative)
    "audio/mp4",       // M4A
    "audio/x-m4a",     // M4A (alternative)
    "audio/aac",       // AAC
    "audio/ogg",       // OGG
    "audio/webm",      // WebM audio
    "audio/flac",      // FLAC
  ];

  // Check MIME type
  if (validTypes.includes(file.type)) {
    return true;
  }

  // Fallback: check file extension
  const extension = file.name.split(".").pop()?.toLowerCase();
  const validExtensions = ["mp3", "wav", "m4a", "aac", "ogg", "webm", "flac"];

  return validExtensions.includes(extension || "");
}

/**
 * Get maximum file size in bytes (10MB)
 */
export const MAX_AUDIO_FILE_SIZE = 10 * 1024 * 1024;

/**
 * Check if file size is within limits
 */
export function isValidFileSize(file: File): boolean {
  return file.size <= MAX_AUDIO_FILE_SIZE;
}
