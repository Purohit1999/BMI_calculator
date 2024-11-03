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
    // Initialize elements for each video and image in sequence
    const video1 = document.getElementById('video1');
    const imageContainer1 = document.getElementById('imageContainer1');
    const video2 = document.getElementById('video2');
    const imageContainer2 = document.getElementById('imageContainer2');
    const video3 = document.getElementById('video3');
    const imageContainer3 = document.getElementById('imageContainer3');
    const backgroundMusic = document.getElementById('backgroundMusic');

    // Set up background music if available
    if (backgroundMusic) {
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.5;

        // Start background music on user interaction
        document.addEventListener('click', function startBackgroundMusic() {
            backgroundMusic.play().catch(error => console.log("Music play error:", error));
            document.removeEventListener('click', startBackgroundMusic);
        });
    }

    // Sequential video and image display
    if (video1 && imageContainer1 && video2 && imageContainer2 && video3 && imageContainer3) {
        // First video: Play and transition to first image
        video1.playbackRate = 0.5;
        video1.onended = function() {
            console.log("Video 1 ended. Displaying Image 1.");
            video1.style.display = 'none';
            imageContainer1.style.display = 'block';

            // Display image for 3 seconds, then move to video 2
            setTimeout(() => {
                imageContainer1.style.display = 'none';
                video2.style.display = 'block';
                video2.play();
            }, 3000);
        };

        // Second video: Play and transition to second image
        video2.playbackRate = 0.5;
        video2.onended = function() {
            console.log("Video 2 ended. Displaying Image 2.");
            video2.style.display = 'none';
            imageContainer2.style.display = 'block';

            // Display image for 3 seconds, then move to video 3
            setTimeout(() => {
                imageContainer2.style.display = 'none';
                video3.style.display = 'block';
                video3.play();
            }, 3000);
        };

        // Third video: Play and transition to third image
        video3.playbackRate = 0.5;
        video3.onended = function() {
            console.log("Video 3 ended. Displaying Image 3.");
            video3.style.display = 'none';
            imageContainer3.style.display = 'block';
        };
    } else {
        console.error("One or more video/image elements not found.");
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
