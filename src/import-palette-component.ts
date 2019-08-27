class ImportPaletteComponent extends HTMLElement
{
    private _modalTemplate : HTMLTemplateElement;

    constructor()
    {
        super();
        this._modalTemplate = document.body.querySelector('template[tag="coolors-import-component"]');
    }

    private handleClickEvent:EventListener = this.openModal.bind(this);

    private openModal() : void
    {
        const modal = document.importNode(this._modalTemplate.content, true);
        document.body.appendChild(modal);
    }

    connectedCallback()
    {
        this.addEventListener('click', this.handleClickEvent);
    }
}

customElements.define('import-palette-component', ImportPaletteComponent);
window.stylesheets.push('import-palette-component');
