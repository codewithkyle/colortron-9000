class CoolorsImportComponent extends HTMLElement {
    constructor() {
        super();
        this.handleCloseClickEvent = this.closeModal.bind(this);
        this.handleBackgroundClickEvent = this.closeModal.bind(this);
        this.handleImportClickEvent = this.importPalette.bind(this);
        this.handleKeypress = this.manageKeys.bind(this);
        this.handleInputFocusEvent = this.focusInput.bind(this);
        this.handleInputBlurEvent = this.blurInput.bind(this);
        this._closeButton = this.querySelector('button[type="close"]');
        this._importButton = this.querySelector('button[type="submit"]');
        this._backdrop = this.querySelector('coolors-modal-backdrop');
        this._input = this.querySelector('input');
        this._colorPaletteComponent = document.body.querySelector('color-pallet-component');
    }
    focusInput() {
        if (this._input.value === 'URL') {
            this._input.value = '';
        }
    }
    blurInput() {
        if (this._input.value.trim() === '') {
            this._input.value = 'URL';
        }
    }
    manageKeys(e) {
        if (e.key.toLowerCase() === 'escape') {
            this.closeModal();
        }
    }
    closeModal() {
        this.remove();
    }
    importPalette() {
        let cleanUrl = this._input.value.replace(/.*\//, '').trim();
        const hexValues = cleanUrl.split(/\-/g);
        for (let i = 0; i < hexValues.length; i++) {
            this._colorPaletteComponent.createBlock(hexValues[i]);
        }
        this.closeModal();
    }
    connectedCallback() {
        document.body.addEventListener('keyup', this.handleKeypress);
        this._closeButton.addEventListener('click', this.handleCloseClickEvent);
        this._importButton.addEventListener('click', this.handleImportClickEvent);
        this._backdrop.addEventListener('click', this.handleBackgroundClickEvent);
        this._input.addEventListener('focus', this.handleInputFocusEvent);
        this._input.addEventListener('blur', this.handleInputBlurEvent);
    }
    disconnectedCallback() {
        document.body.removeEventListener('keyup', this.handleKeypress);
        this._closeButton.removeEventListener('click', this.handleCloseClickEvent);
        this._importButton.removeEventListener('click', this.handleImportClickEvent);
        this._backdrop.removeEventListener('click', this.handleBackgroundClickEvent);
        this._input.removeEventListener('focus', this.handleInputFocusEvent);
        this._input.removeEventListener('blur', this.handleInputBlurEvent);
    }
}
customElements.define('coolors-import-component', CoolorsImportComponent);
window.stylesheets.push('coolors-import-component');
