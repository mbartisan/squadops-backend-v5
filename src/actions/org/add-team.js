import {makeTeam} from "../../entities/org/index.js";
export default function makeAddTeam({ orgsDb }) {
    return async function addTeam(teamData) {
        const team = makeTeam(teamData);

        const exists = await orgsDb.teams.query.findOne({ id: team.getId() });
        if (exists) throw new Error("Team already exists.");

        return orgsDb.teams.query.insert({
            orgId: team.getOrgId(),
            name: team.getName(),
            color: team.getColor(),
            icon: team.getIcon(),
            createdAt: team.getCreatedAt(),
            updatedAt: team.getUpdatedAt(),
        });
    }
}
