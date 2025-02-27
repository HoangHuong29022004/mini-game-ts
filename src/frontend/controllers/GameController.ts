import autobind from "autobind-decorator";
import { GameItem, GameItemStatus } from "../models/GameItem";
import _ from "lodash";
import { Player } from "../models/Player";

export class GameController {
    private items: GameItem[];
    private rootElement: HTMLElement;
    private player: Player | null = null;
    private flippedCards: GameItem[] = [];
    private matchedPairs: number = 0;
    private isProcessing: boolean = false;

    constructor(items: GameItem[], rootElement: HTMLElement) {
        this.items = this.duplicateAndShuffleItems(items);
        this.rootElement = rootElement;
    }

    private duplicateAndShuffleItems(items: GameItem[]): GameItem[] {
        // Duplicate each card to create pairs
        const duplicatedItems = [...items, ...items.map(item => 
            new GameItem(item.getId() + items.length, item.getName(), item.getImageUrl())
        )];
        
        // Shuffle the array
        for (let i = duplicatedItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [duplicatedItems[i], duplicatedItems[j]] = [duplicatedItems[j], duplicatedItems[i]];
        }
        
        return duplicatedItems;
    }

    setPlayer(name: string) {
        try {
            this.player = new Player(name);
            this.renderGameBoard();
            return true;
        } catch (error) {
            alert(error instanceof Error ? error.message : "Invalid player name");
            return false;
        }
    }

    renderGameBoard() {
        if (!this.player) {
            this.renderLoginForm();
            return;
        }

        this.rootElement.innerHTML = `
            <div class="game-header">
                <h2>Player: ${this.player.getName()}</h2>
                <div class="game-controls">
                    <button id="resetBtn">Reset Game</button>
                    <button id="cancelBtn">Cancel Game</button>
                </div>
            </div>
            <div class="game-board">
                ${this.items.map((item, index) => `
                    <div class="card ${item.isCardFlipped() ? 'flipped' : ''} ${item.isCardMatched() ? 'matched' : ''}" 
                         data-index="${index}">
                        <div class="card-inner">
                            <div class="card-front"></div>
                            <div class="card-back" style="background-image: url(${item.getImageUrl()})"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        this.attachEventListeners();
    }

    private renderLoginForm() {
        this.rootElement.innerHTML = `
            <div class="login-form">
                <h2>Memory Game</h2>
                <div class="form-group">
                    <input type="text" id="playerName" placeholder="Enter your name">
                    <button id="startGame">Start Game</button>
                </div>
            </div>
        `;

        const startButton = document.getElementById('startGame');
        const nameInput = document.getElementById('playerName') as HTMLInputElement;

        startButton?.addEventListener('click', () => {
            this.setPlayer(nameInput.value);
        });
    }

    private attachEventListeners() {
        const gameBoard = this.rootElement.querySelector('.game-board');
        const resetBtn = document.getElementById('resetBtn');
        const cancelBtn = document.getElementById('cancelBtn');

        gameBoard?.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const card = target.closest('.card');
            if (card && !this.isProcessing) {
                const index = parseInt(card.getAttribute('data-index') || '-1');
                if (index >= 0) {
                    this.handleCardClick(index);
                }
            }
        });

        resetBtn?.addEventListener('click', () => this.resetGame());
        cancelBtn?.addEventListener('click', () => this.cancelGame());
    }

    private async handleCardClick(index: number) {
        const clickedCard = this.items[index];
        
        if (clickedCard.isCardMatched() || clickedCard.isCardFlipped() || 
            this.flippedCards.length >= 2) {
            return;
        }

        clickedCard.flip();
        this.flippedCards.push(clickedCard);
        this.renderGameBoard();

        if (this.flippedCards.length === 2) {
            this.isProcessing = true;
            await this.checkMatch();
            this.isProcessing = false;
        }
    }

    private async checkMatch() {
        const [card1, card2] = this.flippedCards;
        
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (card1.getImageUrl() === card2.getImageUrl()) {
            card1.setMatched(true);
            card2.setMatched(true);
            this.matchedPairs++;

            if (this.matchedPairs === this.items.length / 2) {
                alert('Congratulations! You won the game!');
            }
        } else {
            card1.flip();
            card2.flip();
        }

        this.flippedCards = [];
        this.renderGameBoard();
    }

    resetGame() {
        this.items.forEach(item => item.reset());
        this.items = this.duplicateAndShuffleItems(this.items.slice(0, this.items.length / 2));
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.renderGameBoard();
    }

    cancelGame() {
        this.player = null;
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.items.forEach(item => item.reset());
        this.renderLoginForm();
    }
}    // DatDeveloper - Au Phuoc Dat