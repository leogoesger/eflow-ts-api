# eflow-ts-api

[![CircleCI](https://circleci.com/gh/leogoesger/eflow-ts-api.svg?style=svg)](https://circleci.com/gh/leogoesger/eflow-ts-api)

## Summary

California eFlow's project's server uses Typescript, GraphQL, Express, Sequelize and Postgres to provide data to front-end.

## Getting Started

1. Install Postgres(create `eflow_ts_dev` && `eflow_ts_test`)
2. Install Redis
3. Add `.env` file
4. npm start / production
5. redis-cli flushall
6. npm run dev:prepare / prod:prepare

## Testing

Simply run `npm test`.

## CI

It uses [CirclCI](https://travis-ci.org/) for testing and auto deployment which triggers on `dev` branch.

## Help

For more information on all the things you can do with Sequelize CLI visit [sequelize cli ](https://github.com/sequelize/cli).

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
