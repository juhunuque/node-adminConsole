# Softechfactory Raw-Fitness API & Dashboard

### Details
- This project includes the backend API used on the mobile applications, furthermore includes the dashboard used for administration purposes.

## Project structure
### Backend
- Project developed by using NodeJS as API service.
- A database no-sql called Mongodb.
- Api documentation framework called Swagger.

### Frontend
- Developed by using Angular 1.x.

## Setting up the environment
### Environment requirements
- NodeJs (version > 4 )
- MongoDb
- Bower

### Project dependencies
- Go to the project folder and run: `npm install`.
- In the project, go to the public folder and run: `bower install` in order to install frontend dependencies.

## Running the project
- If you're going to deploy the project as production, run: `NODE_ENV=production npm start`
- If you need to run the project as development, run: `npm start`.
- Differences? In production mode, nodejs skips some sync processes useful just for development purposes.

## Extra
- Token header format: `Authorization: Bearer TOKENHERE`
- FB Token validator: https://graph.facebook.com/me?access_token=TOKENHERE
- FB Token generator: https://developers.facebook.com/tools/explorer/?method=GET&path=me&version=v2.7
- Test server: http://52.41.145.165:3000/
