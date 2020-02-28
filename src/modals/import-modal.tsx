import { h, Component, createRef } from 'preact';
import './export-modal.scss';

type ImportModalProps = {
    closeCallback: Function;
    importCallback: Function;
};

type ImportModalState = {};

export class ImportModal extends Component<ImportModalProps, ImportModalState> {
    private input = createRef();

    private closeModal: EventListener = () => {
        this.props.closeCallback();
    };

    private submit: EventListener = () => {
        this.props.importCallback(this.input.current.value);
    };

    render() {
        return (
            <div className="popup-modal" id="import">
                <div className="modal-backdrop" onClick={this.closeModal}></div>
                <div className="modal">
                    <button className="close" onClick={this.closeModal}>
                        <svg viewBox="0 0 61.8 61.8">
                            <path style="fill:currentColor;" d="M61.8,6.2L55.6,0L30.9,24.7L6.2,0L0,6.2l24.7,24.7L0,55.6l6.2,6.2l24.7-24.7l24.7,24.7l6.2-6.2L37.1,30.9L61.8,6.2z" />
                        </svg>
                    </button>
                    <h2>Import Colors</h2>
                    <p>Import an existing color palette via permalinks.</p>
                    <div className="input-wrapper">
                        <label htmlFor="permalink">Permalink</label>
                        <input type="text" id="permalink" ref={this.input} />
                    </div>
                    <button type="default" kind="solid" onClick={this.submit}>
                        import
                    </button>
                </div>
            </div>
        );
    }
}
