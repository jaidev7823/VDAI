function executeCommand(commandJson) {
  try {
    var command = JSON.parse(commandJson);
    var action = command.action;
    var params = command.params;

    switch (action) {
      case "createNewProject":
        alert("Debug: Creating new project");
        app.project.closeDocument();
        app.newProject();
        return "true";
      case "openProject":
        alert("Debug: Opening " + params.path);
        var result = app.openDocument(params.path, 1, 1, 1, 1);
        return result ? "true" : "false";
      case "saveProject":
        alert("Debug: Saving project");
        var result = app.project.save();
        return result ? "true" : "false";
      case "closeProject":
        alert("Debug: Closing project");
        var result = app.project.closeDocument();
        return result ? "true" : "false";
      case "importFiles":
        alert("Debug: Importing " + params.paths);
        var result = app.project.importFiles(params.paths);
        return result ? "true" : "false";
      case "createBin":
        if (!params.binName) return "Error: No bin name provided";
        alert("Debug: Creating bin " + params.binName);
        app.project.rootItem.createBin(params.binName);
        return "true";
      case "consolidateDuplicates":
        alert("Debug: Consolidating duplicates");
        var result = app.project.consolidateDuplicates();
        return result === 0 ? "true" : "false";
      case "createSequence":
        alert("Debug: Creating sequence " + params.sequenceName);
        var result = app.project.createNewSequence(
          params.sequenceName,
          params.presetPath
        );
        return result ? "true" : "false";
      case "getActiveSequence":
        alert("Debug: Getting active sequence");
        var sequence = app.project.activeSequence;
        return sequence
          ? "true: Sequence ID - " + sequence.sequenceID
          : "Error: No active sequence";
      case "setPlayheadPosition":
        alert("Debug: Setting playhead to " + params.timeSeconds + " seconds");
        var sequence = app.project.activeSequence;
        if (!sequence) return "Error: No active sequence";
        var ticksPerSecond = 254016000000; // Premiere Pro ticks per second
        var ticks = Math.round(params.timeSeconds * ticksPerSecond).toString();
        sequence.setPlayerPosition(ticks);
        return "true";
      case "getPlayheadPosition":
        alert("Debug: Getting playhead position");
        var sequence = app.project.activeSequence;
        if (!sequence) return "Error: No active sequence";
        var position = sequence.getPlayerPosition().seconds;
        return "true: Position - " + position + " seconds";
      case "getSequenceSettings":
        alert("Debug: Getting sequence settings");
        var sequence = app.project.activeSequence;
        if (!sequence) return "Error: No active sequence";
        var settings = {
          frameSizeH: sequence.frameSizeHorizontal,
          frameSizeV: sequence.frameSizeVertical,
          frameRate: sequence.frameRate,
        };
        return "true: Settings - " + JSON.stringify(settings);
      case "createSequenceFromClips":
        alert("Debug: Creating sequence from clips " + params.sequenceName);
        var projectItems = [];
        for (var i = 0; i < params.clipPaths.length; i++) {
          var imported = app.project.importFiles([params.clipPaths[i]]);
          if (imported) {
            projectItems.push(
              app.project.rootItem.children[
                app.project.rootItem.children.numItems - 1
              ]
            );
          }
        }
        var destinationBin = params.destinationBinName
          ? app.project.rootItem.createBin(params.destinationBinName)
          : null;
        var result = app.project.createNewSequenceFromClips(
          params.sequenceName,
          projectItems,
          destinationBin
        );
        return result ? "true" : "false";
      case "deleteSequence":
        alert("Debug: Deleting active sequence");
        var sequence = app.project.activeSequence;
        if (!sequence) return "Error: No active sequence";
        var result = app.project.deleteSequence(sequence);
        return result ? "true" : "false";
      case "enableQE": // Remove the erroneous effect-adding code from here.
        alert("Debug: Attempting to enable QE API.");
        try {
          app.enableQE(); // This enables the Quirk Extensibility (QE) API // Check if the global 'qe' object is now available
          if (typeof qe !== "undefined") {
            return "true: QE API is now available.";
          } else {
            return "false: QE API failed to initialize ('qe' is undefined).";
          }
        } catch (e) {
          return "Error during app.enableQE(): " + e.toString();
        }

      case "addVideoEffect":
        app.enableQE();

        var gammaCorrectionEffect =
          qe.project.getVideoEffectByName("Gamma Correction");
        if (!gammaCorrectionEffect) {
          alert(
            "Error: 'Gamma Correction' effect not found. Check the name and try again."
          );
          exit();
        }

        var activeSequence = qe.project.getActiveSequence();
        if (!activeSequence) {
          alert("Error: No active sequence found.");
          exit();
        }

        var videoTrack = activeSequence.getVideoTrackAt(0);
        if (!videoTrack) {
          alert("Error: Video track 0 not found.");
          exit();
        }

        if (videoTrack.numItems <= 1) {
          alert(
            "Error: Not enough clips on video track 0. Need at least 2 clips."
          );
          exit();
        }

        var clip = videoTrack.getItemAt(1);
        if (!clip) {
          alert("Error: Clip at index 1 not found.");
          exit();
        }

        try {
          // Attempt to add the effect using a more modern QE function
          clip.addEffect(gammaCorrectionEffect);
          alert("Successfully added 'Gamma Correction' effect.");
        } catch (e) {
          alert(
            "Error adding effect using addEffect(): " +
              e.toString() +
              "\nThis may be due to a change in the unofficial QE API."
          );
        }

      default:
        return "Error: Unknown action " + action;
    }
  } catch (e) {
    alert("Debug: Error in " + action + " - " + e.toString());
    return "Error: " + e.toString();
  }
}
