import * as d3 from 'd3';

export default class Carousel
{
    /**
     * @param {HTML} element 
     * @param {Objet} options
     * @param {Objet} options.slidesToScroll nombre d'éléments à faire défiler
     * @param {Objet} options.slidesVisible nombre visible dans une slide
     * @param {data} data pour faire du d3
     */

    constructor(element, options = {}, data)
    {
        this.element = element;

        /** 
         * on ne met pas this.options = options car si le le slideToScroll ou le
         * slideVisible n'est pas présent, on va avoir des problèmes. C'est pour ça
         * qu'on utilise la méthode assign et qu'on met des valeurs par défaut.
         */
        this.options = Object.assign({},
        {
            slidesToScroll: 1,
            slidesVisible: 1
        }, options)

        /**
         * on sauvegarde les enfants dans une variable, parce que si besoin, ce sera plus
         * d'y accéder dans une méthode.
         */

        this.children = [].slice.call(element.children);
    

        /**
         * pour faire apparaitre à l'écran la qnt de slides qu'on a envie de montrer
         * le this.children.lenght donne le nmbr d'léments qu'on a dans notre slide
         * et on le divise par la quantite de slides qu'on a envie de rendre visible
         */
        let ratio = this.children.length/this.options.slidesVisible;
         
        /**
         * créer un nouvel élément HTML qui contiendra des enfants
         */
        let root = this.create_HTMLElement_WithClass('div', 'carousel');


        /**
         * créer un nouvel élément HTML qui sera dans root
         */
        let container = this.create_HTMLElement_WithClass('div', 'carousel__container');
        

        this.element.appendChild(root);
        
        // mnt on prend ce ratio pour faire un pourcentage
        container.style.width = (ratio*100) + '%';

        root.appendChild(container);

        /**
         * pour faire apparaitre à l'écran la qnt de slides qu'on a envie de montrer
         * le this.children.lenght donne le nmbr d'léments qu'on a dans notre slide
         * et on le divise par la quantite de slides qu'on a envie de rendre visible
         */
        this.children.forEach((child) =>
        {
            let item = this.create_HTMLElement_WithClass('div', 'carousel__item');
            item.style.width = ((100/this.options.slidesVisible)/ratio) + '%'
            item.appendChild(child);
            container.appendChild(item);
        })
    }

    /**
     * @param {string} elementHtml element HTML à créer
     * @param {string} className nom de la classe
     * @returns {HTMLElement}
     */
    create_HTMLElement_WithClass (elementHtml, className)
    {
        let element = document.createElement(elementHtml);
        element.setAttribute('class', className);
        return element;
    }
}

//export default Carousel;