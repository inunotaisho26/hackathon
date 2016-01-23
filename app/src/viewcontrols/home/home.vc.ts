import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import Store from '../../services/store/store.svc';

export default class HomeViewControl extends BaseViewControl {
    templateString: string = require('./home.vc.html');
    context = {};

    protected title: string = 'Home';
    protected description: string = 'Home page description';
    protected images: Array<string> = [];

    constructor(private store: Store) {
        super();
    }

    loaded(): void {
        this.store.me().then((result) => {
            console.log(result);
        }).catch((e) => {
            console.log(e);
        });
    }
}

register.viewControl('home-vc', HomeViewControl, [
    Store
]);
