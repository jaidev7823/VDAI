const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

let csInterface = new CSInterface();
let operating_system = getOS();
initFrontend();
init();

// Name of executable file varies by OS
var EXE_NAME = "";
if (operating_system == "WIN")
{
  EXE_NAME = "jaicut.exe";
} else {
  EXE_NAME = "jaicut";
}
var EXE_PATH = path.join(path.normalize(csInterface.getSystemPath(SystemPath.EXTENSION)), "/dist/" + EXE_NAME);

async function init() {
  operating_system = await getOS();
}

async function runjaiCut() {
  var isValid = await checkTimelineValidity() // Check that current prerequisites for jaicuts are met.
  if (isValid === "true")
  {
    let mediaPath = await asyncGetMediaPath();

    let jaicutParams = getjaicutParams();
    let inoutpoints = await asyncGetInOutStartPoints();
    inoutpoints = JSON.parse(inoutpoints);
    jaicutParams = JSON.parse(jaicutParams);
    jaicutParams["in"] = inoutpoints["in"];
    jaicutParams["out"] = inoutpoints["out"];
    jaicutParams["start"] = inoutpoints["start"];
    jaicutParams = JSON.stringify(jaicutParams);

    let jaicutData = "";
  
    // Run the Python script to calculate jai cut locations.
    try {
      jaicutData = await asyncCallPythonjaicut(EXE_PATH, mediaPath, jaicutParams);
      alert("Python script successful.");
    } catch (error) {
      alert("Failure executing Python script: " + error);
    }

    // Prepare data to send to ExtendScript.
    let dataJSON = ""
    try {
      dataJSON = JSON.parse(jaicutData);
    } catch (error) {
      alert(error);
    }
  
    // If no silences were returned, alert the user and exit.
    if (dataJSON['silences'].length === 0) { 
      alert("No silences detected.");
      return;
    }
  
    let silences = JSON.stringify(dataJSON['silences']);
  
    let checkBox = document.getElementById("backupCheck");
    let checked = checkBox.checked;
    alert(checked);

    try {
      await runPremierejaiCut(silences, checked);
      alert("Success.");
    } catch (error) {
      alert("Failure executing jai cuts in Premiere.");
    }
  } else {
    alert ("Timeline prerequisites not met. There must be a single linked video/audio pair on tracks V1 and A1.");
  }
}

async function runPremierejaiCut(silences, backup) {
  return new Promise((resolve, reject) => {
    csInterface.evalScript(`jaiCutActiveSequence("${silences}", "${backup}")`, (result) => {
      if (result) {
        resolve(result);
      } else {
        reject("Error executing jai cuts.")
      }
    });
  });
}

// Gets the absolute filepath of the requested media.
// TODO: parameterize
async function asyncGetMediaPath() {
  return new Promise((resolve, reject) => {
    csInterface.evalScript("getMediaPath()", (result) => {
      if (result) {
        resolve(result);
      } else {
        reject("Error getting media path.");
      }
    });
  });
}

async function checkTimelineValidity() {
  return new Promise((resolve, reject) => {
    csInterface.evalScript("checkOneLinkedClipPair()", (result) => {
      resolve(result);
    });
  });
}

async function asyncGetInOutStartPoints()
{
  return new Promise((resolve, reject) => {
    csInterface.evalScript(`getInOutStartPoints()`, (result) => {
      if (result) {
        resolve(result);
      } else {
        reject("Error getting in and out points.");
      }
    });
  });
}

// TODO programatically get the Adobe extensions path here.
async function asyncCallPythonjaicut(exe_path, media_path, jaicutParams) {
  return new Promise((resolve, reject) => {
    let command_prompt;
  
    // Normalize paths
    exe_path = path.normalize(exe_path);
    media_path = path.normalize(media_path);
    let cwd = path.dirname(exe_path); // To run Python exe from its own directory

    try {
      // Call the Python jaicut calculator
      command_prompt = child_process.spawn(exe_path, [media_path, jaicutParams], { cwd });
    } catch (error) {
      alert(error);
    }

    let outputData = "";

    command_prompt.stdout.on('data', function (data) {
      outputData += data.toString();
    });
  
    command_prompt.stderr.on('data', function (data) {
      reject(data.toString());
    });
  
    command_prompt.on('exit', function (code) {
      if (code === 0) {
        resolve(outputData);
      } else {
        reject(`Process exited with code ${code}`);
      }
    });

  });
}


async function getOS() {
  let os = null;
  if (navigator.userAgentData) {
      const brands = await navigator.userAgentData.getHighEntropyValues(["platform"]);
      if (brands.platform.includes('macOS')) {
          os = "MAC";
      } else if (brands.platform.includes('Windows')) {
          os = "WIN";
      }
  } else {
      // Fallback for browsers that do not support userAgentData
      var platform = window.navigator.platform;
      var macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
      var windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];

      if (macosPlatforms.indexOf(platform) != -1) {
          os = "MAC";
      } else if (windowsPlatforms.indexOf(platform) != -1) {
          os = "WIN";
      }
  }
  return os;
}

// Frontend functions
function initFrontend() {

  document.addEventListener('DOMContentLoaded', () => {
    let sliderIds = ['silenceCutoff', 'removeOver', 'keepOver', 'padding'];
  
    sliderIds.forEach(function(id) {
      let slider = document.getElementById(id);
      let numberInput = slider.nextElementSibling; // Assumes the number input is right after the slider
  
      slider.oninput = function() {
          numberInput.value = slider.value;
      };
  
      numberInput.oninput = function() {
          slider.value = numberInput.value;
      };
    });
  }); 

}

function getjaicutParams() {
  let sliderIds = ['silenceCutoff', 'removeOver', 'keepOver', 'padding'];
  let jaicutParams = {};
  sliderIds.forEach(function(id) {
    let slider = document.getElementById(id);
    let numberInput = slider.nextElementSibling;

    jaicutParams[id] = numberInput.value;
  });

  return JSON.stringify(jaicutParams);
}