import {register, ui, acquire} from 'platypus';
import Helpers from '../../injectables/helpers/helpers';
import Scroller from '../../injectables/scroller/scroller';

export default class BaseViewControl extends ui.ViewControl {
    context: any = {};
    protected helpers: Helpers = acquire(Helpers);
    protected scroller: Scroller = acquire(Scroller);

    setTemplate(): void {
        this.utils.defer(() => {
            if (!this.utils.isObject(this.parent)) {
                return;
            }

            this.scroller.pageLoadScroll(this.parent.element);
        }, 50);
    }
}
