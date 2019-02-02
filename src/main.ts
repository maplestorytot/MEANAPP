//Start of angular app
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
//Starts the angular application in the browser
//calls bootstrap module and starts ngmodule, making the appcomponent
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
