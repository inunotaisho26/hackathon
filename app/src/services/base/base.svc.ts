import {async, debug, Utils} from 'platypus';
import {OAUTH_HEADER, OAUTH_PREFIX} from '../../references/references';

export default class BaseService {
    protected static _inject: any = {
        http: async.Http,
        Promise: async.IPromise,
        utils: Utils,
        log: debug.Log
    };
    protected static accessToken = 'QWRvYmU6ZW9pdWV3ZjA5ZmV3bw==';
    protected static host = 'http://api.lowes.com';

    protected http: async.Http;
    protected Promise: async.IPromise;
    protected utils: Utils;
    protected log: debug.Log;
    protected api = '';

    constructor(api: string) {
        if (!this.utils.isString(api) || api.length === 0) {
            return;
        }

        this.api = api + '/';
    }

    post(data: any, path?: string): plat.async.IAjaxThenable<any> {
        return this.json({
            method: 'POST',
            url: BaseService.host + this.api + this.pathToString(path),
            data: data
        });
    }

    get(path?: string): plat.async.IAjaxThenable<any> {
        return this.json({
            method: 'GET',
            url: BaseService.host + this.api + this.pathToString(path)
        });
    }

    put(data: any, path?: string): plat.async.IAjaxThenable<any> {
        return this.json({
            method: 'PUT',
            url: BaseService.host + this.api + this.pathToString(path),
            data: data
        });
    }

    delete(data?: any, path?: string): plat.async.IAjaxThenable<any> {
        return this.json({
            method: 'DELETE',
            url: BaseService.host + this.api + this.pathToString(path),
            data: data
        });
    }

    json(options: async.IHttpConfig): plat.async.IAjaxThenable<any> {
        let utils = this.utils;

        let headers = <any>{};

        if (utils.isString(BaseService.accessToken)) {
            headers[OAUTH_HEADER] = OAUTH_PREFIX + BaseService.accessToken;
        }

        let extend = utils.extend;
        extend(options, {
            headers: extend({}, options.headers, headers),
            timeout: 15000
        });

        return this.http.json(options).then(this.handleResponse, this.handleError.bind(this));
    }

    handleResponse(result: async.IAjaxResponse<any>): any {
        return result.response;
    }

    handleError(error: async.AjaxError): void {
        throw error.response;
    }

    protected pathToString(path: string): string {
        let utils = this.utils;

        if (utils.isNumber(path)) {
            path = path.toString();
        }

        if (!utils.isString(path)) {
            return '';
        } else if (path[0] === '/') {
            return path.slice(1);
        }

        return path;
    }
}
