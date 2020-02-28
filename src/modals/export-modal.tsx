import { h, Component } from 'preact';
import './export-modal.scss';
import { Color } from '../types';

type ExportModalProps = {
    colors: Array<Color>;
    closeCallback: Function;
};

type ExportModalState = {
    tab: 'css' | 'sass' | 'both';
};

export class ExportModal extends Component<ExportModalProps, ExportModalState> {
    constructor() {
        super();
        this.state = {
            tab: 'css',
        };
    }

    private switchTab: EventListener = (e: Event) => {
        // @ts-ignore
        this.setState({ tab: e.currentTarget.dataset.tab });
    };

    private closeModal: EventListener = () => {
        this.props.closeCallback();
    };

    render() {
        let view = null;
        if (this.state.tab === 'css') {
            let vars = '';
            for (let i = 0; i < this.props.colors.length; i++) {
                const color = this.props.colors[i];
                vars += `/* ${color.hex} */\n`;
                for (let k = 0; k < color.shades.length; k++) {
                    vars += `--color-${i + 1}: ${color.shades[k]};\n`;
                }
                if (i !== this.props.colors.length - 1) {
                    vars += '\n';
                }
            }
            view = <textarea>{vars}</textarea>;
        } else if (this.state.tab === 'sass') {
            let vars = '';
            for (let i = 0; i < this.props.colors.length; i++) {
                const color = this.props.colors[i];
                vars += `/* ${color.hex} */\n`;
                for (let k = 0; k < color.shades.length; k++) {
                    vars += `$color-${i + 1}: ${color.shades[k]};\n`;
                }
                if (i !== this.props.colors.length - 1) {
                    vars += '\n';
                }
            }
            view = <textarea>{vars}</textarea>;
        } else {
            let vars = '';
            for (let i = 0; i < this.props.colors.length; i++) {
                const color = this.props.colors[i];
                vars += `/* ${color.hex} */\n`;
                for (let k = 0; k < color.shades.length; k++) {
                    vars += `$color-${i + 1}: ${color.shades[k]};\n`;
                }
                for (let k = 0; k < color.shades.length; k++) {
                    vars += `--color-${i + 1}: $color-${i + 1};\n`;
                }
                if (i !== this.props.colors.length - 1) {
                    vars += '\n';
                }
            }
            view = <textarea>{vars}</textarea>;
        }
        let permalink = `${location.origin}?`;
        for (let i = 0; i < this.props.colors.length; i++) {
            const color = this.props.colors[i];
            permalink += `${i !== 0 ? '&' : ''}color=${color.hex
                .replace('#', '')
                .toUpperCase()
                .trim()}`;
            for (let k = 0; k < color.shades.length; k++) {
                permalink += `-${color.shades[k]
                    .replace('#', '')
                    .toUpperCase()
                    .trim()}`;
            }
        }
        return (
            <div className="popup-modal" id="export">
                <div className="modal-backdrop" onClick={this.closeModal}></div>
                <div className="modal">
                    <button className="close" onClick={this.closeModal}>
                        <svg viewBox="0 0 61.8 61.8">
                            <path style="fill:currentColor;" d="M61.8,6.2L55.6,0L30.9,24.7L6.2,0L0,6.2l24.7,24.7L0,55.6l6.2,6.2l24.7-24.7l24.7,24.7l6.2-6.2L37.1,30.9L61.8,6.2z" />
                        </svg>
                    </button>
                    <h2>Export Colors</h2>
                    <p>Colors are available in the CSS and SCSS variable formats.</p>
                    <div className="input-wrapper">
                        <label htmlFor="permalink">Permalink</label>
                        <input type="text" readOnly value={permalink} id="permalink" />
                    </div>
                    <div className="tabs-wrapper">
                        <button onClick={this.switchTab} data-tab="css" className={this.state.tab === 'css' ? 'is-open' : ''}>
                            CSS
                        </button>
                        <button onClick={this.switchTab} data-tab="sass" className={this.state.tab === 'sass' ? 'is-open' : ''}>
                            SCSS
                        </button>
                        <button onClick={this.switchTab} data-tab="both" className={this.state.tab === 'both' ? 'is-open' : ''}>
                            BOTH
                        </button>
                    </div>
                    <div className="view-wrapper">{view}</div>
                    <button type="default" kind="solid" onClick={null}>
                        check accessability
                    </button>
                </div>
            </div>
        );
    }
}
