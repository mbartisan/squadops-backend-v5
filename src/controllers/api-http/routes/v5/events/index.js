/* eslint-disable max-len */
import {
  createEvent,
  createEventRegistration,
  createEventRegistrationSection,
  createRegistrationTemplate,
  listEventRegistrationSections,
  listEventRegistrations,
  listEvents,
  listRegistrationTemplates,
  retrieveEvent,
  retrieveEventRegistration,
  retrieveEventRegistrationSection,
  retrieveRegistrationTemplate,
  updateEvent,
  updateEventRegistration,
  updateEventRegistrationSection,
  updateRegistrationTemplate,
} from '../../../../../actions/index.js';

import makeGetEvents from './get-events.js';
import makePostEvents from './post-events.js';
import makeGetEvent from './get-event.js';
import makePatchEvent from './patch-event.js';
import makeGetRegistrationTemplates from './get-registration-templates.js';
import makePostRegistrationTemplates from './post-registration-templates.js';
import makeGetRegistrationTemplate from './get-registration-template.js';
import makePatchRegistrationTemplate from './patch-registration-template.js';
import makeGetEventRegistrationSections from './get-event-registration-sections.js';
import makePostEventRegistrationSections from './post-event-registration-sections.js';
import makeGetEventRegistrationSection from './get-event-registration-section.js';
import makePatchEventRegistrationSection from './patch-event-registration-section.js';
import makeGetEventRegistrations from './get-event-registrations.js';
import makePostEventRegistrations from './post-event-registrations.js';
import makeGetEventRegistration from './get-event-registration.js';
import makePatchEventRegistration from './patch-event-registration.js';

export default function makeEventsRoutes({ makeHttpResponse }) {
  const getEvents = makeGetEvents({ makeHttpResponse, listEvents });
  const postEvents = makePostEvents({ makeHttpResponse, createEvent });
  const getEvent = makeGetEvent({ makeHttpResponse, retrieveEvent });
  const patchEvent = makePatchEvent({ makeHttpResponse, updateEvent });

  const getRegistrationTemplates = makeGetRegistrationTemplates({ makeHttpResponse, listRegistrationTemplates });
  const postRegistrationTemplates = makePostRegistrationTemplates({ makeHttpResponse, createRegistrationTemplate });
  const getRegistrationTemplate = makeGetRegistrationTemplate({ makeHttpResponse, retrieveRegistrationTemplate });
  const patchRegistrationTemplate = makePatchRegistrationTemplate({ makeHttpResponse, updateRegistrationTemplate });

  const getEventRegistrationSections = makeGetEventRegistrationSections({ makeHttpResponse, listEventRegistrationSections });
  const postEventRegistrationSections = makePostEventRegistrationSections({ makeHttpResponse, createEventRegistrationSection });
  const getEventRegistrationSection = makeGetEventRegistrationSection({ makeHttpResponse, retrieveEventRegistrationSection });
  const patchEventRegistrationSection = makePatchEventRegistrationSection({ makeHttpResponse, updateEventRegistrationSection });

  const getEventRegistrations = makeGetEventRegistrations({ makeHttpResponse, listEventRegistrations });
  const postEventRegistrations = makePostEventRegistrations({ makeHttpResponse, createEventRegistration });
  const getEventRegistration = makeGetEventRegistration({ makeHttpResponse, retrieveEventRegistration });
  const patchEventRegistration = makePatchEventRegistration({ makeHttpResponse, updateEventRegistration });

  return Object.freeze({
    getEvents,
    postEvents,
    getEvent,
    patchEvent,
    getRegistrationTemplates,
    postRegistrationTemplates,
    getRegistrationTemplate,
    patchRegistrationTemplate,
    getEventRegistrationSections,
    postEventRegistrationSections,
    getEventRegistrationSection,
    patchEventRegistrationSection,
    getEventRegistrations,
    postEventRegistrations,
    getEventRegistration,
    patchEventRegistration,
  });
}
