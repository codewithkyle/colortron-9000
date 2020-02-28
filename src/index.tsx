import { h, render, Component, Fragment } from 'preact';
import { Color } from './types';

import './variables.scss';
import './base.css';
import './app.scss';
import './buttons.scss';
import './modal.scss';
import './footer.scss';
import './new-color-button.scss';

import { NewColorModal } from './modals/new-color-modal';
import { ColorButton } from './color-button/color-button';
import { Shade } from './shade/shade';
import { ExportModal } from './modals/export-modal';
import { ImportModal } from './modals/import-modal';
import { HelpModal } from './modals/help-modal';

type AppState = {
    colors: Array<Color>;
    view: 'base' | 'new-color' | 'export' | 'import' | 'help';
    activeColorIndex: number;
};

class Application extends Component<{}, AppState> {
    constructor() {
        super();
        this.state = {
            colors: [],
            view: 'base',
            activeColorIndex: null,
        };

        if (location.search.length) {
            const urlParams = this.parseURL(location.href);
            window.history.replaceState(null, document.title, location.origin);
            if (!urlParams) {
                return;
            }
            localStorage.setItem('colors', JSON.stringify(urlParams.colors));
        }

        if (localStorage.getItem('colors')) {
            // @ts-ignore
            this.state.colors = JSON.parse(localStorage.getItem('colors'));
        }
    }

    private parseURL(href: string) {
        const colors: Array<Color> = [];
        const url = new URL(href);
        const colorParams = url.searchParams.getAll('color');
        if (colorParams.length === 0) {
            return null;
        }
        for (let p = 0; p < colorParams.length; p++) {
            if (colorParams[p].length) {
                const vars = colorParams[p].split('-');
                const newColor: Color = {
                    hex: `#${vars[0]}`,
                    shades: [],
                };
                for (let i = 1; i < vars.length; i++) {
                    newColor.shades.push(`#${vars[i]}`);
                }
                colors.push(newColor);
            }
        }
        return {
            colors: colors,
        };
    }

    private addColor(hex: string, shades: Array<string>) {
        const updatedState = { ...this.state };
        updatedState.colors.push({
            hex: hex,
            shades: shades,
        });
        updatedState.view = 'base';
        this.setState(updatedState);
    }

    private openNewColorModal: EventListener = () => {
        this.setState({ view: 'new-color' });
    };

    private closeModal() {
        this.setState({ view: 'base' });
    }

    private reset: EventListener = () => {
        this.setState({
            colors: [],
            view: 'base',
            activeColorIndex: null,
        });
        localStorage.removeItem('colors');
    };

    private export: EventListener = () => {
        this.setState({ view: 'export' });
    };

    private import: EventListener = () => {
        this.setState({ view: 'import' });
    };

    private help: EventListener = () => {
        this.setState({ view: 'help' });
    };

    private switchActiveColor(index: number) {
        this.setState({ activeColorIndex: index });
    }

    private deleteColor: EventListener = () => {
        const updatedState = { ...this.state };
        updatedState.colors.splice(this.state.activeColorIndex, 1);
        if (updatedState.colors.length) {
            updatedState.activeColorIndex = 0;
        } else {
            updatedState.activeColorIndex = null;
        }
        this.setState(updatedState);
    };

    private importColors(href: string) {
        const updatedState = { ...this.state };
        updatedState.view = 'base';
        if (href.length) {
            const urlParams = this.parseURL(href);
            if (urlParams) {
                updatedState.colors = urlParams.colors;
            }
        }
        this.setState(updatedState);
    }

    componentDidUpdate() {
        if (this.state.colors.length) {
            localStorage.setItem('colors', JSON.stringify(this.state.colors));
        }
    }

    private renderColorButton = (color: Color, index: number) => <ColorButton index={index} color={color} callback={this.switchActiveColor.bind(this)} />;

    private renderShade = (shade: string) => <Shade shade={shade} />;

    render() {
        let modal;
        switch (this.state.view) {
            case 'base':
                modal = null;
                break;
            case 'new-color':
                modal = <NewColorModal addColorCallback={this.addColor.bind(this)} closeCallback={this.closeModal.bind(this)} />;
                break;
            case 'export':
                modal = <ExportModal colors={this.state.colors} closeCallback={this.closeModal.bind(this)} />;
                break;
            case 'import':
                modal = <ImportModal closeCallback={this.closeModal.bind(this)} importCallback={this.importColors.bind(this)} />;
                break;
            case 'help':
                modal = <HelpModal closeCallback={this.closeModal.bind(this)} />;
                break;
            default:
                modal = null;
                break;
        }
        let colorButtons = null;
        if (this.state.colors.length) {
            colorButtons = this.state.colors.map((color, index) => this.renderColorButton(color, index));
        }
        let shadingBlock = null;
        if (this.state.colors.length && this.state.activeColorIndex !== null) {
            const shades = this.state.colors[this.state.activeColorIndex].shades.map(shade => this.renderShade(shade));
            shadingBlock = (
                <div className="block bg-white shadow-md px-8 pt-6 pb-8 mb-8 rounded-md">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl text-grey-700">
                            <span>{this.state.colors[this.state.activeColorIndex].hex}</span> Shades
                        </h2>
                        <div>
                            <button type="default" kind="text" className="mr-2" onClick={this.deleteColor}>
                                Delete
                            </button>
                        </div>
                    </div>
                    <div className="shade-breakdown">{shades}</div>
                </div>
            );
        }
        return (
            <Fragment>
                <header className={`flex items-center px-8 py-4 bg-white shadow-md ${this.state.view !== 'base' ? 'is-blurry' : ''}`}>
                    <h1 className="text-grey-700 text-2xl">Coloratron 9000</h1>
                    <div className="flex items-center">
                        <button type="default" kind="text" className="mr-2" onClick={this.help}>
                            Help
                        </button>
                        <button type="default" kind="text" className="mr-2" onClick={this.reset}>
                            Reset
                        </button>
                        <button type="default" kind="text" onClick={this.import}>
                            Import
                        </button>
                        <button type="default" kind="text" onClick={this.export}>
                            Export
                        </button>
                    </div>
                </header>
                <div className={`app-shell ${this.state.view !== 'base' ? 'is-blurry' : ''}`}>
                    <div className="block bg-white shadow-md px-8 pt-6 pb-8 mb-8 rounded-md">
                        <h2 className="text-2xl text-grey-700 mb-4">Colors</h2>
                        <div className="color-buttons-wrapper">
                            {colorButtons}
                            <button className="new-color-button" onClick={this.openNewColorModal}>
                                <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path
                                        fill="currentColor"
                                        d="M304 144h64v64c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-64h64c8.84 0 16-7.16 16-16V96c0-8.84-7.16-16-16-16h-64V16c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v64h-64c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16zm195.59 220.1l-58.54-26.53-161.19 73.06c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.95 337.57 12.41 364.1c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 404.1c16.55-7.5 16.55-32.5 0-40zM12.41 275.9l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L448 299.28V280.7c-15.32 4.38-31.27 7.29-48 7.29-88.01 0-160.72-64.67-173.72-149.04L12.41 235.9c-16.55 7.5-16.55 32.5 0 40z"
                                    ></path>
                                </svg>
                                <span>Add Color</span>
                            </button>
                        </div>
                    </div>
                    {shadingBlock}
                </div>
                <footer className={this.state.view !== 'base' ? 'is-blurry' : ''}>
                    <span>
                        Created with
                        <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                                fill="currentColor"
                                d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
                            ></path>
                        </svg>
                        by
                        <a href="https://kyleandrews.dev/">Kyle Andrews</a>
                        &copy; 2020
                    </span>
                </footer>
                {modal}
            </Fragment>
        );
    }
}
render(<Application />, document.body.querySelector('#mounting-point'));
