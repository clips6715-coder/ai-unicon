import { VideoStyle, VoiceOption } from '../types';

interface GenerationOptions {
    script: string;
    style: VideoStyle;
    voice: VoiceOption;
    duration: number;
}

// In a real application, you would stream these messages from the backend.
// For now, we'll simulate a few frontend-side messages before the backend call.
const progressMessages = [
    "Preparing your video request...",
    "Sending your script to our secure server...",
    "Backend is now generating your video. This may take a few minutes...",
    "Your video is almost ready...",
];

export const generateVideo = async (
    options: GenerationOptions,
    onProgress: (message: string) => void
): Promise<{ videoUrl: string, thumbnailUrl: string }> => {

    console.log("Sending video generation request to the backend:", options);
    onProgress(progressMessages[0]);
    onProgress(progressMessages[1]);

    try {
        // Step 1: Call your own backend API endpoint.
        const response = await fetch('/api/generate-video', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(options),
        });

        if (!response.ok) {
            // Try to get a more detailed error message from the backend
            const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred.' }));
            throw new Error(errorData.message || `Server responded with status: ${response.status}`);
        }

        onProgress(progressMessages[2]);

        // Step 2: The backend will handle the long polling and return the final video URL.
        const result = await response.json();
        
        onProgress("Video is ready!");

        // The backend should return a temporary URL for the video blob.
        // For this example, we assume it returns the full URL.
        const thumbnailUrl = `https://picsum.photos/seed/${Date.now()}/400/225`;

        return { 
            videoUrl: result.videoUrl, 
            thumbnailUrl 
        };

    } catch (error) {
        console.error("Error communicating with the backend:", error);
        // Rethrow the error so the UI component can handle it.
        throw error;
    }
};
