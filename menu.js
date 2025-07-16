const icons = [
    {
        menuIcon: "wix:vector://v1/b98454_e2d61ef8c55a457b935cc91733e7ed36.svg/icone-categoria-revestimentos.svg",
        menuTitle: "Revestimentos",
        pageUrl: "/conteudo-categorias/revestimentos",
        url: "https://wa.me/5562982962832?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20Revestimentos.",
        catalogoUrl: "/catalogo-virtual-revestimentos"
    },
    {
        menuIcon: "wix:vector://v1/b98454_e4d327dd54044fce87525229fd82a6f5.svg/icone-categoria-material-bruto.svg",
        menuTitle: "Materiais Brutos",
        pageUrl: "/conteudo-categorias/materiais-brutos",
        url: "https://wa.me/5562982962832?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20Materiais%20Brutos.",
        catalogoUrl: "/catálogo-virtual-produtos"
    },
    {
        menuIcon: "wix:vector://v1/b98454_4be528f0a66c4f128e36bcef8dc54a10.svg/icone-categoria-pintura.svg",
        menuTitle: "Pintura",
        pageUrl: "/conteudo-categorias/pintura",
        url: "https://wa.me/5562982962832?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20Pintura.",
        catalogoUrl: ""
    },
    {
        menuIcon: "wix:vector://v1/b98454_e7d01e6236564ebd8d78f3b5c74328a1.svg/icone-categoria-ferramentas.svg",
        menuTitle: "Ferramentas",
        pageUrl: "/conteudo-categorias/ferramentas",
        url: "https://wa.me/5562982962832?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20Ferramentas.",
        catalogoUrl: ""
    },
    {
        menuIcon: "wix:vector://v1/b98454_d2b663ae404c4ddba2570e61ca2595ad.svg/icone-categoria-hidr%C3%A1ulica.svg",
        menuTitle: "Hidráulica",
        pageUrl: "/conteudo-categorias/hidr%C3%A1ulica",
        url: "https://wa.me/5562982962832?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20Hidráulica.",
        catalogoUrl: ""
    },
    {
        menuIcon: "wix:vector://v1/b98454_73f9d0cdabb047e6a4e125e61beee918.svg/icone-categoria-iluminacao-e-eletrica.svg",
        menuTitle: "Iluminação e elétrica",
        pageUrl: "/conteudo-categorias/ilumina%C3%A7%C3%A3o-e-el%C3%A9trica",
        url: "https://wa.me/5562982962832?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20Iluminação%20e%20Elétrica.",
        catalogoUrl: ""
    },
    {
        menuIcon: "wix:vector://v1/b98454_f4d4365844ff4a72adf6f62054d37e27.svg/icone-categoria-casa-e-jardim.svg",
        menuTitle: "Casa e jardim",
        pageUrl: "/conteudo-categorias/casa-e-jardim",
        url: "https://wa.me/5562982962832?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20Casa%20e%20Jardim.",
        catalogoUrl: ""
    },
    {
        menuIcon: "wix:vector://v1/b98454_c1a536cb58614eefb8e6ff82d8638240.svg/icone-categoria-linha-industrial.svg",
        menuTitle: "Linha industrial",
        pageUrl: "/conteudo-categorias/linha-industrial",
        url: "https://wa.me/5562982962832?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20Linha%20Industrial.",
        catalogoUrl: ""
    },
]
const iconsWithCatalogueUrl = [];
let urlSlug = '';
let activeIconItem = null;
let activeIconData = null;

const aboutMaterialBtn = document.querySelector('.about-material-btn');
const catalogueBtn = document.querySelector('.catalogue-btn');
const infoCardsContainer = document.querySelector('.info-cards-container');
const outterIconsContent = document.querySelector('.icons-content');

function logEvent(eventType, details = '') {
    const eventLog = document.getElementById('eventLog');
    eventLog.textContent = `${eventType} ${details} - ${new Date().toLocaleTimeString()}`;
}

function getUrlSlug(pathname) {
    try {
        const pathSegments = pathname.split('/').filter(segment => segment !== '');

        if (pathSegments.length >= 2) {
            return pathSegments.slice(-2).join('/');
        }

        const conteudoIndex = pathSegments.indexOf('conteudo-categorias');
        if (conteudoIndex !== -1 && pathSegments.length > conteudoIndex + 1) {
            return pathSegments.slice(conteudoIndex).join('/');
        }

        return pathname.startsWith('/') ? pathname.substring(1) : pathname;

    } catch (e) {
        console.error("Erro ao processar pathname:", e);
        return null;
    }
}

function convertWixImageUrl(wixImageUrl) {
    // Para demo, retorna a URL diretamente
    if (!wixImageUrl) {
        return null;
    }

    if (wixImageUrl.includes('placeholder')) {
        return wixImageUrl;
    }

    const baseUrl = "https://static.wixstatic.com/shapes/";
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

function populateIconsContainer(containerElement, iconsData) {
    if (!containerElement) {
        console.error("Container element not found.");
        return;
    }
    const iconsHtml = createIconElements(iconsData);
    containerElement.innerHTML = iconsHtml;
}

function createIconElements(icons) {
    let html = ``;
    if (icons && icons.length > 0) {
        icons.forEach(icon => {
            if (!icon) return;

            const imageUrl = convertWixImageUrl(icon.menuIcon);
            html += `
                        <div class="icon-item-container">
                        <div class="icon-item" data-url="${icon.pageUrl}">
                        <img src="${imageUrl}" alt="${icon.menuTitle}">
                                <div class="icon-tooltip">${icon.menuTitle}</div>
                            </div>
                            <span>${icon.menuTitle}</span>
                        </div>                    `;
        });
    }
    return html;
}

function addButtonToContainer() {
    const contactButton = document.createElement('button');
    contactButton.textContent = 'Conversar agora';
    contactButton.classList.add('contact-button');

    // CORREÇÃO: Adicionar event listener com stopPropagation
    contactButton.addEventListener('click', function (e) {
        contactButton.classList.toggle('active');
        e.stopPropagation();

        if (activeIconData) {
            window.open(activeIconData.url, '_blank');
        }
    });

    return contactButton;
}

function handleScreenSizeChange() {
    const outterIconsContainer = document.querySelector('.outter-icons-container');
    const containerIconsContainer = document.querySelector('.container .icons-container');

    if (window.innerWidth <= 768) {
        outterIconsContainer.style.display = 'flex';
        containerIconsContainer.style.display = 'none';
    } else {
        outterIconsContainer.style.display = 'none';
        containerIconsContainer.style.display = 'flex';
    }
}

function toggleMenu() {
    const outterContainer = document.querySelector('.outter-icons-container');
    if (outterContainer) {
        if (outterContainer.classList.contains('open')) {
            // Fechar o menu
            outterContainer.classList.remove('slide-up');
            outterContainer.classList.add('slide-down');
            outterContainer.classList.remove('open'); // Remove a classe 'open' após a animação
        } else {
            // Abrir o menu
            outterContainer.classList.remove('slide-down');
            outterContainer.classList.add('slide-up');
            outterContainer.classList.add('open');
        }
        //logEvent('Menu toggled', outterContainer.classList.contains('open') ? 'opened' : 'closed');
    }
}
// Função para adicionar o botão de toggle do menu
function addMenuToggleButton() {
    const container = document.querySelector('.container');
    if (container) {
        const menuToggleButton = document.createElement('button');
        menuToggleButton.textContent = 'Abrir menu';
        menuToggleButton.classList.add('menu-toggle');

        menuToggleButton.addEventListener('click', function (e) {
            menuToggleButton.classList.toggle('active');

            const outterContainer = document.querySelector('.outter-icons-container');
            if (outterContainer && !outterContainer.classList.contains('open')) {
                this.textContent = 'Fechar';
            } else {
                this.textContent = 'Abrir menu';
            }
            toggleMenu();
        });


        container.appendChild(menuToggleButton);
    }
}

function populateContainer(iconsData) {
    const container = document.querySelector('.container');
    const outterIconsContent = document.querySelector('.outter-icons-container .icons-content');
    const containerIconsContent = document.querySelector('.container .icons-content');

    // Clear existing content
    if (outterIconsContent) {
        outterIconsContent.innerHTML = '';
    }
    if (containerIconsContent) {
        containerIconsContent.innerHTML = '';
    }

    populateIconsContainer(outterIconsContent, iconsData);
    populateIconsContainer(containerIconsContent, iconsData);

    addMenuToggleButton();

    const contactButton = addButtonToContainer();
    container.appendChild(contactButton);
}

function setupContainerEventListeners() {
    const containers = document.querySelectorAll('.container, .outter-icons-container, .icons-container, .icons-content');

    containers.forEach(container => {
        container.addEventListener('click', function (e) {
            if (!e.target.closest('.icon-item, .contact-button, .menu-toggle')) {
                e.stopPropagation();
                //logEvent('Container click prevented', container.className);
            }
        });
    });
}

function getItemToComingSoonCatalogue(menuTitle) {
    const iconToAddBadge = icons.find(icon => {
        return icon.menuTitle.toLocaleLowerCase() === menuTitle.toLocaleLowerCase();
    })

    return iconToAddBadge
}

function addComingSoonBadgeToElement(element) {
    if (!element) {
        console.error("Elemento nulo ou indefinido passado para addComingSoonBadgeToElement.");
        return;
    }

    const badge = document.createElement('span');
    badge.classList.add('coming-soon');
    badge.textContent = 'Em breve';

    element.children[0].classList.add('disabled');

    element.children[1].addEventListener('click', function (e) {
        e.stopPropagation();
    });

    element.appendChild(badge);
}

function handleIconsWithCatalogueUrl() {
    for (var index = 0, arrLenght = icons.length; index < arrLenght; index++) {
        const element = icons[index];
        if (element.catalogoUrl) {
            iconsWithCatalogueUrl.push(element);
        }
    }
}

function handleMenuButtonClick(clickedButton, otherButton, iconsToShow) {
    if (clickedButton.classList.contains('active')) return;

    clickedButton.classList.add('active');
    otherButton.classList.remove('active');

    if (outterIconsContent) {
        outterIconsContent.innerHTML = '';
    }

    populateIconsContainer(outterIconsContent, iconsToShow);

    setupIcons(iconsToShow, urlSlug);

    if (!outterIconsContent.classList.contains('show')) {
        infoCardsContainer.classList.add('hide');
        outterIconsContent.classList.add('show');
    }
}

function setMenuButtonEventListeners() {
    aboutMaterialBtn.addEventListener('click', function () {
        outterIconsContent.classList.remove('slide-up');
        outterIconsContent.classList.add('slide-down');
        
        handleMenuButtonClick(aboutMaterialBtn, catalogueBtn, icons);
        
        outterIconsContent.classList.add('slide-up');
        outterIconsContent.classList.remove('slide-down');
        outterIconsContent.style.display = 'grid';
    });

    catalogueBtn.addEventListener('click', function () {
        const iconComingSoonCatalogue = getItemToComingSoonCatalogue("pintura");

        const iconExists = iconsWithCatalogueUrl.some(icon => icon.menuTitle === iconComingSoonCatalogue.menuTitle);

        if (!iconExists) {
            iconsWithCatalogueUrl.push(iconComingSoonCatalogue);
        }

        outterIconsContent.classList.remove('slide-up');
        outterIconsContent.classList.add('slide-down');

        handleMenuButtonClick(catalogueBtn, aboutMaterialBtn, iconsWithCatalogueUrl);

        outterIconsContent.classList.add('slide-up');
        outterIconsContent.classList.remove('slide-down');
        outterIconsContent.style.display = 'flex';
        outterIconsContent.style.flexWrap = 'wrap';

        const iconsArray = outterIconsContent.children;
        addComingSoonBadgeToElement(outterIconsContent.children[2])

        // avoid click to this element iconsArray[2]
        iconsArray[2].addEventListener('click', function (e) {
            e.stopPropagation();
        });
        // Ensure setupIcons is called after populating with the catalogue-specific icons
        setupIcons(iconsWithCatalogueUrl, urlSlug);
    });
}

function setupIcons(iconsData, urlSlug) {
    const iconItems = document.querySelectorAll('.icon-item');
    // Encontrar o icon baseado na URL atual
    activeIconData = iconsData.find(icon => {
        return urlSlug === getUrlSlug(icon.pageUrl);
    });

    iconItems.forEach((item, index) => {
        const icon = iconsData.find(data => data.pageUrl === item.dataset.url);
        if (!icon) return;

        item.addEventListener('click', function (e) {
            e.stopPropagation();
            activeIconData = icon;

            if (activeIconItem) {
                activeIconItem.classList.remove('active');
            }

            this.classList.add('active');
            activeIconItem = this;

            if (catalogueBtnIsActive) {
                window.parent.postMessage({ type: icon.catalogoUrl, url: icon.catalogoUrl }, "*");
            } else if (icon.pageUrl) {
                window.parent.postMessage({ type: 'pageUrl', url: icon.pageUrl }, "*");
            }
        });

        // Set active state based on URL
        const iconUrlSlug = icon.pageUrl ? getUrlSlug(icon.pageUrl) : null;
        if (iconUrlSlug && urlSlug && iconUrlSlug === urlSlug) {
            item.classList.add('active');
            activeIconItem = item;
        } else {
            item.classList.remove('active');
        }
    });
}

// Event listener para mensagens do parent (mantido para compatibilidade)
/**
 window.addEventListener('message', (event) => {
     const messageData = event.data;

    if (messageData.type === 'initialData' && Array.isArray(messageData.items)) {
        urlSlug = messageData.urlSlug;

        icons.length = 0;
        icons.push(...messageData.items);

        handleIconsWithCatalogueUrl();
        populateContainer(iconsData, urlSlug);
        setupIcons(iconsData, urlSlug);
        setupContainerEventListeners();
        setMenuButtonEventListeners();

        //logEvent('Icons populated', `${iconsData.length} items`);
    } else if (messageData.type === 'error') {
        console.error("Erro recebido do site pai:", messageData.message);
    }
});
*/

window.addEventListener('resize', handleScreenSizeChange);

document.addEventListener('DOMContentLoaded', () => {
    // Para demo, populate com dados mock
    handleIconsWithCatalogueUrl();
    populateContainer(icons);
    setupIcons(icons, '/home');
    setupContainerEventListeners();
    setMenuButtonEventListeners();
    handleScreenSizeChange();

    //logEvent('DOM loaded', 'ready');

    // Para implementação real, descomente:
    // window.parent.postMessage('menuReady', "*");
});