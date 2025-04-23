const cardsTestimonialsInfo = [
  {
    nome: "Renato Neves",
    text: "Sou cliente há muitos anos! E sempre fui muito bem atendido, com agilidade e auxílio na escolha dos produtos para que eu possa ter o melhor resultado no serviço. O atendimento pelo Whatsapp é também uma ferramenta que funciona perfeitamente!!",
  },
  {
    nome: "Marcos Paulo",
    text: "Excelente atendimento ao cliente final, pontualidade nas entregas e qualidade nos produtos. Já comprei em várias lojas deste segmento mas desconheço alguma que possui o atendimento exclusivo como de vocês.",
  },
  {
    nome: "Kelly Fernandes",
    text: "Excelente atendimento do início da compra até a hora da entrega do material... Todos funcionários são bastante atenciosos e simpáticos... É a loja que compramos faz tempo, pois os preços são ótimos... Top!!! Recomendo!!!",
  },
  {
    nome: "Tania Castro",
    text: "Atendimento perfeito. Funcionários super atenciosos. Parabéns em especial para a Lurdinha e o Henrique.",
  },
  {
    nome: "Luciana Sb",
    text: "Fiz a compra de um kit churrasco, que foi muito recomendado. Repeti a compra. Logo após, me tornei cliente ao receber inúmeras recomendações em razão da rapidez na entrega e da infinidade de produtos que são comercializados, especialmente pisos e porcelanatos.",
  },
  {
    nome: "Adm Redes",
    text: "Parabéns pelo atendimento, e muito mais pelo pós vendas. Ao consultar um fornecedor no Google, entrei em contato, sendo gentilmente atendido, tive a sorte de encontrar uma empresa e pessoas que presam pelo bom atendimento, preço competitivo, entrega pontual.",
  },
];

const starSvg = `<svg preserveAspectRatio="none" viewBox="25 29 150.346 142.783" height="200" width="200" xmlns="http://www.w3.org/2000/svg">
    <g><path d="M174.479 82.542c-.833-3.334-3.333-5-6.666-5.834l-41.667-5.833-18.333-37.5c-2.5-5.833-12.5-5.833-15 0l-18.334 37.5-41.666 5.833c-3.334.834-5.834 2.5-7.5 5.834-.834 3.333 0 6.666 2.5 8.333l30 29.167-7.5 41.666c-.834 3.334.833 6.667 3.333 8.334 1.666.833 3.333 1.666 5 1.666 1.666 0 2.5 0 4.166-.833l37.501-20 37.5 20c2.5 1.667 5.833.833 9.166-.833 2.5-1.667 4.167-5 3.334-8.334l-7.5-41.666 30-29.167c2.5-1.667 3.333-5 1.666-8.333Z"></path></g>
</svg>`;

function createCard(item) {
  const fragment = document.createDocumentFragment();
  const card = document.createElement("div");
  card.className = "card";

  // Criar estrutura do card usando template literal para reduzir manipulações DOM
  card.innerHTML = `
    <header class="card-header">
      <div class="avatar"><span>${item.nome.charAt(0).toUpperCase()}</span></div>
      <div>
        <h2 class="name">${item.nome}</h2>
        <div class="stars">${Array(5).fill(starSvg).join("")}</div>
      </div>
    </header>
    <div class="content">
      <p class="text">${item.text}</p>
    </div>
  `;

  fragment.appendChild(card);
  return fragment.firstChild;
}

function createCarousel() {
  const container = document.querySelector(".carousel-container");
  const carousel = document.querySelector(".carousel");
  const fragment = document.createDocumentFragment();

  cardsTestimonialsInfo.forEach((item) => {
    const carouselItem = document.createElement("div");
    carouselItem.className = "carousel-item";
    carouselItem.appendChild(createCard(item));
    fragment.appendChild(carouselItem);
  });

  carousel.appendChild(fragment);
  return { container, carousel };
}

document.addEventListener("DOMContentLoaded", function () {
  // Cache de seletores DOM
  const prevButton = document.querySelector(".carousel-control-prev");
  const nextButton = document.querySelector(".carousel-control-next");
  const { container, carousel } = createCarousel();

  // Otimização 4: Usar WeakMap para armazenar dimensões calculadas
  const dimensionsCache = new WeakMap();
  
  // Variáveis
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;
  let currentIndex = 0;
  let startTime = 0;
  let endTime = 0;
  let dragVelocity = 0;
  let items;
  
  // Inicialização única de elementos
  function initElements() {
    items = document.querySelectorAll(".carousel-item");
    ensureLastItemVisibility();
    const { itemWidth, maxIndex } = calculateDimensions();
    updateButtonStates(maxIndex);
  }

  // Otimização 5: Debounce para redimensionamento
  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Otimização 6: Memoização de isMobile
  const isMobile = (() => {
    let result;
    let width = window.innerWidth;
    
    return () => {
      if (window.innerWidth !== width) {
        width = window.innerWidth;
        result = width <= 768;
      }
      return result !== undefined ? result : (result = width <= 768);
    };
  })();

  function ensureLastItemVisibility() {
    if (!items || !items.length) return;
    
    const containerWidth = container.offsetWidth;
    const lastItem = items[items.length - 1];
    
    // Otimização 7: Reduzir cálculos em loop
    let totalItemsWidth = 0;
    for (const item of items) {
      const style = getComputedStyle(item);
      totalItemsWidth += item.offsetWidth + parseInt(style.marginRight);
    }

    carousel.style.paddingRight = !isMobile() 
      ? `${Math.max(0, containerWidth - (totalItemsWidth - lastItem.offsetWidth))}px` 
      : "0";
  }

  function calculateDimensions() {
    if (!items || !items.length) return { itemWidth: 0, maxIndex: 0 };
    
    // Verificar cache primeiro
    if (dimensionsCache.has(carousel)) {
      const cached = dimensionsCache.get(carousel);
      if (cached.containerWidth === container.offsetWidth) {
        return cached;
      }
    }
    
    const firstItemStyle = getComputedStyle(items[0]);
    const carouselStyle = getComputedStyle(carousel);
    const gapSize = parseInt(carouselStyle.gap) || 40;
    const itemWidth = items[0].offsetWidth + gapSize;
    const containerWidth = container.offsetWidth;
    const visibleItems = isMobile() ? 1 : Math.floor(containerWidth / itemWidth);
    const maxIndex = Math.max(0, items.length - visibleItems);
    
    const dimensions = { 
      itemWidth, maxIndex, containerWidth, visibleItems, gapSize 
    };
    
    // Armazenar no cache
    dimensionsCache.set(carousel, dimensions);
    return dimensions;
  }

  function updateButtonStates(maxIndex) {
    prevButton.classList.toggle("disabled", currentIndex <= 0);
    nextButton.classList.toggle("disabled", currentIndex >= maxIndex);
  }

  // Otimização 8: Usar passive listeners para eventos de toque
  function addEventListeners() {
    prevButton.addEventListener("click", handlePrevClick);
    nextButton.addEventListener("click", handleNextClick);
    
    carousel.addEventListener("mousedown", touchStart);
    carousel.addEventListener("touchstart", touchStart, { passive: true });
    
    window.addEventListener("mousemove", touchMove);
    window.addEventListener("touchmove", touchMove, { passive: true });
    
    window.addEventListener("mouseup", touchEnd);
    window.addEventListener("touchend", touchEnd);
    
    carousel.addEventListener("contextmenu", e => {
      e.preventDefault();
      e.stopPropagation();
    });
    
    // Otimização 9: Usar delegação de eventos para imagens
    carousel.addEventListener("dragstart", e => {
      if (e.target.tagName === "IMG") e.preventDefault();
    });
    
    window.addEventListener("resize", debounce(handleResize, 150));
  }

  function handlePrevClick() {
    if (currentIndex > 0) {
      currentIndex--;
      setPositionByIndex();
      updateButtonStates(calculateDimensions().maxIndex);
    }
  }

  function handleNextClick() {
    const { maxIndex } = calculateDimensions();
    if (currentIndex < maxIndex) {
      currentIndex++;
      setPositionByIndex();
      updateButtonStates(maxIndex);
    }
  }

  function touchStart(event) {
    if (event.type === "mousedown") {
      event.preventDefault();
    }
    const touch = event.type === "touchstart" ? event.touches[0] : event;
    startPos = touch.clientX;
    startTime = Date.now();
    isDragging = true;
  
    animationID = requestAnimationFrame(animation);
    carousel.classList.add("grabbing");
  }

  function touchMove(event) {
    if (!isDragging) return;
    
    const touch = event.type === "touchmove" ? event.touches[0] : event;
    const currentPosition = touch.clientX;
    
    currentTranslate = prevTranslate + currentPosition - startPos;
    
    const { itemWidth, maxIndex } = calculateDimensions();
    if (currentTranslate > 0) {
      currentTranslate *= 0.3;
    } else if (currentTranslate < -itemWidth * maxIndex) {
      const overscroll = currentTranslate + itemWidth * maxIndex;
      currentTranslate = -itemWidth * maxIndex + overscroll * 0.3;
    }
    
    setCarouselPosition();
  }

  function touchEnd() {
    cancelAnimationFrame(animationID);
    isDragging = false;
    endTime = Date.now();
    
    const timeElapsed = endTime - startTime;
    const distance = currentTranslate - prevTranslate;
    dragVelocity = distance / timeElapsed;
    
    const { itemWidth, maxIndex } = calculateDimensions();
    
    if (Math.abs(dragVelocity) > 0.5) {
      const momentum = Math.min(Math.abs(dragVelocity) * 300, itemWidth * 2) * Math.sign(dragVelocity);
      currentTranslate = prevTranslate + momentum;
    }
    
    const itemPosition = Math.round(currentTranslate / -itemWidth);
    currentIndex = Math.max(0, Math.min(maxIndex, itemPosition));
    
    carousel.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
    currentTranslate = -currentIndex * itemWidth;
    setCarouselPosition();
    
    setTimeout(() => {
      carousel.style.transition = "";
      prevTranslate = currentTranslate;
      updateButtonStates(maxIndex);
    }, 400);
    
    carousel.classList.remove("grabbing");
  }

  function animation() {
    if (isDragging) requestAnimationFrame(animation);
  }

  function setPositionByIndex() {
    const { itemWidth, maxIndex } = calculateDimensions();
    currentIndex = Math.max(0, Math.min(maxIndex, currentIndex));
    currentTranslate = currentIndex * -itemWidth;
    prevTranslate = currentTranslate;
    setCarouselPosition();
  }

  function setCarouselPosition() {
    carousel.style.transform = `translateX(${currentTranslate}px)`;
  }

  function handleLastItemVisibility() {
    const { maxIndex } = calculateDimensions();
    if (currentIndex === maxIndex) {
      const containerWidth = container.offsetWidth;
      let totalItemsWidth = 0;
      
      for (const item of items) {
        totalItemsWidth += item.offsetWidth + parseInt(getComputedStyle(item).marginRight);
      }
      
      const lastItemPosition = totalItemsWidth - containerWidth;
      
      if (lastItemPosition > Math.abs(currentTranslate)) {
        currentTranslate = -lastItemPosition;
        prevTranslate = currentTranslate;
        setCarouselPosition();
      }
    }
  }

  function handleResize() {
    dimensionsCache.delete(carousel); // Invalidar cache
    ensureLastItemVisibility();
    const { maxIndex } = calculateDimensions();
    
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }
    
    setPositionByIndex();
    updateButtonStates(maxIndex);
    
    if (!isMobile()) {
      handleLastItemVisibility();
    }
  }

  // Inicializar
  initElements();
  addEventListeners();
  setPositionByIndex();
  
  if (!isMobile()) {
    handleLastItemVisibility();
  }
});
