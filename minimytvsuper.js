
console.log("Script is running...");


// Function to create and position audio buttons in a 3x4 matrix
function positionButtons() {
	console.log("function positionButtons()");
  var scale = 300/200; // initial design 200px for .remote-container.width in style.css, change to 300, scale up
  var initX =200*scale; initY= 250*scale; // 1st button position X/Y
  var container = document.querySelector('.remote-container');
  var containerWidth = container.offsetWidth;
  var containerHeight = container.offsetHeight;
  //var numRows = 1;
  //var numCols = 1;
  var numRows = 9;
  var numCols = 3;
  var buttonSize = 30 * scale; // Adjust button size as needed
  //var horizontalGap = (containerWidth - numCols * buttonSize) / (numCols + 1);
  //var verticalGap = (containerHeight - numRows * buttonSize) / (numRows + 1);
  var horizontalGap = 50*scale - buttonSize;
  var verticalGap = 39*scale - buttonSize;
  var buttonCounter = 1; // Initialize button counter

// Array of names for each button
var buttonNames = 
['ON/OFF',
'TV/VOD',
'CH+',
'VOL-',
'OK',
'VOL+',
'CH-',
'HOME',
'EXIT',
'MENU',
'>||',
'PAUSE',
'<<',
'>>',
'1',
'2',
'3',
'4',
'5',
'6',
'7',
'8',
'9',
'MUTE',
'0',
'<X',
'親嘴',
];


  for (var y = 0; y < numRows; y++) {
    for (var x = 0; x < numCols; x++) {
	  //if (buttonCounter >26) continue;
      var button = document.createElement('button');
	  
	  button.className = 'audio-button audio-button-' + buttonCounter; // Set button class name
	  console.log(button.className);

	  if (buttonCounter ==1) button.style.backgroundColor = 'red'; // Set background color
	  if (buttonCounter ==5) {button.style.backgroundColor = 'yellow'; button.style.color = 'black';}// Set background color
	  if (buttonCounter ==11) button.style.backgroundColor = 'red'; // Set background color
	  if (buttonCounter ==12) button.style.backgroundColor = 'green'; // Set background color
	  if (buttonCounter ==13) {button.style.backgroundColor = 'yellow'; button.style.color = 'black';}// Set background color
	  if (buttonCounter ==14) button.style.backgroundColor = 'blue'; // Set background color
	  
      button.style.width = buttonSize + 'px';
      button.style.height = buttonSize + 'px';
      button.style.top = (initY+y * (buttonSize + verticalGap)) + verticalGap + 'px';
      button.style.left = (initX+x * (buttonSize + horizontalGap)) + horizontalGap + 'px';
	  
	  button.style.display = 'flex'; // Add flex display
      button.style.justifyContent = 'center'; // Center text horizontally
      button.style.alignItems = 'center'; // Center text vertically
      //button.textContent = buttonCounter; // Set button text content
	  button.textContent = buttonNames[buttonCounter - 1] || ''; // Assign the name for the button

	  // In this code, we're using an immediately-invoked function expression (IIFE) to create a closure around the counter 
	  // variable, capturing its value at the time the event listener is added to the button. This ensures that each 
	  // button's event listener uses the correct soundFile associated with its respective buttonCounter value.
	  button.addEventListener('click', (function(counter) {
		return function() {
			var soundFile = 'irwav/MSB_' + pad(counter, 4) + '.wav';
			if (counter==27) soundFile = 'irwav/親嘴不要臉.wav';
			console.log(soundFile);
			playSound(soundFile);
		};
	  })(buttonCounter));
	  
	  container.appendChild(button);
	  
	  buttonCounter++; // Increment button counter
    }
  }
}


// Function to pad the counter with leading zeros
function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

function ap(){
	console.log("ap");
	container.appendClass(button);
}


console.log("Call the positionButtons function when the window is loaded or resized");
// Call the positionButtons function when the window is loaded or resized
window.addEventListener('load', positionButtons);
window.addEventListener('resize', positionButtons);



/*
console.log("document.getElementById('audio-button-1");
document.getElementById('audio-button-1').onclick = function() {
    playSound('1.wav');
};


document.getElementById('audio-button-2').onclick = function() {
    playSound('2-modulated_親嘴不要臉.wav');
};

document.getElementById('audio-button-3').onclick = function() {
    playSound('3-modulated_親嘴不要臉.wav');
};

document.getElementById('audio-button-4').onclick = function() {
    playSound('4-modulated_親嘴不要臉.wav');
};

document.getElementById('audio-button-5').onclick = function() {
    playSound('5-modulated_親嘴不要臉.wav');
};

document.getElementById('audio-button-6').onclick = function() {
    playSound('6-modulated_親嘴不要臉.wav');
};

*/
function playSound(soundFile) {
    //const audioPlayer = document.getElementById('audioPlayer');
    //audioPlayer.src = soundFile;
    //audioPlayer.play();

	//var soundFile = counter + '.wav';
	const audioPlayer = document.getElementById('audioPlayer');
	audioPlayer.src = soundFile;
	
	// Error handling for loading the audio file
	audioPlayer.addEventListener('error', function() {
		console.error('Error loading last audio file:', soundFile);
	});
	
	// Error handling for playing the audio
	audioPlayer.addEventListener('ended', function() {
		console.log('Audio playback ended.');
	});
	
	audioPlayer.play()
		.catch(function(error) {
			console.error('Error playing audio:', error);
		});

}
