export enum GameItemStatus {
    Open, Close,
    Match
}

export class GameItem {
    private id: number;
    private name: string;
    private imageUrl: string;
    private isFlipped: boolean = false;
    private isMatched: boolean = false;

    constructor(id: number, name: string, imageUrl: string) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getImageUrl(): string {
        return this.imageUrl;
    }

    isCardFlipped(): boolean {
        return this.isFlipped;
    }

    isCardMatched(): boolean {
        return this.isMatched;
    }

    flip(): void {
        if (!this.isMatched) {
            this.isFlipped = !this.isFlipped;
        }
    }

    setMatched(matched: boolean): void {
        this.isMatched = matched;
        if (matched) {
            this.isFlipped = true;
        }
    }

    reset(): void {
        this.isFlipped = false;
        this.isMatched = false;
    }
}