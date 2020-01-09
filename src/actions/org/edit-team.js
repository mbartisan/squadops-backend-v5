import {makeTeam} from "../../entities/org/index.js";
export default function makeEditTeam({ orgsDb }) {
    return async function editTeam({ id, ...changes } = {}) {
        if (!id) throw new Error('You must supply the id.');

        const existing = await orgsDb.teams.findOne({ id });
        if (!existing) throw new RangeError('Team not found.');

        const team = makeTeam({ ...existing, ...changes });

        const [updated] = await orgsDb.teams.query.updateWhere({
            name: team.getName(),
            color: team.getColor(),
            icon: team.getIcon(),
            updatedAt: ((Date.now() / 1000).toFixed())
        }, {
            id: team.getId()
        });
        return { ...updated }
    }
}
