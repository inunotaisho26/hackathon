import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import Product from '../../services/product/product.svc';
import Link from '../../services/link/link.svc';

export default class HomeViewControl extends BaseViewControl {
    templateString: string = require('./home.vc.html');
    context = {
        sections: [{
            title: 'Trees and Shrubs',
            description: '',
            products: [{

            }]
        }]
    };

    protected title: string = 'Home';
    protected description: string = 'Home page description';
    protected images: Array<string> = [];

    constructor(private product: Product, private link: Link) {
        super();
    }

    loaded(): void {
        this.product.byId({
            productId: 3625560,
            storeNumber: 689,
            priceFlag: 'status'
        }).then((result) => {
            return this.link.requiredItems(result.productList[0].links[5].href);
        }).then((result) => {
            console.log('success');
            console.log(JSON.stringify(result, null, 2));
        }).catch((e) => {
            console.log('error');
            console.log(JSON.stringify(e, null, 2));
        });
    }
}

register.viewControl('home-vc', HomeViewControl, [
    Product,
    Link
]);
