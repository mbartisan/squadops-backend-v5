export default function makeEventsDb({ makeTable }) {

    const events = makeTable("events", {
        columns: [
            {key: "id", dataType: "int(11)", autoIncrement: true, primary: true},
            {key: "orgId", dataType: "int(11)", index: true},
            {key: "name", dataType: "varchar(255)"},
            {key: "body", dataType: "text", null: true},
            {key: "startAt", dataType: "int(11)"},
            {key: "endAt", dataType: "int(11)"},
            {key: "registrationStartAt", dataType: "int(11)"},
            {key: "registrationEndAt", dataType: "int(11)"},
            {key: "isPublished", dataType: "tinyint(1)"},
            {key: "createdAt", dataType: "int(11)"},
            {key: "updatedAt", dataType: "int(11)"},
        ]
    });

    const registrationSections = makeTable("registration_sections", {
        columns: [
            {key: "id", dataType: "int(11)", autoIncrement: true, primary: true},
            {key: "eventId", dataType: "int(11)", index: true},
            {key: "name", dataType: "varchar(255)"},
            {key: "registrationLimit", dataType: "int(11)"},
            {key: "useWaitlist", dataType: "tinyint(1)"},
            {key: "sort", dataType: "int(11)"},
            {key: "createdAt", dataType: "int(11)"},
            {key: "updatedAt", dataType: "int(11)"},
        ]
    });

    const registrations = makeTable("registrations", {
        columns: [
            {key: "id", dataType: "int(11)", autoIncrement: true, primary: true},
            {key: "eventId", dataType: "int(11)", index: true},
            {key: "registrationSectionId", dataType: "int(11)", index: true},
            {key: "userId", dataType: "int(11)", index: true},
            {key: "isUnregistered", dataType: "tinyint(1)"},
            {key: "didAttend", dataType: "tinyint(1)"},
            {key: "createdAt", dataType: "int(11)"},
            {key: "updatedAt", dataType: "int(11)"},
        ]
    });

    const registrationTemplates = makeTable("registration_templates", {
        columns: [
            {key: "id", dataType: "int(11)", autoIncrement: true, primary: true},
            {key: "orgId", dataType: "int(11)", index: true},
            {key: "name", dataType: "varchar(255)"},
            {key: "template", dataType: "text"},
            {key: "createdAt", dataType: "int(11)"},
            {key: "updatedAt", dataType: "int(11)"},
        ]
    });

    return Object.freeze({
        events: {
            ...events
        },
        registrationSections: {
            ...registrationSections
        },
        registrations: {
            ...registrations
        },
        registrationTemplates: {
            ...registrationTemplates
        }
    });

}
