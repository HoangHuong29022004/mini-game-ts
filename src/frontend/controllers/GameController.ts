import { GameItem } from "../models/GameItem";
import { Player } from "../models/Player";

export class GameController {
    private items: GameItem[];
    private rootElement: HTMLElement;
    private player: Player | null = null;
    private flippedCards: GameItem[] = [];
    private matchedPairs: number = 0;
    private isProcessing: boolean = false;
    private score: number = 0;
    private timeLeft: number = 120; // 2 phút
    private timerInterval: NodeJS.Timeout | null = null;

    constructor(items: GameItem[], rootElement: HTMLElement) {
        this.items = this.duplicateAndShuffleItems(items);
        this.rootElement = rootElement;
    }

    setPlayer(name: string) {
        try {
            this.player = new Player(name);
            // Cập nhật tên người chơi trên giao diện
            const playerNameElement = document.getElementById('playerName');
            if (playerNameElement) {
                playerNameElement.textContent = name;
            }
            // Bắt đầu đếm thời gian
            this.startTimer();
        } catch (error) {
            console.error('Error setting player name:', error);
            window.location.href = '/login';
        }
    }

    private startTimer() {
        const timerElement = document.getElementById('timer');
        if (!timerElement) return;

        // Reset timer nếu đang chạy
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        this.timeLeft = 120; // Reset về 2 phút
        timerElement.textContent = this.timeLeft.toString();

        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            timerElement.textContent = this.timeLeft.toString();

            if (this.timeLeft <= 0) {
                this.endGame(false);
            }
        }, 1000);
    }

    private endGame(isWin: boolean) {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        const message = isWin 
            ? `Chúc mừng! Bạn đã thắng với ${this.score} điểm!`
            : `Hết giờ! Bạn đã thua. Điểm số của bạn: ${this.score}`;
        
        alert(message);
        
        // Cho người chơi lựa chọn chơi lại hoặc thoát
        if (confirm('Bạn có muốn chơi lại không?')) {
            this.resetGame();
        } else {
            window.location.href = '/login';
        }
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

    renderGameBoard() {
        const boardElement = document.getElementById('board');
        if (!boardElement) return;

        // Tạo HTML cho các thẻ bài
        const cardsHTML = this.items.map((item, index) => `
            <div class="col-md-3 mb-4">
                <div class="gameItem ${item.isCardFlipped() ? 'flipped' : ''} ${item.isCardMatched() ? 'matched' : ''}" 
                     data-index="${index}">
                    <img src="${item.isCardFlipped() ? item.getImageUrl() : ''}" 
                         class="img-fluid ${item.isCardFlipped() ? 'visible' : 'invisible'}"
                         alt="card">
                </div>
            </div>
        `).join('');

        boardElement.innerHTML = cardsHTML;

        // Cập nhật điểm số
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.textContent = this.score.toString();
        }

        // Thêm event listeners cho các thẻ bài
        boardElement.querySelectorAll('.gameItem').forEach((card, index) => {
            card.addEventListener('click', () => this.handleCardClick(index));
        });
    }

    private async handleCardClick(index: number) {
        if (this.isProcessing) return;

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
            this.score += 100;

            if (this.matchedPairs === this.items.length / 2) {
                this.endGame(true);
            }
        } else {
            card1.flip();
            card2.flip();
            this.score = Math.max(0, this.score - 20);
        }

        this.flippedCards = [];
        this.renderGameBoard();
    }

    resetGame() {
        // Reset game state
        this.items.forEach(item => item.reset());
        this.items = this.duplicateAndShuffleItems(this.items.slice(0, this.items.length / 2));
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.score = 0;

        // Restart timer
        this.startTimer();

        // Render new game board
        this.renderGameBoard();
    }
}