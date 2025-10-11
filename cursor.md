we are building a ai agent for premire pro 22 CEP extension 

Phase 1 
I want to create buttons to understand and see what my agents can do with the help of apis/fn premire pro provides

1. Project Control
app.project.new() — Create new project (correct method differs from app.newProject)
app.project.open(path) — Open a project from file path
app.project.save() — Save current project
app.project.close() — Close current project
app.project.importFiles(pathsArray) — Import multiple files into project
app.project.rootItem.createBin(name) — Create a new bin/folder in project panel
app.project.deleteBins() — Delete bins in project (less documented, to be used cautiously) # working

2. Sequence Control
app.project.createNewSequence(name, id) — Create a new sequence with optional ID # working
app.project.activeSequence — Reference to currently active sequence
app.project.activeSequence.sequenceSettings — Access or modify sequence settings
app.project.activeSequence.setPlayerPosition(time) — Set playhead position in sequence
app.project.activeSequence.audioTracks — Reference to audio tracks
app.project.activeSequence.videoTracks — Reference to video tracks

3. Clip and Track Operations
.insertClip(item, time) — Insert clip at time on a track
.remove() — Remove clip from timeline
.setInPoint(time, sync) / .setOutPoint(time, sync) — Set in/out points of clips (sync optional boolean)
.setStart(time) / .setEnd(time) — Set clip start/end times
.overwriteClip(item, time) — Overwrite existing clip
.moveClip(trackIndex, newTime) — Move clip to new track/time
.duplicate() — Duplicate clip
.link() / .unlink() — Link or unlink audio/video portions of clips

4. Effects and Transitions
app.enableQE() — Enable undocumented Quality Engineering API to access advanced controls
qe.project.getActiveSequence() — Access sequence with QE API
.addTransition() — Add a transition effect between clips
.addVideoEffect(name) — Add video effect by name
.addAudioEffect(name) — Add audio effect by name
.setEffectProperty(propertyName, value) — Set property value on effect

5. Export and Render
app.encoder.encodeSequence() — Start encoding a sequence
app.encoder.launchEncoder() — Launch Adobe Media Encoder
app.encoder.cancelJob() — Cancel an encoding job
app.encoder.bind() / app.encoder.unbind() — Bind or unbind encoder jobs
app.encoder.removeJob(jobID) — Remove encoding job by ID

6. Metadata and Automation
projectItem.setColorLabel(index) — Set clip or item color label
projectItem.getMediaPath() — Get file system path of media
projectItem.setMetadataValue(key, value) — Set metadata key value
app.getPresetPath() — Get preset path for export or effects
app.properties — Access various app-level properties