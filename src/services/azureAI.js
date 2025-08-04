import { useState, useCallback } from 'react';

// Azure AI configuration from environment variables
const AZURE_AI_ENDPOINT = import.meta.env.VITE_AZURE_AI_ENDPOINT;
const AZURE_AI_KEY = import.meta.env.VITE_AZURE_AI_KEY;
const AZURE_AI_AGENT_ID = import.meta.env.VITE_AZURE_AI_AGENT_ID;

// Debug logging
const DEBUG = import.meta.env.DEV;
const log = (...args) => {
  if (DEBUG) {
    console.log('[Azure AI]', ...args);
  }
};

// Custom hook for Azure AI Agent interaction
export const useAzureAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [threadId, setThreadId] = useState(null);

  // Check if Azure AI is properly configured
  const isConfigured = useCallback(() => {
    const configured = !!(AZURE_AI_ENDPOINT && AZURE_AI_KEY && AZURE_AI_AGENT_ID);
    log('Configuration check:', {
      hasEndpoint: !!AZURE_AI_ENDPOINT,
      hasKey: !!AZURE_AI_KEY,
      hasAgentId: !!AZURE_AI_AGENT_ID,
      configured
    });
    return configured;
  }, []);

  // Create a new thread for conversation
  const createThread = useCallback(async () => {
    if (!isConfigured()) {
      throw new Error('Azure AI not properly configured');
    }

    try {
      log('Creating new thread...');
      const response = await fetch(`${AZURE_AI_ENDPOINT}/agents/${AZURE_AI_AGENT_ID}/threads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': AZURE_AI_KEY,
        },
        body: JSON.stringify({})
      });

      if (!response.ok) {
        const errorText = await response.text();
        log('Thread creation failed:', response.status, errorText);
        throw new Error(`Failed to create thread: ${response.status} ${errorText}`);
      }

      const thread = await response.json();
      log('Thread created:', thread);
      setThreadId(thread.id);
      return thread.id;
    } catch (error) {
      log('Error creating thread:', error);
      throw error;
    }
  }, [isConfigured]);

  // Send a message to the agent
  const sendMessage = useCallback(async (message, currentThreadId = null) => {
    if (!isConfigured()) {
      log('Azure AI not configured, using fallback response');
      return {
        content: "Lo siento, pero actualmente no puedo conectarme al servicio Azure AI. Por favor regresa más tarde o contacta al administrador de la comunidad para asistencia con tu pregunta sobre: " + message,
        isError: true
      };
    }

    setIsLoading(true);
    setError(null);

    try {
      // Use existing thread or create a new one
      const workingThreadId = currentThreadId || threadId || await createThread();
      log('Using thread ID:', workingThreadId);

      // Step 1: Add message to thread
      log('Adding message to thread:', message);
      const messageResponse = await fetch(
        `${AZURE_AI_ENDPOINT}/agents/${AZURE_AI_AGENT_ID}/threads/${workingThreadId}/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': AZURE_AI_KEY,
          },
          body: JSON.stringify({
            role: 'user',
            content: message
          })
        }
      );

      if (!messageResponse.ok) {
        const errorText = await messageResponse.text();
        log('Message creation failed:', messageResponse.status, errorText);
        throw new Error(`Failed to add message: ${messageResponse.status} ${errorText}`);
      }

      const messageResult = await messageResponse.json();
      log('Message added:', messageResult);

      // Step 2: Create and run the agent
      log('Creating run...');
      const runResponse = await fetch(
        `${AZURE_AI_ENDPOINT}/agents/${AZURE_AI_AGENT_ID}/threads/${workingThreadId}/runs`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': AZURE_AI_KEY,
          },
          body: JSON.stringify({
            agent_id: AZURE_AI_AGENT_ID
          })
        }
      );

      if (!runResponse.ok) {
        const errorText = await runResponse.text();
        log('Run creation failed:', runResponse.status, errorText);
        throw new Error(`Failed to create run: ${runResponse.status} ${errorText}`);
      }

      const run = await runResponse.json();
      log('Run created:', run);

      // Step 3: Poll for completion
      let runStatus = run;
      let attempts = 0;
      const maxAttempts = 30; // 30 seconds timeout

      while (runStatus.status === 'queued' || runStatus.status === 'in_progress') {
        if (attempts >= maxAttempts) {
          throw new Error('Timeout waiting for response');
        }

        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
        attempts++;

        log(`Checking run status (attempt ${attempts})...`);
        const statusResponse = await fetch(
          `${AZURE_AI_ENDPOINT}/agents/${AZURE_AI_AGENT_ID}/threads/${workingThreadId}/runs/${run.id}`,
          {
            headers: {
              'api-key': AZURE_AI_KEY,
            }
          }
        );

        if (!statusResponse.ok) {
          const errorText = await statusResponse.text();
          log('Status check failed:', statusResponse.status, errorText);
          throw new Error(`Failed to check run status: ${statusResponse.status}`);
        }

        runStatus = await statusResponse.json();
        log('Run status:', runStatus.status);
      }

      if (runStatus.status === 'failed') {
        log('Run failed:', runStatus);
        throw new Error('Agent run failed');
      }

      // Step 4: Get the response messages
      log('Fetching messages...');
      const messagesResponse = await fetch(
        `${AZURE_AI_ENDPOINT}/agents/${AZURE_AI_AGENT_ID}/threads/${workingThreadId}/messages`,
        {
          headers: {
            'api-key': AZURE_AI_KEY,
          }
        }
      );

      if (!messagesResponse.ok) {
        const errorText = await messagesResponse.text();
        log('Messages fetch failed:', messagesResponse.status, errorText);
        throw new Error(`Failed to fetch messages: ${messagesResponse.status}`);
      }

      const messages = await messagesResponse.json();
      log('Messages received:', messages);

      // Find the latest assistant message
      const assistantMessages = messages.data?.filter(msg => msg.role === 'assistant') || [];
      if (assistantMessages.length === 0) {
        throw new Error('No response from assistant');
      }

      const latestMessage = assistantMessages[0];
      let content = 'Lo siento, no pude generar una respuesta apropiada.';

      if (latestMessage.content && latestMessage.content.length > 0) {
        const textContent = latestMessage.content.find(c => c.type === 'text');
        if (textContent && textContent.text) {
          content = textContent.text.value || textContent.text;
        }
      }

      log('Assistant response:', content);
      
      // Update thread ID if we created a new one
      if (!currentThreadId && !threadId) {
        setThreadId(workingThreadId);
      }

      return {
        content,
        isError: false,
        threadId: workingThreadId
      };

    } catch (error) {
      log('Error in sendMessage:', error);
      setError(error.message);
      
      // Return a helpful fallback message
      return {
        content: `Me disculpo, pero actualmente estoy experimentando dificultades técnicas. Esto es lo que puedo ayudarte con respecto a "${message}": Por favor contacta la oficina de administración de la comunidad durante horas de trabajo para asistencia inmediata, o intenta hacer tu pregunta nuevamente en unos momentos.`,
        isError: true
      };
    } finally {
      setIsLoading(false);
    }
  }, [isConfigured, threadId, createThread]);

  // Test the connection to Azure AI
  const testConnection = useCallback(async () => {
    if (!isConfigured()) {
      return {
        success: false,
        error: 'Azure AI no configurado - faltan variables de entorno'
      };
    }

    try {
      log('Testing Azure AI connection...');
      
      // Try to create a thread as a connection test
      const testThreadResponse = await fetch(`${AZURE_AI_ENDPOINT}/agents/${AZURE_AI_AGENT_ID}/threads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': AZURE_AI_KEY,
        },
        body: JSON.stringify({})
      });

      if (!testThreadResponse.ok) {
        const errorText = await testThreadResponse.text();
        log('Connection test failed:', testThreadResponse.status, errorText);
        return {
          success: false,
          error: `Conexión falló: ${testThreadResponse.status} ${errorText}`
        };
      }

      const testThread = await testThreadResponse.json();
      log('Connection test successful:', testThread);
      
      return {
        success: true,
        message: 'Conectado exitosamente al Agente Azure AI'
      };
    } catch (error) {
      log('Connection test error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }, [isConfigured]);

  return {
    sendMessage,
    testConnection,
    isLoading,
    error,
    isConfigured: isConfigured(),
    threadId
  };
};

export default useAzureAI;