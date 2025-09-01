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
// BABLI COLOR CHANGE
const babliThemes = ['', 'theme-pink', 'theme-blue', 'theme-green'];
let currentBabliThemeIndex = 0;
colorButton.addEventListener('click', () => {
    if (babliThemes[currentBabliThemeIndex]) { characterBody.classList.remove(babliThemes[currentBabliThemeIndex]); }
    currentBabliThemeIndex = (currentBabliThemeIndex + 1) % babliThemes.length;
    if (babliThemes[currentBabliThemeIndex]) { characterBody.classList.add(babliThemes[currentBabliThemeIndex]); }
});

// PAGE THEME SWITCHER
const pageThemes = ['default', 'metal-theme', 'space-theme'];
let currentPageThemeIndex = 0;
themeSwitcher.addEventListener('click', () => {
    pageBody.classList.remove(pageThemes[currentPageThemeIndex]);
    currentPageThemeIndex = (currentPageThemeIndex + 1) % pageThemes.length;
    pageBody.classList.add(pageThemes[currentPageThemeIndex]);
});

// RIPPLE EFFECT
document.querySelectorAll('.action-button').forEach(button => {
    button.addEventListener('click', function (e) {
        if (!pageBody.classList.contains('metal-theme')) {
            const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;
            const ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            ripples.classList.add('ripple');
            this.appendChild(ripples);
            setTimeout(() => { ripples.remove() }, 600);
        }
    });
});

// --- CHANGELOG LOGIC ---
const changelogData = [
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

/**
 * Render the changelog entries into the changelogContent container.
 *
 * Clears existing content, creates DOM nodes for each entry in the global
 * `changelogData` array (version, date, author, list of changes) and appends
 * them to `changelogContent`. Entries with index >= 10 are given the `hidden`
 * class so only the first 10 are shown initially. Shows or hides the global
 * `showMoreButton` based on whether there are more than 10 entries.
 */
function renderChangelog() {
    changelogContent.innerHTML = '';
    changelogData.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('changelog-entry');
        if (index >= 10) entryDiv.classList.add('hidden');
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
    showMoreButton.style.display = changelogData.length > 10 ? 'block' : 'none';
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
    if (history) {
        conversation = JSON.parse(history);
        chatBox.innerHTML = ''; // Clear initial message
        conversation.forEach(msg => addMessage(msg.text, msg.sender, false));
    } else {
        // Add initial message if no history
        addMessage("Hi! I'm ცค๖Ɩⁱ. Mujy Kush Kho Ya Me Tumy Ik Khani Sunata Hu!", 'bot', false);
    }
}

/**
 * Send a prompt to the backend chat API, stream the response into the UI in real time,
 * and persist the final bot message to the conversation history.
 *
 * Displays a loading spinner and disables input while streaming. Creates a placeholder
 * bot message element, appends incoming text chunks as they arrive, updates the last
 * conversation entry with the complete response, and saves conversation state.
 * On error, replaces the bot message text with a user-friendly error message.
 *
 * @param {string} prompt - The text prompt sent to the backend chat endpoint.
 */
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

        if (!response.body) {
            throw new Error("Streaming not supported or response has no body.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            fullResponse += chunk;
            botMessageElement.textContent = fullResponse;
            chatBox.scrollTop = chatBox.scrollHeight;
        }
        
        const lastMessage = conversation[conversation.length - 1];
        if(lastMessage && lastMessage.sender === 'bot') {
            lastMessage.text = fullResponse;
        }
        saveConversation();

    } catch (error) {
        console.error("Frontend Fetch Error:", error);
        botMessageElement.textContent = `Oops! Something went wrong. (${error.message})`;
    } finally {
        loadingSpinner.style.display = 'none';
        setUiState(true);
    }
}
        
        conversation.push({ text: fullResponse, sender: 'bot' });
        saveConversation();
        triggerAnimation(sentiment);

    } catch (error) {
        console.error("Frontend Fetch Error:", error);
        botMessageElement.textContent = `Oops! Something went wrong. (${error.message})`;
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

/**
 * Read the current user input, create a conversational prompt for the character, add the user's message to the chat UI, clear the input, and send the prompt to the backend for a streamed bot response.
 *
 * The function trims the input and does nothing if it's empty. When a message is present it:
 * - appends the user's message to the chat (persisting it via addMessage),
 * - clears the input field,
 * - builds a prompt that requests sentiment analysis and a cute character reply in Roman Urdu with poetry and emojis,
 * - calls and awaits getGeminiResponse(prompt) to stream and render the bot's reply.
 *
 * @returns {Promise<void>} Resolves after the backend response handling is initiated and completed.
 */
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
    const prompt = "You are BABLi, a cute, Naughty, Thariki, very fluffy, and friendly character made of Cotton🌨️. Tell a very short (2-3 sentences), happy, and simple story about Babli Daily Life. The story should have a 'positive' sentiment. Use Modern Colloquial Urdu. Informal Conversational Urdu. Roman Urdu.";
    await getGeminiResponse(prompt);
});

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    renderChangelog();
    loadConversation();
});
