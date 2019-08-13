class ColorModalComponent extends HTMLElement {
    constructor() {
        super();
        this.handleBackdropClick = this.closeModal.bind(this);
        this.handleKeypress = this.manageKeys.bind(this);
        this.getStylesheet();
        this._backdrop = this.querySelector('color-modal-backdrop');
    }
    getStylesheet() {
        let stylesheet = document.head.querySelector('[component="color-modal-component"]');
        if (!stylesheet) {
            stylesheet = document.createElement('style');
            stylesheet.setAttribute('component', 'color-modal-component');
            document.head.appendChild(stylesheet);
            fetch(`${window.location.origin}${window.location.pathname}assets/styles/color-modal-component.css`)
                .then(request => request.text())
                .then(response => {
                stylesheet.innerHTML = response;
            })
                .catch(error => {
                console.error(error);
            });
        }
    }
    closeModal() {
        this.remove();
    }
    manageKeys(e) {
        console.log(e);
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
