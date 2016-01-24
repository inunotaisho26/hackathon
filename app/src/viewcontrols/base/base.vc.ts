import {register, ui, acquire} from 'platypus';
import Helpers from '../../injectables/helpers/helpers';
import Scroller from '../../injectables/scroller/scroller';
import {INotification} from '../../templatecontrols/notification/notification.tc';

export default class BaseViewControl extends ui.ViewControl {
    context: any = {};
    protected helpers: Helpers = acquire(Helpers);
    protected scroller: Scroller = acquire(Scroller);
    protected notification: INotification = acquire('notification');

    setTemplate(): void {
        this.utils.defer(() => {
            if (!this.utils.isObject(this.parent)) {
                return;
            }

            this.scroller.pageLoadScroll(this.parent.element);
        }, 50);
    }
}
