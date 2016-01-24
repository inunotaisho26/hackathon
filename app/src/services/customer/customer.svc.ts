import {async, register} from 'platypus';
import BaseService from '../base/base.svc';

export default class CustomerService extends BaseService {
    constructor() {
        super('customer/login');
    }

    login(id?: string, password?: string): async.IThenable<models.ICustomer> {
        let ssoToken = this.storage.getItem<string>('sso'),
            c = this.storage.getItem<string>('customer');

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

            return customer;
        });
    }

    logout(): async.IThenable<void> {
        this.storage.removeItem('sso');
        this.storage.removeItem('store');
        this.storage.removeItem('customer');

        return this.Promise.resolve();
    }
}

register.injectable('customer-svc', CustomerService);
