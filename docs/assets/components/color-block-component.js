class ColorBlockComponent extends HTMLElement {
    constructor() {
        super();
        this.handleDeleteClick = this.removeColor.bind(this);
        this.handleEditClick = this.editColor.bind(this);
        this.handleColorClick = this.activateColor.bind(this);
        this.getStylesheet();
        this._deleteButton = this.querySelector('.js-delete-button');
        this._editButton = this.querySelector('.js-edit-button');
        this._colorButton = this.querySelector('.js-color-button');
    }
    getStylesheet() {
        let stylesheet = document.head.querySelector('[component="color-block-component"]');
        if (!stylesheet) {
            stylesheet = document.createElement('style');
            stylesheet.setAttribute('component', 'color-block-component');
            document.head.appendChild(stylesheet);
            fetch(`${window.location.origin}${window.location.pathname}assets/styles/color-block-component.css`)
                .then(request => request.text())
                .then(response => {
                stylesheet.innerHTML = response;
            })
                .catch(error => {
                console.error(error);
            });
        }
    }
    removeColor() {
        this.remove();
    }
    editColor() {
    }
    activateColor() {
    }
    connectedCallback() {
        this._deleteButton.addEventListener('click', this.handleDeleteClick);
        this._editButton.addEventListener('click', this.handleEditClick);
        this._colorButton.addEventListener('click', this.handleColorClick);
    }
    disconnectedCallback() {
        this._deleteButton.removeEventListener('click', this.handleDeleteClick);
        this._editButton.removeEventListener('click', this.handleEditClick);
        this._colorButton.removeEventListener('click', this.handleColorClick);
    }
}
customElements.define('color-block-component', ColorBlockComponent);
