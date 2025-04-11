import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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

export class PlayerComponent implements OnInit, OnChanges {
  @Input() name: string = '';
  @Input() playerIndex: number = 0;
  @Input() currentPlayer: number = 0;

  public activPlayer: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.updateActivePlayer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Reagiere auf Änderungen von currentPlayer oder playerIndex
    if (changes['currentPlayer'] || changes['playerIndex']) {
      this.updateActivePlayer();
    }
  }

  private updateActivePlayer(): void {
    this.activPlayer = this.playerIndex === this.currentPlayer;
    console.log('Player Index:', this.playerIndex);
    console.log('Current Player:', this.currentPlayer);
    console.log('Active Player:', this.activPlayer);
  }
};