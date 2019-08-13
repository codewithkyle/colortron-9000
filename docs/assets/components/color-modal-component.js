class ColorModalComponent extends HTMLElement {
    constructor() {
        super();
        this.handleBackdropClick = this.closeModal.bind(this);
        this.handleKeypress = this.manageKeys.bind(this);
        this.handleFormSubmit = this.addColor.bind(this);
        this._backdrop = this.querySelector('color-modal-backdrop');
        this._form = this.querySelector('form');
        this._closeButton = this.querySelector('button[type="close"]');
    }
    addColor(e) {
        e.preventDefault();
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
        this._form.addEventListener('submit', this.handleFormSubmit);
        this._closeButton.addEventListener('click', this.handleBackdropClick);
    }
    disconnectedCallback() {
        document.body.removeEventListener('keyup', this.handleKeypress);
        this._backdrop.removeEventListener('click', this.handleBackdropClick);
        this._form.removeEventListener('submit', this.handleFormSubmit);
        this._closeButton.removeEventListener('click', this.handleBackdropClick);
    }
}
customElements.define('color-modal-component', ColorModalComponent);
window.stylesheets.push('color-modal-component');
