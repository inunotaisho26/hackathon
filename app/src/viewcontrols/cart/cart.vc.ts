import {register, ui} from 'platypus';
import BaseViewControl from '../base/base.vc';
import List from '../../services/list/list.svc';
import Customer from '../../services/customer/customer.svc';

export default class CartViewControl extends BaseViewControl {
    templateString: string = require('./cart.vc.html');

    context = {
        products: <Array<models.IListItem>>[],
        loading: true,
        noItems: false,
        success: false
    };

    constructor(private customers: Customer, private lists: List) {
        super();
    }

    initialize(): void {
        this.customers.login().then(() => {
            let cart = this.lists.getCart();
            if (!this.utils.isArray(cart)) {
                cart = [];
            }

            if (cart.length === 0) {
                this.context.noItems = true;
            }

            this.utils.forEach((item) => {
                item.quantity = 1;
            }, cart);

            this.context.products = cart;
        }).catch(this.utils.noop).then(() => {
            this.context.loading = false;
        });
    }

    remove(index: number, ev: ui.IGestureEvent) {
        let products = this.context.products,
            item = products[index];

        this.lists.removeFromCart(item.productInformation.catalogEntryId);

        if (products.length === 1) {
            this.utils.defer(() => { this.context.noItems = true; }, 500);
        }

        products.splice(index, 1);
    }

    plus(product: models.IListItem) {
        if (product.quantity >= 24) {
            return;
        }

        product.quantity++;
    }

    minus(product: models.IListItem) {
        if (product.quantity <= 1) {
            return;
        }

        product.quantity--;
    }

    clear() {
        this.lists.clear();
        this.context.products.splice(0, this.context.products.length);
        this.utils.defer(() => { this.context.success = true }, 500);
    }

    protected imageUrl(id: string) {
        if (!this.utils.isString(id)) {
            return;
        }

        return `https://mobileimages.lowes.com/product/converted/${id.slice(0, 6)}/${id}.jpg`
    }
}

register.viewControl('cart-vc', CartViewControl, [
    Customer,
    List
]);
