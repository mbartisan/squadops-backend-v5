export default function makeExpressCallback(routeController) {
  return async (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: req.headers,
    };

    try {
      const httpResponse = await routeController(httpRequest);
      if (httpResponse.headers) res.set(httpResponse.headers);
      res.status(httpResponse.statusCode).send(httpResponse.body);
    } catch (e) {
      console.error('[api-http] error: ', e);
      if (e && e.message) {
        if (['debug', 'local', 'development'].includes(process.env.NODE_ENV)) return res.status(400).send({ error: e.message, stack: e.stack });
        return res.status(400).send({ error: e.message });
      }
      return res.status(500).send({ error: 'Unknown error occurred' });
    }
  };
}
