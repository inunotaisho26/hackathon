import {async, register} from 'platypus';
import BaseService from '../base/base.svc';

export default class ListService extends BaseService {
    api = '/user/list';

    lists(): async.IThenable<models.IList> {
        return this.get();
    }

    items(listId: number): async.IThenable<models.IListItems> {
        return this.get('listitems?folderId=' + listId);
    }
}

register.injectable('list-svc', ListService);
