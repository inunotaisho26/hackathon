import {async, register} from 'platypus';
import BaseService from '../base/base.svc';
import Link from '../link/link.svc';

export default class ProductService extends BaseService {
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
