class ColorModalComponent extends HTMLElement
{

    private _backdrop : HTMLElement;
    private _form : HTMLFormElement;
    private _closeButton : HTMLButtonElement;
    
    private _inputs : Array<HTMLInputElement>;
    private _hexInput : HTMLInputElement;
    private _rgbInput : HTMLInputElement;
    private _hslInput : HTMLInputElement;
    private _colorInput : HTMLInputElement;
    private _colorPreview : HTMLElement;

    private _pallet : ColorPalletComponent;

    constructor()
    {
        super();
        this._backdrop = this.querySelector('color-modal-backdrop');
        this._form = this.querySelector('form');
        this._closeButton = this.querySelector('button[type="close"]');
        this._inputs = Array.from(this.querySelectorAll('input[type="text"]'));
        this._colorInput = this.querySelector('input[type="color"]');
        this._colorPreview = this.querySelector('label');

        this._hexInput = this.querySelector('input[data-type="hex"]');
        this._rgbInput = this.querySelector('input[data-type="rgb"]');
        this._hslInput = this.querySelector('input[data-type="hsl"]');

        this._pallet = document.body.querySelector('color-pallet-component');
    }

    private handleBackdropClick:EventListener = this.closeModal.bind(this);
    private handleKeypress:EventListener = this.manageKeys.bind(this);
    private handleFormSubmit:EventListener = this.addColor.bind(this);
    private handleInputFocus:EventListener = this.focusInput.bind(this);
    private handleInputBlur:EventListener = this.blurInput.bind(this);
    private handleInputKeyup:EventListener = this.detectColor.bind(this);
    private handleColorChange:EventListener = this.changeColor.bind(this);

    private addColor(e:Event) : void
    {
        e.preventDefault();
        const color = this._colorInput.value.replace('#', '');
        this._pallet.createBlock(color);
        this.remove();
    }

    private closeModal() : void
    {
        this.remove();
    }

    private manageKeys(e:KeyboardEvent) : void
    {
        if (e.key.toLowerCase() === 'escape')
        {
            this.remove();
        }
    }

    private focusInput(e:Event) : void
    {
        const target = e.currentTarget as HTMLInputElement;

        if (target.value === target.dataset.type)
        {
            target.value = '';
        }
    }

    private blurInput(e:Event) : void
    {
        const target = e.currentTarget as HTMLInputElement;

        if (target.value === '')
        {
            target.value = target.dataset.type;
        }
    }

    private changeColor() : void
    {
        const hex = this._colorInput.value;
        const rgb = convert.hex.rgb(this._colorInput.value);
        const hsl = convert.hex.hsl(this._colorInput.value);

        this._hexInput.value = hex;
        this._rgbInput.value = `rgb(${ rgb })`;
        this._hslInput.value = `hsl(${ hsl[0] }, ${ hsl[1] }%, ${ hsl[2] }%)`;
        
        this._colorPreview.style.backgroundColor = `rgb(${ rgb })`;
    }

    private detectColor(e:Event) : void
    {
        const target = e.currentTarget as HTMLInputElement;

        switch (target.dataset.type)
        {
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

    private convertFromHsl(value:string) : void
    {
        const cleanValue = value.replace(/[hsl\(\)\%]/gi, '');
        const hslValue = cleanValue.split(',');

        const difference = 3 - hslValue.length;
        for (let i = 0; i < difference; i++)
        {
            hslValue.push('0');
        }
        
        const hex = convert.hsl.hex(hslValue);
        const rgb = convert.hsl.rgb(hslValue);
        const hsl = hslValue;

        this._hexInput.value = `#${ hex }`;
        this._rgbInput.value = `rgb(${ rgb })`;        
        this._colorInput.value = `#${ hex }`;
        this._colorPreview.style.backgroundColor = `#${ hex }`;
    }

    private convertFromRgb(value:string) : void
    {
        const cleanValue = value.replace(/[rgb\(\)]/gi, '');
        const rgbArray = cleanValue.split(',');

        const difference = 3 - rgbArray.length;
        for (let i = 0; i < difference; i++)
        {
            rgbArray.push('0');
        }
        
        const hex = convert.rgb.hex(rgbArray);
        const rgb = rgbArray;
        const hsl = convert.hex.hsl(rgbArray);

        this._hexInput.value = `#${ hex }`;
        this._hslInput.value = `hsl(${ hsl[0] }, ${ hsl[1] }%, ${ hsl[2] }%)`;
        this._colorInput.value = `#${ hex }`;
        this._colorPreview.style.backgroundColor = `#${ hex }`;
    }

    private convertFromHex(value:string) : void
    {
        const hex = value;
        const rgb = convert.hex.rgb(value);
        const hsl = convert.hex.hsl(value);

        this._rgbInput.value = `rgb(${ rgb })`;
        this._hslInput.value = `hsl(${ hsl[0] }, ${ hsl[1] }%, ${ hsl[2] }%)`;
        this._colorInput.value = `#${ convert.rgb.hex(rgb) }`;
        this._colorPreview.style.backgroundColor = `rgb(${ rgb })`;
    }

    connectedCallback()
    {
        this._backdrop.addEventListener('click', this.handleBackdropClick);
        document.body.addEventListener('keyup', this.handleKeypress);
        this._form.addEventListener('submit', this.handleFormSubmit);
        this._closeButton.addEventListener('click', this.handleBackdropClick);
        this._colorInput.addEventListener('change', this.handleColorChange);
        for (let i = 0; i < this._inputs.length; i++)
        {
            this._inputs[i].addEventListener('focus', this.handleInputFocus);
            this._inputs[i].addEventListener('blur', this.handleInputBlur);
            this._inputs[i].addEventListener('keyup', this.handleInputKeyup);
        }
    }

    disconnectedCallback()
    {
        document.body.removeEventListener('keyup', this.handleKeypress);
        this._backdrop.removeEventListener('click', this.handleBackdropClick);
        this._form.removeEventListener('submit', this.handleFormSubmit);
        this._closeButton.removeEventListener('click', this.handleBackdropClick);
    }
}

customElements.define('color-modal-component', ColorModalComponent);
window.stylesheets.push('color-modal-component');