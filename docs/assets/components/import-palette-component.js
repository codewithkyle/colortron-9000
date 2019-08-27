class ImportPaletteComponent extends HTMLElement {
    constructor() {
        super();
        this.handleClickEvent = this.openModal.bind(this);
        this._modalTemplate = document.body.querySelector('template[tag="coolors-import-component"]');
    }
    openModal() {
        const modal = document.importNode(this._modalTemplate.content, true);
        document.body.appendChild(modal);
    }
    connectedCallback() {
        this.addEventListener('click', this.handleClickEvent);
    }
}
customElements.define('import-palette-component', ImportPaletteComponent);
window.stylesheets.push('import-palette-component');
