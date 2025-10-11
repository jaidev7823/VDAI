// ===== PROJECT CONTROL FUNCTIONS =====

function createNewProject() {
    try {
        app.project.new();
        return "New project created successfully";
    } catch (e) {
        return "Error creating new project: " + e.toString();
    }
}

function openProject() {
    try {
        // This would typically open a file dialog, but for demo purposes
        // we'll just return a message
        return "Project open dialog would appear here";
    } catch (e) {
        return "Error opening project: " + e.toString();
    }
}

function saveProject() {
    try {
        app.project.save();
        return "Project saved successfully";
    } catch (e) {
        return "Error saving project: " + e.toString();
    }
}

function closeProject() {
    try {
        app.project.close();
        return "Project closed successfully";
    } catch (e) {
        return "Error closing project: " + e.toString();
    }
}

function importFiles() {
    try {
        // This would typically open a file dialog for importing
        return "Import files dialog would appear here";
    } catch (e) {
        return "Error importing files: " + e.toString();
    }
}

function createBin(binName) {
    try {
        app.project.rootItem.createBin(binName);
        return "Bin '" + binName + "' created successfully";
    } catch (e) {
        return "Error creating bin: " + e.toString();
    }
}

// ===== SEQUENCE CONTROL FUNCTIONS =====

function createSequence(sequenceName) {
    try {
        app.project.createNewSequence(sequenceName, "sequenceID");
        return "Sequence '" + sequenceName + "' created successfully";
    } catch (e) {
        return "Error creating sequence: " + e.toString();
    }
}

function getActiveSequence() {
    try {
        if (app.project.activeSequence) {
            return "Active sequence: " + app.project.activeSequence.name;
        } else {
            return "No active sequence";
        }
    } catch (e) {
        return "Error getting active sequence: " + e.toString();
    }
}

function setPlayheadPosition(timeInSeconds) {
    try {
        if (app.project.activeSequence) {
            app.project.activeSequence.setPlayerPosition(timeInSeconds);
            return "Playhead moved to " + timeInSeconds + " seconds";
        } else {
            return "No active sequence";
        }
    } catch (e) {
        return "Error setting playhead position: " + e.toString();
    }
}

function getSequenceSettings() {
    try {
        if (app.project.activeSequence) {
            var settings = app.project.activeSequence.sequenceSettings;
            return "Sequence settings retrieved successfully";
        } else {
            return "No active sequence";
        }
    } catch (e) {
        return "Error getting sequence settings: " + e.toString();
    }
}

// ===== CLIP AND TRACK OPERATIONS =====

function insertClip() {
    try {
        if (app.project.activeSequence && app.project.activeSequence.videoTracks.length > 0) {
            // This is a simplified example - in practice you'd need to specify the item and time
            return "Insert clip operation would be performed here";
        } else {
            return "No active sequence or video tracks available";
        }
    } catch (e) {
        return "Error inserting clip: " + e.toString();
    }
}

function removeClip() {
    try {
        if (app.project.activeSequence && app.project.activeSequence.videoTracks.length > 0) {
            // This would remove the selected clip
            return "Remove clip operation would be performed here";
        } else {
            return "No active sequence or clips available";
        }
    } catch (e) {
        return "Error removing clip: " + e.toString();
    }
}

function setInOutPoints(inPoint, outPoint) {
    try {
        if (app.project.activeSequence && app.project.activeSequence.videoTracks.length > 0) {
            var clip = app.project.activeSequence.videoTracks[0].clips[0];
            clip.setInPoint(inPoint, false);
            clip.setOutPoint(outPoint, false);
            return "In/out points set to " + inPoint + " - " + outPoint;
        } else {
            return "No active sequence or clips available";
        }
    } catch (e) {
        return "Error setting in/out points: " + e.toString();
    }
}

function setClipStartEnd(start, end) {
    try {
        if (app.project.activeSequence && app.project.activeSequence.videoTracks.length > 0) {
            var clip = app.project.activeSequence.videoTracks[0].clips[0];
            clip.setStart(start);
            clip.setEnd(end);
            return "Clip start/end set to " + start + " - " + end;
        } else {
            return "No active sequence or clips available";
        }
    } catch (e) {
        return "Error setting clip start/end: " + e.toString();
    }
}

function overwriteClip() {
    try {
        if (app.project.activeSequence && app.project.activeSequence.videoTracks.length > 0) {
            return "Overwrite clip operation would be performed here";
        } else {
            return "No active sequence or clips available";
        }
    } catch (e) {
        return "Error overwriting clip: " + e.toString();
    }
}

function moveClip(trackIndex, newTime) {
    try {
        if (app.project.activeSequence && app.project.activeSequence.videoTracks.length > trackIndex) {
            return "Move clip operation would be performed here";
        } else {
            return "No active sequence or track available";
        }
    } catch (e) {
        return "Error moving clip: " + e.toString();
    }
}

function duplicateClip() {
    try {
        if (app.project.activeSequence && app.project.activeSequence.videoTracks.length > 0) {
            return "Duplicate clip operation would be performed here";
        } else {
            return "No active sequence or clips available";
        }
    } catch (e) {
        return "Error duplicating clip: " + e.toString();
    }
}

function linkUnlinkClip() {
    try {
        if (app.project.activeSequence && app.project.activeSequence.videoTracks.length > 0) {
            return "Link/unlink clip operation would be performed here";
        } else {
            return "No active sequence or clips available";
        }
    } catch (e) {
        return "Error toggling clip link: " + e.toString();
    }
}

// ===== EFFECTS AND TRANSITIONS =====

function enableQE() {
    try {
        app.enableQE();
        return "QE API enabled successfully";
    } catch (e) {
        return "Error enabling QE API: " + e.toString();
    }
}

function addTransition() {
    try {
        if (app.project.activeSequence) {
            return "Add transition operation would be performed here";
        } else {
            return "No active sequence";
        }
    } catch (e) {
        return "Error adding transition: " + e.toString();
    }
}

function addVideoEffect(effectName) {
    try {
        if (app.project.activeSequence) {
            return "Video effect '" + effectName + "' would be added here";
        } else {
            return "No active sequence";
        }
    } catch (e) {
        return "Error adding video effect: " + e.toString();
    }
}

function addAudioEffect(effectName) {
    try {
        if (app.project.activeSequence) {
            return "Audio effect '" + effectName + "' would be added here";
        } else {
            return "No active sequence";
        }
    } catch (e) {
        return "Error adding audio effect: " + e.toString();
    }
}

function setEffectProperty(propertyName, value) {
    try {
        if (app.project.activeSequence) {
            return "Effect property '" + propertyName + "' would be set to '" + value + "'";
        } else {
            return "No active sequence";
        }
    } catch (e) {
        return "Error setting effect property: " + e.toString();
    }
}

// ===== EXPORT AND RENDER =====

function encodeSequence() {
    try {
        if (app.project.activeSequence) {
            app.encoder.encodeSequence();
            return "Sequence encoding started";
        } else {
            return "No active sequence";
        }
    } catch (e) {
        return "Error starting encoding: " + e.toString();
    }
}

function launchEncoder() {
    try {
        app.encoder.launchEncoder();
        return "Media Encoder launched";
    } catch (e) {
        return "Error launching Media Encoder: " + e.toString();
    }
}

function cancelJob() {
    try {
        app.encoder.cancelJob();
        return "Encoding job cancelled";
    } catch (e) {
        return "Error cancelling job: " + e.toString();
    }
}

function bindEncoder() {
    try {
        app.encoder.bind();
        return "Encoder bound successfully";
    } catch (e) {
        return "Error binding encoder: " + e.toString();
    }
}

function unbindEncoder() {
    try {
        app.encoder.unbind();
        return "Encoder unbound successfully";
    } catch (e) {
        return "Error unbinding encoder: " + e.toString();
    }
}

function removeJob(jobID) {
    try {
        app.encoder.removeJob(jobID);
        return "Job '" + jobID + "' removed successfully";
    } catch (e) {
        return "Error removing job: " + e.toString();
    }
}

// ===== METADATA AND AUTOMATION =====

function setColorLabel(colorIndex) {
    try {
        if (app.project.activeSequence && app.project.activeSequence.videoTracks.length > 0) {
            var clip = app.project.activeSequence.videoTracks[0].clips[0];
            clip.projectItem.setColorLabel(parseInt(colorIndex));
            return "Color label set to " + colorIndex;
        } else {
            return "No active sequence or clips available";
        }
    } catch (e) {
        return "Error setting color label: " + e.toString();
    }
}

function getMediaPath() {
    try {
        if (app.project.activeSequence && app.project.activeSequence.videoTracks.length > 0) {
            var clip = app.project.activeSequence.videoTracks[0].clips[0];
            return clip.projectItem.getMediaPath();
        } else {
            return "No active sequence or clips available";
        }
    } catch (e) {
        return "Error getting media path: " + e.toString();
    }
}

function setMetadata(key, value) {
    try {
        if (app.project.activeSequence && app.project.activeSequence.videoTracks.length > 0) {
            var clip = app.project.activeSequence.videoTracks[0].clips[0];
            clip.projectItem.setMetadataValue(key, value);
            return "Metadata set: " + key + " = " + value;
        } else {
            return "No active sequence or clips available";
        }
    } catch (e) {
        return "Error setting metadata: " + e.toString();
    }
}

function getPresetPath() {
    try {
        return app.getPresetPath();
    } catch (e) {
        return "Error getting preset path: " + e.toString();
    }
}

function getAppProperties() {
    try {
        var props = app.properties;
        return "App properties retrieved successfully";
    } catch (e) {
        return "Error getting app properties: " + e.toString();
    }
}

// ===== LEGACY FUNCTIONS (for backward compatibility) =====

// Returns the in and out points of clip[0] on track V1.
// The in and out points are relative to the base media.
// The start point is relative to the timeline. We need it for offsetting
// the silences correctly in Python.
function getInOutStartPoints() {
    try {
        var clip = app.project.activeSequence.videoTracks[0].clips[0];
        var inPoint = clip.inPoint.seconds;
        var outPoint = clip.outPoint.seconds;
        var start = clip.start.seconds;
        var result = '{"in": ' + inPoint + ', "out": ' + outPoint + ', "start": ' + start + '}';
        return result;
    } catch (e) {
        return "Error getting in/out/start points: " + e.toString();
    }
}

// Enforces jaicut prerequisites.
// There must be only one clip in the timeline.
// That clip must be a linked pair of audio and video.
function checkOneLinkedClipPair() {
    try {
        if (app.project.activeSequence.videoTracks[0].clips.length != 1) {
            return false; // Failed conditions. More than one or no video clips.
        }

        if (app.project.activeSequence.audioTracks[0].clips.length != 1) {
            return false;
        }

        if (app.project.activeSequence.videoTracks[0].clips[0].getLinkedItems().length != 2) {
            return false; // Linking not valid
        }
        return true;
    } catch (e) {
        return false;
    }
}

function movePlayhead(timeInSeconds) {
    try {
        if (app.project.activeSequence) {
            app.project.activeSequence.setPlayerPosition(timeInSeconds);
            return "Playhead moved to " + timeInSeconds + " seconds";
        } else {
            return "Please select a sequence first.";
        }
    } catch (e) {
        return "Error moving playhead: " + e.toString();
    }
}