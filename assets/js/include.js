document.addEventListener('DOMContentLoaded', function () {
    async function loadInclude(id, url) {
        try {
            const res = await fetch(url);
            if (!res.ok) return;
            const html = await res.text();
            const el = document.getElementById(id);
            if (el) el.innerHTML = html;
            if (id === 'site-sitemap') setActiveLink();
        } catch (e) {
            console.error('Include load failed:', url, e);
        }
    }

    function setActiveLink() {
        const sitemap = document.getElementById('site-sitemap');
        if (!sitemap) return;
        const links = sitemap.querySelectorAll('a');
        let page = window.location.pathname.split('/').pop();
        if (!page) page = 'index.html';
        links.forEach(a => {
            const href = a.getAttribute('href');
            if (!href) return;
            if (href === page || (href.endsWith(page))) {
                a.classList.add('active');
            } else {
                a.classList.remove('active');
            }
        });
    }

    loadInclude('site-header', 'includes/header.html');
    loadInclude('site-sitemap', 'includes/sitemap.html');
});
