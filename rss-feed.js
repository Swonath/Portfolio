const FEEDS = [
    {
        url: 'https://www.sciencedaily.com/rss/computers_math/quantum_computers.xml',
        label: 'Science Daily'
    },
    {
        url: 'https://phys.org/rss-feed/technology-news/quantum-physics/',
        label: 'Phys.org'
    }
];

const PROXY = 'https://api.allorigins.win/raw?url=';

function getTagText(el, tag) {
    return el.getElementsByTagName(tag)[0]?.textContent?.trim() || '';
}

async function fetchFeed(feed) {
    const response = await fetch(PROXY + encodeURIComponent(feed.url));
    if (!response.ok) throw new Error('Network error');
    const xml = await response.text();
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    return Array.from(doc.querySelectorAll('item')).slice(0, 4).map(item => ({
        title: getTagText(item, 'title'),
        link: getTagText(item, 'link'),
        desc: getTagText(item, 'description').replace(/<[^>]*>/g, '').trim(),
        date: getTagText(item, 'pubDate'),
        source: feed.label
    }));
}

function renderArticles(articles) {
    const container = document.getElementById('rss-feed');
    if (!container) return;
    container.innerHTML = '';

    articles.forEach(item => {
        const card = document.createElement('article');
        card.className = 'rss-card';

        const title = document.createElement('h3');
        title.className = 'rss-title';
        const link = document.createElement('a');
        link.href = item.link;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = item.title;
        title.appendChild(link);

        const meta = document.createElement('div');
        meta.className = 'rss-meta';

        const source = document.createElement('span');
        source.className = 'rss-source';
        source.textContent = item.source;

        const date = document.createElement('span');
        date.className = 'rss-date';
        const parsed = new Date(item.date);
        date.textContent = isNaN(parsed)
            ? item.date
            : parsed.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

        meta.appendChild(source);
        meta.appendChild(date);

        const desc = document.createElement('p');
        desc.className = 'rss-desc';
        desc.textContent = item.desc.length > 160 ? item.desc.substring(0, 160) + '…' : item.desc;

        const readMore = document.createElement('a');
        readMore.href = item.link;
        readMore.target = '_blank';
        readMore.rel = 'noopener noreferrer';
        readMore.className = 'rss-read-more';
        readMore.textContent = "Lire l'article →";

        card.appendChild(title);
        card.appendChild(meta);
        card.appendChild(desc);
        card.appendChild(readMore);
        container.appendChild(card);
    });
}

async function loadRSSFeed() {
    const container = document.getElementById('rss-feed');
    if (!container) return;

    try {
        const results = await Promise.allSettled(FEEDS.map(fetchFeed));
        const allItems = results
            .filter(r => r.status === 'fulfilled')
            .flatMap(r => r.value)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 8);

        if (allItems.length === 0) throw new Error('No articles');
        renderArticles(allItems);
    } catch {
        container.innerHTML = '<p class="rss-error">Impossible de charger le flux RSS. Veuillez réessayer plus tard.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadRSSFeed);
