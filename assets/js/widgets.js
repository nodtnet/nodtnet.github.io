// widgets.js — fetches NASA APOD
document.addEventListener('DOMContentLoaded', () => {
    // NASA APOD
    const apodEl = document.getElementById('apod-content');
    if (apodEl) {
        fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
            .then(r => r.json())
            .then(data => {
                if (data.media_type === 'image') {
                    apodEl.innerHTML = `
                        <h3 style="margin:8px 0 6px;">${data.title}</h3>
                        <img src="${data.url}" alt="${data.title}" style="width:100%; height:auto; max-height:360px; object-fit:cover; border:1px solid #ddd;"/>
                        <p style="font-size:13px; margin-top:8px;">${data.explanation.slice(0,300)}${data.explanation.length>300? '...':''}</p>
                        <p style="font-size:12px;"><a href="${data.url}" target="_blank" rel="noopener">View full</a> · <a href="https://api.nasa.gov" target="_blank" rel="noopener">NASA API</a></p>
                    `;
                } else if (data.media_type === 'video') {
                    apodEl.innerHTML = `<h3 style="margin:8px 0 6px;">${data.title}</h3><div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;"><iframe src="${data.url}" frameborder="0" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div><p style="font-size:13px;">${data.explanation.slice(0,300)}${data.explanation.length>300? '...':''}</p>`;
                } else {
                    apodEl.textContent = 'APOD content unavailable.';
                }
            })
            .catch(err => {
                console.error('APOD fetch error', err);
                apodEl.textContent = 'Failed to load APOD.';
            });
    }
});
