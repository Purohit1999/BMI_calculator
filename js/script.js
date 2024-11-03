// Handle form submission and display the BMI result to the user
function handleForm(event) {
    event.preventDefault();
    let form = event.target;
    let height = form.height.value;
    let weight = form.weight.value;

    let bmi = calculateBMI(height, weight);

    let result = document.getElementById("result");
    if (result) { // Ensure the result element exists
        result.innerText = "Your BMI is " + bmi.toFixed(2);
        result.style.color = "blue";
    } else {
        console.error("Element with ID 'result' not found.");
    }
}

// Calculate BMI and return the result
function calculateBMI(height, weight) {
    let heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
}

// Ensure DOM is fully loaded before accessing elements
document.addEventListener("DOMContentLoaded", function() {
    const contentWrapper = document.getElementById("content-wrapper");
    if (contentWrapper) {
        dragElement(contentWrapper);
    } else {
        console.error("Element with ID 'content-wrapper' not found.");
    }

    // Play video slowly, then switch to image with zoom effect
    const backgroundVideo = document.getElementById('backgroundVideo');
    const zoomImageContainer = document.getElementById('zoomImageContainer');
    const backgroundMusic = document.getElementById('backgroundMusic');

    // Ensure elements exist before accessing properties
    if (backgroundVideo && zoomImageContainer && backgroundMusic) {
        // Set video playback rate
        backgroundVideo.playbackRate = 0.5;
        backgroundMusic.loop = true; // Enable looping
        backgroundMusic.volume = 0.5; // Set medium volume

        // Function to start background music after user interaction
        function startBackgroundMusic() {
            backgroundMusic.play().catch(error => {
                console.log("Music play error:", error);
            });
            document.removeEventListener('click', startBackgroundMusic);
        }

        // Add event listener to start music on user interaction
        document.addEventListener('click', startBackgroundMusic);

        // When video ends, hide it and show image with zoom effect
        backgroundVideo.onended = function() {
            console.log("Video ended. Displaying zoom image."); // Debugging log
            backgroundVideo.style.display = 'none';
            zoomImageContainer.style.display = 'block';
            zoomImageContainer.classList.add("zoom-effect");
        };
    } else {
        console.error("One or more elements for video/music not found.");
    }
});

function dragElement(element) {
    if (!element) {
        console.error("Drag element is null.");
        return;
    }

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

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
