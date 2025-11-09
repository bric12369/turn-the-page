# Turn the Page 📖

## About
Turn the Page is a bookshop API I'm currently developing with Node.js, PostgreSQL and Express. So far I've built a test database, consisting of 4 relational tables and seeded some mock data. Next, I'll focus on developing the server by creating endpoints while considering error handling. Once I've done this, I will expand the schema with additional tables to support more features.

## 💪 Getting Started

### 1: Install Dependencies

```
npm install
```

### 2: Create the Test Database (Dev TBC)
You'll need to create the test database locally using the following script:

```
npm run setup-db
```

### 3: Store the Test Database as an Environmental Variable
You'll need to add the database name to a .env file so Node-Postgres can access it. Remember to add ```.env*``` to a .gitignore file.
Inside the .env file, add:

```
PGDATABASE=turn_the_page_test
```

### 4: Seed the Test Database

```
npm run seed
```

### 5: Run the Development Server

To start the server locally, run:

```
npm start
```

Then go to ```localhost:3000``` in your browser or API client (e.g. Postman) to explore different endpoints.