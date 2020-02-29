class ColorPalletComponent extends HTMLElement
{

    private _colorBlockTemplate : HTMLTemplateElement;
    private _colorPallet : Array<string>;

    constructor()
    {
        super();
        this._colorBlockTemplate = document.body.querySelector('template[tag="color-block-component"]');
        this._colorPallet = [];
    }

    private generateInitialColorBlockComponents(colors:Array<string>) : void
    {
        this._colorPallet = colors;
        for (let i = 0; i < colors.length; i++)
        {
            const newColorComponent = document.importNode(this._colorBlockTemplate.content, true);
            const preview:HTMLElement = newColorComponent.querySelector('custom-color-preview');
            preview.style.backgroundColor = `#${ colors[i] }`;
            this.appendChild(newColorComponent);
        }
    }

    private updateUrl() : void
    {
        let newUrl = `${ window.location.origin }${ window.location.pathname }`;

        if (this._colorPallet.length)
        {
            newUrl += '?';
        }

        for (let i = 0; i < this._colorPallet.length; i++)
        {
            newUrl += `color=${ this._colorPallet[i] }`;

            if (i != this._colorPallet.length - 1)
            {
                newUrl += '&';
            }
        }

        window.history.replaceState({}, document.title, newUrl);
    }

    public createBlock(color:string) : void
    {
        this._colorPallet.push(color);
        const newColorComponent = document.importNode(this._colorBlockTemplate.content, true);
        const preview:HTMLElement = newColorComponent.querySelector('custom-color-preview');
        preview.style.backgroundColor = `#${ color }`;
        this.appendChild(newColorComponent);
        this.updateUrl();
    }

    public removeColor(color:string) : void
    {
        for (let i = 0; i < this._colorPallet.length; i++)
        {
            if (this._colorPallet[i].toLowerCase() === color.toLowerCase())
            {
                this._colorPallet.splice(i, 1);
                break;
            }
        }
        this.updateUrl();
    }

    public updateColor(newColor:string, oldColor:string) : void
    {
        for (let i = 0; i < this._colorPallet.length; i++)
        {
            if (this._colorPallet[i].toLowerCase() === oldColor.toLowerCase())
            {
                this._colorPallet[i] = newColor.toLowerCase();
                break;
            }
        }
        this.updateUrl();
    }

    connectedCallback()
    {
        if (window.location.search)
        {
            let query = window.location.href;
            query = query.replace(`${ window.location.origin }${ window.location.pathname }?`, '');
            const params = query.split('&');
            const colors:Array<string> = [];

            for (let i = 0; i < params.length; i++)
            {
                if (params[i].match(/color\=/gi))
                {
                    const newColor = params[i].replace('color=', '').toLowerCase();
                    let isNewColor = true;
                    for (let k = 0; k < colors.length; k++)
                    {
                        if (colors[k] === newColor)
                        {
                            isNewColor = false;
                            break;
                        }
                    }

                    if (isNewColor)
                    {
                        colors.push(newColor);
                    }
                }
            }

            if (colors.length)
            {
                this.generateInitialColorBlockComponents(colors);
            }
        }
    }
}

customElements.define('color-pallet-component', ColorPalletComponent);