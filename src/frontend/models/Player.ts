export class Player {
    private name: string;

    constructor(name: string) {
        this.validateName(name);
        this.name = name;
    }

    private validateName(name: string): void {
        if (!name || name.trim().length === 0) {
            throw new Error("Player name cannot be empty");
        }
        if (name.length < 2) {
            throw new Error("Player name must be at least 2 characters long");
        }
        if (!/^[a-zA-Z0-9\s]+$/.test(name)) {
            throw new Error("Player name can only contain letters, numbers and spaces");
        }
    }

    getName(): string {
        return this.name;
    }
} 