// ===== AFIȘARE PLANTE (din plante.js) =====
const productContainer = document.getElementById('productContainer');

function esc(text) {
    return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

productContainer.innerHTML = PLANTE.map(([nume, pret, poza, cat, eticheta]) => {
    const epuizat = eticheta === 'epuizat';
    const badge = eticheta === 'nou' ? 'Nou' : epuizat ? 'Stoc epuizat' : '';
    return `
        <article class="product${epuizat ? ' sold-out' : ''}" data-cat="${esc(cat)}">
            ${badge ? `<span class="badge">${badge}</span>` : ''}
            <img src="${esc(poza)}" alt="${esc(nume)}" loading="lazy">
            <div class="info">
                <h3>${esc(nume)}</h3>
                <p class="price">${esc(pret)}</p>
            </div>
        </article>`;
}).join('');

// ===== NAVBAR: umbră la scroll =====
const nav = document.getElementById('nav');

// ===== MENIU MOBIL =====
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

function closeMenu() {
    menu.classList.remove('show');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('show');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
});

menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

// ===== BUTON SUS + NAVBAR =====
const topBtn = document.getElementById('topBtn');

function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    nav.classList.toggle('scrolled', y > 10);
    topBtn.style.display = y > 400 ? 'flex' : 'none';
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.close');

function openLightbox(img) {
    const name = img.closest('.product').querySelector('h3').textContent.trim();
    lightboxImg.src = img.src;
    lightboxImg.alt = name;
    lightboxCaption.textContent = name;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Delegare: funcționează pentru toate pozele, inclusiv cele adăugate mai târziu
productContainer.addEventListener('click', (e) => {
    if (e.target.matches('.product img')) openLightbox(e.target);
});

closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// ===== FILTRARE + CĂUTARE =====
const search = document.getElementById('search');
const chips = document.querySelectorAll('.chip');
const products = document.querySelectorAll('.product');
const noResults = document.getElementById('noResults');

let activeFilter = 'all';

function normalize(text) {
    // ignoră diacriticele: "măr" găsește "mar", "Capșuna" găsește "capsuna"
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function applyFilters() {
    const query = normalize(search.value.trim());
    let visible = 0;

    products.forEach(product => {
        const name = normalize(product.querySelector('h3').textContent);
        const matchesText = name.includes(query);
        const matchesCat = activeFilter === 'all' || product.dataset.cat === activeFilter;
        const show = matchesText && matchesCat;

        product.style.display = show ? '' : 'none';
        if (show) visible++;
    });

    noResults.hidden = visible > 0;
}

search.addEventListener('input', applyFilters);

chips.forEach(chip => {
    chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeFilter = chip.dataset.filter;
        applyFilters();
    });
});
