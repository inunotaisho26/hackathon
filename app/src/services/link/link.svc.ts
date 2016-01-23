import {async, register} from 'platypus';
import BaseService from '../base/base.svc';
import Data from '../../injectables/data/data';

export default class LinkService extends BaseService {
    constructor(private data: any) {
        super('links');
    }

    specification(links: Array<models.ILink>): async.IThenable<models.ISpecification> {
        return this.info(this.getLink('specifications', links));
    }

    requiredItems(links: Array<models.ILink>): async.IThenable<models.IProductList> {
        return this.info(this.getLink('requiredItems', links));
    }

    protected info(link: string): async.IThenable<any> {
        let value = this.data[link];

        if(!this.utils.isObject(value)) {
            return this.Promise.resolve({});
        }

        return this.Promise.resolve(JSON.parse(JSON.stringify(value)));

        // return this.http.json({
        //     url: link
        // }).then(this.handleResponse, this.handleError);
    }

    private getLink(rel: string, links: Array<models.ILink>): string {
        let href = '';

        links.some((link) => {
            if (link.rel === rel) {
                href = link.href;
                return true;
            }
        });

        return href;
    }
}

register.injectable('link-svc', LinkService, [
    Data
]);
