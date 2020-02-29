import { h, Component } from 'preact';
import './color-button.scss';
import { Color } from '../types';
import { contrast } from '../contrast';

type ColorButtonProps = {
    color: Color;
    index: number;
    callback: Function;
};

type ColorButtonState = {};

export class ColorButton extends Component<ColorButtonProps, ColorButtonState> {
    private handleClick: EventListener = () => {
        this.props.callback(this.props.index);
    };

    render() {
        return (
            <button
                onClick={this.handleClick}
                className="color-button"
                style={{ backgroundColor: this.props.color.hex, color: contrast(this.props.color.hex, '#000000') >= 4.5 ? '#000000' : '#ffffff' }}
            >
                {this.props.color.hex}
            </button>
        );
    }
}
