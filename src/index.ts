import express from 'express';
import fs from 'fs';
import HealthCheck from './templates/HealthCheck';
import { Cofnig } from './types/config';
import { Server } from './types/server';

const app = express();
const port = 4444;
const configFile = 'config.json';

fs.readFile(configFile, (err, data) => {
  if (err) {
    console.log(err);
    throw err;
  }

  const config: Cofnig = JSON.parse(data.toString());

  if (config) {
    config.servers.forEach((server: Server) => {

      const healthCheck = new HealthCheck(server, config.email);

    })
  }
});

app.listen(port, () => {
  return console.log(`Server is listening on port ${port}`);
});