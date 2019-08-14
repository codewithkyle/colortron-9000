class NewColorComponent extends HTMLElement
{
    private _modalTemplate : HTMLTemplateElement;

    constructor()
    {
        super();
        this._modalTemplate = document.body.querySelector('[tag="color-selector-modal"]');
    }

    private handleClick:EventListener = this.displayColorSelectorModal.bind(this);

    private displayColorSelectorModal() : void
    {
        const modal = document.importNode(this._modalTemplate.content, true);
        document.body.appendChild(modal);
    }

    connectedCallback()
    {
        this.addEventListener('click', this.handleClick);
    }
}

customElements.define('new-color-component', NewColorComponent);
window.stylesheets.push('new-color-component');