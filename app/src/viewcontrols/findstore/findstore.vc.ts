import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';

export default class FindStoreViewControl extends BaseViewControl {
    templateString: string = require('./findstore.vc.html');

    context: any = {};
}

register.viewControl('findstore-vc', FindStoreViewControl);
