import {async, register} from 'platypus';
import BaseService from '../base/base.svc';

export default class CustomerService extends BaseService {
    constructor() {
        super('customer/login');
    }

    login(id?: string, password?: string): async.IThenable<void> {
        let ssoToken = this.storage.getItem<string>('sso');

        if (this.utils.isString(ssoToken)) {
            BaseService.ssoToken = ssoToken;
            return this.Promise.resolve();
        }

        return this.post({
            logonId: id,
            logonPassword: password
        }).then((customer: models.ICustomer) => {
            BaseService.ssoToken = customer.SSOToken;

            this.storage.setItem('sso', customer.SSOToken);
            this.storage.setItem('store', customer.store);
        });
    }

    logout(): async.IThenable<void> {
        this.storage.removeItem('sso');
        this.storage.removeItem('store');

        return this.Promise.resolve();
    }
}

register.injectable('customer-svc', CustomerService, [
    storage.LocalStorage
]);
