# Article-manager. Article menegment project

Article managment project. Articles are parsing every minute from RSS feed. Articles are managed (CRUD) in the admin panel, accsess to the panel is closed by authorization. There is also a public route that displays a list of articles with pagination/sorting/search

## Installation:

### Clone the repo from comand line:

```bash
$ git clone https://github.com/dmytro-chushko/article-manager.git
$ cd article-manager
```

### Install packeges in `./clinet` and `./server` directory:

```bash
$ cd clinet
$ npm i
$ cd ..
$ cd server
$ npm i
$ cd ..
```

## To run the project:

### To run with Docker:

1. Make sure you have an actual version of [Docker](https://www.docker.com/) installed on your computer. Download and install if it is necessary.
2. Configure `.env` files in both `./client` and `./server` directories like described below
3. Staying in root directory build the docker images from command line:

```bash
$ docker-compose build
```

4. Run the project:

```bash
$ docker-compose up
```

5. You may change settings in `docker-compose.yml` file

### To run from your local machine:

1. Make sure you have a version of [Node.js](https://nodejs.org/en/download) not lower than 18.18.1 installed on your computer. Download and install if it is necessary.
2. Make sure you have [PostgreSQL](https://www.postgresql.org/) database. Download and install if it is necessary.
3. Configure `.env` files in both `./client` and `./server` directories like described below
4. Being in the `./server` directory run the back-end application from the command line:

```bash
$ npm run start:dev
```

5. Being in the `./client` directory run the front-end application from the command line:

```bash
$ npm run dev
```

</br>

_*Navigate to the address in your browser http://localhost:5173. This page will automatically reload after saving changes to project files.*_<br>
_*Navigate to the address in your browser http://localhost:8090/api/docs to see the Swagger API documentation.*_</br>

## Configuration of the `.env` files:

### For front-end application:

Create `.env` file in the `./client` diretory and set this variable:

- VITE_BASE_URL = backend application host name

### For back-end application:

Create `.development.env` file in the `./server` directory and set the next variables:

- PORT = application port
- DB_TYPE = `postgres`
- POSTGRES_HOST = database host
- POSTGRES_POR T= database port
- POSTGRES_USER = database user
- POSTGRES_PASSWORD= database password
- POSTGRES_DB = databasee name
- NEWS_DATA_API_BASE_URL = newsdata.io query
- NEWS_DATA_API_KE Y= newsdata.io api key
- JWT_SECRET_KEY = secret key for JWT service
- TOKEN_EXP_IN = lifetime access token expiration 24h

Or you can use these ones if are using docker-compose running approach:

```java-script
PORT=8090
DB_TYPE =postgres
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=root
POSTGRES_DB=postgres
NEWS_DATA_API_BASE_URL=https://newsdata.io/api/1
NEWS_DATA_API_KEY=pub_404100d3a7c802dc95e02e3221e8e5c1e4dce
JWT_SECRET_KEY=jfkd;lsa5908323-iop[e]7645
TOKEN_EXP_IN=24h
```

## Articles parsing

Articles are parsing from [NEWSDATA.IO](https://newsdata.io/) - [documentation](https://newsdata.io/documentation).</br>
For retrieving articles you need API KEY. You may use these:

> **pub_404100d3a7c802dc95e02e3221e8e5c1e4dce**

Or create your own. You should previously sign up on [NEWSDATA.IO](https://newsdata.io/register) for this.</br>
Articles are parsing every `minute` and storing to the data base if they do not duplicate with already saved ones

> **_Free account allowed to retrieve articles only 200 times per day_**

## Admin panel

- Click on the ADMIN link in the right side of the interface and pass to the login page
- Admin credentials already have created after running the project
  > email: admin@domain.com </br>
  > password: 123456

* In the admin panel you have the same list of articles as in the feed but here you can change titles, descriptions and images in the articles. For editing click `Edit` button. Editing performs in an inline maner
* Also you may create the new article by pressing `Plus` button and upload it by `Push` button

## Technologies

### Base backend libraries

- **Framework**: NestJS
- **Validation**: Class Validator
- **ORM**: TypeORM
- **DB**: PostgreSQL
- **API Protocol**: REST(OpenAPISwagger)
- **Auth**: JWT

### Base frontend libraries

- **Framework**: React SPA (Vite)
- **Forms | Validation**: Hook Forms, Yup
- **State | Query**: Redux RTK
- **UI**: Material UI

### Environment:

- **Docker Compose**
