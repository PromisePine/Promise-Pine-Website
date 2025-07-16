document.addEventListener('DOMContentLoaded', function() {
    // Get all video thumbnails
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    const lightbox = document.getElementById('videoLightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxIframe = document.getElementById('lightboxIframe');
    const closeLightbox = document.querySelector('.close-lightbox');
    const playButton = document.createElement('div');
    
    // Create play button overlay
    playButton.className = 'play-button-overlay';
    playButton.innerHTML = '▶';
    playButton.style.display = 'none';
    lightboxContent.appendChild(playButton);
    
    // Flag to track if user has interacted
    let userInteracted = false;

    // Function to open lightbox with video
    function openLightbox(videoId) {
        // First, show the lightbox with a play button
        lightboxIframe.src = ''; // Clear any existing iframe
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Show play button for mobile
        if (window.innerWidth <= 768) {
            playButton.style.display = 'flex';
            lightboxIframe.style.pointerEvents = 'none'; // Disable direct interaction with iframe
        } else {
            // On desktop, load video directly
            loadVideo(videoId);
        }
        
        // Handle play button click
        const handlePlayClick = () => {
            userInteracted = true;
            playButton.style.display = 'none';
            lightboxIframe.style.pointerEvents = 'auto';
            loadVideo(videoId);
            playButton.removeEventListener('click', handlePlayClick);
        };
        
        playButton.addEventListener('click', handlePlayClick);
    }
    
    // Function to load video with proper parameters
    function loadVideo(videoId) {
        // Include muted=0 to allow sound, and enable autoplay if user has interacted
        const autoplayParam = userInteracted ? '1' : '0';
        lightboxIframe.src = `https://player.vimeo.com/video/${videoId}?autoplay=${autoplayParam}&muted=0&controls=1&color=ffffff&title=0&byline=0&portrait=0`;
    }

    // Function to close lightbox
    function closeLightboxHandler() {
        lightbox.classList.remove('active');
        lightboxIframe.src = ''; // Stop the video when closing
        document.body.style.overflow = ''; // Re-enable scrolling
        playButton.style.display = 'none'; // Hide play button
        userInteracted = false; // Reset interaction flag
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
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (lightbox.classList.contains('active')) {
            // Reset video source on resize to ensure proper display
            const iframe = document.getElementById('lightboxIframe');
            const currentSrc = iframe.src;
            if (currentSrc) {
                iframe.src = currentSrc;
            }
        }
    });
});
