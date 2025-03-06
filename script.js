document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const filters = document.querySelectorAll('.filter');
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    slides[currentIndex].classList.add('active');

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            const category = filter.getAttribute('data-category');
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                slide.style.display = category === 'all' || slide.getAttribute('data-category') === category ? 'flex' : 'none';
                if (i === 0 && slide.style.display !== 'none') slide.classList.add('active');
            });
            currentIndex = 0;
        });
    });

    const gallery = document.querySelector('.gallery');
    gallery.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
    gallery.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const visibleSlides = Array.from(slides).filter(s => s.style.display !== 'none');
        if (touchStartX - touchEndX > 50 && currentIndex < visibleSlides.length - 1) {
            visibleSlides[currentIndex].classList.remove('active');
            currentIndex++;
            visibleSlides[currentIndex].classList.add('active');
        } else if (touchEndX - touchStartX > 50 && currentIndex > 0) {
            visibleSlides[currentIndex].classList.remove('active');
            currentIndex--;
            visibleSlides[currentIndex].classList.add('active');
        }
    });
});