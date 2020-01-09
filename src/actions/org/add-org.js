import {makeOrg} from "../../entities/org/index.js";
export default function makeAddOrg({ orgsDb }) {
    return async function addOrg(orgData) {
        const org = makeOrg(orgData);

        const exists = await orgsDb.orgs.query.findOne({ id: org.getId() });
        if (exists) throw new Error("Org already exists.");

        return orgsDb.orgs.query.insert({
            ownerId: org.getOwnerId(),
            name: org.getName(),
            icon: org.getIcon(),
            createdAt: org.getCreatedAt(),
            updatedAt: org.getUpdatedAt()
        });
    }
}
