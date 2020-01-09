import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./router.js";


const PORT = process.env.PORT || 3030;

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "*", credentials: true }));
app.use('/v5/', router);

export default function startApi() {
    app.listen(PORT, () => {
        console.log(`HTTP Server is listening on port ${PORT}`);
    });
    return app;
};
