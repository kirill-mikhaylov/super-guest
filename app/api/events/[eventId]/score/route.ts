import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { eventRequirements, attendees, eventId, eventName } = await request.json();

    // Prepare the payload for Langflow
    const inputValue = JSON.stringify({
      eventRequirements: eventRequirements || {},
      attendees: attendees || [],
      eventId,
      eventName
    });

    const payload = {
      "output_type": "chat",
      "input_type": "chat",
      "input_value": inputValue,
      "session_id": Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    };

    // Get API key from environment variable (server-side)
    const apiKey = process.env.LANGFLOW_API_KEY || 'sk-wqTSUaVBKK-JZ0fgKXxCNb7Kz3aGfbn6ce1ZpOMNnas';
    
    if (!apiKey) {
      console.error('LANGFLOW_API_KEY environment variable not found');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "x-api-key": apiKey
      },
      body: JSON.stringify(payload)
    };

    // Make request to Langflow
    const langflowUrl = process.env.LANGFLOW_URL || 'http://localhost:7860/api/v1/run/0aaab625-de06-4e0c-89a3-0d98ccf3e079';
    
    console.log('Making request to Langflow:', langflowUrl);
    
    const response = await fetch(langflowUrl, options);
    
    if (!response.ok) {
      console.error('Langflow request failed:', response.status, response.statusText);
      return NextResponse.json(
        { error: `Langflow request failed: ${response.statusText}` },
        { status: response.status }
      );
    }

    const result = await response.json();

    const message = result.outputs[0].outputs[0].outputs.message.message;

    // Return the result to the client
    return NextResponse.json({
      success: true,
      data: message,
      message: 'Scoring completed successfully'
    });

  } catch (error) {
    console.error('Error in score API route:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process scoring request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}