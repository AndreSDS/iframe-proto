import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const cardsSectionsInfo = [
  {
    title: "Paredão de Revestimentos",
    image:
      "https://static.wixstatic.com/media/b98454_d931ce5f7d274d45bd3cdc33b9ba2aa6~mv2.png",
    description:
      "Nosso paredão é o lugar perfeito para você se inspirar! São diversos modelos de revestimentos expostos lado a lado, para comparar cores, texturas e estilos com mais facilidade. Venha sentir de perto, imaginar seu ambiente dos sonhos e descobrir o que combina com o seu estilo.",
    sectionImages: [{
      img: "https://static.wixstatic.com/media/b98454_d931ce5f7d274d45bd3cdc33b9ba2aa6~mv2.png",
    },
    {
      img: "https://static.wixstatic.com/media/b98454_d931ce5f7d274d45bd3cdc33b9ba2aa6~mv2.png",
    }]
  },
  {
    title: "Seção de Pintura",
    image:
      "https://static.wixstatic.com/media/b98454_1fc8c24f8bad41edb09bdd0be25ec2b7~mv2.png",
    description:
      "Cores que transformam ambientes! Aqui você encontra tintas para todos os estilos e superfícies, além de acessórios que facilitam cada etapa da pintura. Das paredes internas ao retoque externo, tem sempre uma tonalidade esperando para deixar seu espaço com a sua cara!",
    sectionImages: [{
      img: "https://static.wixstatic.com/media/b98454_1fc8c24f8bad41edb09bdd0be25ec2b7~mv2.png",
    },
    {
      img: "https://static.wixstatic.com/media/b98454_1fc8c24f8bad41edb09bdd0be25ec2b7~mv2.png",
    }]
  },
  {
    title: "Seção de Ferramentas",
    image:
      "https://static.wixstatic.com/media/b98454_e068e984de784277b5408bdf465e923a~mv2.png",
    description:
      'Ajudamos quem faz! Aqui você encontra desde ferramentas manuais até elétricas, com opções para iniciantes, profissionais e aventureiros do "faça você mesmo".',
    sectionImages: [{
      img: "https://static.wixstatic.com/media/b98454_e068e984de784277b5408bdf465e923a~mv2.png",
    },
    {
      img: "https://static.wixstatic.com/media/b98454_e068e984de784277b5408bdf465e923a~mv2.png",
    }]
  },
  {
    title: "Seção de Hidráulica",
    image:
      "https://static.wixstatic.com/media/b98454_9ec9189120624d12a5fc420eac8592d6~mv2.png",
    description:
      "Tudo que passa por água começa aqui! Nossa seção hidráulica tem tubos, conexões, registros, caixas d'água e muito mais para garantir um sistema bem feito e duradouro. Está construindo ou só fazendo manutenção? Venha conferir de perto e garantir qualidade sem complicação.",
    sectionImages: [{
      img: "https://static.wixstatic.com/media/b98454_9ec9189120624d12a5fc420eac8592d6~mv2.png",
    },
    {
      img: "https://static.wixstatic.com/media/b98454_9ec9189120624d12a5fc420eac8592d6~mv2.png",
    }]
  },
  {
    title: "Gabinetes para Cozinhas",
    image:
      "https://static.wixstatic.com/media/b98454_1a8e548a57f54a269992f95ea4669a99~mv2.png",
    description:
      "Praticidade com estilo! Temos gabinetes prontos para instalação, com diferentes tamanhos, cores e acabamentos, perfeitos para valorizar sua cozinha sem dor de cabeça.",
    sectionImages: [{
      img: "https://static.wixstatic.com/media/b98454_1a8e548a57f54a269992f95ea4669a99~mv2.png",
    },
    {
      img: "https://static.wixstatic.com/media/b98454_1a8e548a57f54a269992f95ea4669a99~mv2.png",
    }]
  },
  {
    title: "Kits para Banheiros",
    image:
      "https://static.wixstatic.com/media/b98454_4b36fa14bd7646379fc8eb4635ca050f~mv2.png",
    description:
      "Aqui você encontra pias, armários, assentos sanitários e kits completos para montar ou renovar seu banheiro com facilidade. Tudo combinando, com opções que vão do básico ao moderno — é só escolher e levar!",
    sectionImages: [{
      img: "https://static.wixstatic.com/media/b98454_4b36fa14bd7646379fc8eb4635ca050f~mv2.png",
    },
    {
      img: "https://static.wixstatic.com/media/b98454_4b36fa14bd7646379fc8eb4635ca050f~mv2.png",
    }]
  },
];

function createInnerCarousel(imageUrls) {
  const carousel = document.createElement('div');
  carousel.classList.add('inner-carousel');

  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('inner-carousel-container');

  imageUrls.forEach(url => {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
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
    const items = carouselContainer.querySelectorAll('.carousel-item');
    const itemWidth = items[0]?.offsetWidth || 0;
    carouselContainer.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    updateDots();
  }

  function updateDots() {
      carouselDots.innerHTML = ''; // Clear existing dots
      const items = carouselContainer.querySelectorAll('.carousel-item');
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
    const items = carouselContainer.querySelectorAll('.carousel-item');
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

function createCard(item) {
  // Card Container
  const card = document.createElement("div");
  card.classList.add("card");

  // Card header
  const cardHeader = document.createElement("header");
  cardHeader.classList.add("card-header");

  // Card title
  const cardTitle = document.createElement("h2");
  cardTitle.textContent = item.title;
  cardHeader.appendChild(cardTitle);

  // Card image carousel
  const {carousel, controlsContainer} = createInnerCarousel(item.sectionImages.map(img => img.img));

  // Card Content
  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");

  const cardDescription = document.createElement("p");
  cardDescription.classList.add("card-description");
  cardDescription.textContent = item.description;

  // Append elements to card content
  cardContent.appendChild(controlsContainer);
  cardContent.appendChild(cardDescription);

  // Card footer
  const cardFooter = document.createElement("footer");
  cardFooter.classList.add("card-footer");

  // Card button
  const cardButton = document.createElement("button");
  cardButton.classList.add("card-button");
  cardButton.textContent = "SAIBA MAIS";

  cardFooter.appendChild(cardButton);

  // Append all elements to the card
  card.appendChild(cardHeader);
  card.appendChild(carousel);
  card.appendChild(cardContent);
  //card.appendChild(cardFooter);

  return card;
}

function createCarousel() {
  const carousel = document.querySelector(".swiper-wrapper");

  // Usar DocumentFragment para minimizar reflows
  const fragment = document.createDocumentFragment();

  cardsSectionsInfo.forEach((item) => {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("swiper-slide");

    const card = createCard(item);
    carouselItem.appendChild(card);
    fragment.appendChild(carouselItem);
  });

  carousel.appendChild(fragment);
}

window.onload = function () {
  window.parent.postMessage('iframeReady', window.location.origin);

  window.addEventListener('message', (event) => {
    message = event;

    const dadosRecebidos = event.data;
    if (Array.isArray(dadosRecebidos) && !dadosRecebidos.error) {
      createCarousel(dadosRecebidos);
    } else if (dadosRecebidos && dadosRecebidos.error) {
      console.error("Erro recebido do site pai:", dadosRecebidos.error);
    } else {
      console.warn("Dados inesperados recebidos do site pai:", dadosRecebidos);
    }
  });
};

document.addEventListener("DOMContentLoaded", function () {
  createCarousel();
  
   // Swiper: Slider
   new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    grabCursor: true,
    loop: false,
    slidesPerView: 'auto',
    spaceBetween: 20,
    // Navigation arrows
    navigation: {
      nextEl: "carousel-control-next",
      prevEl: "carousel-control-prev",
    },
  });

  const buttonNext = document.querySelector(".carousel-control-next");
  const buttonPrev = document.querySelector(".carousel-control-prev");

  buttonNext.addEventListener("click", function () {
    const swiper = document.querySelector(".swiper");
    swiper.swiper.slideNext();
  });

  buttonPrev.addEventListener("click", function () {
    const swiper = document.querySelector(".swiper");
    swiper.swiper.slidePrev();
  });
});
