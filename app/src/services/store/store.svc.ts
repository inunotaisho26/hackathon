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
            query: storeNumber,
            maxResults: 1
        })).then(this.one);
    }

    byLatLong(lat: string | number, long: string | number, maxResults = 1): async.IThenable<models.IStoreLocation> {
        return this.get(this.toQuery({
            query: lat + ',' + long,
            maxResults
        }));
    }

    byZip(zip: string): async.IThenable<models.ILocation> {
        return this.get(this.toQuery({
            query: zip,
            maxResults: 1
        })).then(this.one);
    }

    near(): async.IThenable<models.IStoreLocation> {
        return this.getLocation().then((coords)=> {
            return this.byLatLong(coords.latitude, coords.longitude, 5);
        });
    }

    me(): async.IThenable<models.ILocation> {
        let store = this.storage.getItem<string>('store');

        if (this.utils.isString(store)) {
            return this.byStoreNumber(store);
        }

        return this.getLocation().then((coords) => {
            return this.byLatLong(coords.latitude, coords.longitude);
        }).then(this.one);
    }

    private getLocation(): async.IThenable<GeolocationPositionCoordinates> {
        return this.location.getCurrentPosition().then((result) => {
            return result.coords;
        });
    }

    private one(locations: models.IStoreLocation): models.ILocation {
        return locations.storeLocation[0];
    }
}

register.injectable('store-svc', StoreService);
