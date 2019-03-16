# node - elasticsearch - xml example

node api template/example for elasticsearch dataproducts with geospatial conversions

### prerequisites for running this example

* Elasticsearch (create indexes and docs and modify xml model in code to fit your model)
* .env file in root (for ENVs)
* node.js installed

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

##### Unit tests:

```
 npm run test
```
* runs unit tests

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




