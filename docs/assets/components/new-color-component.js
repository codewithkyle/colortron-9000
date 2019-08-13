class NewColorComponent extends HTMLElement {
    constructor() {
        super();
        this.handleClick = this.displayColorSelectorModal.bind(this);
        this.getStylesheet();
        this._modalTemplate = document.body.querySelector('[tag="color-selector-modal"]');
    }
    getStylesheet() {
        let stylesheet = document.head.querySelector('[component="new-color-component"]');
        if (!stylesheet) {
            stylesheet = document.createElement('style');
            stylesheet.setAttribute('component', 'new-color-component');
            document.head.appendChild(stylesheet);
            fetch(`${window.location.origin}${window.location.pathname}assets/styles/new-color-component.css`)
                .then(request => request.text())
                .then(response => {
                stylesheet.innerHTML = response;
            })
                .catch(error => {
                console.error(error);
            });
        }
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
