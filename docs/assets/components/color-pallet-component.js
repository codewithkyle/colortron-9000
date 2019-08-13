class ColorPalletComponent extends HTMLElement {
    constructor() {
        super();
        this._colorBlockTemplate = document.body.querySelector('template[tag="color-block-component"]');
    }
    generateInitialColorBlockComponents(colors) {
        this._colorPallet = colors;
        for (let i = 0; i < colors.length; i++) {
            const newColorComponent = document.importNode(this._colorBlockTemplate.content, true);
            const preview = newColorComponent.querySelector('custom-color-preview');
            preview.style.backgroundColor = `#${colors[i]}`;
            this.appendChild(newColorComponent);
        }
    }
    connectedCallback() {
        if (window.location.search) {
            let query = window.location.href;
            query = query.replace(`${window.location.origin}${window.location.pathname}?`, '');
            const params = query.split('&');
            const colors = [];
            for (let i = 0; i < params.length; i++) {
                if (params[i].match(/colors\[\]\=/gi)) {
                    const newColor = params[i].replace('colors[]=', '').toLowerCase();
                    let isNewColor = true;
                    for (let k = 0; k < colors.length; k++) {
                        if (colors[k] === newColor) {
                            isNewColor = false;
                            break;
                        }
                    }
                    if (isNewColor) {
                        colors.push(newColor);
                    }
                }
            }
            if (colors.length) {
                this.generateInitialColorBlockComponents(colors);
            }
        }
    }
}
customElements.define('color-pallet-component', ColorPalletComponent);
