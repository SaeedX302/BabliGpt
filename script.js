/*
  script.js
  For BabliGpt Project
  Author: ༯𝙎ค૯𝙀𝘿✘🫀
*/

// --- PWA SERVICE WORKER REGISTRATION ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('✅ ServiceWorker registered!', registration.scope);
        }, err => {
            console.log('❌ ServiceWorker registration failed: ', err);
        });
    });
}

// --- GLOBAL DOM ELEMENTS ---
const container = document.getElementById('character-container');
const pupils = document.querySelectorAll('.pupil');
const sendButton = document.getElementById('send-button');
const storyButton = document.getElementById('story-button');
const colorButton = document.getElementById('color-button');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const loadingSpinner = document.getElementById('loading-spinner');
const characterBody = document.getElementById('character-body');
const themeSwitcher = document.getElementById('theme-switcher');
const pageBody = document.getElementById('page-body');
const changelogButton = document.getElementById('changelog-button');
const changelogOverlay = document.getElementById('changelog-overlay');
const closeChangelogButton = document.getElementById('close-changelog');
const changelogContent = document.getElementById('changelog-content');
const showMoreButton = document.getElementById('show-more-changelog');
const clearChatButton = document.getElementById('clear-chat-button');

// --- 3D & EYE LOGIC ---
document.body.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2; const centerY = rect.top + rect.height / 2;
    const mouseX = (e.clientX - centerX) / (window.innerWidth / 2); const mouseY = (e.clientY - centerY) / (window.innerHeight / 2);
    container.style.setProperty('--mouse-x', mouseX); container.style.setProperty('--mouse-y', mouseY);
    const pupilMoveX = mouseX * 4; const pupilMoveY = mouseY * 4;
    pupils.forEach(pupil => { pupil.style.transform = `translate(-50%, -50%) translate(${pupilMoveX}px, ${pupilMoveY}px)`; });
});
document.body.addEventListener('mouseleave', () => { container.style.setProperty('--mouse-x', 0); container.style.setProperty('--mouse-y', 0); });

// --- CHARACTER INTERACTIONS ---
characterBody.addEventListener('mousedown', () => characterBody.classList.add('squish'));
characterBody.addEventListener('mouseup', () => characterBody.classList.remove('squish'));
characterBody.addEventListener('mouseleave', () => characterBody.classList.remove('squish'));
characterBody.addEventListener('touchstart', () => characterBody.classList.add('squish'), {passive: true});
characterBody.addEventListener('touchend', () => characterBody.classList.remove('squish'));

function triggerAnimation(sentiment) {
    characterBody.classList.remove('happy', 'sad'); // Reset animations
    if (sentiment === 'positive') {
        characterBody.classList.add('happy');
        setTimeout(() => characterBody.classList.remove('happy'), 800);
    } else if (sentiment === 'negative') {
        characterBody.classList.add('sad');
        setTimeout(() => characterBody.classList.remove('sad'), 1200);
    }
}

// --- THEME LOGIC ---
const babliThemes = ['', 'theme-pink', 'theme-blue', 'theme-green'];
let currentBabliThemeIndex = 0;
colorButton.addEventListener('click', () => {
    if (babliThemes[currentBabliThemeIndex]) { characterBody.classList.remove(babliThemes[currentBabliThemeIndex]); }
    currentBabliThemeIndex = (currentBabliThemeIndex + 1) % babliThemes.length;
    if (babliThemes[currentBabliThemeIndex]) { characterBody.classList.add(babliThemes[currentBabliThemeIndex]); }
});

const pageThemes = ['default', 'metal-theme', 'space-theme'];
let currentPageThemeIndex = 0;
themeSwitcher.addEventListener('click', () => {
    pageBody.classList.remove(pageThemes[currentPageThemeIndex]);
    currentPageThemeIndex = (currentPageThemeIndex + 1) % pageThemes.length;
    pageBody.classList.add(pageThemes[currentPageThemeIndex]);
});

// --- CHANGELOG LOGIC ---
const changelogData = [
    {
        version: '2.5.2',
        date: 'September 1, 2025',
        author: 'Gemini & ༯𝙎ค૯𝙀𝘿✘🫀',
        changes: [
            'Upgraded AI model to `gemini-2.5-flash` for potentially faster and better responses. ⚡️',
            'Implemented an entirely new, buffer-based stream parser on the server to make it highly robust and finally fix the streaming error. 🏆'
        ]
    },
    {
        version: '2.5.1',
        date: 'September 1, 2025',
        author: 'Gemini & ༯𝙎ค૯𝙀𝘿✘🫀',
        changes: [
            'Implemented a much more robust server-side stream parser to finally resolve the "API request failed" error. 💪',
            'Slightly improved client-side error message handling in the chat history. 🛠️'
        ]
    },
    {
        version: '2.5.0',
        date: 'September 1, 2025',
        author: 'Gemini & ༯𝙎ค૯𝙀𝘿✘🫀',
        changes: [
            'Re-wrote the server-side and client-side streaming logic to be more robust and finally fix the API error.  안정성!',
            'Restored Babli\'s arms and legs on the mobile view. 😂',
            'Reduced the size of the changelog modal on mobile for a better user experience. 📱'
        ]
    },
    {
        version: '2.4.0',
        date: 'September 1, 2025',
        author: 'Gemini & ༯𝙎ค૯𝙀𝘿✘🫀',
        changes: [
            'Implemented a final, robust server-side fix for the Gemini API streaming error. Chat should now be stable. 🚀',
            'Corrected a bug that was preventing the changelog modal from displaying its content. 📜'
        ]
    },
    {
        version: '2.3.0',
        date: 'September 1, 2025',
        author: 'Gemini & ༯𝙎ค૯𝙀𝘿✘🫀',
        changes: [
            'Attempted to fix the critical "API request failed" error by improving server-side streaming logic. 🔧',
            'Completely redesigned the UI to be mobile-first and fully responsive. 📱',
            'Added a "Clear Chat" button to delete conversation history. 🗑️',
            'Updated the visual style of chat bubbles and input fields for a cleaner look.'
        ]
    },
    {
        version: '2.2.1',
        date: 'September 1, 2025',
        author: 'Gemini & ༯𝙎ค૯𝙀𝘿✘🫀',
        changes: [
            'Fixed critical JavaScript error caused by a duplicate function. 🐞',
            'Corrected conversation history saving logic. 💾',
            'Removed duplicate CSS rules. ✨'
        ]
    },
    {
        version: '2.2.0',
        date: 'September 1, 2025',
        author: ' ༯𝙎ค૯𝙀𝘿✘🫀',
        changes: [
            'Implemented real-time streaming for bot responses.',
            'Added conversation history using LocalStorage.',
            'Refactored code into separate CSS and JS files for better organization.',
            'Introduced a new "Space" theme 🌌.',
            'Added sentiment-based animations for BABLi (happy/sad reactions).'
        ]
    },
    {
        version: '2.1.0',
        date: 'September 1, 2025',
        author: ' ༯𝙎ค૯𝙀𝘿✘🫀',
        changes: [
            'Fixed the chatbot reply streaming issue.',
            'Increased the chatbox height for a better user experience.',
            'Added extensive older version history to the changelog.',
            'Temporarily disabled sentiment animations to improve chat stability.'
        ]
    },
    {
        version: '2.0.0',
        date: 'August 31, 2025',
        author: ' ༯𝙎ค૯𝙀𝘿✘🫀',
        changes: [
            'Implemented real-time streaming for bot responses.',
            'Added conversation history using LocalStorage.',
            'Refactored code into separate CSS and JS files for better organization.',
            'Introduced a new "Space" theme 🌌.',
            'Added sentiment-based animations for BABLi (happy/sad reactions).'
        ]
    },
    {
        version: '1.6.0',
        date: 'July 16, 2025',
        author: ' ༯𝙎ค૯𝙀𝘿✘🫀',
        changes: [
            'Refactored API calls to use a secure serverless function.',
            'Removed hardcoded API key from the frontend for improved security.',
            'App now uses Vercel Environment Variables to store the API key.'
        ]
    },
    {
        version: '1.5.5',
        date: 'July 15, 2025',
        author: ' ༯𝙎ค૯𝙀𝘿✘🫀',
        changes: [
            'Added a detailed changelog modal with version history.',
            'Organized top-right controls for theme and changelog.',
            'Implemented "Show More" functionality for long changelogs.'
        ]
    },
    {
        version: '1.4.0',
        date: 'July 14, 2025',
        author: ' ༯𝙎ค૯𝙀𝘿✘🫀',
        changes: [
            'Introduced Water and Metal page themes.',
            'Added a theme switcher button.',
            'Buttons and UI elements now adapt to the selected theme.'
        ]
    },
    {
        version: '1.3.0',
        date: 'July 13, 2025',
        author: ' ༯𝙎ค૯𝙀𝘿✘🫀',
        changes: [
            'Made eyes follow the mouse cursor.',
            'Added a "Rang Badlo" button to change BABLi\'s color.',
            'Added lips and improved overall facial features.'
        ]
    },
    {
        version: '1.2.0',
        date: 'July 12, 2025',
        author: ' ༯𝙎ค૯𝙀𝘿✘🫀',
        changes: [
            'Converted the website into a Progressive Web App (PWA).',
            'Added offline support via a Service Worker.',
            'Added a favicon and PWA icons.'
        ]
    },
    {
        version: '1.1.0',
        date: 'July 11, 2025',
        author: ' ༯𝙎ค૯𝙀𝘿✘🫀',
        changes: [
            'Integrated Gemini API for interactive chat.',
            'Added a chatbox and input field.',
            'Implemented "Tell me a story" functionality.'
        ]
    },
    {
        version: '1.0.0',
        date: 'July 10, 2025',
        author: ' ༯𝙎ค૯𝙀𝘿✘🫀',
        changes: [
            'Initial release of the 3D Fluffy BABLi character.',
            'Created with HTML and CSS.',
            'Added floating animation and parallax mouse effect.'
        ]
    }
];

function renderChangelog() {
    changelogContent.innerHTML = '';
    const displayCount = 5; // Show 5 entries by default
    changelogData.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('changelog-entry');
        if (index >= displayCount) entryDiv.classList.add('hidden');
        const changesHTML = entry.changes.map(change => `<li>${change}</li>`).join('');
        entryDiv.innerHTML = `
            <div class="entry-header">
                <span class="entry-version">${entry.version}</span>
                <span class="entry-date">${entry.date}</span>
                <span class="entry-author">by ${entry.author}</span>
            </div>
            <ul class="entry-changes">${changesHTML}</ul>`;
        changelogContent.appendChild(entryDiv);
    });
    showMoreButton.style.display = changelogData.length > displayCount ? 'block' : 'none';
}

changelogButton.addEventListener('click', () => changelogOverlay.classList.add('visible'));
closeChangelogButton.addEventListener('click', () => changelogOverlay.classList.remove('visible'));
changelogOverlay.addEventListener('click', (e) => { if (e.target === changelogOverlay) changelogOverlay.classList.remove('visible'); });
showMoreButton.addEventListener('click', () => {
    document.querySelectorAll('.changelog-entry.hidden').forEach(entry => entry.classList.remove('hidden'));
    showMoreButton.style.display = 'none';
});


// --- CHAT LOGIC ---
const apiUrl = '/api/chat';
let conversation = [];

function saveConversation() {
    localStorage.setItem('babliChatHistory', JSON.stringify(conversation));
}

function loadConversation() {
    const history = localStorage.getItem('babliChatHistory');
    chatBox.innerHTML = '';
    if (history && history.length > 2) {
        conversation = JSON.parse(history);
        conversation.forEach(msg => addMessage(msg.text, msg.sender, false));
    } else {
        conversation = [];
        addMessage("Hi! I'm ცค๖Ɩⁱ. Mujy Kush Kho Ya Me Tumy Ik Khani Sunata Hu!", 'bot', true);
    }
}

async function getGeminiResponse(prompt) {
    loadingSpinner.style.display = 'block';
    setUiState(false);
    const botMessageElement = addMessage('', 'bot', true); 
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt })
        });

        if (!response.ok || !response.body) {
            throw new Error("API request failed or streaming not supported.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value);
            fullResponse += chunk;
            botMessageElement.textContent = fullResponse;
            chatBox.scrollTop = chatBox.scrollHeight;
        }
        
        // Find the placeholder message and update it
        const lastMessage = conversation[conversation.length - 1];
        if (lastMessage && lastMessage.sender === 'bot') {
            lastMessage.text = fullResponse;
        }
        saveConversation();

    } catch (error) {
        console.error("Frontend Fetch Error:", error);
        const errorMessage = `Oops! Something went wrong. (${error.message})`;
        botMessageElement.textContent = errorMessage;
        
        // Find the placeholder message and update it with the error
        const lastMessage = conversation[conversation.length - 1];
        if (lastMessage && lastMessage.sender === 'bot') {
            lastMessage.text = errorMessage;
        }
        saveConversation();
    } finally {
        loadingSpinner.style.display = 'none';
        setUiState(true);
    }
}


function addMessage(text, sender, isNew) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    if (isNew) {
        conversation.push({ text, sender });
        saveConversation();
    }
    return messageElement;
}

function setUiState(enabled) {
    userInput.disabled = !enabled;
    sendButton.disabled = !enabled;
    storyButton.disabled = !enabled;
}

async function handleSend() {
    const message = userInput.value.trim();
    if (!message) return;
    addMessage(message, 'user', true);
    userInput.value = '';
    const prompt = `Analyze the sentiment (positive, negative, neutral) of the user's message and then respond. You are BABLi, a cute, Naughty, thariki An very fluffy, and friendly character made of Cotton. A user is talking to you. Be sweet, curious, and keep your answers very Good and cute, like a child would speak, Always add Small Love Poetry in end of msg, Use "Modern Colloquial Urdu" "Informal Conversational Urdu" Roman Urdu, use lots of Chat releted emojis every whare in chat, . User's message: "${message}"`;
    await getGeminiResponse(prompt);
}

sendButton.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });

storyButton.addEventListener('click', async () => {
    const message = "Apny Bary me Kush Btao!";
    addMessage(message, 'user', true);
    const prompt = "You are BABLi, a cute, Naughty, Thariki, very fluffy, and friendly character made of Cotton🌨️. Tell a very short (2-3 sentences), happy, and simple story about Babli Daily Life. The story should have a 'positive' sentiment. Use Modern Colloial Urdu. Informal Conversational Urdu. Roman Urdu.";
    await getGeminiResponse(prompt);
});

clearChatButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the entire chat history? This cannot be undone.')) {
        localStorage.removeItem('babliChatHistory');
        loadConversation();
    }
});

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    renderChangelog();
    loadConversation();
});
