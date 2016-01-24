import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import List from '../../services/list/list.svc';
import {LIST_NAME} from '../../references/references';

export default class ListViewControl extends BaseViewControl {
    templateString: string = require('./list.vc.html');

    context = {
        products: <Array<models.IListItem>>null
    };

    constructor(private lists: List) {
        super();
    }

    initialize(): void {
        this.lists.list(LIST_NAME).then((list) => {
            return this.lists.items(list.id);
        }).then((items) => {
            this.context.products = items.list;
            console.log(items.list);
        });
    }
}

register.viewControl('list-vc', ListViewControl, [
    List
]);
