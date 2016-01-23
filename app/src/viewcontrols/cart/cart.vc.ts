import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';

export default class CartViewControl extends BaseViewControl {
    templateString: string = require('./cart.vc.html');

    context: any = {};
}

register.viewControl('cart-vc', CartViewControl);
