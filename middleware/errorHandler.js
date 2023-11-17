module.exports = function (err, req, res, next)
{

	// handle error 500 (internal server error)
	res.format({
		json: () =>
		{
			res.status(500).json({
				message: "Errore interno del server",
				error: err.message,
				errorInstance: err.name,
			});
		},
		default: () =>
		{
			res.status(500).send(`
			<h1>Errore interno del server</h1>
			<p>${err.message}</p>
			`);
		},
	});
};
