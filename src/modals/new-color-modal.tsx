import { h, Component } from 'preact';
import './new-color-modal.scss';
import type { Color } from '../types';

type NewColorModalProps = {
    addColorCallback: Function;
    closeCallback:Function;
};

type NewColorModalState = {
    tab: 'custom'|'preset';
}

export class NewColorModal extends Component<NewColorModalProps, NewColorModalState> {
    private presets: Array<Color>;
    constructor(){
        super();
        this.state = {
            tab: 'custom'
        }
        this.presets = [
            {
                hex: '4299E1',
                shades: ['EBF8FF', 'BEE3F8', '90CDF4', '63B3ED', '4299E1', '3182CE', '2B6CB0', '2C5282', '2A4365'],
            },
            {
                hex: '9E9E9E',
                shades: ['F5F5F5', 'EEEEEE', 'E0E0E0', 'BDBDBD', '9E9E9E', '757575', '616161', '424242', '212121'],
            },
            {
                hex: 'A0AEC0',
                shades: ['F7FAFC', 'EDF2F7', 'E2E8F0', 'CBD5E0', 'A0AEC0', '718096', '4A5568', '2D3748', '1A202C'],
            },
            {
                hex: 'F56565',
                shades: ['FFF5F5', 'FED7D7', 'FEB2B2', 'FC8181', 'F56565', 'E53E3E', 'C53030', '9B2C2C', '742A2A'],
            },
            {
                hex: 'ED8936',
                shades: ['FFFAF0', 'FEEBC8', 'FBD38D', 'F6AD55', 'ED8936', 'DD6B20', 'C05621', '9C4221', '7B341E'],
            },
            {
                hex: 'ECC94B',
                shades: ['FFFFF0', 'FEFCBF', 'FAF089', 'F6E05E', 'ECC94B', 'D69E2E', 'B7791F', '975A16', '744210'],
            },
            {
                hex: '48BB78',
                shades: ['F0FFF4', 'C6F6D5', '9AE6B4', '68D391', '48BB78', '38A169', '2F855A', '276749', '22543D'],
            },
            {
                hex: '38B2AC',
                shades: ['E6FFFA', 'B2F5EA', '81E6D9', '4FD1C5', '38B2AC', '319795', '2C7A7B', '285E61', '234E52'],
            },
            {
                hex: '4299E1',
                shades: ['EBF8FF', 'BEE3F8', '90CDF4', '63B3ED', '4299E1', '3182CE', '2B6CB0', '2C5282', '2A4365'],
            },
            {
                hex: '667EEA',
                shades: ['EBF4FF', 'C3DAFE', 'A3BFFA', '7F9CF5', '667EEA', '5A67D8', '4C51BF', '434190', '3C366B'],
            },
            {
                hex: '9F7AEA',
                shades: ['FAF5FF', 'E9D8FD', 'D6BCFA', 'B794F4', '9F7AEA', '805AD5', '6B46C1', '553C9A', '44337A'],
            },
            {
                hex: 'ED64A6',
                shades: ['FFF5F7', 'FED7E2', 'FBB6CE', 'F687B3', 'ED64A6', 'D53F8C', 'B83280', '97266D', '702459'],
            },
        ];
    }

    private switchTab:EventListener = (e:Event) => {
        // @ts-ignore
        this.setState({tab: e.currentTarget.dataset.tab});
    }

    private closeModal:EventListener = () => {
        this.props.closeCallback();
    }

    render() {
        return (
            <div className="popup-modal" id="new-color">
                <div className="modal-backdrop" onClick={this.closeModal}></div>
                <div className="modal">
                    <button className="close" onClick={this.closeModal}>
                        <svg viewBox="0 0 61.8 61.8"><path style="fill:currentColor;" d="M61.8,6.2L55.6,0L30.9,24.7L6.2,0L0,6.2l24.7,24.7L0,55.6l6.2,6.2l24.7-24.7l24.7,24.7l6.2-6.2L37.1,30.9L61.8,6.2z"/></svg>
                    </button>
                    <h2>New Color</h2>
                    <p>Add a color or select from a variety of presets.</p>
                    <div className="tabs-wrapper">
                        <button onClick={this.switchTab} data-tab="custom" className={this.state.tab === 'custom' ? 'is-open' : ''}>Custom</button>
                        <button onClick={this.switchTab} data-tab="preset" className={this.state.tab === 'preset' ? 'is-open' : ''}>Presets</button>
                    </div>
                    <div className="view-wrapper"></div>
                    <button type="default" kind="solid">Add Color</button>
                </div>
            </div>
        );
    }
}
