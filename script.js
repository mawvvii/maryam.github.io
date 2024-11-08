// Disable scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Force scroll to top immediately
window.scrollTo(0, 0);

window.addEventListener('load', () => {
    document.body.classList.remove('loading');
    window.scrollTo(0, 0); // Ensure it’s at the top on load

    // Your existing code
    const container = document.querySelector('.icon-rectangle');
    const images = Array.from(container.querySelectorAll('.icon'));

    const placedImages = [];

    images.forEach((img) => {
        const imgWidth = img.offsetWidth;
        const imgHeight = img.offsetHeight;

        const maxX = container.clientWidth - imgWidth;
        const maxY = container.clientHeight - imgHeight;

        let randomX, randomY;
        let overlaps;
        let attempts = 0;
        const maxAttempts = 1000; // Prevent infinite loop

        do {
            randomX = Math.random() * maxX;
            randomY = Math.random() * maxY;

            overlaps = placedImages.some((placedImg) => {
                return isOverlapping(
                    { x: randomX, y: randomY, width: imgWidth, height: imgHeight },
                    placedImg
                );
            });

            attempts++;
        } while (overlaps && attempts < maxAttempts);

        if (attempts < maxAttempts) {
            img.style.left = `${randomX}px`;
            img.style.top = `${randomY}px`;

            placedImages.push({
                x: randomX,
                y: randomY,
                width: imgWidth,
                height: imgHeight,
            });
        } else {
            console.warn('Could not place image without overlap:', img);
        }
    });

    function isOverlapping(rect1, rect2) {
        return !(
            rect1.x + rect1.width <= rect2.x ||
            rect1.x >= rect2.x + rect2.width ||
            rect1.y + rect1.height <= rect2.y ||
            rect1.y >= rect2.y + rect2.height
        );
    }
});
