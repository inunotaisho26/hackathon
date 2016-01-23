import {async, register} from 'platypus';
import BaseService from '../base/base.svc';

export default class StoreService extends BaseService {
    protected api = 'store/location';

    location(lat: string, long: string): async.IThenable<models.IStoreLocation> {
        return this.get(this.toQuery({
            query: lat + ',' + long
        }));
    }
}

register.injectable('store-svc', StoreService);
