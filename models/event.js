const fs = require("fs");
const path = require("path");

class Event
{
	constructor(title, description, date, maxSeats)
	{
		if (!title || !description || !date || !maxSeats)
		{
			throw new Error("Mancano dei dati, impossibile creare l'evento");
		}

		if (typeof title !== "string" || typeof description !== "string" || typeof maxSeats !== "number" || typeof maxSeats <= 0)
		{
			throw new Error("Uno o più dati inseriti non sono in un formato accettabile");
		}

		this.id = Event.generateUniqueId();
		this.title = title;
		this.slug = Event.createSlug(title);
		this.description = description;
		this.date = date;
		this.maxSeats = maxSeats;
	}

	// path to json data file
	static get filePath()
	{
		return path.join(__dirname, "../db/events.json");
	}

	/** static method to create a unique id for an event
	* @param {string} title
	* @returns {number} unique id
	*/
	static generateUniqueId()
	{
		const events = Event.getEvents();
		const maxId = events.reduce((max, event) => event.id > max ? event.id : max, 0);
		return maxId + 1;
	}

	/** static method to create a slug from a title
	* @param {string} title
	* @return {number} unique id
	*/
	static createSlug(title)
	{
		let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
		let counter = 1;
		const events = Event.getEvents();

		// store original slug
		const originalSlug = slug;

		// check if slug already exists
		// and add an incremental counter to the slug if exists
		while (events.some(event => event.slug === slug))
		{
			slug = `${originalSlug}-${counter}`;
			counter++;
		}

		return slug;
	}


	// static method to get all events
	static getEvents()
	{
		try
		{
			const data = fs.readFileSync(Event.filePath, "utf8");
			return JSON.parse(data);
		} catch (error)
		{
			console.log("Errore nella lettura del file:", error);
			return [];
		}
	}

	// static method to add an event to the json data file
	// and then save the json data file
	static saveEvent(events)
	{
		// const events = Event.getEvents();
		// events.push(event);
		try
		{
			fs.writeFileSync(Event.filePath, JSON.stringify(events, null, 2), "utf8");
		} catch (error)
		{
			console.log("Errore nel salvataggio dell'evento:", error);
		}
	}
}

module.exports = Event;
