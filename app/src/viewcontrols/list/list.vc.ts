import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';

export default class ListViewControl extends BaseViewControl {
    templateString: string = require('./list.vc.html');

    context: any = {};
}

register.viewControl('list-vc', ListViewControl);
