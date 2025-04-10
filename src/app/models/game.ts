export class Game {
    public players: string[] = [
        "Peter",
        "Freddy",
        "Hans"
    ];
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