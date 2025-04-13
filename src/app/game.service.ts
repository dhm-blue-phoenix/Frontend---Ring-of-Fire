import { Injectable } from '@angular/core';

interface CardAction {
  readonly title: string,
  readonly description: string
};

@Injectable({
  providedIn: 'root'
})

export class GameService {
  private cardAction: CardAction[] = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: '' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: '' },
    { title: 'Never have i ever...', description: 'Say something you nnever did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ];

  public title: string = '';
  public description: string = '';

  public players: string[] = [];
  public stack: string[] = [];
  public playedCards: string[] = [];
  public currentPlayer: number = 0;
  public currentCard: string = '';

  private readonly cardTypes: string[] = ['hearts', 'clubs', 'diamonds', 'ace'];

  constructor() {
    this.generateStack(this.cardTypes);
    this.shuffleStack();
    this.setCurrentCard();
  };

  /**
  * Setzt die aktuelle Karte, indem eine Karte vom Stapel genommen wird.
  * Wenn der Stapel leer ist, wird eine Warnung in der Konsole ausgegeben und die Funktion abgebrochen.
  * @public
  */
  public setCurrentCard(): void {
    if (this.stack.length <= 0) {
      console.warn('Card Stack:', this.stack, 'Length:', this.stack.length);
      return;
    };
    this.currentCard = this.stack.pop()!;
  };

  /**
   * Setzt den nächsten Spieler in der Reihenfolge.
   * Erhöht `currentPlayer` und stellt sicher, dass er sich im Bereich der Spieleranzahl befindet (zyklisch).
   */
  public setNextPlayer() {
    this.currentPlayer++;
    this.currentPlayer = this.currentPlayer % this.players.length;
  }

  /**
  * Setzt den Titel und die Beschreibung basierend auf der aktuellen Karte.
  * Extrahiert die Kartennummer aus `currentCard` und holt die entsprechenden Informationen aus `cardAction`.
  */
  public setInfo() {
    const cardNumber: number = +this.currentCard.split('_')[1];
    this.title = this.cardAction[cardNumber - 1].title;
    this.description = this.cardAction[cardNumber - 1].description;
  }

  /**
  * Generiert einen Kartenstapel basierend auf den angegebenen Kartenarten.
  * Jede Kartenart wird mit Werten von 1 bis 13 kombiniert und zum Stapel hinzugefügt.
  * @private
  * @param {string[]} stack - Array von Kartenarten (z. B. ["hearts", "clubs"]).
  */
  private generateStack(stack: string[]): void {
    for (let card = 0; card < stack.length; card++) {
      for (let i = 1; i < 14; i++) {
        this.stack.push(stack[card] + '_' + i);
      };
    };
  };

  /**
  * Mischt den Kartenstapel nach dem Fisher-Yates-Algorithmus.
  * Die Reihenfolge der Karten wird zufällig geändert.
  * @private
  */
  private shuffleStack(): void {
    for (let i = this.stack.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Zufälliger Index von 0 bis i
      [this.stack[i], this.stack[j]] = [this.stack[j], this.stack[i]]; // Tauschen
    };
  };
};