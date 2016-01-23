import {App, events, register, routing, web} from 'platypus';
// add front end API
// import {repositories} from '../injectables/api/api';
import HomeViewControl from '../viewcontrols/home/home.vc';

export default class MyApp extends App {
    constructor(
        router: routing.Router,
        config: web.IBrowserConfig
	    // repository: repositories.BaseRepository
    ) {
        super();

        router.configure([
            { pattern: '', view: HomeViewControl }
        ]);

        config.routingType = config.STATE;

		// repository.initialize({
		// 	companyId: COMPANY_ID,
		// 	host: 'https://services.platypi.io/api/v1/'
		// });
    }

    error(ev: events.ErrorEvent<Error>): void {
        // console.log(ev.error);
    }
}

register.app('app', MyApp, [
    routing.Router,
    web.IBrowserConfig
	// repositories.BaseRepository
]);
