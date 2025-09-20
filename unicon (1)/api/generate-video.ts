
// Vercel automatically turns this file into a serverless API endpoint.
// The file path /api/generate-video.ts becomes the endpoint /api/generate-video.

import { GoogleGenAI } from '@google/genai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize the Gemini client securely on the server.
// The API key is an environment variable, which we will set in the Vercel dashboard.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }
    
  try {
    // The frontend sends the script, style, etc. in the request body.
    const { script } = req.body;

    if (!script) {
      return res.status(400).json({ message: 'Script is required.' });
    }

    // Call the real Gemini API from the backend
    let operation = await ai.models.generateVideos({
      model: 'veo-2.0-generate-001',
      prompt: script, // We use the script from the request
      config: { numberOfVideos: 1 }
    });

    // Poll for completion, as this can take time.
    while (!operation.done) {
      // Wait for 10 seconds before checking the status again.
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) {
      throw new Error('Video generation failed to return a download link.');
    }

    // IMPORTANT: The downloadLink from the Gemini API requires an API key to access.
    // The frontend CANNOT access this directly. The backend provides the final, accessible URL.
    const videoUrl = `${downloadLink}&key=${process.env.API_KEY}`;

    // Send the final URL back to the frontend
    return res.status(200).json({ videoUrl });

  } catch (error: any) {
    console.error('Error in /api/generate-video:', error);
    return res.status(500).json({ message: error.message || 'Failed to generate video.' });
  }
}
