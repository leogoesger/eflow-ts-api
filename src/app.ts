import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as cors from 'cors';

import schema from './graphql/schema';
import * as expressGraphQL from 'express-graphql';

import routes from './routes';

const app = express();
app.use(cors());
app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(routes);

app.use(
  '/api/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

export default app;
