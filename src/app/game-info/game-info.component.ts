import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { GameService } from '../game.services';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss'
})

export class GameInfoComponent {
  public gameService = inject(GameService);
  
  constructor() {};
};