/**
 * Valid types are: 'success/positive', 'warning', 'error/negative', 'info'
 */
export class Message {
  constructor(public title: string, public message: string, public type?: string) {};
}
