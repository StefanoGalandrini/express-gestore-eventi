const fs = require("fs");
const path = require("path");

class Event
{
	constructor(id, title, description, date, maxSeats)
	{
		this.id = id;
		this.title = title;
		this.description = description;
		this.date = date;
		this.maxSeats = maxSeats;
	}

	// path to json data file
	static get filePath()
	{
		return path.join(__dirname, "../db/events.json");
	}

	// static method to get all events
	static getEvents()
	{
		try
		{
			const data = fs.readFileSync(filePath, "utf8");
			return JSON.parse(data);
		} catch (error)
		{
			console.log("Errore nella lettura del file:", error);
			return [];
		}
	}

	// static method to add an event to the json data file
	// and then save the json data file
	static saveEvent(event)
	{
		const events = Event.getEvents();
		events.push(event);
		try
		{
			fs.writeFileSync(filePath, JSON.stringify(events, null, 2), "utf8");
		} catch (error)
		{
			console.log("Errore nel salvataggio dell'evento:", error);
		}
	}
}

module.exports = Event;
