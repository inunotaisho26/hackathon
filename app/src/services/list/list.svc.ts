import {async, register} from 'platypus';
import BaseService from '../base/base.svc';

export default class ListService extends BaseService {
    protected cart: Array<models.IListItem> = [];

    constructor() {
        super('user/list');
    }

    lists(): async.IThenable<Array<models.IList>> {
        return this.get();
    }

    items(listId: number): async.IThenable<models.IListItems> {
        return this.get('listitems', {
            folderId: listId
        });
    }

    create(name: string, note: string): async.IThenable<any> {
        return this.post({
            blank: ''
        }, this.toQuery({
            name,
            'node.text': note
        }));
    }

    list(name: string): async.IThenable<models.IList> {
        return this.lists().then((lists) => {
            let list: models.IList;

            lists.some((l) => {
                if (l.name === name) {
                    list = l;
                }

                return l.name === name;
            });

            return list;
        });
    }

    addItem(list: number, data: IAddItem): async.IThenable<any> {
        return this.post(data, list + '/product');
    }

    deleteItem(entityId: number): async.IThenable<any> {
        return this.delete(undefined, '/entity?entityId=' + entityId);
    }

    addToCart(product: models.IListItem): void {
        product = JSON.parse(JSON.stringify(product));

        let id = product.productInformation.catalogEntryId;

        let exists = this.utils.some((item) => {
            return item.productInformation.catalogEntryId === id;
        }, this.cart);

        if (!exists) {
            this.cart.push(product);
        }
    }

    removeFromCart(productId: number): void {
        this.cart = this.cart.filter((item) => {
            return item.productInformation.catalogEntryId !== productId;
        });
    }

    getCart(): Array<models.IListItem> {
        return JSON.parse(JSON.stringify(this.cart));
    }

    clear(): void {
        this.cart = [];
    }
}

register.injectable('list-svc', ListService);

interface IAddItem {
    productId: number;
    productName: string;
    note?: string;
    store?: string | number;
    associate?: string;
}
