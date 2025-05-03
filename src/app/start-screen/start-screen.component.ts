import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameService } from '../game.services';
import { FirestoreService } from '../firestore.services';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})

export class StartScreenComponent {
  private gameService: GameService = inject(GameService);
  private firestoreService: FirestoreService = inject(FirestoreService);

  constructor(private router: Router) { };

  /**
  * Startet ein neues Spiel, indem es die Spieldaten in der Firestore-Datenbank speichert
  * und anschließend zur Spielansicht navigiert.
  * @async
  * @function
  * @returns {Promise<void>} Ein Promise, das abgeschlossen ist, sobald die Navigation erfolgt ist.
  */
  public async newGame() {
    const result: any = await this.firestoreService.addDocList(this.gameService.toJson());
    this.router.navigateByUrl("/game/" + result);
  };
};