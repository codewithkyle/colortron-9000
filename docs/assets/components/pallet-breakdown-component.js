class PalletBreakdownComponent extends HTMLElement {
    constructor() {
        super();
        this.handleTabClick = this.switchTab.bind(this);
        this._tabUnderline = this.querySelector('tab-underline');
        this._tabsContainer = this.querySelector('tabs-container');
        this._tabs = Array.from(this.querySelectorAll('pallet-tab'));
    }
    switchTab(e) {
        const target = e.currentTarget;
        const newTabIndex = parseInt(target.dataset.index);
        this.updateTabs(newTabIndex);
    }
    updateTabs(newTabIndex) {
        this._tabUnderline.style.transform = `translateX(${newTabIndex * 90}px)`;
        for (let i = 0; i < this._tabs.length; i++) {
            if (i !== newTabIndex) {
                this._tabs[i].classList.remove('is-active');
            }
            else {
                this._tabs[i].classList.add('is-active');
            }
        }
    }
    connectedCallback() {
        this.updateTabs(0);
        for (let i = 0; i < this._tabs.length; i++) {
            this._tabs[i].addEventListener('click', this.handleTabClick);
        }
    }
}
customElements.define('pallet-breakdown-component', PalletBreakdownComponent);
window.stylesheets.push('pallet-breakdown-component');
