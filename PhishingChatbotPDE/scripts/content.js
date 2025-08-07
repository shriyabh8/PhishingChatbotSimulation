console.log('[AD Blocker] content.js loaded');

// Prevent duplication if the script runs twice
if (!document.querySelector('.adblock-floating-button')) {
  // Create floating "+" button
  const floatingBox = document.createElement('div');
  floatingBox.className = 'adblock-floating-button';
  floatingBox.textContent = '+';
  Object.assign(floatingBox.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '50px',
    height: '50px',
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: '50%',
    fontSize: '28px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
    zIndex: '9999999'
  });

  floatingBox.addEventListener('mouseenter', () => {
    floatingBox.style.backgroundColor = '#555';
  });
  floatingBox.addEventListener('mouseleave', () => {
    floatingBox.style.backgroundColor = '#333';
  });

  floatingBox.addEventListener('click', () => {
    if (document.querySelector('.assistant-container')) return;

    const container = document.createElement('div');
    container.className = 'assistant-container';
    Object.assign(container.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '350px',
      height: '400px',
      backgroundColor: '#333',
      color: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      zIndex: '9999999'
    });

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.backgroundColor = '#222';
    header.style.padding = '15px';
    header.style.fontSize = '18px';
    header.style.fontWeight = 'bold';

    const headerTitle = document.createElement('span');
    headerTitle.textContent = 'Virtual Assistant';

    const headerButtons = document.createElement('div');
    headerButtons.style.display = 'flex';
    headerButtons.style.gap = '10px';

    // Reset chat button
    const resetButton = document.createElement('button');
    resetButton.textContent = '↻';
    resetButton.title = 'Reset Chat';
    Object.assign(resetButton.style, {
      background: 'none',
      border: 'none',
      color: '#fff',
      fontSize: '18px',
      cursor: 'pointer',
      padding: '2px 6px',
      borderRadius: '3px'
    });

    resetButton.addEventListener('click', () => {
      // Clear the chat display
      const mainContent = container.querySelector('.chat-main-content');
      mainContent.innerHTML = '';
      
      // Add a system message
      const systemBubble = document.createElement('div');
      systemBubble.textContent = 'Chat session has been reset. How can I help you?';
      systemBubble.style.alignSelf = 'center';
      systemBubble.style.background = '#555';
      systemBubble.style.color = '#fff';
      systemBubble.style.padding = '8px 12px';
      systemBubble.style.marginTop = '8px';
      systemBubble.style.borderRadius = '12px';
      systemBubble.style.fontSize = '12px';
      systemBubble.style.fontStyle = 'italic';
      mainContent.appendChild(systemBubble);
      
      // Call the reset endpoint
      fetch('http://127.0.0.1:5000/reset_chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })
      .then(response => response.json())
      .then(data => {
        console.log('Chat reset:', data.response);
      })
      .catch(error => {
        console.error('Error resetting chat:', error);
      });
    });

    resetButton.addEventListener('mouseenter', () => {
      resetButton.style.backgroundColor = '#555';
    });
    resetButton.addEventListener('mouseleave', () => {
      resetButton.style.backgroundColor = 'transparent';
    });

    const closeButton = document.createElement('button');
    closeButton.textContent = '✕';
    Object.assign(closeButton.style, {
      background: 'none',
      border: 'none',
      color: '#fff',
      fontSize: '20px',
      cursor: 'pointer'
    });

    closeButton.addEventListener('click', () => container.remove());
    closeButton.addEventListener('mouseenter', () => {
      closeButton.style.backgroundColor = '#555';
    });
    closeButton.addEventListener('mouseleave', () => {
      closeButton.style.backgroundColor = 'transparent';
    });

    headerButtons.appendChild(resetButton);
    headerButtons.appendChild(closeButton);
    header.appendChild(headerTitle);
    header.appendChild(headerButtons);
    container.appendChild(header);

    const mainContent = document.createElement('div');
    mainContent.className = 'chat-main-content';
    Object.assign(mainContent.style, {
      flex: '1 1 auto',
      padding: '15px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      backgroundColor: '#2a2a2a',
      scrollBehavior: 'smooth'
    });
    
    // Add initial greeting message
    const greetingBubble = document.createElement('div');
    greetingBubble.textContent = 'Hello! I\'m your virtual assistant. How can I help you today?';
    greetingBubble.style.alignSelf = 'flex-start';
    greetingBubble.style.background = '#f0f0f0';
    greetingBubble.style.color = '#333';
    greetingBubble.style.padding = '10px 16px';
    greetingBubble.style.marginTop = '8px';
    greetingBubble.style.borderRadius = '16px';
    greetingBubble.style.maxWidth = '80%';
    greetingBubble.style.wordBreak = 'break-word';
    greetingBubble.style.boxShadow = '0 2px 6px rgba(0,0,0,0.08)';
    mainContent.appendChild(greetingBubble);
    
    container.appendChild(mainContent);

    const footer = document.createElement('div');
    Object.assign(footer.style, {
      backgroundColor: '#444',
      padding: '10px 15px',
      display: 'flex',
      alignItems: 'center'
    });

    const inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputBox.placeholder = 'Type something...';
    Object.assign(inputBox.style, {
      width: '80%',
      padding: '8px',
      borderRadius: '5px',
      border: 'none',
      fontSize: '16px',
      outline: 'none'
    });

    const goButton = document.createElement('button');
    goButton.textContent = 'Go!';
    Object.assign(goButton.style, {
      marginLeft: '10px',
      borderRadius: '5px',
      padding: '8px 16px',
      border: 'none',
      fontSize: '16px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      cursor: 'pointer'
    });

    function scrollToBottom() {
      setTimeout(() => {
        mainContent.scrollTop = mainContent.scrollHeight;
      }, 50); // Delay to ensure DOM updates first
    }

    function handleUserInput() {
      const userText = inputBox.value.trim();
      if (userText.length === 0) return;

      const userBubble = document.createElement('div');
      userBubble.textContent = userText;
      userBubble.style.alignSelf = 'flex-end';
      userBubble.style.background = '#737c73ff';
      userBubble.style.color = '#fff';
      userBubble.style.padding = '10px 16px';
      userBubble.style.marginTop = '8px';
      userBubble.style.borderRadius = '16px';
      userBubble.style.maxWidth = '80%';
      userBubble.style.wordBreak = 'break-word';
      userBubble.style.boxShadow = '0 2px 6px rgba(0,0,0,0.08)';
      mainContent.appendChild(userBubble);
      inputBox.value = '';
      scrollToBottom();

      const loadingBubble = document.createElement('div');
      loadingBubble.style.alignSelf = 'flex-start';
      loadingBubble.style.background = '#e0e0e0';
      loadingBubble.style.padding = '10px 16px';
      loadingBubble.style.marginTop = '8px';
      loadingBubble.style.borderRadius = '16px';
      loadingBubble.style.maxWidth = '80%';
      loadingBubble.style.display = 'flex';
      loadingBubble.style.gap = '6px';
      loadingBubble.style.boxShadow = '0 2px 6px rgba(0,0,0,0.08)';
      loadingBubble.style.alignItems = 'center';

      const dots = [];
      for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.style.width = '10px';
        dot.style.height = '10px';
        dot.style.borderRadius = '50%';
        dot.style.backgroundColor = '#bbb';
        dot.style.transition = 'background-color 0.3s ease';
        dots.push(dot);
        loadingBubble.appendChild(dot);
      }

      mainContent.appendChild(loadingBubble);
      scrollToBottom();

      let currentDot = 0;
      const intervalId = setInterval(() => {
        dots.forEach((dot, index) => {
          dot.style.backgroundColor = (index === currentDot) ? '#444' : '#bbb';
        });
        currentDot = (currentDot + 1) % 3;
      }, 300);

      // Use the same ongoing chat session
      fetch('http://127.0.0.1:5000/extract_ssn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_input: userText })
      })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        clearInterval(intervalId);
        loadingBubble.innerHTML = '';
        loadingBubble.textContent = data.response;
        loadingBubble.style.background = '#f0f0f0';
        loadingBubble.style.color = '#333';
        loadingBubble.style.display = 'block';
        scrollToBottom();
      })
      .catch(error => {
        console.error('Fetch error:', error);
        clearInterval(intervalId);
        loadingBubble.innerHTML = '';
        loadingBubble.textContent = '⚠️ Error loading response.';
        loadingBubble.style.background = '#ffdddd';
        loadingBubble.style.color = '#a00';
        loadingBubble.style.display = 'block';
        scrollToBottom();
      });
    }

    goButton.addEventListener('click', handleUserInput);
    inputBox.addEventListener('keydown', e => {
      if (e.key === 'Enter') handleUserInput();
    });

    footer.appendChild(inputBox);
    footer.appendChild(goButton);
    container.appendChild(footer);
    document.body.appendChild(container);
  });

  document.body.appendChild(floatingBox);
}