import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideFirebaseApp(() => initializeApp({ projectId: "ring-of-fire-61605", appId: "1:601542087273:web:c420e03e54ce4f061908f8", storageBucket: "ring-of-fire-61605.firebasestorage.app", apiKey: "AIzaSyCZaV4xXHCUF287u2ie3nDYAbCn7i4l35k", authDomain: "ring-of-fire-61605.firebaseapp.com", messagingSenderId: "601542087273" })), provideFirestore(() => getFirestore())]
};
