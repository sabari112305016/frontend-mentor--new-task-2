const menuButton = document.querySelector('.header__menu-button');
const nav = document.querySelector('.header__nav');
const overlay = document.querySelector('.overlay');

const previousButton = document.getElementById('hero-previous');
const nextButton = document.getElementById('hero-next');
const heroImages = document.querySelector('.hero__image-slider');
const heroTitle = document.querySelector('.hero__title');
const heroDescription = document.querySelector('.hero__description');

let index = 0;
const heroContent = [
    {
        title: 'Discover innovative ways to decorate',
        description: `We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.`,
    },

    {
        title: 'We are available all across the globe',
        description: `With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, weâre in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.`,
    },
    {
        title: 'Manufactured with the best materials',
        description: `Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.`,
    },
];


function toggleMenu() {
    const buttonIcon = menuButton.querySelector('.header__menu-icon');
    const isOpen = buttonIcon.src.includes('icon-hamburger.svg');

    if (isOpen) {
        setTimeout(() => {
            buttonIcon.src = './images/icon-close.svg';
        }, 220);
        menuButton.setAttribute('aria-expanded', 'true');
        menuButton.classList.add('header__menu-button--fixed');
        nav.classList.remove('header__nav--closed');
        overlay.classList.add('overlay--active');
        overlay.setAttribute('aria-hidden', 'false');
    } else {
        setTimeout(() => {
            buttonIcon.src = './images/icon-hamburger.svg';
        }, 160);
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.classList.remove('header__menu-button--fixed');
        nav.classList.add('header__nav--closed');
        overlay.classList.remove('overlay--active');
        overlay.setAttribute('aria-hidden', 'true');
    }
}


function heroCarousel(event) {
    const button = event.currentTarget;
    const prev = button.id === 'hero-previous';
    const next = button.id === 'hero-next';

    if (next && index < heroImages.children.length - 1) {
        index++;
    } else if (prev && index > 0) {
        index--;
    }
    heroImages.style.transform = `translateX(-${index * 100}%)`;
    updateButtonStates();
    updateImageAttributes();

    heroTitle.style.opacity = 0;
    heroDescription.style.opacity = 0;

    setTimeout(() => {
        updateHeroContent(index);
        heroTitle.style.opacity = 1;
        heroDescription.style.opacity = 1;
    }, 250);
}

function updateHeroContent(idx) {
    heroTitle.textContent = heroContent[idx].title;
    heroDescription.textContent = heroContent[idx].description;
}

function updateButtonStates() {
    if (index === 0) {
        previousButton.disabled = true;
    } else {
        previousButton.disabled = false;
    }

    if (index === heroImages.children.length - 1) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
}

function updateImageAttributes() {
    const images = heroImages.querySelectorAll('.hero__image-picture');

    images.forEach((image, idx) => {
        if (idx === index) {
            image.setAttribute('aria-hidden', 'false');
        } else {
            image.setAttribute('aria-hidden', 'true');
        }
    });
}

previousButton.addEventListener('click', heroCarousel);
nextButton.addEventListener('click', heroCarousel);
menuButton.addEventListener('click', toggleMenu);
overlay.addEventListener('click', () => {
    if (menuButton.getAttribute('aria-expanded') === 'true') {
        toggleMenu();
    }
});

updateHeroContent(index);
updateButtonStates();
updateImageAttributes();
