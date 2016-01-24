import {register, storage} from 'platypus';
import BaseViewControl from '../base/base.vc';
import Product from '../../services/product/product.svc';

export default class ProductViewControl extends BaseViewControl {
    templateString: string = require('./product.vc.html');

    context = {
        product: <models.IProduct>null,
        loading: true
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
            console.log(products[0]);
            this.context.loading = false;
            this.context.product = products[0];
        }).catch(() => {
            this.notification.fail('Failed to get Product');
        });
    }
}

register.viewControl('product-vc', ProductViewControl, [
    Product,
    storage.LocalStorage
]);
