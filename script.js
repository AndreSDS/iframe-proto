const cardsHistoriesInfo = [
  {
    title: "Não entende de materiais",
    image: "https://static.wixstatic.com/media/b98454_8ad05f8c97554423acda6685a470dae2~mv2.png",
    description: "Janaína é muito ocupada e, como confia na Pirâmides, enviou a lista feita pelo seu pedreiro para que possamos indicar os materiais ideais e a quantidade necessária para sua reforma.",
  },
  {
    title: "Quer atendimento online",
    image:
      "https://static.wixstatic.com/media/b98454_4771a83a43c74bb286368cfc0c31363d~mv2.png",
    description:
      "Juliana trabalha em home-office e com a Pirâmides consegue um suporte virtual eficiente para sua reforma.",
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

document.addEventListener("DOMContentLoaded", function() {
  // Cache de elementos DOM e variáveis
  const container = document.querySelector(".carousel-container");
  const carousel = document.querySelector(".carousel");
  let items;
  
  // Estado do carrossel
  const state = {
    isDragging: false,
    startPos: 0,
    currentTranslate: 0,
    prevTranslate: 0,
    animationID: 0,
    currentIndex: 0,
    startTime: 0,
    endTime: 0,
    dragVelocity: 0
  };
  
  // Cache para dimensões
  const dimensionsCache = new Map();
  let resizeTimeout = null;
  
  // Utilitários
  const utils = {
    isMobile: () => window.innerWidth <= 768,
    
    debounce: (func, wait) => {
      return function(...args) {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          clearTimeout(resizeTimeout);
          func(...args);
        }, wait);
      };
    }
  };

  // Inicialização
  function init() {
    createCarousel();
    items = document.querySelectorAll(".carousel-item");
    
    setupEventListeners();
    ensureLastItemVisibility();
    setPositionByIndex();
    
    if (!utils.isMobile()) {
      handleLastItemVisibility();
    }
  }
  
  // Criação de elementos
  function createCarousel() {
    cardsHistoriesInfo.forEach(item => {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      carouselItem.appendChild(createCard(item));
      carousel.appendChild(carouselItem);
    });
  }
  
  function createCard(item) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.backgroundImage = `url(${item.image})`;
    
    const contentWrapper = document.createElement("div");
    contentWrapper.classList.add("card-content-wrapper");
    
    const cardTitle = document.createElement("h2");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = item.title;
    
    const cardDescription = document.createElement("p");
    cardDescription.classList.add("card-description");
    cardDescription.textContent = item.description;
    
    contentWrapper.append(cardTitle, cardDescription);
    card.appendChild(contentWrapper);
    
    return card;
  }
  
  // Cálculos de dimensões
  function calculateDimensions() {
    if (dimensionsCache.has("dimensions") && !utils.isMobile()) {
      return dimensionsCache.get("dimensions");
    }
    
    const firstItemStyle = getComputedStyle(items[0]);
    const carouselStyle = getComputedStyle(carousel);
    const gapSize = parseInt(carouselStyle.gap) || 40;
    
    const itemWidth = items[0].offsetWidth + gapSize;
    const containerWidth = container.offsetWidth;
    const visibleItems = utils.isMobile() ? 1 : Math.floor(containerWidth / itemWidth);
    const maxIndex = Math.max(0, items.length - visibleItems);
    
    const dimensions = { itemWidth, maxIndex, containerWidth, visibleItems, gapSize };
    dimensionsCache.set("dimensions", dimensions);
    
    return dimensions;
  }
  
  function ensureLastItemVisibility() {
    const containerWidth = container.offsetWidth;
    const lastItem = items[items.length - 1];
    
    if (!dimensionsCache.has("totalWidth")) {
      const totalWidth = Array.from(items).reduce((total, item) => {
        const marginRight = parseInt(getComputedStyle(item).marginRight);
        return total + item.offsetWidth + marginRight;
      }, 0);
      dimensionsCache.set("totalWidth", totalWidth);
    }
    
    const totalWidth = dimensionsCache.get("totalWidth");
    
    if (!utils.isMobile()) {
      const extraPadding = Math.max(0, containerWidth - (totalWidth - lastItem.offsetWidth));
      carousel.style.paddingRight = `${extraPadding}px`;
    } else {
      carousel.style.paddingRight = "0";
    }
  }
  
  // Manipulação de posição
  function setPositionByIndex() {
    const { itemWidth, maxIndex } = calculateDimensions();
    state.currentIndex = Math.max(0, Math.min(maxIndex, state.currentIndex));
    state.currentTranslate = state.currentIndex * -itemWidth;
    state.prevTranslate = state.currentTranslate;
    setCarouselPosition();
  }
  
  function setCarouselPosition() {
    carousel.style.transform = `translateX(${state.currentTranslate}px)`;
  }
  
  function handleLastItemVisibility() {
    const { maxIndex } = calculateDimensions();
    if (state.currentIndex === maxIndex) {
      const containerWidth = container.offsetWidth;
      const totalWidth = dimensionsCache.get("totalWidth");
      const lastItemPosition = totalWidth - containerWidth;
      
      if (lastItemPosition > Math.abs(state.currentTranslate)) {
        state.currentTranslate = -lastItemPosition;
        state.prevTranslate = state.currentTranslate;
        setCarouselPosition();
      }
    }
  }
  
  // Manipuladores de eventos
  function touchStart(event) {
    if (event.type === "mousedown") {
      event.preventDefault();
    }
    
    const touch = event.type === "touchstart" ? event.touches[0] : event;
    state.startPos = touch.clientX;
    state.startTime = Date.now();
    state.isDragging = true;
    
    state.animationID = requestAnimationFrame(animation);
    carousel.classList.add("grabbing");
  }
  
  function touchMove(event) {
    if (!state.isDragging) return;
    
    const touch = event.type === "touchmove" ? event.touches[0] : event;
    const currentPosition = touch.clientX;
    let moveTranslate = state.prevTranslate + currentPosition - state.startPos;
    
    // Adicionar resistência nos limites
    const { itemWidth, maxIndex } = calculateDimensions();
    if (moveTranslate > 0) {
      moveTranslate *= 0.3;
    } else if (moveTranslate < -itemWidth * maxIndex) {
      const overscroll = moveTranslate + itemWidth * maxIndex;
      moveTranslate = -itemWidth * maxIndex + overscroll * 0.3;
    }
    
    state.currentTranslate = moveTranslate;
    setCarouselPosition();
  }
  
  function touchEnd() {
    cancelAnimationFrame(state.animationID);
    state.isDragging = false;
    state.endTime = Date.now();
    
    // Calcular velocidade e aplicar inércia
    const timeElapsed = state.endTime - state.startTime;
    const distance = state.currentTranslate - state.prevTranslate;
    state.dragVelocity = distance / timeElapsed;
    
    const { itemWidth, maxIndex } = calculateDimensions();
    
    if (Math.abs(state.dragVelocity) > 0.5) {
      const momentum = Math.min(Math.abs(state.dragVelocity) * 300, itemWidth * 2) * Math.sign(state.dragVelocity);
      state.currentTranslate = state.prevTranslate + momentum;
    }
    
    // Ajustar para o item mais próximo
    state.currentIndex = Math.round(state.currentTranslate / -itemWidth);
    state.currentIndex = Math.max(0, Math.min(maxIndex, state.currentIndex));
    
    // Aplicar transição suave
    carousel.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
    state.currentTranslate = -state.currentIndex * itemWidth;
    setCarouselPosition();
    
    setTimeout(() => {
      carousel.style.transition = "";
      state.prevTranslate = state.currentTranslate;
    }, 400);
    
    carousel.classList.remove("grabbing");
  }
  
  function animation() {
    if (state.isDragging) {
      requestAnimationFrame(animation);
    }
  }
  
  // Configuração de event listeners
  function setupEventListeners() {
    // Touch/mouse events
    carousel.addEventListener("mousedown", touchStart);
    carousel.addEventListener("touchstart", touchStart, { passive: true });
    
    window.addEventListener("mousemove", touchMove);
    window.addEventListener("touchmove", touchMove, { passive: true });
    
    window.addEventListener("mouseup", touchEnd);
    window.addEventListener("touchend", touchEnd);
    
    // Prevent context menu and image dragging
    carousel.addEventListener("contextmenu", e => {
      e.preventDefault();
      e.stopPropagation();
    });
    
    carousel.querySelectorAll("img").forEach(img => {
      img.addEventListener("dragstart", e => e.preventDefault());
    });
    
    // Resize handling
    window.addEventListener("resize", utils.debounce(() => {
      dimensionsCache.clear();
      ensureLastItemVisibility();
      const { maxIndex } = calculateDimensions();
      
      if (state.currentIndex > maxIndex) {
        state.currentIndex = maxIndex;
      }
      
      setPositionByIndex();
      
      if (!utils.isMobile()) {
        handleLastItemVisibility();
      }
    }, 150));
  }
  
  // Iniciar carrossel
  init();
});
