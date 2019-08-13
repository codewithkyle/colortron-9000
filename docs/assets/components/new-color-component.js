class NewColorComponent extends HTMLElement {
    constructor() {
        super();
        this.handleClick = this.displayColorSelectorModal.bind(this);
        this._modalTemplate = document.body.querySelector('[tag="color-selector-modal"]');
    }
    displayColorSelectorModal() {
        const modal = document.importNode(this._modalTemplate.content, true);
        document.body.appendChild(modal);
    }
    connectedCallback() {
        this.addEventListener('click', this.handleClick);
    }
}
customElements.define('new-color-component', NewColorComponent);
window.stylesheets.push('new-color-component');
