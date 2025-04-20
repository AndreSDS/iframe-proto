const cardsHistoriesInfo = [
  {
    title: "Quer atendimento online",
    image:
      "https://static.wixstatic.com/media/b98454_4771a83a43c74bb286368cfc0c31363d~mv2.png",
    description:
      "Juliana trabalha em home-office e com a Pirâmides consegue um suporte virtual eficiente para sua reforma.",
  },
  {
    title: "Não entende de materiais",
    image:
      "https://static.wixstatic.com/media/b98454_8ad05f8c97554423acda6685a470dae2~mv2.png",
    description:
      "Janaína é muito ocupada e, como confia na Pirâmides, enviou a lista feita pelo seu pedreiro para que possamos indicar os materiais ideais e a quantidade necessária para sua reforma.",
  },
  {
    title: "Precisa de uma solução rápida",
    image:
      "https://static.wixstatic.com/media/b98454_a8429503cf8444cdbf1b94b9b1f36bab~mv2.png",
    description:
      "O chuveiro do Seu Jorel queimou, mas a Pirâmides entregou um novo no mesmo dia, garantindo que ele pudesse fazer o reparo e tomar seu banho quentinho.",
  },
  {
    title: "Tem grandes projetos",
    image:
      "https://static.wixstatic.com/media/b98454_c50f5f6f98e94f3c849b7679ba152796~mv2.png",
    description:
      "João é engenheiro e sempre compartilha as altas demandas de seus projetos, pois sabe que nosso time especializado encontrará todos os itens.",
  },
  {
    title: "Tem um negócio",
    image:
      "https://static.wixstatic.com/media/b98454_d9ff7aeb5ef04769ad61d8f4d3e8022e~mv2.png",
    description:
      "Jedson otimizou e acelerou a produção em seu restaurante depois que adquiriu uma de nossas lava-louças industriais.",
  },
];

function createCard(item) {
  // Card Container
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.backgroundImage = `url(${item.image})`;

  // Content wrapper for text (to ensure readability over image)
  const contentWrapper = document.createElement("div");
  contentWrapper.classList.add("card-content-wrapper");

  // Card title
  const cardTitle = document.createElement("h2");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = item.title;

  // Card description
  const cardDescription = document.createElement("p");
  cardDescription.classList.add("card-description");
  cardDescription.textContent = item.description;

  // Append elements to wrapper
  contentWrapper.appendChild(cardTitle);
  contentWrapper.appendChild(cardDescription);

  // Append wrapper to card
  card.appendChild(contentWrapper);

  return card;
}

function createCarousel() {
  const container = document.querySelector(".carousel-container");
  const carousel = document.querySelector(".carousel");

  cardsHistoriesInfo.forEach((item) => {
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
  const carouselContainer = document.querySelector(".carousel-container");

  // Configuração do Intersection Observer
  const options = {
    root: null, // viewport
    rootMargin: "0px 0px", // margem adicional
    threshold: 0, // % do elemento visível
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Adiciona a classe para iniciar a animação
        carouselContainer.classList.add("showCarousel");

        const items = document.querySelectorAll(".carousel-item");
        items.forEach((item, index) => {
          // Atrasa a animação de cada item com base em seu índice
          setTimeout(() => {
            item.classList.add("showItem");
          }, 300 + index * 150); // 300ms de atraso inicial + 150ms para cada item
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
    // Obter dimensões relevantes
    const containerWidth = container.offsetWidth;
    const carouselStyle = getComputedStyle(carousel);
    const gapSize = parseInt(carouselStyle.gap) || 28; // Usar 28px como fallback (valor do CSS)
    
    if (!isMobile()) {
      carousel.style.paddingRight = `${gapSize}px`;
    } else {
      carousel.style.paddingRight = "0";
    }
  }

  // Call this function initially and on resize
  ensureLastItemVisibility();

  // Function to calculate item width and max items dynamically
  function calculateDimensions() {
    // Include the gap value from the carousel CSS
    const carouselStyle = getComputedStyle(carousel);
    const gapSize = parseInt(carouselStyle.gap) || (isMobile() ? 15 : 28); // Menor gap para mobile
    
    let itemWidth;
    const containerWidth = container.offsetWidth;
    
    if (isMobile()) {
      // Em mobile, cada item ocupa 85% da largura do container
      itemWidth = (containerWidth * 0.85) + gapSize;
    } else {
      itemWidth = items[0].offsetWidth + gapSize;
    }
    
    // Número de itens visíveis
    let visibleItems;
    if (isMobile()) {
      visibleItems = 1.15; // 1 item completo + 15% do próximo
    } else {
      visibleItems = Math.floor(containerWidth / itemWidth);
    }
    
    const maxIndex = Math.max(0, items.length - Math.floor(visibleItems));
    
    return { itemWidth, maxIndex, containerWidth, visibleItems, gapSize };
  }

  let { itemWidth, maxIndex } = calculateDimensions();

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
      
      // Calcular o deslocamento
      const potentialTranslate = prevTranslate + currentPosition - startPos;
      
      // Obter dimensões atuais
      const { itemWidth, maxIndex } = calculateDimensions();
      
      // Adicionar resistência ao arrastar além dos limites
      if (potentialTranslate > 0) {
        // Resistência ao arrastar para a direita além do primeiro item
        currentTranslate = potentialTranslate / 3;
      } else if (potentialTranslate < -itemWidth * maxIndex) {
        // Resistência ao arrastar para a esquerda além do último item
        const overscroll = potentialTranslate + itemWidth * maxIndex;
        currentTranslate = -itemWidth * maxIndex + overscroll / 3;
      } else {
        // Movimento normal dentro dos limites
        currentTranslate = potentialTranslate;
      }
    }
  }

  function touchEnd() {
    cancelAnimationFrame(animationID);
    isDragging = false;

    const movedBy = currentTranslate - prevTranslate;
    const { maxIndex, itemWidth } = calculateDimensions();

    // Se o movimento foi significativo, mude para o próximo/anterior item
    if (movedBy < -50 && currentIndex < maxIndex) {
      currentIndex++;
    } else if (movedBy > 50 && currentIndex > 0) {
      currentIndex--;
    }

    // Snap para o item mais próximo se estiver entre dois itens
    if (currentTranslate % itemWidth !== 0) {
      const offset = currentTranslate % itemWidth;
      if (Math.abs(offset) > itemWidth / 2) {
        // Snap para o próximo item
        currentIndex = Math.ceil(Math.abs(currentTranslate) / itemWidth);
      } else {
        // Snap para o item anterior
        currentIndex = Math.floor(Math.abs(currentTranslate) / itemWidth);
      }
    }

    // Garantir que o índice esteja dentro dos limites
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    setPositionByIndex();
    carousel.classList.remove("grabbing");
  }

  function animation() {
    setCarouselPosition();
    if (isDragging) requestAnimationFrame(animation);
  }

  function setPositionByIndex() {
    const { itemWidth, maxIndex, gapSize } = calculateDimensions();

    // Enforce boundaries
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    // Se estiver no último item, ajustar a posição para garantir que ele esteja totalmente visível
    if (currentIndex === maxIndex) {
      const containerWidth = container.offsetWidth;
      const carouselWidth = carousel.scrollWidth;
      currentTranslate = -(carouselWidth - containerWidth);
    } else {
      currentTranslate = currentIndex * -itemWidth;
    }
    
    prevTranslate = currentTranslate;
    setCarouselPosition();
  }

  function setCarouselPosition() {
    carousel.style.transform = `translateX(${currentTranslate}px)`;
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
  });

  // Initial positioning
  setPositionByIndex();
});
