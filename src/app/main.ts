import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { platformBrowser, BrowserModule } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
