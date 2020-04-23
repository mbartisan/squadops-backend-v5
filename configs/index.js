import {dirname, join} from "path";
import {fileURLToPath} from "url";
import {existsSync, readFileSync} from "fs";

export default function loadConfig(path = process.env.CONFIG_FILE, env = process.env.CONFIG_ENV || process.env.NODE_ENV || 'default') {
    if (!path) path = join(dirname(fileURLToPath(import.meta.url)), process.env.CONFIG_PATH || './', `config.${env}.json`);
    if (process.env.DEBUG) console.log("Using config: ", path);
    if (!existsSync(path)) {
        console.log("Config path does not exist ", path);
        return {};
    }
    return JSON.parse(readFileSync(path, 'utf8'));
}
