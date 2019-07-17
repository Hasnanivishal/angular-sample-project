import { Injectable } from '@angular/core';

export class LoggerService2 {
  logInfo(value: string) {
    console.warn(value);
  }
}

export function xyzFactory() {
  if (localStorage.getItem('authToken')) {
    return new LoggerService2();
  } else {
    return new LoggerService();
  }
}

@Injectable({
  providedIn: 'root',
  useFactory: xyzFactory,
})
export class LoggerService {

  constructor() { }

  logInfo(value: string) {
    console.log(value);
  }
}
