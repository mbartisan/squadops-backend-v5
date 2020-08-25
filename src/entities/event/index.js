import buildMakeEvent from './event.js';
import buildMakeEventRegistrationSection from './event-registration-section.js';
import buildMakeEventRegistration from './event-registration.js';
import buildMakeRegistrationTemplate from './registration-template.js';

const makeEventRegistrationSection = buildMakeEventRegistrationSection();
const makeEvent = buildMakeEvent({ makeEventRegistrationSection });
const makeEventRegistration = buildMakeEventRegistration();
const makeRegistrationTemplate = buildMakeRegistrationTemplate();

export {
  makeEvent,
  makeEventRegistrationSection,
  makeEventRegistration,
  makeRegistrationTemplate,
};
