module.exports = function (req, res, next)
{

	// return message for error 404 not found
	res.format({
		json: () =>
		{
			res.status(404).json({
				message: "Errore - Pagina non trovata"
			});
		},
		default: () =>
		{
			res.status(404).send("Errore - Pagina non trovata</h1>");
		},
	});
};
