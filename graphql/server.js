require('dotenv').config()

const lib 			   = require('../../lib/common');
const express          = require('express');
const { postgraphile } = require('postgraphile');
const FilterPlugin     = require('postgraphile-plugin-connection-filter');
const RateLimit        = require('express-rate-limit');
const helmet           = require('helmet');

const app = express();
app.use(helmet());

// Rendering options for the index page
app.engine('ejs', require('ejs').renderFile);
app.set('views', 'graphql/views');

// Display a page at the subdomain root
app.get('/', (req, res) => res.render('index.ejs'))

// Configure api routes
const graphqlConfig = {
  graphiql: true,
  graphqlRoute: '/v1',
  graphiqlRoute: '/v1/console',
  appendPlugins: [FilterPlugin],
  enableCors: true
}

const limiter = new RateLimit({
  windowMs: 1*60*1000, // 1 minute
  max: 30,             // 30 requests per IP
  delayAfter: 10,      // slow responses after 10 requests
  delayMs: 100         // by 1 second
});

app.use(postgraphile("postgresql://postgres:1likepants@localhost:5432/chain", 'polling', graphqlConfig));
//app.use(postgraphile(process.env.DATABASE_URL, 'public', graphqlConfig))

app.listen(31337);
console.log(`Running a GraphQL API server at localhost:${31337}`)

