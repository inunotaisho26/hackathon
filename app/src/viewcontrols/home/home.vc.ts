import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';

export default class HomeViewControl extends BaseViewControl {
    templateString: string = require('./home.vc.html');
    context = {};

    protected title: string = 'Home';
    protected description: string = 'Home page description';
    protected images: Array<string> = [];
}

register.viewControl('home-vc', HomeViewControl);
