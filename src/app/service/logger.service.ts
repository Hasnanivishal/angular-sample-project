import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {

  constructor() { }

  logInfo(value: string) {
    console.log(value);
  }
}
