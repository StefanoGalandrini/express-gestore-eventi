const express = require("express");
const Event = require("../models/event");
const fs = require("fs");
const path = require("path");
const events = require("../db/events");
const { kebabCase } = require("lodash");

/**
	* Index method
	* Recupera e restituisce tutti gli eventi.
	* @param {express.Request} req
	* @param {express.Response} res
 */
function index(req, res)
{
	const events = Event.getEvents();
	res.json(events);
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
	store,
	update,
};
