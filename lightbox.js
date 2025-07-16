document.addEventListener('DOMContentLoaded', function() {
    // Get all video thumbnails
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    const lightbox = document.getElementById('videoLightbox');
    const lightboxIframe = document.getElementById('lightboxIframe');
    const closeLightbox = document.querySelector('.close-lightbox');

    // Function to open lightbox with video
    function openLightbox(videoId) {
        lightboxIframe.src = `https://player.vimeo.com/video/${videoId}?autoplay=1&color=ffffff&title=0&byline=0&portrait=0`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
    }

    // Function to close lightbox
    function closeLightboxHandler() {
        lightbox.classList.remove('active');
        lightboxIframe.src = ''; // Stop the video when closing
        document.body.style.overflow = ''; // Re-enable scrolling
    }

    // Add click event to each video thumbnail
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            openLightbox(videoId);
        });
    });

    // Close lightbox when clicking the close button
    closeLightbox.addEventListener('click', closeLightboxHandler);

    // Close lightbox when clicking outside the video
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightboxHandler();
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightboxHandler();
        }
    });
});
