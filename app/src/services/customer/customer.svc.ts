import {async, register} from 'platypus';
import BaseService from '../base/base.svc';
import List from '../list/list.svc';
import {LIST_NAME} from '../../references/references';

export default class CustomerService extends BaseService {
    constructor(private list: List) {
        super('customer/login');
    }

    login(id?: string, password?: string): async.IThenable<models.ICustomer> {
        let ssoToken = this.storage.getItem<string>('sso'),
            c = this.storage.getItem<string>('customer');

        this.http.json({
            url: 'https://www.reddit.com/r/all.json',
            method: 'GET'
        }).then((results) => {
            console.log(JSON.stringify(results.response, null, 2));
        },(error) => {
            console.log(JSON.stringify(error, null, 2));
        });

        if (this.utils.isString(ssoToken)) {
            BaseService.ssoToken = ssoToken;
            return this.Promise.resolve(JSON.parse(c));
        }

        return this.post({
            logonId: id,
            logonPassword: password
        }).then((customer: models.ICustomer) => {
            BaseService.ssoToken = customer.SSOToken;

            this.storage.setItem('sso', customer.SSOToken);
            this.storage.setItem('store', customer.x_serviceStoreNumber);
            this.storage.setItem('customer', JSON.stringify(customer));

            return this.list.create(LIST_NAME, 'Let your garden grow with Lowes').then(() => {
                return customer;
            });
        });
    }

    logout(): async.IThenable<void> {
        this.storage.removeItem('sso');
        this.storage.removeItem('store');
        this.storage.removeItem('customer');

        return this.Promise.resolve();
    }
}

register.injectable('customer-svc', CustomerService, [
    List
]);
