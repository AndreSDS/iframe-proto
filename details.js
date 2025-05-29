const icons = [
    { menuIcon: "wix:vector://v1/b98454_e2d61ef8c55a457b935cc91733e7ed36.svg/icone-categoria-revestimentos.svg", menuTitle: "Revestimentos", pageUrl: "/conteudo-categorias/revestimentos" },
    { menuIcon: "wix:vector://v1/b98454_e4d327dd54044fce87525229fd82a6f5.svg/icone-categoria-material-bruto.svg", menuTitle: "Materiais Brutos", pageUrl: "/conteudo-categorias/materiais-brutos" },
    { menuIcon: "wix:vector://v1/b98454_4be528f0a66c4f128e36bcef8dc54a10.svg/icone-categoria-pintura.svg", menuTitle: "Pintura", pageUrl: "/conteudo-categorias/pintura" },
    { menuIcon: "wix:vector://v1/b98454_e7d01e6236564ebd8d78f3b5c74328a1.svg/icone-categoria-ferramentas.svg", menuTitle: "Ferramentas", pageUrl: "/conteudo-categorias/ferramentas" },
    { menuIcon: "wix:vector://v1/b98454_d2b663ae404c4ddba2570e61ca2595ad.svg/icone-categoria-hidr%C3%A1ulica.svg", menuTitle: "Hidráulica", pageUrl: "/conteudo-categorias/hidr%C3%A1ulica" },
    { menuIcon: "wix:vector://v1/b98454_73f9d0cdabb047e6a4e125e61beee918.svg/icone-categoria-iluminacao-e-eletrica.svg", menuTitle: "Iluminação e elétrica", pageUrl: "/conteudo-categorias/ilumina%C3%A7%C3%A3o-e-el%C3%A9trica" },
    { menuIcon: "wix:vector://v1/b98454_f4d4365844ff4a72adf6f62054d37e27.svg/icone-categoria-casa-e-jardim.svg", menuTitle: "Casa e jardim", pageUrl: "/conteudo-categorias/casa-e-jardim" },
    { menuIcon: "wix:vector://v1/b98454_c1a536cb58614eefb8e6ff82d8638240.svg/icone-categoria-linha-industrial.svg", menuTitle: "Linha industrial", pageUrl: "/conteudo-categorias/linha-industrial" },
]

function getUrlSlug(pathname) {
    try {
        // Divide o pathname por '/' e remove o primeiro elemento vazio se houver
        const pathSegments = pathname.split('/').filter(segment => segment !== '');

        if (pathSegments.length >= 2) {
            return pathSegments.slice(-2).join('/');
        }

        const conteudoIndex = pathSegments.indexOf('conteudo-categorias');
        if (conteudoIndex !== -1 && pathSegments.length > conteudoIndex + 1) {
            return pathSegments.slice(conteudoIndex).join('/');
        }

        // Retorna o pathname completo se não conseguir extrair um slug específico
        return pathname.startsWith('/') ? pathname.substring(1) : pathname;

    } catch (e) {
        console.error("Erro ao processar pathname:", e);
        return null;
    }
}

function convertWixImageUrl(wixImageUrl) {
    const baseUrl = "https://static.wixstatic.com/shapes/";
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

function createIconElements(icons) {
    let html = ``;
    if (icons && icons.length > 0) {
        html += `<div class="icons-container">`;
        icons.forEach(icon => {
            const imageUrl = convertWixImageUrl(icon.menuIcon);
            html += `
                <div class="icon-item">
                    <img src="${imageUrl}" alt="${icon.menuTitle}">
                <div class="icon-tooltip">${icon.menuTitle}</div>
              </div>`;
        });
        html += `</div>`;
    }
    return html;
}

function addButtonToContainer() {
    const container = document.querySelector('.container');
    if (container) {
        const button = document.createElement('button');
        button.textContent = 'CONVERSAR AGORA';
        button.classList.add('contact-button');
        container.appendChild(button);
    }
}

let activeIconItem = null;

function setupIcons(iconsData, urlSlug) {
    const iconItems = document.querySelectorAll('.icon-item');

    iconItems.forEach((item, index) => {
        const icon = iconsData[index];

        // Adiciona o listener de clique
        item.addEventListener('click', function () {
            if (activeIconItem) {
                activeIconItem.classList.remove('active');
            }
            this.classList.add('active');
            activeIconItem = this;

            if (icon.pageUrl) {
                window.parent.postMessage({ type: 'pageUrl', url: icon.pageUrl }, "*");
            }
        });

        // Add mouseover event listener for tooltip
        item.addEventListener('mouseover', function () {
            const tooltip = this.querySelector('.icon-tooltip');
            if (tooltip) {
                console.log('tooltip', tooltip)
                tooltip.style.visibility = 'visible';
                tooltip.style.opacity = '1';
            }
        });

        // Add mouseout event listener for tooltip
        item.addEventListener('mouseout', function () {
            const tooltip = this.querySelector('.icon-tooltip');
            if (tooltip) {
                tooltip.style.visibility = 'hidden';
                tooltip.style.opacity = '0';
            }
        });

        // Verifica slug do ícone corresponde ao slug atual do pai
        const iconUrlSlug = icon.pageUrl ? getUrlSlug(icon.pageUrl) : null;

        if (iconUrlSlug && urlSlug && iconUrlSlug === urlSlug) {
            item.classList.add('active');
            activeIconItem = item;
        } else {
            item.classList.remove('active');
        }
    });
}

function populateContainer(iconsData, urlSlug) {
    const container = document.querySelector('.container');
    const iconsHtml = createIconElements(iconsData);
    container.innerHTML = iconsHtml;
    addButtonToContainer();
    setupIcons(iconsData, urlSlug);
}

// window.addEventListener('message', (event) => {
//     const messageData = event.data;

//     // Verifica se a mensagem é o objeto de dados inicial
//     if (messageData.type === 'initialData' && Array.isArray(messageData.items)) {
//         const iconsData = messageData.items;
//         const urlSlug = messageData.urlSlug;

//         // Armazena os dados dos ícones
//         icons.length = 0; // Limpa o array existente
//         icons.push(...iconsData); // Adiciona os novos dados
//         // Popula os ícones com slug atual para setupIcons
//         populateContainer(icons, urlSlug);
//     } else if (messageData.type === 'error') {
//         console.error("Erro recebido do site pai:", messageData.message);
//     } else {
//         console.warn("Dados inesperados recebidos do site pai:", messageData);
//     }
// });

document.addEventListener('DOMContentLoaded', () => {
    //window.parent.postMessage('menuReady', "*");
    populateContainer(icons, "urlSlug")
});