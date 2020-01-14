import buildMakeEvent from "./event.js";
import buildMakeRegistrationSection from "./registrationSection.js";
import buildMakeRegistration from "./registration.js";

const makeEvent = buildMakeEvent();
const makeRegistrationSection = buildMakeRegistrationSection();
const makeRegistration = buildMakeRegistration();

export {
    makeEvent,
    makeRegistrationSection,
    makeRegistration
}
