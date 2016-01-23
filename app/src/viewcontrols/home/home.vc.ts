import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import MyLowes from '../mylowes/mylowes.vc';
import Product from '../../services/product/product.svc';
import Link from '../../services/link/link.svc';

export default class HomeViewControl extends BaseViewControl {
    templateString: string = require('./home.vc.html');
    context = {
        MyLowes,
        sections: [{
            title: 'Trees and Shrubs',
            description: '',
            products: [{
                name: '3.25-Gallon Varied-Color Camellia',
                description: 'Camellia (Camellia japonica) is a great shrub for a shady area, thanks to the white variegation accenting dark-green foliage. Hardy in zones 8-10, camellia thrives in full to light shade with adequate moisture. Camellia grows at a moderate pace, and can reach 8 to 10 feet. Camellias should be planted in the shade in organic, somewhat acidic, semi-moist but well drained soil. If the soil is not well drained, it can cause the roots to rot'
            }]
        }, {
            title: 'Perennials',
            description: '',
            products: [{
                name: '2.5-Quart Spiderwort',
                description: 'Spiderwort (Tradescantia) are weakly upright to scrambling plants, growing at a moderate pace to a maximum height of around 24 inches. Hardy in zones 4-8, spiderwort enjoy partial sun with adequate moisture. The flowers can be white, pink, or purple, but are most commonly bright blue, with three petals and six yellow anthers.'
            }, {
                name: '2.5-Quart Asparagus Fern',
                description: 'Asparagus Fern (Asparagus densiflorus) is an evergreen perennial plant, closely related to the vegetable asparagus. Asparagus fern cannot tolerate frost, which makes it a superb choice for gardening in the south central region. It does not require much water, making it a good plant to grow under glass. It is fast growing, reaching a maximum height of 24 inches.'
            }]
        }, {
            title: 'Annuals',
            description: '',
            products: [{
                name: '1.25-Quart Caladium',
                description: 'Caladiums (Caladium x hortulanum) grow from tubers and greatly complement other shade-loving plants such as ferns and impatiens. Mix several caladium varieties in a container for a colorful display of pink, red, rose, chartreuse, green, and white. Hardy in Zones 8–10, the tubers can be lifted and stored over winter in colder climates.'
            }]
        }]
    };

    constructor(private product: Product, private link: Link) {
        super();
    }
}

register.viewControl('home-vc', HomeViewControl, [
    Product,
    Link
]);
