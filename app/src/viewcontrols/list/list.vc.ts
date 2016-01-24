import {register, ui} from 'platypus';
import BaseViewControl from '../base/base.vc';
import Product from '../product/product.vc';
import Customer from '../../services/customer/customer.svc';
import List from '../../services/list/list.svc';
import {LIST_NAME} from '../../references/references';

export default class ListViewControl extends BaseViewControl {
    templateString: string = require('./list.vc.html');

    context = {
        products: <Array<models.IListItem>>[],
        listName: LIST_NAME,
        loading: true,
        noItems: false
    };

    constructor(private customers: Customer, private lists: List) {
        super();
    }

    initialize(): void {
        this.customers.login().then(() => {
            return this.lists.list(LIST_NAME).then((list) => {
                return this.lists.items(list.id);
            }).then((items) => {
                if (!this.utils.isArray(items.list)) {
                    items.list = [];
                }

                if (items.list.length === 0) {
                    this.context.noItems = true;
                }

                this.context.products = items.list;
            });
        }).catch(this.utils.noop).then(() => {
            this.context.loading = false;
        });
    }

    navigate(id: number) {
        this.navigator.navigate(Product, {
            parameters: { id }
        });
    }

    remove(index: number, ev: ui.IGestureEvent) {
        ev.preventDefault();
        ev.stopPropagation();

        let products = this.context.products,
            item = products[index];

        this.lists.deleteItem(item.entityId).catch(() => {
            this.notification.fail('Error removing item from list');
            products.splice(index, 0, item);
        });

        if (products.length === 1) {
            this.utils.defer(() => { this.context.noItems = true; }, 500);
        }

        products.splice(index, 1);
    }

    addToCart(product: models.IListItem) {
        this.lists.addToCart(product);
        this.notification.success();
    }

    protected imageUrl(id: string) {
        return `https://mobileimages.lowes.com/product/converted/${id.slice(0, 6)}/${id}.jpg`
    }
}

register.viewControl('list-vc', ListViewControl, [
    Customer,
    List
]);
