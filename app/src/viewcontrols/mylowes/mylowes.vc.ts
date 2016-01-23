import {register, controls} from 'platypus';
import BaseViewControl from '../base/base.vc';
import CustomerSvc from '../../services/customer/customer.svc';

export default class MyLowesViewControl extends BaseViewControl {
    templateString: string = require('./mylowes.vc.html');

    context = {
        email: '',
        password: '',
        save: false,
        processing: false,
        user: <models.ICustomer>null
    };

    email: controls.INamedElement<HTMLInputElement, void>;
    password: controls.INamedElement<HTMLInputElement, void>;

    constructor(protected svc: CustomerSvc) {
        super();
    }

    initialize() {
        // try and get customer
    }

    login() {
        let context = this.context;
        if (context.processing) {
            return;
        }

        this.clear();
        let isEmpty = this.utils.isEmpty,
            error = false,
            email = context.email,
            password = context.password;

        if (isEmpty(email)) {
            error = true;
            this.dom.addClass(this.email.element, 'invalid');
        }

        if (isEmpty(password)) {
            error = true;
            this.dom.addClass(this.password.element, 'invalid');
        }

        if (error) {
            return;
        }

        context.processing = true;

        this.svc.login(email, password).then((user) => {
            console.log(user);
        }).catch((error) => {
            console.log(error);
        });
    }

    clear() {
        let dom = this.dom;
        dom.removeClass(this.email.element, 'invalid');
        dom.removeClass(this.password.element, 'invalid');
    }
}

register.viewControl('mylowes-vc', MyLowesViewControl, [
    CustomerSvc
]);
