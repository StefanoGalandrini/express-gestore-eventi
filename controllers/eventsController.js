const express = require("express");
const Event = require("../models/event");
// const fs = require("fs");
// const path = require("path");
// const events = require("../db/events");


/**
	* Index method
	* retrieve all events from json db and return them
	* @param {express.Request} req
	* @param {express.Response} res
 */
function index(req, res)
{
	let events = Event.getEvents();

	// query string filters
	const { title, description, date } = req.query;

	if (title)
	{
		events = events.filter(event => event.title.toLowerCase().includes(title.toLowerCase()));
	}

	if (description)
	{
		events = events.filter(event => event.description.toLowerCase().includes(description.toLowerCase()));
	}

	if (date)
	{
		const filterDate = new Date(date);
		events = events.filter(event => new Date(event.date) >= filterDate);
	}

	res.json(events);
}


/**
	* Show method
	* Show a single event by id if exists
	* @param {express.Request} req
	* @param {express.Response} res
 */
function show(req, res)
{
	const { id } = req.params;
	const events = Event.getEvents();
	const event = events.find(e => e.id.toString() === id);

	if (event)
	{
		res.json(event);
	} else
	{
		res.status(404).json({ message: "Evento non trovato" });
	}
}


/**
	* Store method
	* Adds a new event to the events array.
	* @param {express.Request} req
	* @param {express.Response} res
 */
function store(req, res)
{
	const { title, description, date, maxSeats } = req.body;
	const newEvent = new Event(title, description, date, maxSeats);
	const events = Event.getEvents();

	const newEventData = {
		id: newEvent.id,
		title: newEvent.title,
		slug: newEvent.slug,
		description: newEvent.description,
		date: newEvent.date,
		maxSeats: newEvent.maxSeats
	};

	console.log(newEventData);

	events.push(newEventData);

	console.log(events);

	Event.saveEvent(events);
	res.status(201).json(newEventData);
}


/**
	* Update method
	* retrieve the event by id and update it
	* @param {express.Request} req
	* @param {express.Response} res
 */
function update(req, res)
{
	const { id } = req.params;
	let events = Event.getEvents();
	let eventIndex = events.findIndex(e => e.id.toString() === id);

	// updates only the fields that are present in the request body
	// and regenerates the slug
	if (eventIndex !== -1)
	{
		const updatedData = req.body;

		// checks if title has been modified
		if (updatedData.title && updatedData.title !== events[eventIndex].title)
		{
			updatedData.slug = Event.createSlug(updatedData.title);
		}
		events[eventIndex] = { ...events[eventIndex], ...updatedData };
		Event.saveEvent(events);
		res.json({ message: "Evento aggiornato con successo", event: events[eventIndex] });
	} else
	{
		res.status(404).json({ message: "Evento non trovato" });
	}
}


/**
	* Destroy method
	* retrieve the event by id and update it
	* @param {express.Request} req
	* @param {express.Response} res
 */
function destroy(req, res)
{
	const { id } = req.params;
	let events = Event.getEvents();
	let eventIndex = events.findIndex(e => e.id.toString() === id);

	if (eventIndex !== -1)
	{
		// deletes the event with the provided id from the array
		events.splice(eventIndex, 1);
		Event.saveEvent(events);

		res.json({ message: "Evento cancellato con successo" });
	} else
	{
		res.status(404).json({ message: "Evento non trovato" });
	}
}


module.exports = {
	index,
	show,
	store,
	update,
	destroy,
};
