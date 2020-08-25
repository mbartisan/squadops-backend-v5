export default function makeListEvents({ db }) {
  return async function listEvents(searchParameters) {
    return await db.events.events.query.findAll(searchParameters);
  };
}
