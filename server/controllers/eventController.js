import db from '../models';
import dotenv from 'dotenv';


const eventDB = db.Event;
const Center = db.Center;
const secret = process.env.SECRET;

dotenv.config();


/**
 * @class Event
 *@classdesc class Event
 */

class Event {
/**
   * get Events
   * @desc Show a list of all the current events in the db
   * Route: GET: 'api/v1/events'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */

  static getEvent(req, res) {
    eventDB
      .all()
      .then(event => res.status(200).send({ message: 'success', event }))
      .catch(error => res.status(200).send(error));
  }

  /**
   * Get one Event
   * @desc Return a single event based on the id number
   * Route: GET: 'api/v1/events/<eventID>'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */

  static getOneEvent(req, res) {
    eventDB
      .findById(req.params.id)
      .then((event) => {
        if (!event) {
          return res
            .status(404)
            .send({ message: 'Event not found' });
        }
        return eventDB
          .findById(req.params.id, {
            include: [{
              model: Center,
              as: 'centers'
            }],
          })
          .then(event => res.status(200).send({ message: 'found', event }))
          .catch(error => res.status(200).send(error));
      });
  }


  /**
   * Add a new Event
   * @desc Add a new Event
   * Route: POST: 'api/v1/events'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */

  static createEvent(req, res) {
    eventDB
      .create({
        eventName: req.body.name,
        eventdate: req.body.date,
        time: req.body.time,
        purpose: req.body.purpose,
        centerId: req.body.center,
        userId: 1
      })
      .then(event => res.status(201).send({ message: 'successfully created', event }))
      .catch(error => res.status(400).send(error));
  }

  /**
   * Edit an already saved Event
   * @desc Return a single event based on the id number
   * Route: PUT: 'api/v1/events/<eventID>'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */

  static editEvent(req, res) {
    eventDB
      .findById(req.params.id)
      .then((event) => {
        if (!event) {
          return res
            .status(404)
            .send({ message: 'Event Not Found' });
        }
        return event
          .update({
            eventName: req.body.name,
            eventdate: req.body.date,
            time: req.body.time,
            purpose: req.body.purpose,
            centerId: req.body.center
          })
          .then(() => res.status(200).send({ message: 'updated', event }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }

  /**
   * Delete Event
   * @desc Deleter an event
   * Route: DELETE: 'api/v1/events/<eventID>'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void}
   */

  static deleteEvent(req, res) {
    eventDB
      .findById(req.params.id)
      .then((event) => {
        if (!event) {
          return res
            .status(400)
            .send({ message: 'Event not Found' });
        }
        return event
          .destroy()
          .then(res.status(200).send({ message: 'Event successfully deleted!' }))
          .catch(error => res.status(400).send(error));
      });
  }
}

export default Event;
