import { h, Component } from 'preact';

type HelpModalProps = {
    closeCallback: Function;
};

type HelpModalState = {};

export class HelpModal extends Component<HelpModalProps, HelpModalState> {
    private closeModal: EventListener = () => {
        this.props.closeCallback();
    };

    render() {
        return (
            <div className="popup-modal" id="help">
                <div className="modal-backdrop" onClick={this.closeModal}></div>
                <div className="modal">
                    <button className="close" onClick={this.closeModal}>
                        <svg viewBox="0 0 61.8 61.8">
                            <path style="fill:currentColor;" d="M61.8,6.2L55.6,0L30.9,24.7L6.2,0L0,6.2l24.7,24.7L0,55.6l6.2,6.2l24.7-24.7l24.7,24.7l6.2-6.2L37.1,30.9L61.8,6.2z" />
                        </svg>
                    </button>
                    <h2>Application Guide</h2>
                    <p>Add colors to the color palette by clicking the Add Color button. Enter a custom colors HEX value or browse the available preset color options.</p>
                    <p>A color can be clicked to view the automagically generated shades. The HEX, RGB, and HSL values can be quickly copied when clicked.</p>
                    <p>Click the Export button to get access to the shades as CSS or SCSS variables.</p>
                    <h2>Attribution</h2>
                    <p>
                        The preset colors are based upon the <a href="https://github.com/tailwindcss/tailwindcss/blob/master/LICENSE">tailwindcss</a> presets. Complimentary color
                        generator created by users from Stack Overflow (<a href="https://stackoverflow.com/a/58364746">source</a>).
                    </p>
                </div>
            </div>
        );
    }
}
