const iconsData = [
    {
        menuIcon: "wix:vector://v1/b98454_e2d61ef8c55a457b935cc91733e7ed36.svg/icone-categoria-revestimentos.svg",
        menuTitle: "Revestimentos",
        pageUrl: "/conteudo-categorias/revestimentos",
        url: "https://wa.me/5562982962832?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20Revestimentos.",
        catalogoUrl: "revestimentos"
    },
    {
        menuIcon: "wix:vector://v1/b98454_e4d327dd54044fce87525229fd82a6f5.svg/icone-categoria-material-bruto.svg",
        menuTitle: "Materiais Brutos",
        pageUrl: "/conteudo-categorias/materiais-brutos",
        url: "https://wa.me/5562982962832?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20Materiais%20Brutos.",
        catalogoUrl: "materiais"
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

// Debug function
function logEvent(eventType, details = '') {
    const eventLog = document.getElementById('eventLog');
    eventLog.textContent = `${eventType} ${details} - ${new Date().toLocaleTimeString()}`;
}

let activeIconItem = null;
let activeIconData = null;

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
            if(!icon) return;
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

function setupIcons(iconsData, urlSlug) {
    const iconItems = document.querySelectorAll('.icon-item');
    const currentPagePath = window.location.pathname;
    const currentUrl = window.location.href;

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

            // Navigate to page
            if (icon.pageUrl) {
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

function toggleMenu() {
    console.log("cliquei")
    const outterContainer = document.querySelector('.outter-icons-container');
    if (outterContainer) {
        outterContainer.classList.toggle('open');
        //logEvent('Menu toggled', outterContainer.classList.contains('open') ? 'opened' : 'closed');
    }
}

function addMenuToggleButton() {
    const container = document.querySelector('.container');
    if (container) {
        const menuToggleButton = document.createElement('button');
        menuToggleButton.textContent = 'Abrir menu';
        menuToggleButton.classList.add('menu-toggle');

        menuToggleButton.addEventListener('click', function (e) {
            menuToggleButton.classList.toggle('active');

            const outterContainer = document.querySelector('.outter-icons-container');
            if (outterContainer) {
                if (!outterContainer.classList.contains('open')) {
                    this.textContent = 'Fechar';
                } else {
                    this.textContent = 'Abrir menu';
                }
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

const aboutMaterialBtn = document.querySelector('.about-material-btn');
const catalogueBtn = document.querySelector('.catalogue-btn');
const infoCardsContainer = document.querySelector('.info-cards-container');
const iconsContent = document.querySelector('.icons-content');

aboutMaterialBtn.addEventListener('click', function () {
    infoCardsContainer.classList.toggle('hide');
    iconsContent.classList.toggle('show');
});

catalogueBtn.addEventListener('click', function () {
    const outterIconsContent = document.querySelector('.icons-content');

    if (outterIconsContent) {
        outterIconsContent.innerHTML = '';
    }

    const iconsWithCatalogueUrl = iconsData.map(icon => {
        if (icon.catalogoUrl) {
            return {
                ...icon
            };
        }
        return null;
    })

    populateIconsContainer(outterIconsContent, iconsWithCatalogueUrl);
});

// Event listener para mensagens do parent (mantido para compatibilidade)
/**     const messageData = event.data;

    if (messageData.type === 'initialData' && Array.isArray(messageData.items)) {
        const iconsData = messageData.items;
        const urlSlug = messageData.urlSlug;

        icons.length = 0;
        icons.push(...iconsData);

        populateContainer(iconsData, urlSlug);
        setupIcons(iconsData, urlSlug);
        setupContainerEventListeners(); // NOVA FUNÇÃO

        //logEvent('Icons populated', `${iconsData.length} items`);
    } else if (messageData.type === 'error') {
        console.error("Erro recebido do site pai:", messageData.message);
    }
});
*/

window.addEventListener('resize', handleScreenSizeChange);

document.addEventListener('DOMContentLoaded', () => {
    // Para demo, populate com dados mock
    populateContainer(iconsData);
    setupIcons(iconsData, '/home');
    setupContainerEventListeners(); // NOVA FUNÇÃO
    handleScreenSizeChange();

    //logEvent('DOM loaded', 'ready');

    // Para implementação real, descomente:
    // window.parent.postMessage('menuReady', "*");
});