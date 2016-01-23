import * as express from 'express';
import {join} from 'path';
import {isFileExt} from './utils';
import * as logger from 'morgan';
import * as serve from 'serve-static';

const root = join(__dirname, '../');
const port = 3000;

let app = express(),
    platui = '/node_modules/platypusui/dist/fonts',
    fontawesome = '/node_modules/font-awesome/fonts';

app
    .use(logger('dev'))
    .use(serve(join(root, 'app')))
    .use(platui, serve(join(root, platui)))
    .use(fontawesome, serve(join(root, fontawesome)))
    .get('*', (req: express.Request, res: express.Response, next: Function) => {
        if (isFileExt(req.url)) {
            next();
            return;
        }

        res.sendFile(join(root, 'app/index.html'));
    });

app.listen(port, () => {
    console.log(`listening on port ${port}.`);
});

