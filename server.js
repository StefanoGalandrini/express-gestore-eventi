// import modules
const express = require('express');
const dotenv = require('dotenv').config();
const app = express();


// use data types
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// import routes
const eventsRouter = require('./routers/eventsRouter');

// use routes
app.use('/events', eventsRouter);

// import middleware
const notFound404 = require('./middleware/notFound404');
const errorHandler = require('./middleware/errorHandler');
const routesLogger = require('./middleware/routesLogger');

// middleware for 404 not found
app.use(notFound404);

// middleware for errors
app.use(errorHandler);

// middleware for logging routes
app.use(routesLogger);


// start server
app.listen(process.env.PORT || 3000, () =>
{
	console.log(`Server running on http://localhost:${process.env.PORT}`);
});
