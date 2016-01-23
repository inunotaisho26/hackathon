import {async, register} from 'platypus';
import BaseService from '../base/base.svc';

export default class StoreService extends BaseService {
    protected api = 'store/location';

    byStoreNumber(storeNumber: string): async.IThenable<models.IStoreLocation> {
        return this.get(this.toQuery({
            query: storeNumber
        }));
    }

    byLatLong(lat: string, long: string): async.IThenable<models.IStoreLocation> {
        return this.get(this.toQuery({
            query: lat + ',' + long
        }));
    }

    byZip(zip: string): async.IThenable<models.IStoreLocation> {
        return this.get(this.toQuery({
            query: zip
        }));
    }
}

register.injectable('store-svc', StoreService);
