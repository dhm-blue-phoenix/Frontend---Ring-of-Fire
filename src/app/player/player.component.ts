import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})

export class PlayerComponent implements OnChanges {
  @Input() name: string = '';
  @Input() playerIndex: number = 0;
  @Input() currentPlayer: number = 0;

  public activPlayer: boolean = false;

  constructor() { }

  /**
  * Reagiert auf Änderungen von Eingabewerten der Komponente.
  * Wenn sich `currentPlayer` oder `playerIndex` ändern, wird der aktive Spieler aktualisiert.
  * @param changes - Ein Objekt, das die geänderten Eingabewerte enthält.
  */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentPlayer'] || changes['playerIndex']) {
      this.updateActivePlayer();
    }
  }

  /**
  * Aktualisiert den aktiven Spielerstatus.
  * Setzt `activPlayer` auf `true`, wenn `playerIndex` dem `currentPlayer` entspricht.
  */
  private updateActivePlayer(): void {
    this.activPlayer = this.playerIndex === this.currentPlayer;
  }
};