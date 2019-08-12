class NewColorComponent extends HTMLElement
{
    constructor()
    {
        super();
        this.getStylesheet();
    }

    private getStylesheet()
    {
        let stylesheet = document.head.querySelector('[component="new-color-component"]');
        if (!stylesheet)
        {
            stylesheet = document.createElement('style');
            stylesheet.setAttribute('component', 'new-color-component');
            document.head.appendChild(stylesheet);
            fetch(`${ window.location.origin }${ window.location.pathname }assets/styles/new-color-component.css`)
            .then(request => request.text())
            .then(response => {
                stylesheet.innerHTML = response;
            })
            .catch(error => {   
                console.error(error);
            });
        }
    }

    connectedCallback()
    {

    }
}

customElements.define('new-color-component', NewColorComponent);