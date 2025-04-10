import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent {
  public pickCardAnimation: boolean = false;
  public game: Game;

  constructor(public dialog: MatDialog) {
    this.game = new Game();
  };

  /**
  * Aktiviert die Kartenzieh-Animation und fügt die aktuelle Karte nach einer Verzögerung zu den gespielten Karten hinzu.
  * Die Animation wird nach 1000ms zurückgesetzt.
  * @private
  */
  private setPickCardAnimation(): void {
    this.pickCardAnimation = true;

    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      this.pickCardAnimation = false;
    }, 1000);
  };

  /**
  * Zieht eine Karte vom Stapel, wenn keine Animation läuft.
  * Setzt die aktuelle Karte und startet die Zieh-Animation.
  * @public
  */
  public takeCard(): void {
    if (!this.pickCardAnimation) {
      this.game.setCurrentCard();
      this.setPickCardAnimation();
    };
  };

  /**
  * Öffnet einen Dialog zum Hinzufügen eines neuen Spielers.
  * @public
  */
  public openDialog(): void {
    // IN ENTWICKLUNG
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log("DIALOG");
    });
  };
};