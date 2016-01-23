import {async, debug, storage, Utils} from 'platypus';
import {OAUTH_HEADER, OAUTH_PREFIX, SSO_HEADER} from '../../references/references';

export default class BaseService {
    protected static _inject: any = {
        http: async.Http,
        log: debug.Log,
        Promise: async.IPromise,
        storage: storage.LocalStorage,
        utils: Utils
    };
    protected static accessToken = 'QWRvYmU6ZW9pdWV3ZjA5ZmV3bw==';
    protected static host = 'https://api.lowes.com';
    protected static ssoToken = '';
    protected static apiKey = 'xfjtt93gs7yxs9rnph96v4c3';

    protected http: async.Http;
    protected log: debug.Log;
    protected Promise: async.IPromise;
    protected storage: storage.LocalStorage;
    protected utils: Utils;
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

    get(path?: string, data?: any): plat.async.IAjaxThenable<any> {
        return this.json({
            method: 'GET',
            url: BaseService.host + this.api + this.pathToString(path) + this.toQuery(data)
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

        if(utils.isString(BaseService.ssoToken)) {
            headers[SSO_HEADER] = BaseService.ssoToken;
        }

        let extend = utils.extend;
        extend(options, {
            headers: extend({}, options.headers, headers),
            timeout: 15000
        });

        let url = options.url;

        if(url.indexOf('?') > -1) {
            url += '&';
        } else {
            url += '?'
        }

        url += 'api_key=' + BaseService.apiKey;

        options.url = url;

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

    protected toQuery(query: any): string {
        let q = '',
            utils = this.utils;

        q += utils.map((value: string, key: string): string => {
            return key + '=' + value;
        }, query).join('&');

        if(!utils.isEmpty(q)) {
            q = '?' + q;
        }

        return q;
    }
}
