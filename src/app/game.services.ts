import { inject, Injectable } from '@angular/core';
import { FirestoreService } from './firestore.services';

interface CardAction {
  readonly title: string,
  readonly description: string
};

@Injectable({
  providedIn: 'root'
})

export class GameService {
  private firestoreService: FirestoreService = inject(FirestoreService);
  private cardAction: CardAction[] = [
    { "title": "Wasserfall", "description": "Alle müssen gleichzeitig anfangen zu trinken. Sobald Spieler 1 aufhört zu trinken, darf Spieler 2 aufhören. Spieler 3 darf aufhören, sobald Spieler 2 aufhört, und so weiter." },
    { "title": "Du", "description": "Du entscheidest, wer trinkt." },
    { "title": "Ich", "description": "Glückwunsch! Trinke einen Shot!" },
    { "title": "Kategorie", "description": "Denke dir eine Kategorie aus (z. B. Farben). Jeder Spieler muss einen Begriff aus dieser Kategorie nennen." },
    { "title": "Tanz-Move", "description": "Spieler 1 macht einen Tanz-Move. Spieler 2 wiederholt ihn und fügt einen weiteren hinzu." },
    { "title": "Mädels", "description": "Alle Frauen trinken." },
    { "title": "Himmel", "description": "Hände hoch! Der letzte, der die Hände hebt, muss trinken!" },
    { "title": "Trinkpartner", "description": "Wähle einen Trinkpartner. Immer wenn du trinkst, muss dein Partner auch trinken – und umgekehrt." },
    { "title": "Daumenmeister", "description": "" },
    { "title": "Jungs", "description": "Alle Männer trinken." },
    { "title": "Quizmaster", "description": "" },
    { "title": "Ich hab noch nie...", "description": "Sage etwas, das du noch nie getan hast. Jeder, der es getan hat, muss trinken." },
    { "title": "Regel", "description": "Erschaffe eine Regel. Wer sie bricht, muss trinken." }
  ];

  public title: string = '';
  public description: string = '';

  public players: string[] = [];
  public stack: string[] = [];
  public playedCards: string[] = [];
  public currentPlayer: number = 0;
  public currentCard: string = '';
  public pickCardAnimation: boolean = false;

  private readonly cardTypes: string[] = ['hearts', 'clubs', 'diamonds', 'ace'];

  constructor() {
    this.firestoreService.gameList$.subscribe((games: any) => {
      this.generateStack(this.cardTypes);
      this.shuffleStack();
      this.setCurrentCard();

      if (games[0]) {
        const gameDoc = games[0]['doc'];

        if (gameDoc) {
          this.players = gameDoc.players;
          this.stack = gameDoc.stack;
          this.playedCards = gameDoc.playedCards;
          this.currentPlayer = gameDoc.currentPlayer;
          this.currentCard = gameDoc.currentCard;
          this.pickCardAnimation = gameDoc.pickCardAnimation;
          this.title = gameDoc.title;
          this.description = gameDoc.description;
        }
      }
    });
  }

  /**
  * Serialisiert den aktuellen Spielzustand in ein JSON-ähnliches Objekt.
  *
  * @function
  * @returns {Object} Das Spiel als einfaches Objekt mit allen relevanten Eigenschaften:
  * - `players`: Die Spieler des Spiels.
  * - `stack`: Der verbleibende Kartenstapel.
  * - `playedCards`: Bereits gespielte Karten.
  * - `currentPlayer`: Der aktuelle Spieler.
  * - `currentCard`: Die momentan aktive Karte.
  * - `pickCardAnimation`: Gibt an, ob eine Zieh-Animation läuft.
  * - `title`: Der Spieltitel.
  * - `description`: Die Spielbeschreibung.
  */
  public toJson(): any {
    return {
      players: this.players,
      stack: this.stack,
      playedCards: this.playedCards,
      currentPlayer: this.currentPlayer,
      currentCard: this.currentCard,
      pickCardAnimation: this.pickCardAnimation,
      title: this.title,
      description: this.description
    };
  }

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
    if (!this.currentPlayer) {
      this.currentPlayer = 0;
    }
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