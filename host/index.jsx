// ===== PROJECT CONTROL FUNCTIONS =====

function createNewProject() {
    try {
        // Correct method based on kiro.md: app.newProject(path) with optional path
        app.newProject();
        return "New project created successfully";
    } catch (e) {
        return "Error creating new project: " + e.toString();
    }
}

function openProject() {
    try {
        // Based on kiro.md: app.project.open(path) - would need file dialog in real implementation
        // For testing purposes, we'll simulate the call
        return "Project open: Use app.project.open(path) with file dialog";
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
        // Based on kiro.md: app.project.importFiles(pathsArray)
        // For testing, we'll simulate with a sample path array
        var samplePaths = ["C:\\sample\\video.mp4"]; // Would be from file dialog in real implementation
        // app.project.importFiles(samplePaths);
        return "Import files: Use app.project.importFiles(pathsArray) with file dialog selection";
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
        // Based on kiro.md: app.project.createNewSequence() with sequenceName and sequenceID
        var sequenceID = "seq_" + Date.now(); // Generate unique ID
        var newSequence = app.project.createNewSequence(sequenceName, sequenceID);
        if (newSequence) {
            return "Sequence '" + sequenceName + "' created successfully with ID: " + sequenceID;
        } else {
            return "Failed to create sequence - returned 0";
        }
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
            // Based on kiro.md: activeSequence.setPlayerPosition(time) - time can be seconds or Time object
            app.project.activeSequence.setPlayerPosition(timeInSeconds);
            return "Playhead moved to " + timeInSeconds + " seconds";
        } else {
            return "No active sequence available";
        }
    } catch (e) {
        return "Error setting playhead position: " + e.toString();
    }
}

function getSequenceSettings() {
    try {
        if (app.project.activeSequence) {
            var seq = app.project.activeSequence;
            var info = "Sequence: " + seq.name +
                ", Frame Rate: " + seq.framerate +
                ", Duration: " + seq.end.seconds + "s";
            return info;
        } else {
            return "No active sequence available";
        }
    } catch (e) {
        return "Error getting sequence settings: " + e.toString();
    }
}

// ===== CLIP AND TRACK OPERATIONS =====

function insertClip() {
    try {
        if (app.project.activeSequence && app.project.rootItem.children.numItems > 0) {
            // Based on kiro.md: sequence.insertClip(projectItem, time, vTrackIndex, aTrackIndex)
            var projectItem = app.project.rootItem.children[0]; // First item in project
            var currentTime = app.project.activeSequence.getPlayerPosition();
            var vTrackIndex = 0; // V1
            var aTrackIndex = 0; // A1

            app.project.activeSequence.insertClip(projectItem, currentTime, vTrackIndex, aTrackIndex);
            return "Clip inserted at playhead position on V1/A1";
        } else {
            return "No active sequence or project items available";
        }
    } catch (e) {
        return "Error inserting clip: " + e.toString();
    }
}

function removeClip() {
    try {
        if (app.project.activeSequence && app.project.activeSequence.videoTracks[0].clips.numItems > 0) {
            // Based on kiro.md: TrackItem.remove() method
            var clip = app.project.activeSequence.videoTracks[0].clips[0];
            clip.remove();
            return "First clip on V1 removed successfully";
        } else {
            return "No active sequence or clips available on V1";
        }
    } catch (e) {
        return "Error removing clip: " + e.toString();
    }
}

function setInOutPoints(inPoint, outPoint) {
    try {
        if (app.project.activeSequence && app.project.activeSequence.videoTracks[0].clips.numItems > 0) {
            var clip = app.project.activeSequence.videoTracks[0].clips[0];
            // Based on kiro.md: Use clip methods for timeline clips
            clip.setInPoint(inPoint, false);
            clip.setOutPoint(outPoint, false);
            return "Timeline clip In/Out points set: " + inPoint + "s to " + outPoint + "s";
        } else {
            return "No active sequence or clips available";
        }
    } catch (e) {
        return "Error setting in/out points: " + e.toString();
    }
}

function setClipStartEnd(start, end) {
    try {
        if (app.project.activeSequence && app.project.activeSequence.videoTracks[0].clips.numItems > 0) {
            var clip = app.project.activeSequence.videoTracks[0].clips[0];
            // Based on kiro.md: Direct property manipulation (less preferred than move())
            clip.start = start;
            clip.end = end;
            return "Clip timeline position set: " + start + "s to " + end + "s";
        } else {
            return "No active sequence or clips available";
        }
    } catch (e) {
        return "Error setting clip start/end: " + e.toString();
    }
}

function overwriteClip() {
    try {
        if (app.project.activeSequence && app.project.rootItem.children.numItems > 0) {
            // Based on kiro.md: sequence.overwriteClip(projectItem, time, vTrackIndex, aTrackIndex)
            var projectItem = app.project.rootItem.children[0]; // First item in project
            var currentTime = app.project.activeSequence.getPlayerPosition();
            var vTrackIndex = 0; // V1
            var aTrackIndex = 0; // A1

            app.project.activeSequence.overwriteClip(projectItem, currentTime, vTrackIndex, aTrackIndex);
            return "Clip overwritten at playhead position on V1/A1";
        } else {
            return "No active sequence or project items available";
        }
    } catch (e) {
        return "Error overwriting clip: " + e.toString();
    }
}

function moveClip(trackIndex, newTime) {
    try {
        if (app.project.activeSequence && app.project.activeSequence.videoTracks[0].clips.numItems > 0) {
            // Based on kiro.md: TrackItem.move(time, trackIndex) - preferred method
            var clip = app.project.activeSequence.videoTracks[0].clips[0];
            clip.move(newTime, trackIndex);
            return "Clip moved to track " + trackIndex + " at " + newTime + " seconds";
        } else {
            return "No active sequence or clips available";
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
            // Correct method: use qe.sequence.addTransition(track, time, duration) with QE API
            return "Add transition: Use qe.sequence.addTransition(track, time, duration) with QE API";
        } else {
            return "No active sequence";
        }
    } catch (e) {
        return "Error adding transition: " + e.toString();
    }
}

function addVideoEffect(effectName) {
    try {
        if (app.project.activeSequence && app.project.activeSequence.videoTracks[0].clips.numItems > 0) {
            // Based on kiro.md: Must use QE API for adding effects
            app.enableQE(); // Enable QE DOM

            var qeSeq = qe.project.getActiveSequence();
            var qeTrack = qeSeq.getVideoTrackAt(0); // V1
            var qeClip = qeTrack.getItemAt(0); // First clip on V1
            var effectToAdd = qe.project.getVideoEffectByName(effectName);

            if (qeClip && effectToAdd) {
                qeClip.addVideoEffect(effectToAdd);
                return "Video effect '" + effectName + "' added to first clip on V1";
            } else {
                return "Effect '" + effectName + "' not found or no clip available";
            }
        } else {
            return "No active sequence or clips available";
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
        if (app.project.activeSequence && app.project.activeSequence.videoTracks[0].clips.numItems > 0) {
            // Based on kiro.md: Component hierarchy access
            var clip = app.project.activeSequence.videoTracks[0].clips[0];
            var components = clip.components;

            if (components.numItems > 0) {
                // Find component by matchName (more reliable than display name)
                for (var i = 0; i < components.numItems; i++) {
                    var component = components[i];
                    if (component.matchName.indexOf(propertyName) !== -1) {
                        // Access first property and set value
                        if (component.properties.numItems > 0) {
                            component.properties[0].setValue(value, 1); // updateUI = 1
                            return "Property '" + propertyName + "' set to '" + value + "'";
                        }
                    }
                }
                return "Property '" + propertyName + "' not found in clip components";
            } else {
                return "No components found on clip";
            }
        } else {
            return "No active sequence or clips available";
        }
    } catch (e) {
        return "Error setting effect property: " + e.toString();
    }
}

// ===== EXPORT AND RENDER =====

function encodeSequence() {
    try {
        if (app.project.activeSequence) {
            // Based on kiro.md: encodeSequence(sequence, outputPath, presetPath, workArea, removeUponCompletion)
            var sequence = app.project.activeSequence;
            var outputPath = "C:\\temp\\export_" + Date.now() + ".mp4"; // Sample output path
            var presetPath = ""; // Would need actual preset file path
            var workArea = 0; // 0 = Entire sequence, 1 = In to Out, 2 = Work Area
            var removeUponCompletion = 0; // 0 = Keep in queue, 1 = Remove

            // Launch encoder first (recommended)
            app.encoder.launchEncoder();

            var jobID = app.encoder.encodeSequence(sequence, outputPath, presetPath, workArea, removeUponCompletion);

            // Save project after encoding (per kiro.md recommendation)
            app.project.save();

            if (jobID && jobID !== "0") {
                return "Encoding started with Job ID: " + jobID + " to " + outputPath;
            } else {
                return "Failed to start encoding - returned 0";
            }
        } else {
            return "No active sequence available";
        }
    } catch (e) {
        return "Error starting encoding: " + e.toString();
    }
}

function launchEncoder() {
    try {
        // Based on kiro.md: app.encoder.launchEncoder() returns 0 if successful
        var result = app.encoder.launchEncoder();
        if (result === 0) {
            return "Media Encoder launched successfully";
        } else {
            return "Failed to launch Media Encoder - returned: " + result;
        }
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
        // Note: bind/unbind are undocumented/obsolete and not reliably supported
        return "Encoder bind: Method is undocumented/obsolete and not reliably supported";
    } catch (e) {
        return "Error binding encoder: " + e.toString();
    }
}

function unbindEncoder() {
    try {
        // Note: bind/unbind are undocumented/obsolete and not reliably supported
        return "Encoder unbind: Method is undocumented/obsolete and not reliably supported";
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
        if (app.project.activeSequence && app.project.activeSequence.videoTracks[0].clips.numItems > 0) {
            var clip = app.project.activeSequence.videoTracks[0].clips[0];
            // Based on kiro.md: ProjectItem.setXMPMetadata(Key, Value, ColumnID/ColumnPath)
            clip.projectItem.setXMPMetadata(key, value, "");
            return "XMP Metadata set: " + key + " = " + value;
        } else {
            return "No active sequence or clips available";
        }
    } catch (e) {
        return "Error setting metadata: " + e.toString();
    }
}

function getPresetPath() {
    try {
        // Correct method: use app.encoder.getPresets() for export presets
        return "Preset path: Use app.encoder.getPresets() for export presets (getPresetPath doesn't exist)";
    } catch (e) {
        return "Error getting preset path: " + e.toString();
    }
}

function getAppProperties() {
    try {
        // Note: app.properties is vague/undocumented. Use specific properties like app.project instead
        return "App properties: Use specific properties like app.project (app.properties is undocumented)";
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

// ===== ADDITIONAL QE API FUNCTIONS =====

function addCropEffect() {
    try {
        if (app.project.activeSequence && app.project.activeSequence.videoTracks[0].clips.numItems > 0) {
            // Based on kiro.md example: Adding Crop effect using QE API
            app.enableQE();

            var qeSeq = qe.project.getActiveSequence();
            var qeTrack = qeSeq.getVideoTrackAt(0); // V1
            var qeClip = qeTrack.getItemAt(0); // First clip on V1
            var effectToAdd = qe.project.getVideoEffectByName("Crop");

            if (qeClip && effectToAdd) {
                qeClip.addVideoEffect(effectToAdd);
                return "Crop effect added successfully to first clip on V1";
            } else {
                return "Failed to add Crop effect - clip or effect not found";
            }
        } else {
            return "No active sequence or clips available";
        }
    } catch (e) {
        return "Error adding Crop effect: " + e.toString();
    }
}

function getPlayheadPosition() {
    try {
        if (app.project.activeSequence) {
            var position = app.project.activeSequence.getPlayerPosition();
            return "Current playhead position: " + position.seconds + " seconds";
        } else {
            return "No active sequence available";
        }
    } catch (e) {
        return "Error getting playhead position: " + e.toString();
    }
}

function setClipInOut(inSeconds, outSeconds) {
    try {
        if (app.project.activeSequence && app.project.activeSequence.videoTracks[0].clips.numItems > 0) {
            var clip = app.project.activeSequence.videoTracks[0].clips[0];
            // Based on kiro.md: Set In and Out points before insertion
            clip.projectItem.setInPoint(inSeconds, 4); // 4 = seconds timecode format
            clip.projectItem.setOutPoint(outSeconds, 4);
            return "Clip In/Out points set: " + inSeconds + "s to " + outSeconds + "s";
        } else {
            return "No active sequence or clips available";
        }
    } catch (e) {
        return "Error setting clip in/out points: " + e.toString();
    }
}

function reflectQEMethods() {
    try {
        app.enableQE();
        // Based on kiro.md: Use qe.reflect.methods for dynamic inspection
        if (typeof qe !== 'undefined' && qe.reflect && qe.reflect.methods) {
            var methods = qe.reflect.methods();
            return "QE Methods available: " + methods.toString();
        } else {
            return "QE reflection not available";
        }
    } catch (e) {
        return "Error reflecting QE methods: " + e.toString();
    }
}

// ===== DIAGNOSTIC FUNCTIONS =====

function getProjectInfo() {
    try {
        var info = "=== PROJECT DIAGNOSTICS ===\n";
        info += "Project name: " + (app.project.name || "Untitled") + "\n";
        info += "Project items: " + app.project.rootItem.children.numItems + "\n";

        if (app.project.activeSequence) {
            info += "Active sequence: " + app.project.activeSequence.name + "\n";
            info += "Video tracks: " + app.project.activeSequence.videoTracks.numTracks + "\n";
            info += "Audio tracks: " + app.project.activeSequence.audioTracks.numTracks + "\n";

            if (app.project.activeSequence.videoTracks.numTracks > 0) {
                info += "V1 clips: " + app.project.activeSequence.videoTracks[0].clips.numItems + "\n";
            }

            if (app.project.activeSequence.audioTracks.numTracks > 0) {
                info += "A1 clips: " + app.project.activeSequence.audioTracks[0].clips.numItems + "\n";
            }
        } else {
            info += "No active sequence\n";
        }

        return info;
    } catch (e) {
        return "Error getting project info: " + e.toString();
    }
}

function testAPICompatibility() {
    try {
        var results = "=== API COMPATIBILITY TEST ===\n";

        // Test basic app object
        results += "app object: " + (typeof app !== 'undefined' ? "✓" : "✗") + "\n";
        results += "app.project: " + (typeof app.project !== 'undefined' ? "✓" : "✗") + "\n";
        results += "app.encoder: " + (typeof app.encoder !== 'undefined' ? "✓" : "✗") + "\n";

        // Test QE API availability
        try {
            app.enableQE();
            results += "QE API: " + (typeof qe !== 'undefined' ? "✓" : "✗") + "\n";
        } catch (qeError) {
            results += "QE API: ✗ (Error: " + qeError.toString() + ")\n";
        }

        // Test sequence availability
        results += "Active sequence: " + (app.project.activeSequence ? "✓" : "✗") + "\n";

        return results;
    } catch (e) {
        return "Error testing API compatibility: " + e.toString();
    }
}