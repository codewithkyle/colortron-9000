class ColorModalComponent extends HTMLElement
{

    private _backdrop : HTMLElement;
    private _form : HTMLFormElement;
    private _closeButton : HTMLButtonElement;
    private _inputs : Array<HTMLInputElement>;

    constructor()
    {
        super();
        this._backdrop = this.querySelector('color-modal-backdrop');
        this._form = this.querySelector('form');
        this._closeButton = this.querySelector('button[type="close"]');
        this._inputs = Array.from(this.querySelectorAll('input[type="text"]'));
    }

    private handleBackdropClick:EventListener = this.closeModal.bind(this);
    private handleKeypress:EventListener = this.manageKeys.bind(this);
    private handleFormSubmit:EventListener = this.addColor.bind(this);
    private handleInputFocus:EventListener = this.focusInput.bind(this);
    private handleInputBlur:EventListener = this.blurInput.bind(this);

    private addColor(e:Event) : void
    {
        e.preventDefault();
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

    connectedCallback()
    {
        this._backdrop.addEventListener('click', this.handleBackdropClick);
        document.body.addEventListener('keyup', this.handleKeypress);
        this._form.addEventListener('submit', this.handleFormSubmit);
        this._closeButton.addEventListener('click', this.handleBackdropClick);

        for (let i = 0; i < this._inputs.length; i++)
        {
            this._inputs[i].addEventListener('focus', this.handleInputFocus);
            this._inputs[i].addEventListener('blur', this.handleInputBlur);
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