// import modules
const express = require('express');
const dotenv = require('dotenv').config();
const app = express();


// use data types
app.use(express.json());

// import routes
const eventsRouter = require('./routers/eventsRouter');

// use routes
app.use('/events', eventsRouter);









// start server
app.listen(process.env.PORT || 3000, () =>
{
	console.log(`Server running on http://localhost:${process.env.PORT}`);
});
