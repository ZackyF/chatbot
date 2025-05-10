document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('chat-toggle-btn');
    const chatWidget = document.getElementById('chatbot-widget');
    const chatInput = document.getElementById('chat-input');
    const chatBody = document.getElementById('chat-body');
  
    toggleBtn.addEventListener('click', () => {
      chatWidget.style.display = chatWidget.style.display === 'none' ? 'flex' : 'none';
    });
  
    chatInput.addEventListener('keypress', async function (e) {
      if (e.key === 'Enter') {
        const userText = chatInput.value.trim();
        if (!userText) return;
        chatBody.innerHTML += `<div class="user-message">${userText}</div>`;
        chatInput.value = '';
  
        try {
          const res = await fetch(`http://localhost:3000/api/respond?q=${encodeURIComponent(userText)}`);
          const data = await res.json();
          chatBody.innerHTML += `<div class="bot-message">${data.answer}</div>`;
          chatBody.scrollTop = chatBody.scrollHeight;
        } catch (err) {
          chatBody.innerHTML += `<div class="bot-message">Error getting response.</div>`;
          chatBody.scrollTop = chatBody.scrollHeight;
        }
      }
    });
});
