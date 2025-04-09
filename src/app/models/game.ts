export class Game {
    public players: string[] = [];
    public readonly stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;

    private readonly cardTypes: string[] = ["hearts", "clubs", "diamonds", "ace"];

    constructor() {

        this.generateStack(this.cardTypes);
        this.shuffleStack();

        console.log(this.stack);
    };

    // Generiert den Stapel
    private generateStack(stack: string[]): void {
        for (let card = 0; card < stack.length; card++) {
            for (let i = 1; i < 14; i++) {
                this.stack.push(stack[card] + "_" + i);
            };
        };
    };

    // Mischt den Stapel
    private shuffleStack(): void {
        for (let i = this.stack.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Zufälliger Index von 0 bis i
            [this.stack[i], this.stack[j]] = [this.stack[j], this.stack[i]]; // Tauschen
        };
    };
};