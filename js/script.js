// Handle form submission and display the BMI result to the user
function handleForm(event) {
    event.preventDefault();
    let form = event.target;
    let height = form.height.value;
    let weight = form.weight.value;

    let bmi = calculateBMI(height, weight);

    let result = document.getElementById("result");
    result.innerText = "Your BMI is " + bmi.toFixed(2);
    result.style.color = "blue";
}

// Calculate BMI and return the result
function calculateBMI(height, weight) {
    let heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
}

// Make the form draggable, except when clicking inside inputs
dragElement(document.getElementById("draggableForm"));

function dragElement(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    // Set up drag start outside input elements only
    element.addEventListener("mousedown", function(e) {
        if (e.target.tagName === "INPUT" || e.target.tagName === "BUTTON") {
            return; // Do nothing if clicking inside input or button
        }
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    });

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Play video slowly, then switch to image with zoom effect
const backgroundVideo = document.getElementById('backgroundVideo');
const zoomImageContainer = document.getElementById('zoomImageContainer');

// Set video playback rate
backgroundVideo.playbackRate = 0.5;
backgroundMusic.loop = true;  // Enable looping
backgroundMusic.play();        // Start playing music

// When video ends, hide it and show image with zoom effect
backgroundVideo.onended = function() {
    backgroundVideo.style.display = 'none';
    zoomImageContainer.style.display = 'block';

    // Apply zoom effect to image
    zoomImageContainer.classList.add("zoom-effect");
};
