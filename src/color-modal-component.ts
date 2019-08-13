class ColorModalComponent extends HTMLElement
{

    private _backdrop : HTMLElement;
    private _form : HTMLFormElement;
    private _closeButton : HTMLButtonElement;

    constructor()
    {
        super();
        this._backdrop = this.querySelector('color-modal-backdrop');
        this._form = this.querySelector('form');
        this._closeButton = this.querySelector('button[type="close"]');
    }

    private handleBackdropClick:EventListener = this.closeModal.bind(this);
    private handleKeypress:EventListener = this.manageKeys.bind(this);
    private handleFormSubmit:EventListener = this.addColor.bind(this);

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

    connectedCallback()
    {
        this._backdrop.addEventListener('click', this.handleBackdropClick);
        document.body.addEventListener('keyup', this.handleKeypress);
        this._form.addEventListener('submit', this.handleFormSubmit);
        this._closeButton.addEventListener('click', this.handleBackdropClick);
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