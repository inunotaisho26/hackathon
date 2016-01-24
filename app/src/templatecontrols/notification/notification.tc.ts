import {register, ui, IRemoveListener} from 'platypus';
import BaseViewControl from '../../viewcontrols/base/base.vc';

export default class NotificationTemplateControl extends ui.TemplateControl {
    templateString: string = require('./notification.tc.html');
	hasOwnContext = true;
	control: BaseViewControl;
	context = {
		messages: <Array<string>>[],
		type: '',
		enabled: false
	};

	notificationType: INotificationType = {
		SUCCESS: 'success',
		INFO: 'info',
		FAIL: 'fail'
	};

	removeDismiss: IRemoveListener = () => {};
	showing = false;

	register(control: BaseViewControl) {
		this.control = control;
	}

	show(message: string, type: string, dismiss: number): void;
	show(message: Array<string>, type: string, dismiss: number): void;
	show(message: any, type: string, dismiss = 3000) {
		this.removeDismiss();

		let context = this.context,
			utils = this.utils;

		context.messages = utils.isArray(message) ? message : [message];
		context.type = type;

		this.removeDismiss = utils.requestAnimationFrame(() => {
			let dom = this.dom,
				element = this.element;

			this.showing = true;
			dom.removeClass(element, 'notification-fade');
			dom.addClass(element, 'notification-enabled');
			if (!dismiss) {
				return;
			}

			this.removeDismiss = utils.defer(this.hide.bind(this), dismiss);
		});
	}

    success(message?: string): void;
    success(message?: Array<string>): void;
    success(message: any = 'success'): void {
        this.show(message, this.notificationType.SUCCESS, 3000);
    }

    info(message: string): void;
    info(message: Array<string>): void;
    info(message: any): void {
        this.show(message, this.notificationType.INFO, 4000);
    }

    fail(message: string): void;
    fail(message: Array<string>): void;
    fail(message: any): void {
        this.show(message, this.notificationType.FAIL, 5000);
    }

	hide(immediate?: boolean) {
		this.removeDismiss();

		let dom = this.dom,
			element = this.element;

		if (!this.showing) {
			dom.removeClass(element, 'notification-fade notification-enabled');
			return;
		}

		this.removeDismiss = this.utils.requestAnimationFrame(() => {
			this.showing = false;
			if (immediate === true) {
				dom.removeClass(element, 'notification-fade notification-enabled');
				return;
			}

			dom.addClass(element, 'notification-fade');
			this.removeDismiss = this.utils.defer(() => {
				dom.removeClass(element, 'notification-fade notification-enabled');
			}, 4000);
		});
	}
}

export interface INotification extends ui.TemplateControl {
	register(control: BaseViewControl): void;
    success(message?: string): void;
    success(message?: Array<string>): void;
    info(message: string): void;
    info(message: Array<string>): void;
    fail(message: string): void;
    fail(message: Array<string>): void;
    show(message: string, type: string, dismiss: number): void;
	hide(immediate?: boolean): void;
}

export interface INotificationType {
	SUCCESS: string;
	INFO: string;
	FAIL: string;
}

register.control('notification', NotificationTemplateControl, null, true);
