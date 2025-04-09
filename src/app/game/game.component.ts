import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../models/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent {
  public pickCardAnimation: boolean = false;
  private game: Game = new Game();

  constructor() {
    this.newGame();
  };

  private newGame() {
    this.game = new Game();
  };

  public takeCard(): void { 
    this.pickCardAnimation = this.pickCardAnimation ? false : true;
    console.log(this.pickCardAnimation);
  };
};