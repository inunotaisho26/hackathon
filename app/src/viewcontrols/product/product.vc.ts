import {register, storage} from 'platypus';
import BaseViewControl from '../base/base.vc';
import Product from '../../services/product/product.svc';

export default class ProductViewControl extends BaseViewControl {
    templateString: string = require('./product.vc.html');

    context = {
        product: <models.IProduct>null
    };

    constructor(private products: Product, private storage: storage.LocalStorage) {
        super();
    }

    navigatedTo(parameters: { id: number; }): void {
        this.products.byId({
            productId: parameters.id,
            priceFlag: 'status',
            storeNumber: this.storage.getItem<number>('store')
        }).then((products) => {
            let product = products[0];

            this.context.product = product;
        });
    }
}

register.viewControl('product-vc', ProductViewControl, [
    Product,
    storage.LocalStorage
]);
