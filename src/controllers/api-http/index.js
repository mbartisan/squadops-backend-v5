import lib_express from "express";
import lib_bodyParser from "body-parser";
import lib_cors from "cors";
import loadConfig from "../../../configs/index.js";
import makeRouter from "./router.js";

const config = loadConfig()['api-http'];

const app = lib_express();
const port = process.env.API_PORT || config.port || 5050;

app.use((req, res, next) => {
    console.log(`[api-http] HTTP Connection: ${req.originalUrl}`);
    next();
});

app.use(lib_bodyParser.json({ limit: '50mb' }));
app.use(lib_cors({ origin: "*", credentials: true }));

const router = makeRouter({ config });
app.use('/', router);
app.use((req, res) => res.status(404).send({ error: '404 - Not Found' }));

const startServer = (listenPort = port) => {
    app.listen(listenPort, () => {
        console.log(`[api-http] Http Server is listening on port ${listenPort}`);
    });
};

export default app;

export {
    app,
    startServer
}
