class PalletBreakdownComponent extends HTMLElement
{
    private _tabUnderline : HTMLElement;
    private _tabsContainer : HTMLElement;
    private _tabs : Array<HTMLElement>;

    constructor()
    {
        super();
        this._tabUnderline = this.querySelector('tab-underline');
        this._tabsContainer = this.querySelector('tabs-container');
        this._tabs = Array.from(this.querySelectorAll('pallet-tab'));
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