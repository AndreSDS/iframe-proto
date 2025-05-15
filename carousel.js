export function createInnerCarousel(imageUrls) {
  const carousel = document.createElement('div');
  carousel.classList.add('inner-carousel');

  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('inner-carousel-container');

  imageUrls.forEach(url => {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-slide');
    const img = document.createElement('img');

    img.onload = () => {
      // Calculate and set the height of the slide based on the image aspect ratio
      const aspectRatio = img.naturalHeight / img.naturalWidth;
      carouselItem.style.height = `${carouselItem.offsetWidth * aspectRatio}px`;
    };

    img.src = url;
    img.alt = 'Carousel Image'; // Consider adding more descriptive alt text if possible
    carouselItem.appendChild(img);
    carouselContainer.appendChild(carouselItem);
  });

  carousel.appendChild(carouselContainer);

  // Navigation Arrows
  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-button', 'prev');
  prevButton.setAttribute('aria-label', 'Previous slide');
  prevButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m15 18-6-6 6-6"/>
    </svg>
  `;
  carousel.appendChild(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-button', 'next');
  nextButton.setAttribute('aria-label', 'Next slide');
  nextButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  `;
  carousel.appendChild(nextButton);

  // Indicator Dots
  const carouselDots = document.createElement('div');
  carouselDots.classList.add('carousel-dots');
  // Dots will be added and managed by the carousel logic (not part of this function's scope based on the prompt)
  carousel.appendChild(carouselDots);

// Suggested code may be subject to a license. Learn more: ~LicenseLog:2376196427.
  // Controls container with arrows and dots
  const controlsContainer = document.createElement('div');
  controlsContainer.classList.add('controls-container');
  controlsContainer.appendChild(prevButton);
  controlsContainer.appendChild(carouselDots);
  controlsContainer.appendChild(nextButton);

  // Basic carousel logic (can be expanded upon)
  let currentIndex = 0;

  function updateCarousel() {
    const items = carouselContainer.querySelectorAll('.carousel-slide');
    const itemWidth = items[0]?.offsetWidth || 0;
    carouselContainer.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    updateDots();
  }

  function updateDots() {
      carouselDots.innerHTML = ''; // Clear existing dots
      const items = carouselContainer.querySelectorAll('.carousel-slide');
      items.forEach((_, index) => {
          const dot = document.createElement('span');
          dot.classList.add('carousel-dot');
          if (index === currentIndex) {
              dot.classList.add('active');
          }
          dot.addEventListener('click', () => {
              currentIndex = index;
              updateCarousel();
          });
          carouselDots.appendChild(dot);
      });
  }

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextButton.addEventListener('click', () => {
    const items = carouselContainer.querySelectorAll('.carousel-slide');
    if (currentIndex < items.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

    // Initial setup
    setTimeout(() => { // Use a timeout to ensure images are loaded and offsetWidth is correct
        updateCarousel();
    }, 0);


  return {carousel, controlsContainer};
}