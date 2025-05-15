import { createInnerCarousel } from './carousel.js';

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

document.addEventListener("DOMContentLoaded", function () {
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
  let startTime = 0;
  let endTime = 0;
  let dragVelocity = 0;
  let dragDistance = 0; // Para rastrear a distância do arrasto
  let hasMoved = false; // Flag para verificar se houve movimento significativo

  // Configurações para melhorar a performance no mobile
  const DRAG_THRESHOLD = 10; // Pixel mínimo para considerar como arrasto
  const VELOCITY_THRESHOLD = 0.2; // Velocidade mínima para mudar de slide
  
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
      setPositionByIndex(true);
      updateButtonStates();
    }
  });

  nextButton.addEventListener("click", () => {
    const { maxIndex } = calculateDimensions();
    if (currentIndex < maxIndex) {
      currentIndex++;
      setPositionByIndex(true);
      updateButtonStates();
    }
  });

  // Otimizar performance no mobile com passive event listeners
  const passiveSupported = () => {
    let passive = false;
    try {
      const options = Object.defineProperty({}, "passive", {
        get: function() {
          passive = true;
          return true;
        }
      });
      window.addEventListener("test", null, options);
      window.removeEventListener("test", null, options);
    } catch (err) {}
    return passive;
  };

  const passiveOptions = passiveSupported() ? { passive: true } : false;

  // Melhorar a manipulação de eventos touch
  function touchStart(event) {
    // Cancelar qualquer animação pendente
    if (animationID) {
      cancelAnimationFrame(animationID);
    }
    
    // Resetar o carousel para estado padrão
    carousel.style.transition = "";
    
    const touch = event.type.includes("touch") ? event.touches[0] : event;
    startPos = touch.clientX;
    startTime = Date.now();
    isDragging = true;
    hasMoved = false;
    dragDistance = 0;
    
    // Armazenar a posição atual antes de iniciar o arrasto
    prevTranslate = currentTranslate;
    
    // Iniciar a animação
    animationID = requestAnimationFrame(animation);
    carousel.classList.add("grabbing");
    
    // Prevenir o comportamento padrão apenas para eventos de mouse
    if (event.type === "mousedown") {
      event.preventDefault();
    }
  }

  function touchMove(event) {
    if (!isDragging) return;
    
    const touch = event.type.includes("touch") ? event.touches[0] : event;
    const currentPosition = touch.clientX;
    const diff = currentPosition - startPos;
    dragDistance = diff;
    
    // Verificar se o movimento é significativo antes de considerar como arrasto
    if (Math.abs(dragDistance) > DRAG_THRESHOLD) {
      hasMoved = true;
      
      // Atualizar posição com resistência nos limites
      const { itemWidth, maxIndex } = calculateDimensions();
      currentTranslate = prevTranslate + diff;
      
      // Adicionar resistência quando tentar arrastar além dos limites
      if (currentTranslate > 0) {
        currentTranslate = currentTranslate * 0.3; // Resistência no início
      } else if (currentTranslate < -itemWidth * maxIndex) {
        const overscroll = currentTranslate + itemWidth * maxIndex;
        currentTranslate = -itemWidth * maxIndex + overscroll * 0.3; // Resistência no fim
      }
    }
    
    // Prevenir scroll da página em dispositivos touch quando arrastar horizontalmente
    if (hasMoved && event.type === "touchmove" && Math.abs(dragDistance) > Math.abs(touch.clientY - (event.touches[0].clientY || 0))) {
      event.preventDefault();
    }
  }

  function touchEnd() {
    if (!isDragging) return;
    
    cancelAnimationFrame(animationID);
    isDragging = false;
    endTime = Date.now();
    
    // Se não houve movimento significativo, não faça nada
    if (!hasMoved) {
      return;
    }
    
    // Calcular velocidade do arraste
    const timeElapsed = Math.max(10, endTime - startTime); // Evitar divisão por zero
    dragVelocity = dragDistance / timeElapsed;
    
    const { itemWidth, maxIndex } = calculateDimensions();
    
    // Determinar a direção e quanto mover baseado na velocidade e distância
    if (Math.abs(dragVelocity) > VELOCITY_THRESHOLD || Math.abs(dragDistance) > itemWidth / 3) {
      // Decidir qual direção baseada na velocidade ou distância de arrasto
      if (dragDistance < 0) {
        // Mover para o próximo item
        currentIndex = Math.min(maxIndex, currentIndex + 1);
      } else {
        // Mover para o item anterior
        currentIndex = Math.max(0, currentIndex - 1);
      }
    }
    
    // Aplicar transição suave com easing melhorado
    setPositionByIndex(true);
    updateButtonStates();
    
    setTimeout(() => {
      carousel.classList.remove("grabbing");
    }, 50);
  }

  function animation() {
    setCarouselPosition();
    if (isDragging) {
      animationID = requestAnimationFrame(animation);
    }
  }

  function setPositionByIndex(animate = false) {
    const { itemWidth, maxIndex } = calculateDimensions();

    // Enforce boundaries
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    currentTranslate = currentIndex * -itemWidth;
    
    // Aplicar transição apenas quando solicitado
    if (animate) {
      carousel.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
      setTimeout(() => {
        carousel.style.transition = "";
      }, 400);
    } else {
      carousel.style.transition = "";
    }
    
    prevTranslate = currentTranslate;
    setCarouselPosition();
  }

  function setCarouselPosition() {
    // Usar transform3d para melhor desempenho (hardware acceleration)
    carousel.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
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
        setCarouselPosition();
      }
    }
  }

  // Melhorar a gestão de eventos touch
  carousel.addEventListener("mousedown", touchStart);
  carousel.addEventListener("touchstart", touchStart, passiveOptions);

  // Usar apropriadamente passive: false apenas quando necessário
  window.addEventListener("mousemove", touchMove);
  window.addEventListener("touchmove", touchMove, { 
    passive: false, 
    capture: true 
  });

  // Capturar eventos de fim de arrasto em todo o document para melhor UX
  window.addEventListener("mouseup", touchEnd);
  window.addEventListener("touchend", touchEnd);
  window.addEventListener("touchcancel", touchEnd);
  
  // Adicionar eventos para lidar com casos de saída da tela
  document.addEventListener("mouseleave", touchEnd);
  carousel.addEventListener("mouseleave", touchEnd);

  // Prevent context menu on long press
  carousel.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    e.stopPropagation();
  });

  // Prevent dragging images, which can interfere with carousel dragging
  carousel.querySelectorAll("img").forEach((img) => {
    img.addEventListener("dragstart", (e) => e.preventDefault());
  });

  // Handle resize - usar debounce para melhor performance
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
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
    }, 100);
  });

  // Initial positioning
  setPositionByIndex();
  if (!isMobile()) {
    handleLastItemVisibility();
  }
});
