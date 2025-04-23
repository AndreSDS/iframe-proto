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

document.addEventListener("DOMContentLoaded", function () {
  const { container, carousel } = createCarousel();

  // Variables
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;
  let currentIndex = 0;
  let startTime = 0;
  let endTime = 0;
  let dragVelocity = 0;
  
  // Cache para dimensões
  const dimensionsCache = new WeakMap();
  let resizeTimeout = null;

  // Check if we're on mobile
  const isMobile = () => window.innerWidth <= 768;

  // Ensure last item is fully visible by adding padding to the carousel
  const items = document.querySelectorAll(".carousel-item");

  function ensureLastItemVisibility() {
    const containerWidth = container.offsetWidth;
    const lastItem = items[items.length - 1];
    const lastItemWidth = lastItem.offsetWidth;

    // Usar cache se disponível
    let totalItemsWidth = dimensionsCache.get(carousel);
    if (!totalItemsWidth) {
      totalItemsWidth = Array.from(items).reduce((total, item) => {
        const itemStyle = getComputedStyle(item);
        const marginRight = parseInt(itemStyle.marginRight);
        return total + item.offsetWidth + marginRight;
      }, 0);
      dimensionsCache.set(carousel, totalItemsWidth);
    }

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
    // Verificar cache primeiro
    if (dimensionsCache.has(items[0]) && !isMobile()) {
      return dimensionsCache.get(items[0]);
    }
    
    // Get computed style to account for margin
    const firstItemStyle = getComputedStyle(items[0]);
    const marginRight = parseInt(firstItemStyle.marginRight);

    // Include the gap value from the carousel CSS
    const carouselStyle = getComputedStyle(carousel);
    const gapSize = parseInt(carouselStyle.gap) || 40; // Default to 40px if not set

    const itemWidth = items[0].offsetWidth + gapSize;
    const containerWidth = container.offsetWidth;

    let visibleItems;
    if (isMobile()) {
      visibleItems = 1;
    } else {
      visibleItems = Math.floor(containerWidth / itemWidth);
    }

    const maxIndex = Math.max(0, items.length - visibleItems);
    
    const dimensions = { itemWidth, maxIndex, containerWidth, visibleItems, gapSize };
    dimensionsCache.set(items[0], dimensions);
    
    return dimensions;
  }

  // Debounce para resize
  function debounce(func, wait) {
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(resizeTimeout);
        func(...args);
      };
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(later, wait);
    };
  }

  // Handle resize with debounce
  const handleResize = debounce(() => {
    // Limpar cache ao redimensionar
    dimensionsCache.delete(carousel);
    dimensionsCache.delete(items[0]);
    
    ensureLastItemVisibility();
    const { maxIndex } = calculateDimensions();

    // If the current index is now out of bounds, adjust it
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    setPositionByIndex();
    
    if (!isMobile()) {
      handleLastItemVisibility();
    }
  }, 150);

  // Drag functionality
  function touchStart(event) {
    if (event.type === "mousedown") {
      event.preventDefault();
    }
    const touch = event.type === "touchstart" ? event.touches[0] : event;
    startPos = touch.clientX;
    startTime = Date.now(); // Registrar o tempo inicial
    isDragging = true;
  
    animationID = requestAnimationFrame(animation);
    carousel.classList.add("grabbing");
  }

  function touchMove(event) {
    if (isDragging) {
      const touch = event.type === "touchmove" ? event.touches[0] : event;
      const currentPosition = touch.clientX;
      
      // Remover atraso aplicando diretamente a transformação
      currentTranslate = prevTranslate + currentPosition - startPos;
      
      // Adicionar resistência quando tentar arrastar além dos limites
      const { itemWidth, maxIndex } = calculateDimensions();
      if (currentTranslate > 0) {
        currentTranslate = currentTranslate * 0.3; // Resistência no início
      } else if (currentTranslate < -itemWidth * maxIndex) {
        const overscroll = currentTranslate + itemWidth * maxIndex;
        currentTranslate = -itemWidth * maxIndex + overscroll * 0.3; // Resistência no fim
      }
      
      // Aplicar transformação diretamente sem esperar pela animação
      carousel.style.transform = `translateX(${currentTranslate}px)`;
    }
  }
  

  function touchEnd(event) {
    cancelAnimationFrame(animationID);
    isDragging = false;
    endTime = Date.now();
    
    // Calcular velocidade do arraste
    const timeElapsed = endTime - startTime;
    const distance = currentTranslate - prevTranslate;
    dragVelocity = distance / timeElapsed;
    
    // Aplicar inércia baseada na velocidade
    const { itemWidth, maxIndex } = calculateDimensions();
    
    // Adicionar momentum baseado na velocidade
    if (Math.abs(dragVelocity) > 0.5) {
      // Quanto maior a velocidade, maior o deslocamento
      const momentum = Math.min(Math.abs(dragVelocity) * 300, itemWidth * 2) * Math.sign(dragVelocity);
      currentTranslate = prevTranslate + momentum;
    }
    
    // Ajustar para o item mais próximo após o momentum
    const itemPosition = Math.round(currentTranslate / -itemWidth);
    currentIndex = Math.max(0, Math.min(maxIndex, itemPosition));
    
    // Aplicar transição suave
    carousel.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
    currentTranslate = -currentIndex * itemWidth;
    carousel.style.transform = `translateX(${currentTranslate}px)`;
    
    // Restaurar configuração após a animação
    setTimeout(() => {
      carousel.style.transition = "";
      prevTranslate = currentTranslate;
    }, 400);
    
    carousel.classList.remove("grabbing");
  }

  function animation() {
    // Usar requestAnimationFrame para animação mais suave
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
    // Aplicar transformação diretamente sem cálculos adicionais durante o arraste
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
  window.addEventListener("resize", handleResize);

  // Initial positioning
  setPositionByIndex();
  if (!isMobile()) {
    handleLastItemVisibility();
  }
});
