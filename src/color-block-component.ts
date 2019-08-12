class ColorBlockComponent extends HTMLElement
{
    constructor()
    {
        super();
        this.getStylesheet();
    }

    private getStylesheet()
    {
        let stylesheet = document.head.querySelector('[component="color-block-component"]');
        if (!stylesheet)
        {
            stylesheet = document.createElement('style');
            stylesheet.setAttribute('component', 'color-block-component');
            document.head.appendChild(stylesheet);
            fetch(`${ window.location.origin }${ window.location.pathname }assets/styles/color-block-component.css`)
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

customElements.define('color-block-component', ColorBlockComponent);