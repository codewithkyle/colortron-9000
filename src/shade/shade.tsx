import { h, Component } from 'preact';
import './shade.scss';
import * as converter from 'color-convert';

type ShadeProps = {
    shade: string;
};

type ShadeState = {};

export class Shade extends Component<ShadeProps, ShadeState> {
    private copyToClipboard(value: string) {
        navigator.clipboard.writeText(value);
    }
    private handleClick: EventListener = (e: Event) => {
        if ('clipboard' in navigator === false) {
            return;
        }
        const target = e.currentTarget as HTMLElement;
        const value = target.innerHTML;
        this.copyToClipboard(value);
        target.innerHTML = 'Copied to clipboard';
        setTimeout(() => {
            target.innerHTML = value;
        }, 900);
    };
    render() {
        const hsl = converter.hex.hsl(this.props.shade);
        const rgb = converter.hex.rgb(this.props.shade);
        return (
            <div className="shade">
                <div className="shade-display" style={{ backgroundColor: this.props.shade }}></div>
                <div className="shade-values">
                    <button className={'clipboard' in navigator ? 'can-copy' : ''} onClick={this.handleClick}>
                        {this.props.shade}
                    </button>
                    <button className={'clipboard' in navigator ? 'can-copy' : ''} onClick={this.handleClick}>{`hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`}</button>
                    <button className={'clipboard' in navigator ? 'can-copy' : ''} onClick={this.handleClick}>{`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`}</button>
                </div>
            </div>
        );
    }
}
