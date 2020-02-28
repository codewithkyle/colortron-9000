import { h, Component } from 'preact';
import './lightswitch.scss';

type LightswitchProps = {
    label: string;
    name: string;
    checked?: boolean;
    disabled?: boolean;
    help?: string;
    error?: string;
    callback: Function;
};
type LightswitchState = {};

export class Lightswitch extends Component<LightswitchProps, LightswitchState> {
    private handleChange: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLInputElement;
        this.props.callback(target.checked);
    };
    render() {
        return (
            // @ts-ignore
            <div className={`lightswitch`} disabled={this.props?.disabled}>
                <input type="checkbox" name={this.props.name} id={this.props.name} disabled={this.props?.disabled} checked={this.props.checked} onChange={this.handleChange} />
                <label htmlFor={this.props.name}>
                    <div className="lightswitch-icon" aria-hidden={true}>
                        <i></i>
                    </div>
                    <span>{this.props.label}</span>
                </label>
                <span>{this.props.error}</span>
            </div>
        );
    }
}
