const icons = [
    { label: "Revestimentos" },
    { label: "Materiais brutos" },
    { label: "Pintura" },
    { label: "Ferramentas" },
    { label: "Hidraulica" },
    { label: "Iluminacao e eletrica" },
    { label: "Casa e jardim" },
    { label: "Linha insdutrial" }
]

function createIconElements(icons) {
    let html = ``;
    if (icons && icons.length > 0) {
        html += `<div class="icons-container">`;
        icons.forEach(icon => {
            html += `
                <div class="icon-item">
                    <label>${icon.label}</label>
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

function populateContainer() {
    const container = document.querySelector('.container');
    const iconsHtml = createIconElements(icons);
    container.innerHTML = iconsHtml;
    addButtonToContainer();    
}

document.addEventListener('DOMContentLoaded', populateContainer);