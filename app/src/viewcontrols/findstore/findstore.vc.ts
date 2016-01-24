import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import StoreSvc from '../../services/store/store.svc';

export default class FindStoreViewControl extends BaseViewControl {
    templateString: string = require('./findstore.vc.html');

    context = {
        stores: <Array<models.ILocation>>null,
        loading: true
    };

    constructor(private stores: StoreSvc) {
        super();
    }

    initialize() {
        // populate stores
        let context = this.context;
        this.stores.near().then((stores) => {
            if (!this.utils.isArray(stores.storeLocation)) {
                stores.storeLocation = [];
            }

            context.stores = stores.storeLocation;
        }).catch((error) => {
            this.notification.fail('Error retrieving stores');
        }).then(() => {
            context.loading = false;
        });
    }
}

register.viewControl('findstore-vc', FindStoreViewControl, [
    StoreSvc
]);
