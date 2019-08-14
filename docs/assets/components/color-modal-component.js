class ColorModalComponent extends HTMLElement {
    constructor() {
        super();
        this.handleBackdropClick = this.closeModal.bind(this);
        this.handleKeypress = this.manageKeys.bind(this);
        this.handleFormSubmit = this.addColor.bind(this);
        this.handleInputFocus = this.focusInput.bind(this);
        this.handleInputBlur = this.blurInput.bind(this);
        this.handleInputKeyup = this.detectColor.bind(this);
        this.handleColorChange = this.changeColor.bind(this);
        this._backdrop = this.querySelector('color-modal-backdrop');
        this._form = this.querySelector('form');
        this._closeButton = this.querySelector('button[type="close"]');
        this._submitButton = this.querySelector('button[type="submit"]');
        this._inputs = Array.from(this.querySelectorAll('input[type="text"]'));
        this._colorInput = this.querySelector('input[type="color"]');
        this._colorPreview = this.querySelector('label');
        this._hexInput = this.querySelector('input[data-type="hex"]');
        this._rgbInput = this.querySelector('input[data-type="rgb"]');
        this._hslInput = this.querySelector('input[data-type="hsl"]');
        this._pallet = document.body.querySelector('color-pallet-component');
        this._blockBeingEdited = null;
        this._initialColor = null;
    }
    setInitialColor(color, block) {
        const hex = color;
        const rgb = convert.hex.rgb(color);
        const hsl = convert.hex.hsl(color);
        this._hexInput.value = hex;
        this._rgbInput.value = `rgb(${rgb})`;
        this._hslInput.value = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
        this._colorInput.value = `${hex}`;
        this._colorPreview.style.backgroundColor = `rgb(${rgb})`;
        this._blockBeingEdited = block;
        this._initialColor = color.replace('#', '');
        this._submitButton.innerText = 'Update';
    }
    addColor(e) {
        e.preventDefault();
        const color = this._colorInput.value.replace('#', '');
        if (this._blockBeingEdited) {
            this._blockBeingEdited.updateColor(color);
            this._pallet.updateColor(color, this._initialColor);
        }
        else {
            this._pallet.createBlock(color);
        }
        this.closeModal();
    }
    closeModal() {
        this._blockBeingEdited = null;
        this.remove();
    }
    manageKeys(e) {
        if (e.key.toLowerCase() === 'escape') {
            this.closeModal();
        }
    }
    focusInput(e) {
        const target = e.currentTarget;
        if (target.value === target.dataset.type) {
            target.value = '';
        }
    }
    blurInput(e) {
        const target = e.currentTarget;
        if (target.value === '') {
            target.value = target.dataset.type;
        }
    }
    changeColor() {
        const hex = this._colorInput.value;
        const rgb = convert.hex.rgb(this._colorInput.value);
        const hsl = convert.hex.hsl(this._colorInput.value);
        this._hexInput.value = hex;
        this._rgbInput.value = `rgb(${rgb})`;
        this._hslInput.value = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
        this._colorPreview.style.backgroundColor = `rgb(${rgb})`;
    }
    detectColor(e) {
        const target = e.currentTarget;
        switch (target.dataset.type) {
            case 'hex':
                this.convertFromHex(target.value);
                break;
            case 'rgb':
                this.convertFromRgb(target.value);
                break;
            case 'hsl':
                this.convertFromHsl(target.value);
                break;
        }
    }
    convertFromHsl(value) {
        const cleanValue = value.replace(/[hsl\(\)\%]/gi, '');
        const hslValue = cleanValue.split(',');
        const difference = 3 - hslValue.length;
        for (let i = 0; i < difference; i++) {
            hslValue.push('0');
        }
        const hex = convert.hsl.hex(hslValue);
        const rgb = convert.hsl.rgb(hslValue);
        const hsl = hslValue;
        this._hexInput.value = `#${hex}`;
        this._rgbInput.value = `rgb(${rgb})`;
        this._colorInput.value = `#${hex}`;
        this._colorPreview.style.backgroundColor = `#${hex}`;
    }
    convertFromRgb(value) {
        const cleanValue = value.replace(/[rgb\(\)]/gi, '');
        const rgbArray = cleanValue.split(',');
        const difference = 3 - rgbArray.length;
        for (let i = 0; i < difference; i++) {
            rgbArray.push('0');
        }
        const hex = convert.rgb.hex(rgbArray);
        const rgb = rgbArray;
        const hsl = convert.hex.hsl(rgbArray);
        this._hexInput.value = `#${hex}`;
        this._hslInput.value = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
        this._colorInput.value = `#${hex}`;
        this._colorPreview.style.backgroundColor = `#${hex}`;
    }
    convertFromHex(value) {
        const hex = value;
        const rgb = convert.hex.rgb(value);
        const hsl = convert.hex.hsl(value);
        this._rgbInput.value = `rgb(${rgb})`;
        this._hslInput.value = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
        this._colorInput.value = `#${convert.rgb.hex(rgb)}`;
        this._colorPreview.style.backgroundColor = `rgb(${rgb})`;
    }
    connectedCallback() {
        this._backdrop.addEventListener('click', this.handleBackdropClick);
        document.body.addEventListener('keyup', this.handleKeypress);
        this._form.addEventListener('submit', this.handleFormSubmit);
        this._closeButton.addEventListener('click', this.handleBackdropClick);
        this._colorInput.addEventListener('change', this.handleColorChange);
        for (let i = 0; i < this._inputs.length; i++) {
            this._inputs[i].addEventListener('focus', this.handleInputFocus);
            this._inputs[i].addEventListener('blur', this.handleInputBlur);
            this._inputs[i].addEventListener('keyup', this.handleInputKeyup);
        }
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
