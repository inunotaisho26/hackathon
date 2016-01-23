import {async, register} from 'platypus';
import BaseService from '../base/base.svc';

export default class LinkService extends BaseService {
    specification(link: string): async.IThenable<models.ISpecification> {
        return this.info(link);
    }

    requiredItems(link: string): async.IThenable<models.IProductList> {
        return this.info(link);
    }

    protected info(link: string): async.IThenable<any> {
        return this.http.json({
            url: link
        }).then(this.handleResponse, this.handleError);
    }
}

register.injectable('link-svc', LinkService);
