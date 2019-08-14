class ColorBlockComponent extends HTMLElement {
    constructor() {
        super();
        this.handleDeleteClick = this.removeColor.bind(this);
        this.handleEditClick = this.editColor.bind(this);
        this.handleColorClick = this.activateColor.bind(this);
        this._deleteButton = this.querySelector('.js-delete-button');
        this._editButton = this.querySelector('.js-edit-button');
        this._colorButton = this.querySelector('.js-color-button');
        this._color = '#000000';
        this._modalTemplate = document.body.querySelector('[tag="color-selector-modal"]');
        this._pallet = document.body.querySelector('color-pallet-component');
    }
    removeColor() {
        this._pallet.removeColor(this._color.replace('#', ''));
        this.remove();
    }
    editColor() {
        const modal = document.importNode(this._modalTemplate.content, true);
        document.body.appendChild(modal);
        const modalComponent = document.body.querySelector('color-modal-component');
        modalComponent.setInitialColor(this._color, this);
    }
    updateColor(color) {
        const colorPreview = this.querySelector('custom-color-preview');
        colorPreview.style.backgroundColor = `#${color}`;
        this._color = `#${color}`;
        colorPreview.dataset.color = this._color;
    }
    activateColor() {
    }
    connectedCallback() {
        this._deleteButton.addEventListener('click', this.handleDeleteClick);
        this._editButton.addEventListener('click', this.handleEditClick);
        this._colorButton.addEventListener('click', this.handleColorClick);
        const colorPreview = this.querySelector('custom-color-preview');
        const cleanValue = colorPreview.style.backgroundColor.replace(/[rgb\(\)\s]/gi, '');
        const rgbValue = cleanValue.split(',');
        this._color = `#${convert.rgb.hex(rgbValue)}`;
        colorPreview.dataset.color = this._color;
    }
    disconnectedCallback() {
        this._deleteButton.removeEventListener('click', this.handleDeleteClick);
        this._editButton.removeEventListener('click', this.handleEditClick);
        this._colorButton.removeEventListener('click', this.handleColorClick);
    }
}
customElements.define('color-block-component', ColorBlockComponent);
window.stylesheets.push('color-block-component');
