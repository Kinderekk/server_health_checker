export default class Report {
  public email;

  constructor(email: string) {
    this.email = email;
  }

  notifyUser(message: string): boolean {
    console.log(`Sending email to user with message - ${message}`);

    return true;
  }
}