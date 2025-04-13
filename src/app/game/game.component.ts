import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../game.service';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';

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
  public pickCardAnimation: boolean = false;
  public gameService = inject(GameService);

  constructor(private dialog: MatDialog) {};

  /**
  * Aktiviert die Kartenzieh-Animation und fügt die aktuelle Karte nach einer Verzögerung zu den gespielten Karten hinzu.
  * Die Animation wird nach 1000ms zurückgesetzt.
  * @private
  */
  private setPickCardAnimation(): void {
    this.pickCardAnimation = true;

    setTimeout(() => {
      this.gameService.playedCards.push(this.gameService.currentCard);
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
      this.gameService.setCurrentCard();
      this.setPickCardAnimation();
      this.gameService.setInfo();
      this.gameService.setNextPlayer();
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
      };
    });
  };
};