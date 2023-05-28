# Instructions

### Go to the root folder and run

```bash
npm install
```

### Install postgres to your system and start the service

### Update .env folder at the root of the project
#### Add 'localhost' as your db host if you are running the service locally, else add the name of the db container

```.env
PORT

SALT_PASSWORD

POSTGRES_USER=postgres
POSTGRES_PASSWORD=admin
POSTGRES_HOST
POSTGRES_DATABASE
POSTGRES_PORT=5432
```

### Start the node server

```bash
npm start
```

### You can run all the services by doing(requires docker),

```bash
docker compose up
```
