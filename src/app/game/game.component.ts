import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../game.services';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../firestore.services';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    GameInfoComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent {
  public gameService = inject(GameService);
  private firestoreSevice = inject(FirestoreService);
  private paramId: string = '';

  constructor(private dialog: MatDialog, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.paramId = params['id'];
      if (this.paramId) {
        this.firestoreSevice.init(this.paramId);
      } else {
        console.warn('Keine ID in den Routenparametern gefunden.');
      }
    });
  }

  /**
  * Aktiviert die Kartenzieh-Animation und fügt die aktuelle Karte nach einer Verzögerung zu den gespielten Karten hinzu.
  * Die Animation wird nach 1000ms zurückgesetzt.
  * @private
  */
  private setPickCardAnimation(): void {
    this.gameService.pickCardAnimation = true;
    this.updateGame();

    setTimeout(() => {
      this.gameService.playedCards.push(this.gameService.currentCard);
      this.gameService.pickCardAnimation = false;
      this.updateGame();
    }, 1000);
  };

  /**
  * Zieht eine Karte vom Stapel, wenn keine Animation läuft.
  * Setzt die aktuelle Karte und startet die Zieh-Animation.
  * @public
  */
  public takeCard(): void {
    if (!this.gameService.pickCardAnimation) {
      this.gameService.setCurrentCard();
      this.setPickCardAnimation();
      this.gameService.setInfo();
      this.gameService.setNextPlayer();
      this.updateGame();
    };
  };

  /**
  * Öffnet einen Dialog zum Hinzufügen eines neuen Spielers.
  * @public
  */
  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (this.gameService.players.length <= 5 && name.length > 0) {
        this.gameService.players.push(name);
        this.updateGame();
      };
    });
  };

  /**
  * Aktualisiert ein bestehendes Spieldokument in Firestore mit dem aktuellen Spielzustand.
  * @private
  * @async
  * @function
  * @returns {Promise<void>} Ein Promise, das abgeschlossen ist, wenn die Aktualisierung erfolgt ist.
  */
  private async updateGame() {
    console.log(this.paramId)
    await this.firestoreSevice.updateDoc('games', this.paramId, this.gameService.toJson());
  }
};