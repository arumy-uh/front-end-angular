import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import { JwtInterceptor } from './services/interceptor/jwt.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ServerErrorInterceptor } from './services/interceptor/serverError.interceptor';
import { GlobalErrorHandler } from './services/handler/globalError.handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([JwtInterceptor, ServerErrorInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    {provide: ErrorHandler, useClass: GlobalErrorHandler}
  ]
};
