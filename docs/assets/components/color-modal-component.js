class ColorModalComponent extends HTMLElement {
    constructor() {
        super();
        this.handleBackdropClick = this.closeModal.bind(this);
        this.handleKeypress = this.manageKeys.bind(this);
        this._backdrop = this.querySelector('color-modal-backdrop');
    }
    closeModal() {
        this.remove();
    }
    manageKeys(e) {
        if (e.key.toLowerCase() === 'escape') {
            this.remove();
        }
    }
    connectedCallback() {
        this._backdrop.addEventListener('click', this.handleBackdropClick);
        document.body.addEventListener('keyup', this.handleKeypress);
    }
    disconnectedCallback() {
        document.body.removeEventListener('keyup', this.handleKeypress);
        this._backdrop.removeEventListener('click', this.handleBackdropClick);
    }
}
customElements.define('color-modal-component', ColorModalComponent);
window.stylesheets.push('color-modal-component');
