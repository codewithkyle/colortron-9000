class CoolorsImportComponent extends HTMLElement
{
    private _closeButton : HTMLButtonElement;
    private _importButton : HTMLButtonElement;
    private _backdrop : HTMLElement;
    private _input : HTMLInputElement;
    private _colorPaletteComponent : ColorPalletComponent;

    constructor()
    {
        super();
        this._closeButton = this.querySelector('button[type="close"]');
        this._importButton = this.querySelector('button[type="submit"]');
        this._backdrop = this.querySelector('coolors-modal-backdrop');
        this._input = this.querySelector('input');
        this._colorPaletteComponent = document.body.querySelector('color-pallet-component');
    }
    
    private handleCloseClickEvent:EventListener = this.closeModal.bind(this);
    private handleBackgroundClickEvent:EventListener = this.closeModal.bind(this);
    private handleImportClickEvent:EventListener = this.importPalette.bind(this);
    private handleKeypress:EventListener = this.manageKeys.bind(this);
    private handleInputFocusEvent:EventListener = this.focusInput.bind(this);
    private handleInputBlurEvent:EventListener = this.blurInput.bind(this);

    private focusInput() : void
    {
        if (this._input.value === 'URL')
        {
            this._input.value = '';
        }
    }

    private blurInput() : void
    {
        if (this._input.value.trim() === '')
        {
            this._input.value = 'URL';
        }
    }

    private manageKeys(e:KeyboardEvent) : void
    {
        if (e.key.toLowerCase() === 'escape')
        {
            this.closeModal();
        }
    }

    private closeModal() : void
    {
        this.remove();
    }

    private importPalette() : void
    {
        let cleanUrl = this._input.value.replace(/.*\//, '').trim();
        const hexValues = cleanUrl.split(/\-/g);
        
        for (let i = 0; i < hexValues.length; i++)
        {
            this._colorPaletteComponent.createBlock(hexValues[i]);
        }

        this.closeModal();
    }

    connectedCallback()
    {
        document.body.addEventListener('keyup', this.handleKeypress);
        this._closeButton.addEventListener('click', this.handleCloseClickEvent);
        this._importButton.addEventListener('click', this.handleImportClickEvent);
        this._backdrop.addEventListener('click', this.handleBackgroundClickEvent);
        
        this._input.addEventListener('focus', this.handleInputFocusEvent);
        this._input.addEventListener('blur', this.handleInputBlurEvent);
    }

    disconnectedCallback()
    {
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
