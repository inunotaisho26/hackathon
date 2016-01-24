import {async, register} from 'platypus';
import BaseService from '../base/base.svc';
import Link from '../link/link.svc';

export default class ProductService extends BaseService {
    protected cart: Array<models.IProduct> = [];

    constructor(private links: Link) {
        super('product');
    }

    byKeyword(data: IProductByKeyword): async.IThenable<models.IProductList> {
        return this.get('keyword' + this.toQuery(data));
    }

    byId(data: IProductById): async.IThenable<Array<models.IProduct>> {
        return this.get('productId' + this.toQuery(data)).then((list: models.IProductList) => {
            return this.utils.mapAsync((product) => {
                return this.Promise.all([
                    this.links.specification(product.links),
                    this.links.requiredItems(product.links)
                ]).then((links: Array<any>) => {
                    product.specification = links[0];
                    product.requiredItems = links[1];
                    return product;
                });
            }, list.productList);
        });
    }

    addToCart(product: models.IProduct): void {
        product = JSON.parse(JSON.stringify(product));

        let exists = this.utils.some((item) => {
            return item.productId === product.productId;
        }, this.cart);

        if (!exists) {
            this.cart.push(product);
        }
    }

    removeFromCart(productId: number): void {
        this.cart = this.cart.filter((item) => {
            return item.productId !== productId;
        });
    }

    getCart(): Array<models.IProduct> {
        return JSON.parse(JSON.stringify(this.cart));
    }

    clear(): void {
        this.cart = [];
    }
}

register.injectable('product-svc', ProductService, [
    Link
]);

interface IProductBy {
    storeNumber?: number;
    maxResults?: number;
    offset?: number;
    priceFlag?: string;
}

interface IProductByKeyword extends IProductBy {
    keyword: string;
}

interface IProductById extends IProductBy {
    productId: number;
}
