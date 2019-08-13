class ColorModalComponent extends HTMLElement
{

    private _backdrop : HTMLElement;

    constructor()
    {
        super();
        this._backdrop = this.querySelector('color-modal-backdrop');
    }

    private handleBackdropClick:EventListener = this.closeModal.bind(this);
    private handleKeypress:EventListener = this.manageKeys.bind(this);

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
    }

    disconnectedCallback()
    {
        document.body.removeEventListener('keyup', this.handleKeypress);
        this._backdrop.removeEventListener('click', this.handleBackdropClick);
    }
}

customElements.define('color-modal-component', ColorModalComponent);
window.stylesheets.push('color-modal-component');