function aplicarEstilosMenu() {
    const elemento = document.querySelector('[data-mesh-id="Containerpm884inlineContent-gridContainer"]');
    if (elemento) {
        menu = elemento.children[2];
        if (menu && !menu.hasAttribute('data-estilo-aplicado')) {
            menu.style.position = "fixed";
            menu.style.zIndex = "20";
            menu.style.bottom = "0";
            menu.style.width = "100vw";

            // Lógica condicional para altura
            const outterIconsContainer = menu.querySelector('.outter-icons-container');
            if (outterIconsContainer && !outterIconsContainer.classList.contains('show')) {
                menu.style.height = "75px";
            } else {
                menu.style.height = "100vh";
                menu.style.maxHeight = "360px";
            }

            // Marcar que o estilo já foi aplicado
            menu.setAttribute('data-estilo-aplicado', 'true');
        }
    }
}

// Função para atualizar apenas a altura (quando a classe "show" mudar)
function atualizarAlturaMenu() {
    const elemento = document.querySelector('[data-mesh-id="Containerpm884inlineContent-gridContainer"]');
    let menu;
    if (elemento) {
        menu = elemento.children[1];
        if (menu) {
            const outterIconsContainer = menu.querySelector('.outter-icons-container');
            if (outterIconsContainer && !outterIconsContainer.classList.contains('show')) {
                menu.style.height = "75px";
            } else {
                menu.style.height = "100vh";
                menu.style.maxHeight = "360px";
            }
        }
    }
}

// Executar com delay para aguardar carregamento do Wix
function executarComDelay() {
    setTimeout(aplicarEstilosMenu, 1000);
    setTimeout(aplicarEstilosMenu, 2000);
    setTimeout(aplicarEstilosMenu, 3000);
}

// Múltiplos eventos para cobrir o carregamento do Wix
document.addEventListener('DOMContentLoaded', executarComDelay);
window.addEventListener('load', executarComDelay);

// Observar mudanças no DOM com filtro mais específico
const observer = new MutationObserver((mutations) => {
    let shouldApply = false;
    let shouldUpdateHeight = false;

    mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Verificar se algum nó adicionado contém o data-mesh-id que procuramos
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    if (node.querySelector && node.querySelector('[data-mesh-id*="gridContainer"]')) {
                        shouldApply = true;
                    }
                }
            });
        }

        // Observar mudanças na classe "show" do outter-icons-container
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            if (mutation.target.classList.contains('outter-icons-container')) {
                shouldUpdateHeight = true;
            }
        }
    });

    if (shouldApply) {
        setTimeout(aplicarEstilosMenu, 500);
    }

    if (shouldUpdateHeight) {
        setTimeout(atualizarAlturaMenu, 100);
    }
});

// Observar com configuração otimizada para Wix
observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true, // Mudei para true para observar mudanças de classe
    attributeOldValue: false,
    characterData: false,
    characterDataOldValue: false
});

// Específico para Wix: escutar mudanças de rota
if (window.wixLocation) {
    window.wixLocation.onChange(() => {
        setTimeout(aplicarEstilosMenu, 1000);
    });
}

// Fallback: executar periodicamente nos primeiros 10 segundos
let tentativas = 0;
const intervalId = setInterval(() => {
    aplicarEstilosMenu();
    tentativas++;

    if (tentativas >= 10) {
        clearInterval(intervalId);
    }
}, 1000);