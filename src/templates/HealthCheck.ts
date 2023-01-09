import axios from 'axios';
import { Server } from '../types/server';
import Report from './Report';

export default class HealthCheck {
  public server: Server;
  private userNotifiedAboutError: boolean;
  private reportSystem: Report;

  constructor(server: Server, reportSystem: Report) {
    this.server = server;
    this.reportSystem = reportSystem;

    setInterval(() => {
      this.test();
    }, this.server.intervalTime);
  }

  test() {
    axios.get(this.server.address)
      .then(res => {
        if (res.status >= 200 && res.status <= 299) {
          this.userNotifiedAboutError = true;
        }
      })
      .catch(err => {
        if (err.response && err.response.status) {
          const errorMessage = `Your server ${this.server.name} is unreachable with status code ${err.response.status}`;
          if (!this.userNotifiedAboutError) {
            this.userNotifiedAboutError = this.reportSystem.notifyUser(errorMessage);
          }
        }
      })
  }
}