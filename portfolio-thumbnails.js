// Load Vimeo thumbnails for custom URL videos
document.addEventListener('DOMContentLoaded', async function() {
    const videoThumbnails = document.querySelectorAll('.video-thumbnail[data-video-url]');
    
    for (const thumbnail of videoThumbnails) {
        const videoUrl = thumbnail.getAttribute('data-video-url');
        if (!videoUrl) continue;
        
        try {
            // Use Vimeo oEmbed API to get thumbnail
            const oembedUrl = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(videoUrl)}`;
            const response = await fetch(oembedUrl);
            
            if (response.ok) {
                const data = await response.json();
                const thumbnailUrl = data.thumbnail_url;
                
                // Set the thumbnail as background image
                const previewDiv = thumbnail.querySelector('.video-preview');
                if (previewDiv && thumbnailUrl) {
                    previewDiv.style.backgroundImage = `url('${thumbnailUrl}')`;
                }
            }
        } catch (error) {
            console.error('Failed to load thumbnail for:', videoUrl, error);
        }
    }
});
