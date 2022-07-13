## Description
A simple address book server running on port 4000

## Installation

```bash
$ npm install
```

## Configuration

### create file .env
```bash
$ touch .env
```

### paste your configuration
```env
  BDD_URL=mongodb://URL_DATABASE/DATABASE_NAME
  TIMEZONE_SERVER='TIMEZONE_SERVER'  
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


