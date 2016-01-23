import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';

export default class MyLowesViewControl extends BaseViewControl {
    templateString: string = require('./mylowes.vc.html');

    context: any = {};
}

register.viewControl('mylowes-vc', MyLowesViewControl);
