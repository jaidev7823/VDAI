const csInterface = new CSInterface();

document.addEventListener('DOMContentLoaded', () => {
    updateStatus('Premiere Pro AI Agent initialized successfully!');
    
    // Initialize chat interface if needed
    const sendButton = document.getElementById('send-button');
    const messageInput = document.getElementById('message-input');
    const chatMessages = document.getElementById('chat-messages');

    if (sendButton && messageInput && chatMessages) {
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
    }
});

// Status display function
function updateStatus(message) {
    const statusDisplay = document.getElementById('status-display');
    if (statusDisplay) {
        const timestamp = new Date().toLocaleTimeString();
        statusDisplay.innerHTML = `[${timestamp}] ${message}`;
    }
    console.log(message);
}

// Chat functionality (optional)
    function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const chatMessages = document.getElementById('chat-messages');
    
    if (!messageInput || !chatMessages) return;
    
        const messageText = messageInput.value.trim();
        if (messageText) {
            addMessage(messageText, 'user');
            messageInput.value = '';
            getOllamaResponse(messageText);
        }
    }

    function addMessage(text, sender) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function getOllamaResponse(prompt) {
        const systemPrompt = `You are an AI assistant for Adobe Premiere Pro. Analyze the user's request and convert it into a structured JSON command. The available commands are: ["move_playhead"].
            - For "move_playhead", extract the time in seconds.
            - If the request is not a command, provide a conversational response.
                
            Examples:
            User: "move my video to 30 sec"
            AI: {"command": "move_playhead", "time": 30}
                
            User: "Go to 1 minute 15 seconds"
            AI: {"command": "move_playhead", "time": 75}
                
            User: "Hello, how are you?"
            AI: {"response": "I'm doing well, thank you! How can I help you with Premiere Pro today?"}
                
            User: ${prompt}
            AI:`;

        try {
            const response = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'mistral',
                    prompt: systemPrompt,
                    stream: false,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                try {
                    const commandJson = JSON.parse(data.response);
                    if (commandJson.command === 'move_playhead') {
                        movePremierePlayhead(commandJson.time);
                        addMessage(`Moving playhead to ${commandJson.time} seconds.`, 'bot');
                    } else if (commandJson.response) {
                        addMessage(commandJson.response, 'bot');
                    }
                } catch (e) {
                    // Not a JSON command, just a regular chat message
                    addMessage(data.response, 'bot');
                }
            } else {
                addMessage('Error: Could not connect to Ollama.', 'bot');
            }
        } catch (error) {
            console.error('Error communicating with Ollama:', error);
            addMessage('Error: Could not connect to Ollama.', 'bot');
        }
    }

    function movePremierePlayhead(timeInSeconds) {
        csInterface.evalScript(`movePlayhead(${timeInSeconds})`);
    updateStatus(`Moving playhead to ${timeInSeconds} seconds`);
}

// ===== PROJECT CONTROL FUNCTIONS =====

function createNewProject() {
    updateStatus('Creating new project...');
    csInterface.evalScript('createNewProject()', (result) => {
        if (result === 'EvalScript error.') {
            updateStatus('Error: Failed to create new project');
        } else {
            updateStatus('New project created successfully!');
        }
    });
}

function openProject() {
    updateStatus('Opening project...');
    csInterface.evalScript('openProject()', (result) => {
        if (result === 'EvalScript error.') {
            updateStatus('Error: Failed to open project');
        } else {
            updateStatus('Project opened successfully!');
        }
    });
}

function saveProject() {
    updateStatus('Saving project...');
    csInterface.evalScript('saveProject()', (result) => {
        if (result === 'EvalScript error.') {
            updateStatus('Error: Failed to save project');
        } else {
            updateStatus('Project saved successfully!');
        }
    });
}

function closeProject() {
    updateStatus('Closing project...');
    csInterface.evalScript('closeProject()', (result) => {
        if (result === 'EvalScript error.') {
            updateStatus('Error: Failed to close project');
        } else {
            updateStatus('Project closed successfully!');
        }
    });
}

function importFiles() {
    updateStatus('Importing files...');
    csInterface.evalScript('importFiles()', (result) => {
        if (result === 'EvalScript error.') {
            updateStatus('Error: Failed to import files');
        } else {
            updateStatus('Files imported successfully!');
        }
    });
}

function createBin() {
    const binName = prompt('Enter bin name:');
    if (binName) {
        updateStatus(`Creating bin: ${binName}`);
        csInterface.evalScript(`createBin("${binName}")`, (result) => {
            if (result === 'EvalScript error.') {
                updateStatus('Error: Failed to create bin');
            } else {
                updateStatus(`Bin "${binName}" created successfully!`);
            }
        });
    }
}

// ===== SEQUENCE CONTROL FUNCTIONS =====

function createSequence() {
    const sequenceName = prompt('Enter sequence name:');
    if (sequenceName) {
        updateStatus(`Creating sequence: ${sequenceName}`);
        csInterface.evalScript(`createSequence("${sequenceName}")`, (result) => {
            if (result === 'EvalScript error.') {
                updateStatus('Error: Failed to create sequence');
            } else {
                updateStatus(`Sequence "${sequenceName}" created successfully!`);
            }
        });
    }
}

function getActiveSequence() {
    updateStatus('Getting active sequence...');
    csInterface.evalScript('getActiveSequence()', (result) => {
        if (result === 'EvalScript error.') {
            updateStatus('Error: Failed to get active sequence');
        } else {
            updateStatus(`Active sequence: ${result}`);
        }
    });
}

function setPlayheadPosition() {
    const time = prompt('Enter time in seconds:');
    if (time && !isNaN(time)) {
        updateStatus(`Setting playhead to ${time} seconds`);
        csInterface.evalScript(`setPlayheadPosition(${time})`, (result) => {
            if (result === 'EvalScript error.') {
                updateStatus('Error: Failed to set playhead position');
            } else {
                updateStatus(`Playhead moved to ${time} seconds`);
            }
        });
    }
}

function getSequenceSettings() {
    updateStatus('Getting sequence settings...');
    csInterface.evalScript('getSequenceSettings()', (result) => {
        if (result === 'EvalScript error.') {
            updateStatus('Error: Failed to get sequence settings');
        } else {
            updateStatus(`Sequence settings: ${result}`);
        }
    });
}

// ===== CLIP AND TRACK OPERATIONS =====

function insertClip() {
    updateStatus('Inserting clip...');
    csInterface.evalScript('insertClip()', (result) => {
        if (result === 'EvalScript error.') {
            updateStatus('Error: Failed to insert clip');
        } else {
            updateStatus('Clip inserted successfully!');
        }
    });
}

function removeClip() {
    updateStatus('Removing clip...');
    csInterface.evalScript('removeClip()', (result) => {
        if (result === 'EvalScript error.') {
            updateStatus('Error: Failed to remove clip');
        } else {
            updateStatus('Clip removed successfully!');
        }
    });
}

function setInOutPoints() {
    const inPoint = prompt('Enter in point (seconds):');
    const outPoint = prompt('Enter out point (seconds):');
    if (inPoint && outPoint && !isNaN(inPoint) && !isNaN(outPoint)) {
        updateStatus(`Setting in/out points: ${inPoint}s - ${outPoint}s`);
        csInterface.evalScript(`setInOutPoints(${inPoint}, ${outPoint})`, (result) => {
            if (result === 'EvalScript error.') {
                updateStatus('Error: Failed to set in/out points');
            } else {
                updateStatus('In/out points set successfully!');
            }
        });
    }
}

function setClipStartEnd() {
    const start = prompt('Enter start time (seconds):');
    const end = prompt('Enter end time (seconds):');
    if (start && end && !isNaN(start) && !isNaN(end)) {
        updateStatus(`Setting clip start/end: ${start}s - ${end}s`);
        csInterface.evalScript(`setClipStartEnd(${start}, ${end})`, (result) => {
            if (result === 'EvalScript error.') {
                updateStatus('Error: Failed to set clip start/end');
            } else {
                updateStatus('Clip start/end set successfully!');
            }
        });
    }
}

function overwriteClip() {
    updateStatus('Overwriting clip...');
    csInterface.evalScript('overwriteClip()', (result) => {
        if (result === 'EvalScript error.') {
            updateStatus('Error: Failed to overwrite clip');
        } else {
            updateStatus('Clip overwritten successfully!');
        }
    });
}

function moveClip() {
    const trackIndex = prompt('Enter track index:');
    const newTime = prompt('Enter new time (seconds):');
    if (trackIndex && newTime && !isNaN(trackIndex) && !isNaN(newTime)) {
        updateStatus(`Moving clip to track ${trackIndex} at ${newTime}s`);
        csInterface.evalScript(`moveClip(${trackIndex}, ${newTime})`, (result) => {
            if (result === 'EvalScript error.') {
                updateStatus('Error: Failed to move clip');
            } else {
                updateStatus('Clip moved successfully!');
            }
        });
    }
}

function duplicateClip() {
    updateStatus('Duplicating clip...');
    csInterface.evalScript('duplicateClip()', (result) => {
        if (result === 'EvalScript error.') {
            updateStatus('Error: Failed to duplicate clip');
        } else {
            updateStatus('Clip duplicated successfully!');
        }
    });
}

function linkUnlinkClip() {
    updateStatus('Toggling clip link...');
    csInterface.evalScript('linkUnlinkClip()', (result) => {
        if (result === 'EvalScript error.') {
            updateStatus('Error: Failed to toggle clip link');
        } else {
            updateStatus('Clip link toggled successfully!');
        }
    });
}

// ===== EFFECTS AND TRANSITIONS =====

function enableQE() {
    updateStatus('Enabling QE API...');
    csInterface.evalScript('enableQE()', (result) => {
        if (result === 'EvalScript error.') {
            updateStatus('Error: Failed to enable QE API');
        } else {
            updateStatus('QE API enabled successfully!');
        }
    });
}

function addTransition() {
    updateStatus('Adding transition...');
    csInterface.evalScript('addTransition()', (result) => {
        if (result === 'EvalScript error.') {
            updateStatus('Error: Failed to add transition');
        } else {
            updateStatus('Transition added successfully!');
        }
    });
}

function addVideoEffect() {
    const effectName = prompt('Enter video effect name:');
    if (effectName) {
        updateStatus(`Adding video effect: ${effectName}`);
        csInterface.evalScript(`addVideoEffect("${effectName}")`, (result) => {
            if (result === 'EvalScript error.') {
                updateStatus('Error: Failed to add video effect');
            } else {
                updateStatus(`Video effect "${effectName}" added successfully!`);
            }
        });
    }
}

function addAudioEffect() {
    const effectName = prompt('Enter audio effect name:');
    if (effectName) {
        updateStatus(`Adding audio effect: ${effectName}`);
        csInterface.evalScript(`addAudioEffect("${effectName}")`, (result) => {
            if (result === 'EvalScript error.') {
                updateStatus('Error: Failed to add audio effect');
            } else {
                updateStatus(`Audio effect "${effectName}" added successfully!`);
            }
        });
    }
}

function setEffectProperty() {
    const propertyName = prompt('Enter property name:');
    const value = prompt('Enter property value:');
    if (propertyName && value) {
        updateStatus(`Setting effect property: ${propertyName} = ${value}`);
        csInterface.evalScript(`setEffectProperty("${propertyName}", "${value}")`, (result) => {
            if (result === 'EvalScript error.') {
                updateStatus('Error: Failed to set effect property');
            } else {
                updateStatus('Effect property set successfully!');
            }
        });
    }
}

// ===== EXPORT AND RENDER =====

function encodeSequence() {
    updateStatus('Starting sequence encoding...');
    csInterface.evalScript('encodeSequence()', (result) => {
        if (result === 'EvalScript error.') {
            updateStatus('Error: Failed to start encoding');
        } else {
            updateStatus('Sequence encoding started successfully!');
        }
    });
}

function launchEncoder() {
    updateStatus('Launching Media Encoder...');
    csInterface.evalScript('launchEncoder()', (result) => {
        if (result === 'EvalScript error.') {
            updateStatus('Error: Failed to launch Media Encoder');
        } else {
            updateStatus('Media Encoder launched successfully!');
        }
    });
}

function cancelJob() {
    updateStatus('Cancelling encoding job...');
    csInterface.evalScript('cancelJob()', (result) => {
        if (result === 'EvalScript error.') {
            updateStatus('Error: Failed to cancel job');
        } else {
            updateStatus('Encoding job cancelled successfully!');
        }
    });
}

function bindEncoder() {
    updateStatus('Binding encoder...');
    csInterface.evalScript('bindEncoder()', (result) => {
        if (result === 'EvalScript error.') {
            updateStatus('Error: Failed to bind encoder');
        } else {
            updateStatus('Encoder bound successfully!');
        }
    });
}

function unbindEncoder() {
    updateStatus('Unbinding encoder...');
    csInterface.evalScript('unbindEncoder()', (result) => {
        if (result === 'EvalScript error.') {
            updateStatus('Error: Failed to unbind encoder');
        } else {
            updateStatus('Encoder unbound successfully!');
        }
    });
}

function removeJob() {
    const jobID = prompt('Enter job ID to remove:');
    if (jobID) {
        updateStatus(`Removing job: ${jobID}`);
        csInterface.evalScript(`removeJob("${jobID}")`, (result) => {
            if (result === 'EvalScript error.') {
                updateStatus('Error: Failed to remove job');
            } else {
                updateStatus(`Job "${jobID}" removed successfully!`);
            }
        });
    }
}

// ===== METADATA AND AUTOMATION =====

function setColorLabel() {
    const colorIndex = prompt('Enter color label index (0-7):');
    if (colorIndex && !isNaN(colorIndex)) {
        updateStatus(`Setting color label: ${colorIndex}`);
        csInterface.evalScript(`setColorLabel(${colorIndex})`, (result) => {
            if (result === 'EvalScript error.') {
                updateStatus('Error: Failed to set color label');
            } else {
                updateStatus(`Color label ${colorIndex} set successfully!`);
            }
        });
    }
}

function getMediaPath() {
    updateStatus('Getting media path...');
    csInterface.evalScript('getMediaPath()', (result) => {
        if (result === 'EvalScript error.') {
            updateStatus('Error: Failed to get media path');
        } else {
            updateStatus(`Media path: ${result}`);
        }
    });
}

function setMetadata() {
    const key = prompt('Enter metadata key:');
    const value = prompt('Enter metadata value:');
    if (key && value) {
        updateStatus(`Setting metadata: ${key} = ${value}`);
        csInterface.evalScript(`setMetadata("${key}", "${value}")`, (result) => {
            if (result === 'EvalScript error.') {
                updateStatus('Error: Failed to set metadata');
            } else {
                updateStatus('Metadata set successfully!');
            }
        });
    }
}

function getPresetPath() {
    updateStatus('Getting preset path...');
    csInterface.evalScript('getPresetPath()', (result) => {
        if (result === 'EvalScript error.') {
            updateStatus('Error: Failed to get preset path');
        } else {
            updateStatus(`Preset path: ${result}`);
        }
    });
}

function getAppProperties() {
    updateStatus('Getting app properties...');
    csInterface.evalScript('getAppProperties()', (result) => {
        if (result === 'EvalScript error.') {
            updateStatus('Error: Failed to get app properties');
        } else {
            updateStatus(`App properties: ${result}`);
        }
    });
}
