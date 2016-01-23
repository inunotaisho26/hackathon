import {register, ui} from 'platypus';
import Home from '../../viewcontrols/home/home.vc';

export default class NavbarTemplateControl extends ui.TemplateControl {
    replaceWith = 'nav';
    templateString: string = require('./navbar.tc.html');
    hasOwnContext = true;

    context = {
        selected: ''
    };

    lastSelected = '';

    onDrawerOpen() {
        let context = this.context;
        if (context.selected === 'menu') {
            return;
        }

        this.lastSelected = context.selected;
        context.selected = 'menu';
    }

    onDrawerClose() {
        if (this.lastSelected === 'menu') {
            this.lastSelected = this.context.selected = '';
            return;
        }

        this.context.selected = this.lastSelected;
    }

    navigate(selected: string) {
        let context = this.context;

        switch (selected) {
            case 'menu':
                this.lastSelected = context.selected;
                context.selected = selected;
                break;
            case 'home':
                context.selected = selected;
                break;
            case 'lorem':
                context.selected = selected;
                break;
            case 'ipsum':
                context.selected = selected;
                break;
            case 'lowes':
                context.selected = selected;
                break;
        }
    }
}

register.control('navbar', NavbarTemplateControl, null, true);
