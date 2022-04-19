export type HttpErrorObject = {
  name: string;
  message: string;
  stack?: string;
  http: {
    url: string;
    status: number;
    statusText: string;
  };
};

export class HttpError extends Error {
  url: string;
  status: number;
  statusText: string;

  constructor(response: Response) {
    super(response.statusText);
    this.name = 'HttpError';
    this.status = response.status;
    this.statusText = response.statusText;
    this.url = response.url;
  }

  serialize(): HttpErrorObject {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      http: {
        status: this.status,
        statusText: this.statusText,
        url: this.url,
      },
    };
  }
}
