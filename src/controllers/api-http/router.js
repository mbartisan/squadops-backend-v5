import lib_express from 'express';
import makeV5Router from './routes/v5/router.js';

export default function makeRouter({ config }) {
  const router = new lib_express.Router();

  router.use('/v5', makeV5Router({ config, router: new lib_express.Router() }));

  return router;
}
