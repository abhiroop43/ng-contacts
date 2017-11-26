import * as Rollbar from 'rollbar';
import {
  Injectable,
  Injector,
  InjectionToken,
  ErrorHandler
} from '@angular/core';

const rollbarConfig = {
  accessToken: '6296b8ec54ef4a78aa36621375f0db7e',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

@Injectable()
export class RollbarErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(err:any) : void {
    var rollbar = this.injector.get(RollbarService);
    rollbar.error(err.originalError || err);
  }
}

export function rollbarFactory() {
  return new Rollbar(rollbarConfig);
}

export const RollbarService = new InjectionToken<Rollbar>('rollbar');
