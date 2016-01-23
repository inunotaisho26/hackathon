import {async, register} from 'platypus';
import BaseService from '../base/base.svc';

export default class ProductService extends BaseService {
    constructor() {
        super('product');
    }

    byKeyword(data: IProductByKeyword): async.IThenable<models.IProductList> {
        return this.get('keyword' + this.toQuery(data));
    }

    byId(data: IProductById): async.IThenable<models.IProductList> {
        return this.get('productId' + this.toQuery(data));
    }
}

register.injectable('product-svc', ProductService);

interface IProductBy {
    storeNumber?: number;
    maxResults?: number;
    offest?: number;
    priceFlag?: string;
}

interface IProductByKeyword extends IProductBy {
    keyword: string;
}

interface IProductById extends IProductBy {
    productId: number;
}
