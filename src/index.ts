import express from 'express';
import fs from 'fs';
import HealthCheck from './templates/HealthCheck';
import Report from './templates/Report';
import { Cofnig } from './types/config';
import { Server } from './types/server';

const app = express();
const port = 4444;
const configFile = 'config.json';

fs.readFile(configFile, (err, data) => {
  if (err) throw err;

  const config: Cofnig = JSON.parse(data.toString());

  if (config) {
    const reportSystem = new Report(config.email);

    config.servers.forEach((server: Server) => {

      new HealthCheck(server, reportSystem);

    })
  }
});

app.listen(port, () => {
  return console.log(`Server is listening on port ${port}`);
});