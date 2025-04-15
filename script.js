const cardsSectionsInfo = [
  {
    title: "Paredão de Revestimentos",
    image:
      "https://static.wixstatic.com/media/b98454_64b3e3258f474688a974e809fbce59d5~mv2.png/v1/fill/w_279,h_174,al_c,lg_1,q_85,enc_auto/image.png",
    description:
      "Nosso paredão é o lugar perfeito pra você se inspirar! São diversos modelos de revestimentos expostos lado a lado, pra comparar cores, texturas e estilos com mais facilidade. Venha sentir de perto, imaginar seu ambiente dos sonhos e descobrir o que combina com o seu estilo.",
  },
  {
    title: "Seção de Pintura",
    image:
      "https://static.wixstatic.com/media/b98454_23a82c9a05814f39b649aee26b82675f~mv2.png/v1/fill/w_279,h_174,al_c,lg_1,q_85,enc_avif,quality_auto/image.png",
    description:
      "Cores que transformam ambientes! Aqui você encontra tintas para todos os estilos e superfícies, além de acessórios que facilitam cada etapa da pintura. Das paredes internas ao retoque externo, tem sempre uma tonalidade esperando pra deixar seu espaço com a sua cara!",
  },
  {
    title: "Seção de Ferramentas",
    image:
      "https://static.wixstatic.com/media/b98454_5a2fca9ed7d443dc830c9ca86825e392~mv2.png/v1/fill/w_279,h_174,al_c,lg_1,q_85,enc_avif,quality_auto/image.png",
    description:
      'Ajudamos quem faz! Aqui você encontra desde ferramentas manuais até elétricas, com opções para iniciantes, profissionais e aventureiros do "faça você mesmo".',
  },
  {
    title: "Seção de Hidráulica",
    image:
      "https://static.wixstatic.com/media/b98454_c256bdad4bb74b9c83e6abb7a74fec89~mv2.png/v1/fill/w_279,h_174,al_c,lg_1,q_85,enc_avif,quality_auto/image.png",
    description:
      "Tudo que passa por água começa aqui! Nossa seção hidráulica tem tubos, conexões, registros, caixas d'água e muito mais pra garantir um sistema bem feito e duradouro.Tá construindo ou só fazendo manutenção? Vem conferir de perto e garantir qualidade sem complicação.",
  },
  {
    title: "Gabinetes para Cozinhas",
    image:
      "https://static.wixstatic.com/media/b98454_64b3e3258f474688a974e809fbce59d5~mv2.png/v1/fill/w_279,h_174,al_c,lg_1,q_85,enc_auto/image.png",
    description:
      "Praticidade com estilo! Temos gabinetes prontos pra instalação, com diferentes tamanhos, cores e acabamentos, perfeitos pra valorizar sua cozinha sem dor de cabeça.",
  },
  {
    title: "Kits para Banheiros",
    image:
      "https://static.wixstatic.com/media/b98454_370b543e3ffd4dbfbf6315bbeb2cdb83~mv2.png/v1/fill/w_279,h_174,al_c,lg_1,q_85,enc_avif,quality_auto/image.png",
    description:
      "Aqui você encontra pias, armários, assentos sanitários e kits completos pra montar ou renovar seu banheiro com facilidade. Tudo combinando, com opções que vão do básico ao moderno — é só escolher e levar!",
  },
];

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

  // Card Image
  const cardImage = document.createElement("img");
  cardImage.classList.add("card-image");
  cardImage.src = item.image;
  cardImage.alt = item.title;

  // Card Content
  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");

  const cardDescription = document.createElement("p");
  cardDescription.classList.add("card-description");
  cardDescription.textContent = item.description;
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
  card.appendChild(cardImage);
  card.appendChild(cardContent);
  card.appendChild(cardFooter);

  return card;
}

function createCarousel() {
  const container = document.querySelector(".carousel-container");
  const carousel = document.querySelector(".carousel");

  cardsSectionsInfo.forEach((item) => {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");

    const card = createCard(item);
    carouselItem.appendChild(card);
    carousel.appendChild(carouselItem);
  });

  container.appendChild(carousel);

  return { container, carousel };
}

function observeIframeVisibility() {
  const carouselContainer = document.querySelector('.carousel-container');
  
  // Configuração do Intersection Observer
  const options = {
    root: null, // viewport
    rootMargin: '0px 0px', // margem adicional
    threshold: 0 // % do elemento visível
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Adiciona a classe para iniciar a animação
        carouselContainer.classList.add('showCarousel');

        const items = document.querySelectorAll('.carousel-item');
        items.forEach((item, index) => {
          // Atrasa a animação de cada item com base em seu índice
          setTimeout(() => {
            item.classList.add('showItem');
          }, 300 + (index * 150)); // 300ms de atraso inicial + 150ms para cada item
        });
        
        // Opcional: parar de observar após a primeira detecção
        observer.unobserve(entry.target);
      }
    });
  }, options);
  
  // Começar a observar o elemento
  observer.observe(carouselContainer);
}

document.addEventListener("DOMContentLoaded", function () {
  observeIframeVisibility();

  const prevButton = document.querySelector(".carousel-control-prev");
  const nextButton = document.querySelector(".carousel-control-next");

  const { container, carousel } = createCarousel();

  // Variables
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;
  let currentIndex = 0;

  // Check if we're on mobile
  const isMobile = () => window.innerWidth <= 768;

  // Ensure last item is fully visible by adding padding to the carousel
  const items = document.querySelectorAll(".carousel-item");

  function ensureLastItemVisibility() {
    const containerWidth = container.offsetWidth;
    const lastItem = items[items.length - 1];
    const lastItemWidth = lastItem.offsetWidth;

    // Calculate the total width of all items

    const totalItemsWidth = Array.from(items).reduce((total, item) => {
      const itemStyle = getComputedStyle(item);
      const marginRight = parseInt(itemStyle.marginRight);
      return total + item.offsetWidth + marginRight;
    }, 0);

    // Add padding to ensure the last item is fully visible
    if (!isMobile()) {
      const extraPadding = Math.max(
        0,
        containerWidth - (totalItemsWidth - lastItemWidth)
      );
      carousel.style.paddingRight = extraPadding + "px";
    } else {
      carousel.style.paddingRight = "0";
    }
  }

  // Call this function initially and on resize
  ensureLastItemVisibility();

  // Function to calculate item width and max items dynamically
  function calculateDimensions() {
    // Get computed style to account for margin
    const firstItemStyle = getComputedStyle(items[0]);
    const marginRight = parseInt(firstItemStyle.marginRight);

    // Include the gap value from the carousel CSS
    const carouselStyle = getComputedStyle(carousel);
    const gapSize = parseInt(carouselStyle.gap) || 40; // Default to 40px if not set

    const itemWidth = items[0].offsetWidth + gapSize;
    const containerWidth = container.offsetWidth;

    // Rest of the function remains the same
    let visibleItems;
    if (isMobile()) {
      visibleItems = 1;
    } else {
      visibleItems = Math.floor(containerWidth / itemWidth);
    }

    const maxIndex = Math.max(0, items.length - visibleItems);

    return { itemWidth, maxIndex, containerWidth, visibleItems, gapSize };
  }

  let { itemWidth, maxIndex } = calculateDimensions();

  // Update button states
  function updateButtonStates() {
    if (currentIndex <= 0) {
      prevButton.classList.add("disabled");
    } else {
      prevButton.classList.remove("disabled");
    }

    if (currentIndex >= maxIndex) {
      nextButton.classList.add("disabled");
    } else {
      nextButton.classList.remove("disabled");
    }
  }

  // Initialize buttons
  updateButtonStates();

  // Button controls
  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      setPositionByIndex();
      updateButtonStates();
    }
  });

  nextButton.addEventListener("click", () => {
    const { maxIndex } = calculateDimensions();
    if (currentIndex < maxIndex) {
      currentIndex++;
      setPositionByIndex();
      updateButtonStates();
    }
  });

  // Drag functionality
  function touchStart(event) {
    if (event.type === "mousedown") {
      event.preventDefault();
    }
    const touch = event.type === "touchstart" ? event.touches[0] : event;
    startPos = touch.clientX;
    isDragging = true;

    animationID = requestAnimationFrame(animation);
    carousel.classList.add("grabbing");
  }

  function touchMove(event) {
    if (isDragging) {
      const touch = event.type === "touchmove" ? event.touches[0] : event;
      const currentPosition = touch.clientX;
      
      // Calculate potential new position
      const potentialTranslate = prevTranslate + currentPosition - startPos;
      
      // Get current dimensions
      const { itemWidth, maxIndex } = calculateDimensions();
      
      // Prevent moving beyond boundaries
      if (potentialTranslate > 0 || potentialTranslate < -itemWidth * maxIndex) {
        return; // Don't update position if trying to move beyond limits
      }
      
      // Apply the translation if within bounds
      currentTranslate = potentialTranslate;
    }
  }
  
  function touchEnd() {
    cancelAnimationFrame(animationID);
    isDragging = false;

    const movedBy = currentTranslate - prevTranslate;
    const { maxIndex } = calculateDimensions();

    // If moved enough in negative direction
    if (movedBy < -100 && currentIndex < maxIndex) {
      currentIndex++;
    }

    // If moved enough in positive direction
    if (movedBy > 100 && currentIndex > 0) {
      currentIndex--;
    }

    setPositionByIndex();
    updateButtonStates();
    carousel.classList.remove("grabbing");
  }

  function animation() {
    setCarouselPosition();
    if (isDragging) requestAnimationFrame(animation);
  }

  function setPositionByIndex() {
    const { itemWidth, maxIndex } = calculateDimensions();
  
    // Enforce boundaries
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;
  
    currentTranslate = currentIndex * -itemWidth;
    prevTranslate = currentTranslate;
    setCarouselPosition();
  }

  function setCarouselPosition() {
    const { itemWidth, maxIndex } = calculateDimensions();

    // Apply boundaries to prevent dragging beyond the first and last items
    if (currentTranslate > 0) {
      currentTranslate = 0;
      prevTranslate = 0;
      currentIndex = 0;
    } else if (currentTranslate < -itemWidth * maxIndex) {
      currentTranslate = -itemWidth * maxIndex;
      prevTranslate = -itemWidth * maxIndex;
      currentIndex = maxIndex;
    }

    carousel.style.transform = `translateX(${currentTranslate}px)`;
  }

  // Special handling for last item
  function handleLastItemVisibility() {
    const { maxIndex } = calculateDimensions();
    if (currentIndex === maxIndex) {
      // If we're at the last index, make sure the last item is fully visible
      const lastItem = items[items.length - 1];
      const containerWidth = container.offsetWidth;
      const totalItemsWidth = Array.from(items).reduce((total, item) => {
        return (
          total +
          item.offsetWidth +
          parseInt(getComputedStyle(item).marginRight)
        );
      }, 0);

      // Calculate the position needed to show the last item fully
      const lastItemPosition = totalItemsWidth - containerWidth;

      // Only adjust if we need to show more of the last item
      if (lastItemPosition > Math.abs(currentTranslate)) {
        currentTranslate = -lastItemPosition;
        prevTranslate = currentTranslate;
        carousel.style.transform = `translateX(${currentTranslate}px)`;
      }
    }
  }

  // Add event listeners for both mouse and touch events
  carousel.addEventListener("mousedown", touchStart);
  carousel.addEventListener("touchstart", touchStart, { passive: true });

  window.addEventListener("mousemove", touchMove);
  window.addEventListener("touchmove", touchMove, { passive: true });

  window.addEventListener("mouseup", touchEnd);
  window.addEventListener("touchend", touchEnd);

  // Prevent context menu on long press
  carousel.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    e.stopPropagation();
  });

  // Prevent dragging images, which can interfere with carousel dragging
  carousel.querySelectorAll("img").forEach((img) => {
    img.addEventListener("dragstart", (e) => e.preventDefault());
  });

  // Handle resize
  window.addEventListener("resize", () => {
    ensureLastItemVisibility();
    const { maxIndex } = calculateDimensions();

    // If the current index is now out of bounds, adjust it
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    setPositionByIndex();
    updateButtonStates();

    if (!isMobile()) {
      handleLastItemVisibility();
    }
  });

  // Initial positioning
  setPositionByIndex();
  if (!isMobile()) {
    handleLastItemVisibility();
  }
});
