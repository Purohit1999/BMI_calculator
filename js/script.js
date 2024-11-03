document.addEventListener("DOMContentLoaded", function() {
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
