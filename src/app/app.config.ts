import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';


import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule,TranslateLoader } from '@ngx-translate/core';
import { headerInterceptor } from './core/interceptor/header.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loaderInterceptor } from './core/interceptor/loaders/loader.interceptor';
import { handleErrorInterceptor } from './core/interceptor/handleError/handle-error.interceptor';

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './../Assets/i18n/','.json');
}
export const appConfig: ApplicationConfig = {
  providers: [
    BrowserAnimationsModule,
    NgxSpinnerModule,
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), 
    provideHttpClient(withFetch(),
    withInterceptors([headerInterceptor,loaderInterceptor,handleErrorInterceptor])), 
    importProvidersFrom(RouterModule,BrowserAnimationsModule, TranslateModule.forRoot({
      defaultLanguage:'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:[HttpClient]
      }
    })),
    provideAnimations(), // required animations providers
    provideToastr()]
};
