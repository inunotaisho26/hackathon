import {register, ui} from 'platypus';
import Home from '../../viewcontrols/home/home.vc';

export default class NavbarTemplateControl extends ui.TemplateControl {
    replaceWith = 'nav';
    templateString: string = require('./navbar.tc.html');
    hasOwnContext = true;

    context = {
        Home: Home
    };
}

register.control('navbar', NavbarTemplateControl);
