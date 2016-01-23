import {async, register} from 'platypus';
import BaseService from '../base/base.svc';

export default class ListService extends BaseService {
    constructor() {
        super('user/list');
    }

    lists(): async.IThenable<Array<models.IList>> {
        return this.get();
    }

    items(listId: number): async.IThenable<models.IListItems> {
        return this.get('listitems', {
            folderId: listId
        });
    }

    create(name: string, note: string): async.IThenable<any> {
        return this.post({
            name,
            'node.text': note
        });
    }

    list(name: string): async.IThenable<models.IList> {
        return this.lists().then((lists) => {
            let list: models.IList;

            lists.some((l) => {
                if (l.name === name) {
                    list = l;
                }

                return l.name === name;
            });

            return list;
        });
    }

    addItem(list: number, data: IAddItem): async.IThenable<any> {
        return this.post(data, list + '/product');
    }

    deleteItem(entityId: number): async.IThenable<any> {
        return this.delete(undefined, '/entity?entityId=' + entityId);
    }
}

register.injectable('list-svc', ListService);

interface IAddItem {
    productId: number;
    productName: string;
    note?: string;
    store?: string;
    associate?: string;
}
