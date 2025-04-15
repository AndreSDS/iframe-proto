const cardsTestimonialsInfo = [
  {
    nome: "Renato Neves",
    text: "Sou cliente há muitos anos! E sempre fui muito bem atendido, com agilidade e auxílio na escolha dos produtos para que eu possa ter o melhor resultado no serviço. O atendimento pelo Whatsapp é também uma ferramenta que funciona perfeitamente!!",
  },
  {
    nome: "Marcos Paulo",
    text: "SExcelente atendimento ao cliente final, pontualidade nas entregas e qualidade nos produtos. Já comprei em várias lojas deste segmento mas desconheço alguma que possui o atendimento exclusivo como de vocês.",
  },
  {
    nome: "Kelly Fernandes",
    text: "Excelente atendimento do início da compra até a hora da entrega do material... Todos funcionários são bastante atenciosos e simpáticos... É a loja que compramos faz tempo, pois os preços são ótimos... Top!!! Recomendo!!!"
  },
  {
    nome: "Renato Neves",
    text: "Sou cliente há muitos anos! E sempre fui muito bem atendido, com agilidade e auxílio na escolha dos produtos para que eu possa ter o melhor resultado no serviço. O atendimento pelo Whatsapp é também uma ferramenta que funciona perfeitamente!!",
  },
  {
    nome: "Renato Neves",
    text: "Sou cliente há muitos anos! E sempre fui muito bem atendido, com agilidade e auxílio na escolha dos produtos para que eu possa ter o melhor resultado no serviço. O atendimento pelo Whatsapp é também uma ferramenta que funciona perfeitamente!!",
  },
  {
    nome: "Renato Neves",
    text: "Sou cliente há muitos anos! E sempre fui muito bem atendido, com agilidade e auxílio na escolha dos produtos para que eu possa ter o melhor resultado no serviço. O atendimento pelo Whatsapp é também uma ferramenta que funciona perfeitamente!!",
  },
];

function createCard(item) {
  const card = document.createElement("div");
  card.classList.add("card");

  const avatar = document.createElement("div");
  avatar.classList.add("avatar");

  const avatarText = document.createElement("span");
  avatarText.textContent = item.nome.charAt(0).toUpperCase();
  avatar.appendChild(avatarText);

  const content = document.createElement("div");
  content.classList.add("content");
  const name = document.createElement("h2");
  name.classList.add("name");
  name.textContent = item.nome;

  const stars = document.createElement("div");
  stars.classList.add("stars");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("viewBox", "25 29 150.346 142.783");
  svg.setAttribute("height", "200");
  svg.setAttribute("width", "200");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("role", "presentation");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("aria-label", "");
  svg.setAttribute("data-type", "shape");
  svg.setAttribute("data-bbox", "25 29 150.346 142.783");
  svg.setAttribute("data-type", "shape");

  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M174.479 82.542c-.833-3.334-3.333-5-6.666-5.834l-41.667-5.833-18.333-37.5c-2.5-5.833-12.5-5.833-15 0l-18.334 37.5-41.666 5.833c-3.334.834-5.834 2.5-7.5 5.834-.834 3.333 0 6.666 2.5 8.333l30 29.167-7.5 41.666c-.834 3.334.833 6.667 3.333 8.334 1.666.833 3.333 1.666 5 1.666 1.666 0 2.5 0 4.166-.833l37.501-20 37.5 20c2.5 1.667 5.833.833 9.166-.833 2.5-1.667 4.167-5 3.334-8.334l-7.5-41.666 30-29.167c2.5-1.667 3.333-5 1.666-8.333Z"
  );

  g.appendChild(path);
  svg.appendChild(g);

  Array.from({ length: 5 }, (_, i) => {
    const svgClone = svg.cloneNode(true);
    stars.appendChild(svgClone);
  });

  const text = document.createElement("p");
  text.classList.add("text");
  text.textContent = item.text;

  content.appendChild(name);
  content.appendChild(stars);
  content.appendChild(text);

  card.appendChild(avatar);
  card.appendChild(content);

  return card;
}

function createCarousel() {
  const container = document.querySelector(".carousel-container");
  const carousel = document.querySelector(".carousel");

  cardsTestimonialsInfo.forEach((item) => {
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

    const itemWidth = items[0].offsetWidth + marginRight;
    const containerWidth = container.offsetWidth;

    // For mobile, we show part of the next item as a visual cue
    let visibleItems;
    if (isMobile()) {
      // We only show about 85% of the container width for the main item
      // This makes part of the next item visible
      visibleItems = 1;
    } else {
      // Calculate how many whole items fit in the container
      visibleItems = Math.floor(containerWidth / itemWidth);
    }

    // Calculate the max index considering the full visibility of the last item
    const maxIndex = Math.max(0, items.length - visibleItems);

    return { itemWidth, maxIndex, containerWidth, visibleItems };
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

      // Calculate distance moved
      currentTranslate = prevTranslate + currentPosition - startPos;
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
