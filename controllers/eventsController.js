const express = require("express");
const Event = require("../models/event");
const fs = require("fs");
const path = require("path");
const events = require("../db/events");
const { kebabCase } = require("lodash");

/**
	* Index method
	* retrieve all events from json db and return them
	* @param {express.Request} req
	* @param {express.Response} res
 */
function index(req, res)
{
	const events = Event.getEvents();
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
	Event.saveEvent(newEvent);
	res.status(201).json(newEvent);
}


/**
	* Update method
	* retrieve the event by id and update it
	* @param {express.Request} req
	* @param {express.Response} res
 */
function update(req, res)
{
	// todo
}

module.exports = {
	index,
	show,
	store,
	update,
};
