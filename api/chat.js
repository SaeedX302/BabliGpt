// This is a Vercel Serverless Function (Edge Function)
export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405, headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { prompt } = await request.json();
    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set in environment variables.');
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500, headers: { 'Content-Type': 'application/json' },
      });
    }

    // UPDATED: Using the gemini-2.5-flash model as requested
    const model = 'gemini-2.5-flash';
    const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?key=${apiKey}`;

    const geminiResponse = await fetch(geminiApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }),
    });

    if (!geminiResponse.ok || !geminiResponse.body) {
      const errorBody = await geminiResponse.text();
      console.error('Gemini API Error:', geminiResponse.status, errorBody);
      return new Response(JSON.stringify({ error: 'Failed to fetch from Gemini API', details: errorBody }), {
          status: geminiResponse.status, headers: { 'Content-Type': 'application/json' },
      });
    }

    // NEW: A much more robust stream parser that buffers data
    let buffer = '';
    const textStream = new TransformStream({
      transform(chunk, controller) {
        buffer += chunk;
        // The stream can contain multiple JSON objects or incomplete ones.
        // We find complete objects by looking for matching curly braces.
        let braceCount = 0;
        let lastCut = 0;

        for (let i = 0; i < buffer.length; i++) {
            if (buffer[i] === '{') {
                braceCount++;
            } else if (buffer[i] === '}') {
                braceCount--;
                if (braceCount === 0 && i > lastCut) {
                    // We found a complete JSON object string
                    const jsonStr = buffer.substring(lastCut, i + 1);
                    lastCut = i + 1;
                    try {
                        const parsed = JSON.parse(jsonStr);
                        const text = parsed.candidates[0]?.content?.parts[0]?.text;
                        if (text) {
                            controller.enqueue(text); // Send the text part to the client
                        }
                    } catch (e) {
                        // This can happen if a non-JSON part of the stream is processed.
                        // console.error("Could not parse JSON object from stream:", jsonStr, e);
                    }
                }
            }
        }
        // Keep any incomplete part of the buffer for the next chunk
        if (lastCut > 0) {
            buffer = buffer.substring(lastCut);
        }
      },
    });

    const stream = geminiResponse.body
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(textStream);

    return new Response(stream, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache' },
    });

  } catch (error) {
    console.error('Serverless function error:', error);
    return new Response(JSON.stringify({ error: 'An internal server error occurred', details: error.message }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
}
