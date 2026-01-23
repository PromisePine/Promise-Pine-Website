document.addEventListener('DOMContentLoaded', function() {
    // Get all video thumbnails
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    const lightbox = document.getElementById('videoLightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxIframe = document.getElementById('lightboxIframe');
    const closeLightbox = document.querySelector('.close-lightbox');

    // Function to open lightbox with video
    function openLightbox(videoId) {
        // Show the lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Load and autoplay video immediately
        loadVideo(videoId);
    }
    
    // Function to load video with autoplay
    function loadVideo(videoId) {
        // Autoplay with sound enabled
        lightboxIframe.src = `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=0&controls=1&color=c7a17a&title=0&byline=0&portrait=0`;
    }

    // Function to close lightbox
    function closeLightboxHandler() {
        lightbox.classList.remove('active');
        lightboxIframe.src = ''; // Stop the video when closing
        document.body.style.overflow = ''; // Re-enable scrolling
    }

    // Resolve a Vimeo page URL to numeric video ID via oEmbed
    async function resolveVimeoIdFromUrl(videoPageUrl) {
        try {
            console.log('Resolving video URL:', videoPageUrl);
            const oembedUrl = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(videoPageUrl)}`;
            console.log('oEmbed URL:', oembedUrl);
            
            const res = await fetch(oembedUrl);
            console.log('Response status:', res.status);
            
            if (!res.ok) {
                const errorText = await res.text();
                console.error('oEmbed error response:', errorText);
                throw new Error(`oEmbed request failed: ${res.status}`);
            }
            
            const data = await res.json();
            console.log('oEmbed response data:', data);
            
            if (data.video_id) {
                console.log('Resolved video ID:', data.video_id);
                return String(data.video_id);
            } else {
                console.error('No video_id in response');
                return null;
            }
        } catch (e) {
            console.error('Failed to resolve Vimeo ID from URL:', e);
            return null;
        }
    }

    // Add click event to each video thumbnail
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', async function() {
            let videoId = this.getAttribute('data-video-id');
            const videoUrl = this.getAttribute('data-video-url');

            if (!videoId && videoUrl) {
                videoId = await resolveVimeoIdFromUrl(videoUrl);
            }

            if (videoId) {
                openLightbox(videoId);
            } else {
                console.warn('No video ID or resolvable URL found on thumbnail.');
            }
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
