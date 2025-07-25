<script type="module">
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

      createChat({
        webhookUrl: 'http://159.69.209.82:5678/webhook/2119a4b5-c7b0-4290-a7b4-a4eb3dfaf557/chat',
        webhookConfig: {
          method: 'POST',
          headers: {}
        },
        target: '#n8n-chat',
        mode: 'window',
        chatInputKey: 'chatInput',
        chatSessionKey: 'sessionId',
        loadPreviousSession: true,
        metadata: {},
        showWelcomeScreen: false,
        defaultLanguage: 'es',
        initialMessages: [
          '¡Hola! 💙',
          'Soy el asistente virtual del Club Blooming. ¿En qué puedo ayudarte hoy?'
        ],
        i18n: {
          es: {
            title: '¡Bienvenido al Club Blooming! 💙',
            subtitle: 'Chateá con nosotros. Estamos disponibles las 24 horas para ayudarte.',
            footer: '',
            getStarted: 'Nueva conversación',
            inputPlaceholder: 'Escribí tu pregunta...',
          },
          en: {
            title: 'Welcome to Club Blooming! 💙',
            subtitle: 'Chat with us. We’re here to help 24/7.',
            footer: '',
            getStarted: 'New Conversation',
            inputPlaceholder: 'Type your question...',
          },
        },
      });
    </script>