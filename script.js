import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const cardsItemsInfo = [
  {
    image:
      "https://static.wixstatic.com/media/b98454_a764b683732c4edeba1f4928d53c902f~mv2.png",
    title: "Revestimentos",
    subTitle: 'O nosso "carro-chefe"',
    description:
      "Cerâmicos, porcelanatos e vinílicos incríveis, que vão desde os mais simples até os mais sofisticados. Temos uma vasta lista de opções com um potencial incrível de transformar o ambiente de qualquer um.",
    categoryIcons: [
      {
        src:
          "https://static.wixstatic.com/media/b98454_9e997e6526004950883304239e6bb60a~mv2.png",
        title: "Cerâmicas",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_1ca0232fd38e4344b520c467603fe5cf~mv2.png",
        title: "Porcelanatos",
      },
      {
        src:
          "https://wixstatic.com/media/b98454_f331b886655b4044af9978f30f9396bc~mv2.png",
        title: "Vinílicos",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_cd4cdd524f6f445bb5346deb7937187a~mv2.png",
        title: "Pastilhas",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_99e7f33fc3c6410c949fe201e13a3a40~mv2.png",
        title: "Rodapés",
      },
    ],
  },
  {
    image:
      "https://static.wixstatic.com/media/b98454_b63a7e9ffe194ce88add907097d95548~mv2.png",
    title: "Materiais Brutos",
    subTitle: "A base de tudo!",
    description:
      "Cimento, areia, blocos, vergalhões e muito mais para quem está começando do zero ou encarando aquela reforma de respeito. É aqui que o alicerce ganha forma (e força!).",
    categoryIcons: [
      {
        src:
          "https://static.wixstatic.com/media/b98454_8a1d89b14d584a71aad04538dde96a68~mv2.png",
        title: "Blocos",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_20e68663d49d49a98bfa75a3e802c73b~mv2.png",
        title: "Cimentos",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_9b31211d8440478486c03ec300e5c1e7~mv2.png",
        title: "Areias",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_be3e3a939e6545fab780869d2103a338~mv2.png",
        title: "Pedras",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_93cc6859cb264ebf8bdbb6cfef265860~mv2.png",
        title: "Ferragens",
      },
    ],
  },
  {
    image:
      "https://static.wixstatic.com/media/b98454_db85f3427c9d4505b0f368d947ed8ab1~mv2.png",
    title: "Pintura",
    subTitle: "Cor e vida nas paredes!",
    description:
      "Tinta não é tudo igual – e a gente prova isso com uma seleção caprichada de cores, texturas, acabamentos e acessórios. Tem opção para todo tipo de gosto, parede e projeto criativo.",
    categoryIcons: [
      {
        src:
          "https://static.wixstatic.com/media/b98454_6ea7d12f333e45cfafa67cda577cb9df~mv2.png",
        title: "Tintas",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_96cae1cc3b804551acb4f92c3a4da594~mv2.png",
        title: "Massas",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_41fd9fb0e4e64e25af3031e9697d71ae~mv2.png",
        title: "Vernizes",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_a245ad1d7e2949d28bdb42d883703dcd~mv2.png",
        title: "Rolos",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_e4a02ba3dae444d4a76298fc4b6fe03f~mv2.png",
        title: "Pincéis",
      },
    ],
  },
  {
    image:
      "https://static.wixstatic.com/media/b98454_df97aeb32bd64adbabfc97a1745201d3~mv2.png",
    title: "Ferramentas",
    subTitle: "Sua obra na palma da mão.",
    description:
      'Manuais ou elétricas, aqui tem ferramentas para facilitar cada etapa do trabalho – seja profissional ou do tipo "faça você mesmo".',
    categoryIcons: [
      {
        src:
          "https://static.wixstatic.com/media/b98454_6456d03f4899416c8451a43100f16c95~mv2.png",
        title: "Manuais",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_92aa5a03f5ef42fb8112cc5214d90202~mv2.png",
        title: "Elétricas",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_6ea0ed5cae994d7999853e5ecc2a6b03~mv2.png",
        title: "Discos",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_6704c472fb6f45309de2ca478d14a8c2~mv2.png",
        title: "Pregos",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_60d1e4e48a7d444aa1d68662f4b4dbc6~mv2.png",
        title: "EPIs",
      },
    ],
  },
  {
    image:
      "https://static.wixstatic.com/media/b98454_00cc902ddde54fbf8cfcf7629e567226~mv2.png",
    title: "Hidráulica",
    subTitle: "Do cano à torneira.",
    description:
      "Aqui tem tudo para água circular bem na sua casa: tubos, conexões, torneiras, vasos sanitários, cubas e acessórios. Qualidade, durabilidade e praticidade para sua obra ou reforma fluir sem estresse.",
    categoryIcons: [
      {
        src:
          "https://static.wixstatic.com/media/b98454_c5767bf8af354901ba4ab0896144890c~mv2.png",
        title: "Tubos",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_d8de94d4916d4b91bf7883fe3b9b9762~mv2.png",
        title: "Conexões",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_b30e8bee0cfd46828a522e6010377c2d~mv2.png",
        title: "Louças",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_47f04927b1964329a5700fd513b5d677~mv2.png",
        title: "Torneiras",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_07dbbc69f16b49a495d7cd2855a2a429~mv2.png",
        title: "Chuveiros",
      },
    ],
  },
  {
    image:
      "https://static.wixstatic.com/media/b98454_15c2c0c62a0248da81f34a6fe6200938~mv2.png",
    title: "Iluminação e Elétrica",
    subTitle: "Conforto, segurança e design.",
    description:
      "Cabos, tomadas, lâmpadas e luminárias que fazem seu projeto funcionar e valorizam cada ambiente. Tudo para sua casa ser mais prática, acolhedora e cheia de vida.",
    categoryIcons: [
      {
        src:
          "https://static.wixstatic.com/media/b98454_46ed15816ad2487fbb3a82224b9297f0~mv2.png",
        title: "Cabos",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_afa8b482705746f28be83f9999c43933~mv2.png",
        title: "Tomadas",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_a5396a9c900b4e74a208b34347b61acf~mv2.png",
        title: "Lâmpadas",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_51a60732dc4b4ca3864a72d9791dabd5~mv2.png",
        title: "Isolantes",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_57e9b1240748449b8f5b5d5f9df9ac3f~mv2.png",
        title: "Luminárias",
      },
    ],
  },
  {
    image:
      "https://static.wixstatic.com/media/b98454_56d54cc1af89438e8d7c94271faa908d~mv2.png",
    title: "Casa e Jardim",
    subTitle: "Detalhes que fazem a casa mais viva.",
    description:
      "Gabinetes, espelhos, esquadrias e acessórios de jardinagem que trazem beleza, organização e bem-estar para o seu lar — dentro e fora de casa. Seu projeto fica mais completo, com personalidade e cuidado em cada canto.",
    categoryIcons: [
      {
        src:
          "https://static.wixstatic.com/media/b98454_b369259cf29a40c987f28279ce323784~mv2.png",
        title: "Gabinetes",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_1535b1c6e3e944098f91891a97b77e63~mv2.png",
        title: "Espelhos",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_ae92805c28d54c9caf2b56fcbcaf5bcf~mv2.png",
        title: "Portas",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_7a642c1b564348d8a2385d571d0b58a8~mv2.png",
        title: "Janelas",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_77f84d8354554fe392a5e7b110ca0a8f~mv2.png",
        title: "Pás",
      },
    ],
  },
  {
    image:
      "https://static.wixstatic.com/media/b98454_5490e575ec564cadade6132bde7be3c3~mv2.png",
    title: "Linha Industrial",
    subTitle: "Você merece seu negócio decolando.",
    description:
      "Equipamentos pensados para dar agilidade, eficiência e qualidade ao seu dia a dia. Tudo para sua estrutura funcionar melhor, seu atendimento render mais e seu negócio crescer com força.",
    categoryIcons: [
      {
        src:
          "https://static.wixstatic.com/media/b98454_94c1ea1eb8e6413cb85af04c01130df1~mv2.png",
        title: "Liquidificadores",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_073b5fa8e6ac46deac879a925c347d88~mv2.png",
        title: "Fornos",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_22432b8f4dd948abbc7bf619a0e24b5f~mv2.png",
        title: "Lava-Louças",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_12c339dd827e4bb4b22544507afa510d~mv2.png",
        title: "Bebedouros",
      },
      {
        src:
          "https://static.wixstatic.com/media/b98454_c1c05931310646ddab5f4b4f47b26879~mv2.png",
        title: "Refrigeradores",
      },
    ],
  },
];

const plusButton = `<svg preserveAspectRatio="none" data-bbox="20.5 20.5 159 159" viewBox="20.5 20.5 159 159" height="200" width="200" xmlns="http://www.w3.org/2000/svg" data-type="shape" role="presentation" aria-hidden="true" aria-label="">
    <g>
        <path d="M165.056 85.556h-50.612V34.944c0-7.973-6.471-14.444-14.444-14.444-7.973 0-14.444 6.471-14.444 14.444v50.612H34.944C26.971 85.556 20.5 92.027 20.5 100c0 7.973 6.471 14.444 14.444 14.444h50.612v50.612c0 7.973 6.471 14.444 14.444 14.444s14.444-6.471 14.444-14.444v-50.612h50.612c7.973 0 14.444-6.471 14.444-14.444.057-7.915-6.471-14.444-14.444-14.444z"></path>
    </g>
</svg>`;

const domElements = {
  // Card elements
  card: null,
  cardContent: null,

  // Image elements
  cardImageContainer: null,
  cardImage: null,

  // Header elements
  cardTitle: null,
  cardSubtitle: null,
  cardDescription: null,

  // Categories elements
  cardCategories: null,

  // Category elements
  categoryElement: null,
  categoryIconContainer: null,
  categoryIcon: null,
  categoryTitle: null,

  // More icon elements
  moreIconContainer: null,
  moreIcon: null,
  moreText: null,

  // Button elements
  buttonContainer: null,
};

function initDomElements() {
  // Card elements
  domElements.card = document.createElement("div");
  domElements.cardContent = document.createElement("div");

  // Image elements
  domElements.cardImageContainer = document.createElement("div");
  domElements.cardImage = document.createElement("img");

  // Header elements
  domElements.cardTitle = document.createElement("h2");
  domElements.cardSubtitle = document.createElement("h3");
  domElements.cardDescription = document.createElement("p");

  // Categories elements
  domElements.cardCategories = document.createElement("div");

  // Category elements
  domElements.categoryElement = document.createElement("div");
  domElements.categoryIconContainer = document.createElement("div");
  domElements.categoryIcon = document.createElement("img");

  // Otimizar carregamento de ícones
  domElements.categoryIcon.loading = "lazy";
  domElements.categoryIcon.decoding = "async";
  domElements.categoryIcon.width = 65;
  domElements.categoryIcon.height = 45;

  domElements.categoryTitle = document.createElement("span");

  // More icon elements
  domElements.moreIconContainer = document.createElement("div");
  domElements.moreIcon = document.createElement("div");
  domElements.moreText = document.createElement("span");

  // Button elements
  domElements.buttonContainer = document.createElement("div");

  // Pré-criar botões para reutilização
  domElements.button = document.createElement("button");
  domElements.button.classList.add("button");

  // Usar IntersectionObserver para lazy loading
  //setupLazyLoading();
}

function setupLazyLoading() {
  // Verificar se IntersectionObserver é suportado
  if ('IntersectionObserver' in window) {
    domElements.imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });
  }
}

function createCatalogButton(fragment, catologueUrl) {
  const abrirCatalogoButton = domElements.button.cloneNode(true);
  abrirCatalogoButton.innerHTML = `<span>Abrir catálogo</span>`;
  fragment.appendChild(abrirCatalogoButton);

  abrirCatalogoButton.addEventListener("click", function () {
    window.parent.postMessage({
      type: catologueUrl,
      url: catologueUrl
    }, '*');
  });
}

function createButtons() {
  const buttonContainer = domElements.buttonContainer.cloneNode(false);
  buttonContainer.classList.add("button-container");

  const item = this;

  const fragment = document.createDocumentFragment();

  //const verMaisButton = domElements.button.cloneNode(true);
  //verMaisButton.innerHTML = `<span>Ver mais</span>`;
  //fragment.appendChild(verMaisButton);

  if (item.catalogoUrl) {
    createCatalogButton(fragment, item.catalogoUrl)
  };

  //verMaisButton.addEventListener("click", function () {
    //window.parent.postMessage({
      //type: 'navigateToCategoryPage',
      //url: item.linkCategoryPage
   // }, '*');
  //});

  buttonContainer.appendChild(fragment);

  return buttonContainer;
}

function createCardImage(imageUrl, title) {
  const cardImageContainer = domElements.cardImageContainer.cloneNode(false);
  cardImageContainer.classList.add("card-image-container");

  const cardImage = domElements.cardImage.cloneNode(false);

  if (domElements.imageObserver) {
    cardImage.dataset.src = imageUrl;
    cardImage.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";
    domElements.imageObserver.observe(cardImage);
  } else {
    cardImage.src = imageUrl;
  }

  cardImage.alt = title;
  cardImageContainer.appendChild(cardImage);
  return cardImageContainer;
}

function createCardHeader(title, subtitle, description) {
  const cardTitle = domElements.cardTitle.cloneNode(false);
  cardTitle.classList.add("card-title");
  cardTitle.textContent = title;

  const cardSubtitle = domElements.cardSubtitle.cloneNode(false);
  cardSubtitle.classList.add("card-subtitle");
  cardSubtitle.textContent = subtitle;

  const cardDescription = domElements.cardDescription.cloneNode(false);
  cardDescription.classList.add("card-description");
  cardDescription.textContent = description;

  return { cardTitle, cardSubtitle, cardDescription };
}

function createCategory(src, title) {
  const categoryElement = domElements.categoryElement.cloneNode(false);
  categoryElement.classList.add("category");

  const categoryIconContainer = domElements.categoryIconContainer.cloneNode(false);
  categoryIconContainer.classList.add("category-icon");

  const categoryIcon = domElements.categoryIcon.cloneNode(false);
  categoryIcon.classList.add("category-icon-img");

  if (domElements.imageObserver) {
    categoryIcon.dataset.src = src;
    categoryIcon.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";
    domElements.imageObserver.observe(categoryIcon);
  } else {
    categoryIcon.src = src;
  }

  categoryIcon.alt = title;

  const categoryTitle = domElements.categoryTitle.cloneNode(false);
  categoryTitle.textContent = title;

  categoryIconContainer.appendChild(categoryIcon);
  categoryElement.appendChild(categoryIconContainer);
  categoryElement.appendChild(categoryTitle);

  return categoryElement;
}

function createMoreIcon() {
  const moreIconContainer = domElements.moreIconContainer.cloneNode(false);
  moreIconContainer.classList.add("category");

  const moreIcon = domElements.moreIcon.cloneNode(false);
  moreIcon.classList.add("category-icon", "mais-icon");
  moreIcon.innerHTML = plusButton;

  const moreText = domElements.moreText.cloneNode(false);
  moreText.textContent = "E mais...";

  moreIconContainer.appendChild(moreIcon);
  moreIconContainer.appendChild(moreText);

  return moreIconContainer;
}

function convertWixImageUrl(wixImageUrl) {
  const baseUrl = "https://static.wixstatic.com/media/";
  // Regex to capture the part between v1/ and the next / or #
  const regex = /v1\/(.*?)(?:#|\/|$)/;
  const match = wixImageUrl.match(regex);

  if (match && match[1]) {
    const imageIdentifier = match[1];
    return baseUrl + imageIdentifier;
  } else {
    console.error("Could not extract image identifier from Wix URL:", wixImageUrl);
    return null;
  }
}

function createCardCategories(categoryIcons) {
  const cardCategories = domElements.cardCategories.cloneNode(false);
  cardCategories.classList.add("card-categories");

  let categoryElement;
  let src;
  categoryIcons.forEach((category) => {
    src = convertWixImageUrl(category.src)
    categoryElement = createCategory(src, category.title);
    cardCategories.appendChild(categoryElement);
  });

  cardCategories.appendChild(createMoreIcon());

  return cardCategories;
}

function createCard(item) {
  const card = domElements.card.cloneNode(false);
  card.classList.add("card");

  card.appendChild(createCardImage(item.image, item.title));

  const cardContent = domElements.cardContent.cloneNode(false);
  cardContent.classList.add("card-content");

  const { cardTitle, cardSubtitle, cardDescription } = createCardHeader(item.title, item.subtitle, item.description);
  cardContent.appendChild(cardTitle);
  cardContent.appendChild(cardSubtitle);
  cardContent.appendChild(cardDescription);

  cardContent.appendChild(createCardCategories(item.categoryIcons));

  cardContent.appendChild(createButtons.call(item));

  card.appendChild(cardContent);

  return card;
}

function createCarousel(carouselItens) {
  initDomElements();

  const carousel = document.querySelector(".swiper-wrapper");
  carousel.innerHTML = ''; // Clear existing content


  const fragment = document.createDocumentFragment();

  carouselItens.forEach((item) => {
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

      // Initialize Swiper after carousel is created
      const swiperInstance = new Swiper('.swiper', {
        direction: 'horizontal',
        grabCursor: true,
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 20,
        navigation: {
          nextEl: "carousel-control-next",
          prevEl: "carousel-control-prev",
        },

      });

      const buttonNext = document.querySelector(".carousel-control-next");
      const buttonPrev = document.querySelector(".carousel-control-prev");

      // Ensure listeners are only added once
      if (buttonNext && !buttonNext.dataset.listenerAdded) {
        buttonNext.addEventListener("click", function () {
          swiperInstance.slideNext();
        });
        buttonNext.dataset.listenerAdded = 'true';
      }

      if (buttonPrev && !buttonPrev.dataset.listenerAdded) {
        buttonPrev.addEventListener("click", function () {
          swiperInstance.slidePrev();
        });
        buttonPrev.dataset.listenerAdded = 'true';
      }

    } else if (dadosRecebidos && dadosRecebidos.error) {
      console.error("Erro recebido do site pai:", dadosRecebidos.error);
    } else {
      console.warn("Dados inesperados recebidos do site pai:", dadosRecebidos);
    }
  });
};