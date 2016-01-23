import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';

export default class HelpViewControl extends BaseViewControl {
    templateString: string = require('./help.vc.html');

    context: any = {};
}

register.viewControl('help-vc', HelpViewControl);
