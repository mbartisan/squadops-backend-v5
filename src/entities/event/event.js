export default function buildMakeEvent({ makeEventRegistrationSection }) {
  return function makeEvent(
    {
      id,
      orgId,
      name,
      body,
      startAt,
      endAt,
      registrationStartAt,
      registrationEndAt,
      isPublished = 0,
      createdAt = ((Date.now() / 1000).toFixed()),
      updatedAt = ((Date.now() / 1000).toFixed()),
      registrationSections,
    } = {},
  ) {
    if (!orgId) {
      throw new Error('Event must have an orgId.');
    }

    if (!name) {
      throw new Error('Event must have a name.');
    }
    name = name.trim();
    if (name.length < 2) {
      throw new Error("Event's name must be longer than 2 characters.");
    }

    if (!startAt
      || !((Number.isInteger(parseInt(startAt)))
        && startAt > 0
        && startAt > (Date.now() / 1000))) {
      throw new Error('Event must have a startAt date in the future.');
    }

    if (!endAt
      || !(Number.isInteger(parseInt(endAt))
        && endAt > 0
        && endAt > (Date.now() / 1000))) {
      throw new Error('Event must have a endAt date in the future.');
    }

    if (!registrationStartAt
      || !(Number.isInteger(parseInt(registrationStartAt))
        && registrationStartAt > 0
        && registrationStartAt > (Date.now() / 1000))) {
      throw new Error('Event must have a registrationStartAt date in the future.');
    }

    if (!registrationEndAt
      || !(Number.isInteger(parseInt(registrationEndAt))
        && registrationEndAt > 0
        && registrationEndAt > (Date.now() / 1000))) {
      throw new Error('Event must have a registrationEndAt date in the future.');
    }

    if (isPublished == null || !(isPublished === 1 || isPublished === 0)) {
      throw new Error('Event must have a isPublished set to 1 or 0.');
    }

    // eslint-disable-next-line max-len
    if (registrationSections) registrationSections = registrationSections.map((section) => makeEventRegistrationSection(section));

    return Object.freeze({
      getId: () => id,
      getOrgId: () => orgId,
      getName: () => name,
      getBody: () => body,
      getStartAt: () => startAt,
      getStartOn: () => new Date(startAt * 1000),
      getEndAt: () => endAt,
      getEndOn: () => new Date(endAt * 1000),
      getRegistrationStartAt: () => registrationStartAt,
      getRegistrationStartOn: () => new Date(registrationStartAt * 1000),
      getRegistrationEndAt: () => registrationEndAt,
      getRegistrationEndOn: () => new Date(registrationEndAt * 1000),
      getIsPublished: () => isPublished,
      getCreatedAt: () => createdAt,
      getCreatedOn: () => new Date(createdAt * 1000),
      getUpdatedAt: () => updatedAt,
      getUpdatedOn: () => new Date(updatedAt * 1000),
      getRegistrationSections: () => registrationSections,
    });
  };
}
