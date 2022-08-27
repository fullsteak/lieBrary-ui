export type Payload = {
  username: string;
  password: string;
  hint: {
    message: string,
    type: Severity,
  }
}

export type Severity = 'warning' | 'info';
