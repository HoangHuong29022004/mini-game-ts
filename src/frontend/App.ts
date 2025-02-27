import { GameController } from "./controllers/GameController";
import { GameItem } from "./models/GameItem";
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    const playerName = sessionStorage.getItem('playerName');
    if (!playerName) {
        window.location.href = '/login';
        return;
    }

    const rootElement = document.querySelector('#app');
    if (!rootElement) return;

    // Mảng hình Pokemon để test
    const POKEMON_IMAGES = [
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',  // Bulbasaur
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',  // Charmander
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',  // Squirtle
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png', // Pikachu
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png', // Eevee
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png', // Snorlax
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png', // Mewtwo
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png', // Mew
    ];

    // Tạo các game items từ hình Pokemon
    const gameItems = POKEMON_IMAGES.map((url, index) => 
        new GameItem(index + 1, `Pokemon ${index + 1}`, url)
    );

    // Khởi tạo game controller
    const gameController = new GameController(gameItems, rootElement as HTMLElement);
    gameController.setPlayer(playerName);
    gameController.renderGameBoard();

    // Xử lý nút Reset
    document.getElementById('resetBtn')?.addEventListener('click', () => {
        gameController.resetGame();
    });

    // Xử lý nút Cancel
    document.getElementById('cancelBtn')?.addEventListener('click', () => {
        sessionStorage.removeItem('playerName');
        window.location.href = '/login';
    });
});