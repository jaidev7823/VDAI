var csInterface = new CSInterface();

function updateStatus(message) {
    document.getElementById('status-display').innerText = message;
}

// JSON command array for all API actions
const commands = {
    createNewProject: { action: "createNewProject", params: {} },
    openProject: {
        action: "openProject",
        params: { path: "C:/Users/Jai Mishra/OneDrive/Documents/Adobe/Premiere Pro/14.0/test_1_1.prproj" }
    },
    saveProject: { action: "saveProject", params: {} },
    closeProject: { action: "closeProject", params: {} },
    importFiles: {
        action: "importFiles",
        params: { paths: ["C:/Users/Jai Mishra/Downloads/invincible_edit.mp4"] }
    },
    createBin: { action: "createBin", params: { binName: null } },
    consolidateDuplicates: { action: "consolidateDuplicates", params: {} },
    createSequence: {
        action: "createSequence",
        params: {
            sequenceName: "NewSequence",
            presetPath: "C:/Program Files/Adobe/Adobe Premiere Pro 2022/Settings/SequencePresets/HDV1080p30.sqpreset"
        }
    },
    getActiveSequence: { action: "getActiveSequence", params: {} },
    setPlayheadPosition: { action: "setPlayheadPosition", params: { timeSeconds: 5.0 } },
    getPlayheadPosition: { action: "getPlayheadPosition", params: {} },
    getSequenceSettings: { action: "getSequenceSettings", params: {} },
    createSequenceFromClips: {
        action: "createSequenceFromClips",
        params: {
            sequenceName: "ClipSequence",
            clipPaths: ["C:/Users/Jai Mishra/Downloads/invincible_edit.mp4"],
            destinationBinName: null
        }
    },
    deleteSequence: { action: "deleteSequence", params: {} },
    enableQE: { action: "enableQE", params: {} }
};

// Single function to execute commands
function executeCommand(commandKey) {
    if (!commands[commandKey]) {
        updateStatus(`Error: Command ${commandKey} not found`);
        return;
    }
    const command = JSON.parse(JSON.stringify(commands[commandKey]));
    if (commandKey === "createBin") {
        command.params.binName = prompt('Enter bin name:') || "DefaultBin";
    } else if (commandKey === "createSequence") {
        command.params.sequenceName = prompt('Enter sequence name:') || "NewSequence";
    } else if (commandKey === "createSequenceFromClips") {
        command.params.sequenceName = prompt('Enter sequence name:') || "ClipSequence";
        command.params.destinationBinName = prompt('Enter destination bin name (optional):') || null;
    } else if (commandKey === "setPlayheadPosition") {
        const time = prompt('Enter playhead position (seconds):') || "5.0";
        command.params.timeSeconds = parseFloat(time);
    }
    updateStatus(`Executing ${commandKey}...`);
    csInterface.evalScript(`executeCommand('${JSON.stringify(command)}')`, (result) => {
        console.log(`Result for ${commandKey}: ${result}`);
        if (result === "true") {
            updateStatus(`${commandKey} executed successfully!`);
        } else {
            updateStatus(`Error in ${commandKey}: ${result}`);
        }
    });
}

function addVideoEffect() {
    const effectName = prompt("Enter the name of the video effect to add:", "Gamma Correction");
    if (!effectName) {
        updateStatus("Add video effect cancelled.");
        return;
    }
    updateStatus(`Adding '${effectName}' effect...`);
    const command = {
        action: "addVideoEffect",
        params: { effectName: effectName }
    };
    csInterface.evalScript(`executeCommand('${JSON.stringify(command)}')`, (result) => {
        console.log(`Result for addVideoEffect: ${result}`);
        if (result === "true") {
            updateStatus(`'${effectName}' effect added successfully!`);
        } else {
            updateStatus(`Error adding effect: ${result}`);
        }
    });
}