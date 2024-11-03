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

document.addEventListener("DOMContentLoaded", function() {
    const video1 = document.getElementById('video1');
    const imageContainer1 = document.getElementById('imageContainer1');
    const video2 = document.getElementById('video2');
    const imageContainer2 = document.getElementById('imageContainer2');
    const video3 = document.getElementById('video3');
    const imageContainer3 = document.getElementById('imageContainer3');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const contentWrapper = document.getElementById('content-wrapper'); // Form container for dragging
   
    // Make the form draggable
    if (contentWrapper) {
        dragElement(contentWrapper);
    } else {
        console.error("Element with ID 'content-wrapper' not found.");
    }
   
   
    // Set up background music if available
    if (backgroundMusic) {
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.5;

        document.addEventListener('click', function startBackgroundMusic() {
            backgroundMusic.play().catch(error => console.log("Music play error:", error));
            document.removeEventListener('click', startBackgroundMusic);
        });
    }

    // Sequence for videos and images
    if (video1 && imageContainer1 && video2 && imageContainer2 && video3 && imageContainer3) {
        video1.playbackRate = 0.5;
        video1.onended = function() {
            video1.style.display = 'none';
            imageContainer1.style.display = 'block';

            setTimeout(() => {
                imageContainer1.style.display = 'none';
                video2.style.display = 'block';
                video2.play();
            }, 3000);
        };

        video2.playbackRate = 0.5;
        video2.onended = function() {
            video2.style.display = 'none';
            imageContainer2.style.display = 'block';

            setTimeout(() => {
                imageContainer2.style.display = 'none';
                video3.style.display = 'block';
                video3.play();
            }, 5000);
        };

        video3.playbackRate = 0.5;
        video3.onended = function() {
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
