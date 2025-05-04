import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-b0d96","appId":"1:951710714555:web:7e1af2b592e9e2f513779e","storageBucket":"ring-of-fire-b0d96.firebasestorage.app","apiKey":"AIzaSyDXNq5nT3l35l1eNoZymKvaZAj78lSZrK0","authDomain":"ring-of-fire-b0d96.firebaseapp.com","messagingSenderId":"951710714555"})), provideFirestore(() => getFirestore()), provideAnimationsAsync()]
};
