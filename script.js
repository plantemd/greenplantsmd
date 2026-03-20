// LIGHTBOX IMAGINI
const images = document.querySelectorAll('.product img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

images.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = "block";
        lightboxImg.src = img.src;
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = "none";
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = "none";
    }
});

// MENU MOBILE
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show');
});

// BACK TO TOP
const topBtn = document.getElementById('topBtn');

window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

topBtn.addEventListener('click', () => {
    window.scrollTo({top:0, behavior:'smooth'});
});

// SEARCH FUNCTION
const search = document.getElementById('search');
const products = document.querySelectorAll('.product');

search.addEventListener('keyup', () => {
    let text = search.value.toLowerCase();

    products.forEach(product => {
        let name = product.querySelector('h3').innerText.toLowerCase();

        if(name.includes(text)){
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
});

// CONTACT BUTTON
document.getElementById('contactBtn').addEventListener('click', () => {
    alert("Mulțumim! Vei fi contactat în curând.");
});
