interface Color
{
    h : number;
    s : number;
    l : number;
}

class PalletBreakdownComponent extends HTMLElement
{
    private _tabUnderline : HTMLElement;
    private _tabsContainer : HTMLElement;
    private _tabs : Array<HTMLElement>;

    private _colorBreakdownTemplate : HTMLTemplateElement;
    private _colorValueTemplate : HTMLTemplateElement;
    private _breakdownGrid : HTMLElement;

    private _colors : Array<Color>;

    constructor()
    {
        super();
        this._tabUnderline = this.querySelector('tab-underline');
        this._tabsContainer = this.querySelector('tabs-container');
        this._tabs = Array.from(this.querySelectorAll('pallet-tab'));
        
        this._colorBreakdownTemplate = document.body.querySelector('template[tag="color-breakdown-component"]');
        this._colorValueTemplate = document.body.querySelector('template[tag="color-value-component"]');
        this._breakdownGrid = this.querySelector('pallet-breakdown-grid');

        this._colors = [];
    }

    private handleTabClick:EventListener = this.switchTab.bind(this);

    private switchTab(e:Event) : void
    {
        const target = e.currentTarget as HTMLElement;
        const newTabIndex = parseInt(target.dataset.index);

        this.updateTabs(newTabIndex);
        this.updateColorBreakdown(newTabIndex);
    }

    private updateTabs(newTabIndex:number) : void
    {
        this._tabUnderline.style.transform = `translateX(${ newTabIndex * 90 }px)`;
        for (let i = 0; i < this._tabs.length; i++)
        {
            if (i !== newTabIndex)
            {
                this._tabs[i].classList.remove('is-active');
            }
            else
            {
                this._tabs[i].classList.add('is-active');
            }
        }
    }

    private updateColorBreakdown(index:number) : void
    {
        let i = 1;
        this._colors.forEach((color)=>{
            const breakdownComponent:HTMLElement = this.querySelector(`color-breakdown-component[data-index="${ i }"]`);
            const hexDisplay:HTMLElement = breakdownComponent.querySelector('color-value-component[color="hex"]');
            const rgbDisplay:HTMLElement = breakdownComponent.querySelector('color-value-component[color="rgb"]');
            const hslDisplay:HTMLElement = breakdownComponent.querySelector('color-value-component[color="hsl"]');

            switch (index)
            {
                case 0:
                    hexDisplay.innerHTML = `#${ convert.hsl.hex(color.h, color.s, color.l) }`;
                    rgbDisplay.innerHTML = `rgb(${ convert.hsl.rgb(color.h, color.s, color.l) })`;
                    hslDisplay.innerHTML = `hsl(${ color.h }, ${ color.s }%, ${ color.l }%)`;
                    break;
                case 1:
                    hexDisplay.innerHTML = `$color-${ i }: #${ convert.hsl.hex(color.h, color.s, color.l) };`;
                    rgbDisplay.innerHTML = `$color-${ i }: rgb(${ convert.hsl.rgb(color.h, color.s, color.l) });`;
                    hslDisplay.innerHTML = `$color-${ i }: hsl(${ color.h }, ${ color.s }%, ${ color.l }%);`;
                    break;
                case 2:
                    hexDisplay.innerHTML = `--color-${ i }: #${ convert.hsl.hex(color.h, color.s, color.l) };`;
                    rgbDisplay.innerHTML = `--color-${ i }: rgb(${ convert.hsl.rgb(color.h, color.s, color.l) });`;
                    hslDisplay.innerHTML = `--color-${ i }: hsl(${ color.h }, ${ color.s }%, ${ color.l }%);`;
                    break;
            }

            this._breakdownGrid.appendChild(breakdownComponent);
            
            i++;
        });
    }

    private generateHslArray(hex:string) : Array<Color>
    {
        const baseHsl = convert.hex.hsl(hex);
        const colorArray = [
            {
                h: baseHsl[0],
                s: baseHsl[1],
                l: 95
            },
            {
                h: baseHsl[0],
                s: baseHsl[1],
                l: 84
            },
            {
                h: baseHsl[0],
                s: baseHsl[1],
                l: 73
            },
            {
                h: baseHsl[0],
                s: baseHsl[1],
                l: 62
            },
            {
                h: baseHsl[0],
                s: baseHsl[1],
                l: 54
            },
            {
                h: baseHsl[0],
                s: baseHsl[1],
                l: 46
            },
            {
                h: baseHsl[0],
                s: baseHsl[1],
                l: 43
            },
            {
                h: baseHsl[0],
                s: baseHsl[1],
                l: 38
            },
            {
                h: baseHsl[0],
                s: baseHsl[1],
                l: 34
            },
            {
                h: baseHsl[0],
                s: baseHsl[1],
                l: 26
            },
        ];

        let indexToReplace = null;
        let diffToBeat = 100;
        for(let i = 0; i < colorArray.length; i++){
            const diff = Math.abs(baseHsl[2] - colorArray[i].l);

            if(diff < diffToBeat){
                diffToBeat = diff;
                indexToReplace = i;
            }
        }

        colorArray[indexToReplace] = {
            h: baseHsl[0],
            s: baseHsl[1],
            l: baseHsl[2]
        }

        return colorArray;
    }

    public generateColorBreakdown(initial:string) : void
    {
        const baseHex = initial.replace('#', '').toLowerCase();
        this._colors = this.generateHslArray(baseHex);
        
        this._breakdownGrid.innerHTML = '';
        let i = 1;
        this._colors.forEach((color)=>{
            const newBreakdownComponent = document.importNode(this._colorBreakdownTemplate.content, true);

            const colorPreview:HTMLElement = newBreakdownComponent.querySelector('color-preview');
            colorPreview.style.backgroundColor = `#${ convert.hsl.hex(color.h, color.s, color.l) }`;
            colorPreview.parentElement.dataset.index = i.toString();

            const colorBreakdownContainer = newBreakdownComponent.querySelector('color-breakdown');
            
            const hexDisplay = document.importNode(this._colorValueTemplate.content, true);
            colorBreakdownContainer.appendChild(hexDisplay);
            const hexEl = colorBreakdownContainer.querySelector('color-value-component:not([color])');
            hexEl.setAttribute('color', 'hex');

            const rgbDisplay = document.importNode(this._colorValueTemplate.content, true);
            colorBreakdownContainer.appendChild(rgbDisplay);
            const rgbEl = colorBreakdownContainer.querySelector('color-value-component:not([color])');
            rgbEl.setAttribute('color', 'rgb');

            const hslDisplay = document.importNode(this._colorValueTemplate.content, true);
            colorBreakdownContainer.appendChild(hslDisplay);
            const hslEl = colorBreakdownContainer.querySelector('color-value-component:not([color])');
            hslEl.setAttribute('color', 'hsl');
        

            hexEl.innerHTML = `#${ convert.hsl.hex(color.h, color.s, color.l) }`;
            rgbEl.innerHTML = `rgb(${ convert.hsl.rgb(color.h, color.s, color.l) })`;
            hslEl.innerHTML = `hsl(${ color.h }, ${ color.s }%, ${ color.l }%)`;

            this._breakdownGrid.appendChild(newBreakdownComponent);
            i++;
        });
    }

    connectedCallback()
    {
        this.updateTabs(0);

        for (let i = 0; i < this._tabs.length; i++)
        {
            this._tabs[i].addEventListener('click', this.handleTabClick);
        }
    }
}

customElements.define('pallet-breakdown-component', PalletBreakdownComponent);
window.stylesheets.push('pallet-breakdown-component');