class ColorBlockComponent extends HTMLElement {
    constructor() {
        super();
        this.handleDeleteClick = this.removeColor.bind(this);
        this.handleEditClick = this.editColor.bind(this);
        this.handleColorClick = this.activateColor.bind(this);
        this._deleteButton = this.querySelector('.js-delete-button');
        this._editButton = this.querySelector('.js-edit-button');
        this._colorButton = this.querySelector('.js-color-button');
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
window.stylesheets.push('color-block-component');
