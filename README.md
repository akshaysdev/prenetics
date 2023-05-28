# Instructions

### Go to the root folder and run

```bash
npm install
```

### Install postgres to your system and start the service

### Install mongo to your system and start the service

### Update .env folder at the root of the project

##### Add 'localhost' as your db host if you are running the service locally, else add the name of the db container

```.env
PORT=8080
JWT_SECRET=prenetics-jwt-secret
SALT_PASSWORD=prenetics-salt

POSTGRES_USER=postgres
POSTGRES_PASSWORD=admin
POSTGRES_HOST=localhost
POSTGRES_DATABASE=prenetics
POSTGRES_PORT=5432

MONGODB_URI=mongodb://localhost:27107
MONGODB_NAME=prenetics
```

### Start the node server

```bash
npm start
```

### You can run all the services together

#### Install docker and then,

```bash
docker compose up
```

[Link to Postman](https://www.postman.com/akshaysdev/workspace/prenetics)
