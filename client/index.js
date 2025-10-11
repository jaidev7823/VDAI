const csInterface = new CSInterface();

document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-button');
    const messageInput = document.getElementById('message-input');
    const chatMessages = document.getElementById('chat-messages');

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText) {
            addMessage(messageText, 'user');
            messageInput.value = '';
            getOllamaResponse(messageText);
        }
    }

    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function getOllamaResponse(prompt) {
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama2',
                prompt: prompt,
                stream: false,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            addMessage(data.response, 'bot');
        } else {
            addMessage('Error: Could not connect to Ollama.', 'bot');
        }
    }
});
