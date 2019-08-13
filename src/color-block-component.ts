class ColorBlockComponent extends HTMLElement
{
    private _deleteButton : HTMLButtonElement;
    private _editButton : HTMLButtonElement;
    private _colorButton : HTMLElement;

    constructor()
    {
        super();
        this._deleteButton = this.querySelector('.js-delete-button');
        this._editButton = this.querySelector('.js-edit-button');
        this._colorButton = this.querySelector('.js-color-button');
    }

    private handleDeleteClick:EventListener = this.removeColor.bind(this);
    private handleEditClick:EventListener = this.editColor.bind(this);
    private handleColorClick:EventListener = this.activateColor.bind(this);

    private removeColor() : void
    {
        this.remove();
    }

    private editColor() : void
    {

    }

    private activateColor() : void
    {
        
    }

    connectedCallback()
    {
        this._deleteButton.addEventListener('click', this.handleDeleteClick);
        this._editButton.addEventListener('click', this.handleEditClick);
        this._colorButton.addEventListener('click', this.handleColorClick);
    }

    disconnectedCallback()
    {
        this._deleteButton.removeEventListener('click', this.handleDeleteClick);
        this._editButton.removeEventListener('click', this.handleEditClick);
        this._colorButton.removeEventListener('click', this.handleColorClick);
    }
}

customElements.define('color-block-component', ColorBlockComponent);
window.stylesheets.push('color-block-component');