import {async, IRemoveListener, register, Utils} from 'platypus';

/**
 * Provides methods for interacting with geolocation services on a device.
 */
export default class Geolocation {
    protected static _inject: any = {
        Promise: async.IPromise,
        utils: Utils
    };

    protected Promise: async.IPromise;
    protected utils: Utils;

    /**
     * Attempts to acquire position information of the device.
     *
        * @param positionOptions Optional GeolocationPositionOptions for configuring the acquisition.
        * @returns {async.IThenable<GeolocationPosition, GeolocationPositionError>} A promise,
        * resolving when the position is found, and rejecting in the event of a position error.
        */
    getCurrentPosition(positionOptions?: GeolocationPositionOptions)
            : async.IThenable<GeolocationPosition> {
        return new this.Promise<GeolocationPosition>((resolve, reject): void => {
            navigator.geolocation.getCurrentPosition(resolve, reject, positionOptions);
        });
    }

    /**
     * An asynchronous operation for receiving notifications when a device location changes. Cannot return
     * a promise because the callbacks may be called multiple times.
     *
        * @param updateCallback A method that receives GeolocationPosition updates from the geolocation service.
        * @param errorCallback A method that receives GeolocationPositionError updates from the geolocation service.
        * @param positionOptions Optional GeolocationPositionOptions for configuring the acquisition.
        *
        * @returns {IRemoveListener} A method for removing the watch listener when the app wants to stop listening for position updates.
        */
    watchPosition(updateCallback: (position: GeolocationPosition) => void,
        errorCallback?: (error: PositionError) => void,
        positionOptions?: GeolocationPositionOptions): IRemoveListener;
    watchPosition(updateCallback: any, errorCallback?: any, positionOptions?: any): () => void {
        if (!this.utils.isNull(errorCallback) && !this.utils.isFunction(errorCallback)) {
            positionOptions = errorCallback;
            errorCallback = null;
        }

        let timeoutId = navigator.geolocation.watchPosition(updateCallback, errorCallback, positionOptions);

        return (): void => {
            navigator.geolocation.clearWatch(timeoutId);
        };
    }
}

register.injectable('geolocation', Geolocation);
