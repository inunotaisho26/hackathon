import {register, ui, acquire} from 'platypus';
import Helpers from '../../injectables/helpers/helpers';
import Scroller from '../../injectables/scroller/scroller';

export default class BaseViewControl extends ui.ViewControl {
    context: any = {};
    protected title: string = '';
    protected description: string;
    protected images: Array<string> = [];
    protected videos: Array<string> = [];
    protected ogType: string;

    protected head: ui.controls.Head = acquire(ui.controls.Head);
    protected helpers: Helpers = acquire(Helpers);
    protected scroller: Scroller = acquire(Scroller);

    setTemplate(): void {
        this._title(this.title);
        this._description(this.description);
        this._images(this.images);
        this._videos(this.videos);
        this._type(this.ogType);

        this.utils.defer(() => {
            if (!this.utils.isObject(this.parent)) {
                return;
            }

            this.scroller.pageLoadScroll(this.parent.element);
        }, 50);
    }

    loaded(): void {
        this.ready();
    }

    protected ready(): void {
        this.utils.defer(() => {
            (<any>window).prerenderReady = true;
        }, 1000);
    }

    protected _title(title: string): string {
        let t = 'Website Name';

        if (!this.utils.isEmpty(title)) {
            t = `${title} | ${t}`;
        }
        return this.head.title(t);
    }

    protected _description(description: string): string {
        return this.head.description(description);
    }

    protected _author(author: string): string {
        return this.head.author(author);
    }

    protected _images(images: Array<string>): void {
        return this.head.images(images);
    }

    protected _videos(videos: Array<string>): void {
        return this.head.videos(videos);
    }

    protected _type(type: string): string {
        return this.head.fbType(type);
    }
}

register.control('head', ui.controls.Head, null, true);
