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
    private _breakdownGrid : HTMLElement;

    constructor()
    {
        super();
        this._tabUnderline = this.querySelector('tab-underline');
        this._tabsContainer = this.querySelector('tabs-container');
        this._tabs = Array.from(this.querySelectorAll('pallet-tab'));
        
        this._colorBreakdownTemplate = document.body.querySelector('template[tag="color-breakdown-component"]');
        this._breakdownGrid = this.querySelector('pallet-breakdown-grid');
    }

    private handleTabClick:EventListener = this.switchTab.bind(this);

    private switchTab(e:Event) : void
    {
        const target = e.currentTarget as HTMLElement;
        const newTabIndex = parseInt(target.dataset.index);

        this.updateTabs(newTabIndex);
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
        const colors = this.generateHslArray(baseHex);
        
        this._breakdownGrid.innerHTML = '';
        let i = 1;
        colors.forEach((color)=>{
            const newBreakdownComponent = document.importNode(this._colorBreakdownTemplate.content, true);
            const colorPreview:HTMLElement = newBreakdownComponent.querySelector('color-preview');
            colorPreview.style.backgroundColor = `#${ convert.hsl.hex(color.h, color.s, color.l) }`;
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