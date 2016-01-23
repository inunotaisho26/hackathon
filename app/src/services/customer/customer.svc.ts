import {async, register} from 'platypus';
import BaseService from '../base/base.svc';

export default class CustomerService extends BaseService {
    login(id: string, password: string): async.IThenable<models.ICustomer> {
        return this.post({
            logonId: id,
            logonPassword: password
        }).then((customer: models.ICustomer) => {
            BaseService.ssoToken = customer.SSOToken;

            return customer;
        });
    }
}

register.injectable('customer-svc', CustomerService);
