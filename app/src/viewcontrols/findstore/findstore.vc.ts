import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import StoreSvc from '../../services/store/store.svc';

export default class FindStoreViewControl extends BaseViewControl {
    templateString: string = require('./findstore.vc.html');

    context = {
        stores: <Array<models.IStoreLocation>>null,
        loading: true
    };

    constructor(private stores: StoreSvc) {
        super();
    }

    initialize() {
        // populate stores
    }
}

register.viewControl('findstore-vc', FindStoreViewControl, [
    StoreSvc
]);
