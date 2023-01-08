import { Server } from '../types/server';

export default class HealthCheck {
  private server: Server;
  private email: string;

  constructor(server: Server, email: string) {
    this.server = server;
    this.email = email;
  }
}