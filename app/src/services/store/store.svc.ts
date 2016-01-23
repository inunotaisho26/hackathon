import {async, register} from 'platypus';
import Geolocation from '../../injectables/geolocation/geolocation';
import BaseService from '../base/base.svc';

export default class StoreService extends BaseService {
    protected static _inject: any = {
        location: Geolocation
    };

    protected location: Geolocation;

    constructor() {
        super('store/location');
    }

    byStoreNumber(storeNumber: string): async.IThenable<models.ILocation> {
        return this.get(this.toQuery({
            query: storeNumber
        })).then(this.one);
    }

    byLatLong(lat: string | number, long: string | number): async.IThenable<models.ILocation> {
        return this.get(this.toQuery({
            query: lat + ',' + long
        })).then(this.one);
    }

    byZip(zip: string): async.IThenable<models.ILocation> {
        return this.get(this.toQuery({
            query: zip
        })).then(this.one);
    }

    me(): async.IThenable<models.ILocation> {
        let store = this.storage.getItem<string>('store');

        if (this.utils.isString(store)) {
            return this.byStoreNumber(store);
        }

        return this.location.getCurrentPosition().then((result) => {
            let coords = result.coords;
            return this.byLatLong(coords.latitude, coords.longitude);
        });
    }

    private one(locations: models.IStoreLocation): models.ILocation {
        return locations.storeLocation[0];
    }
}

register.injectable('store-svc', StoreService);
