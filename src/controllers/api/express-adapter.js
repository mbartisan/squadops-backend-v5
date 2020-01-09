export default function makeExpressCallback(routeController) {
    return async (req, res) => {
        const httpRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
            ip: req.ip,
            method: req.method,
            path: req.path,
            headers: {
                'Content-Type': req.get('Content-Type'),
                Referer: req.get('referer'),
                'User-Agent': req.get('User-Agent')
            }
        };

        try {
            const httpResponse = await routeController(httpRequest);
            if (httpResponse.headers) res.set(httpResponse.headers);
            res.status(httpResponse.statusCode).send(httpResponse.body);
        } catch (e) {
            res.status(500).send({ error: 'An unknown error occurred.' })
        }
    }
}
