# node - elasticsearch - xml example

node api template/example for:

* rest api using [express](https://expressjs.com/)
* making elasticsearch queries using [elasticsearch client](https://www.npmjs.com/package/elasticsearch)
* building xml for response using [xmlbuilder](https://www.npmjs.com/package/xmlbuilder)
* fetching data from imaginary external service using [axios](https://github.com/axios/axios)
* converting projection of coordinates and changing coordinate representation for XML using [proj4](https://github.com/proj4js/proj4js)

### prerequisites for running this example

* node.js installed
* elasticsearch and axios responses are mocked so playing and developing without having elasticsearch instance is possible by running tests.

```
 npm install
 npm run test
```
For running service in dev mode:
* Elasticsearch (create indexes and docs and modify xml model in code to fit your model)
* (optional) some external rest service
* .env file in root (for ENVs)

##### Run locally (dev mode):

install:
```
 npm install
```
dev mode:
```
 npm run watch
```
* starts node in development mode with nodemon
* auth routine in middleware is bybassed

##### Prod mode:
```
 npm run start
```
* starts node in production mode. Auth routine in middleware enabled. Modify for your own needs

##### Docker

```
 docker-compose build
```
* builds image

```
 docker-compose up -d
```
* runs container in production mode.

```
 docker-compose down
```
* stops and removes container

```
 docker logs -f elastic-backend
```
* access container logs

### ENV file for running this template locally

* create .env file in the root

```
EXTERNAL_DATASOURCE_URL="url for your external DS if willing to fetch data from some ext service"
ELASTIC_URL=http://localhost:9200
OAUTH2_URL="your oauth2 url"
OAUTH_ACCESS_KEY="your access key"
OAUTH_SECRET="your sercret"
PORT=8080
```




