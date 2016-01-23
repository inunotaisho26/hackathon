import {async, register} from 'platypus';
import BaseService from '../base/base.svc';

export default class LinkService extends BaseService {
    info(link: string): async.IThenable<any> {
        return this.json({
            method: 'GET',
            url: link
        });
    }
}

register.injectable('link-svc', LinkService);
