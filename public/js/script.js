document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('download-form');
    const input = document.getElementById('video-url');
    const result = document.getElementById('result');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const videoUrl = input.value;
        
        if (videoUrl) {
            try {
                const videoId = extractVideoId(videoUrl);
                if (videoId) {
                    const thumbnailSizes = [
                        { name: 'Max Resolution', url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` },
                        { name: 'High Quality', url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` },
                        { name: 'Medium Quality', url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` },
                        { name: 'Standard Quality', url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg` },
                    ];

                    let thumbnailsHtml = '<h2>Available Thumbnails:</h2>';
                    thumbnailSizes.forEach((size, index) => {
                        const downloadUrl = `/api/download?url=${encodeURIComponent(size.url)}&filename=youtube_thumbnail_${size.name.toLowerCase().replace(' ', '_')}.jpg`;
                        thumbnailsHtml += `
                            <div class="thumbnail-container">
                                <h3>${size.name}</h3>
                                <img src="${size.url}" alt="${size.name} Thumbnail">
                                <a href="${downloadUrl}" class="download-btn">Download</a>
                            </div>
                        `;
                    });

                    result.innerHTML = thumbnailsHtml;
                } else {
                    result.textContent = 'Invalid YouTube URL. Please try again.';
                }
            } catch (error) {
                result.textContent = 'An error occurred. Please try again.';
                console.error(error);
            }
        }
    });

    function extractVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }
});