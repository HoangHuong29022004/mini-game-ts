import { GameController } from "./controllers/GameController";
import { GameItem } from "./models/GameItem";
import './style.css';

// Sample Pokemon image URLs - you can replace these with your own images
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

// Get the root element
const rootElement = document.querySelector('#app') as HTMLElement;

if (rootElement) {
    // Create game items from Pokemon images
    const gameItems = POKEMON_IMAGES.map((url, index) => 
        new GameItem(index + 1, `Pokemon ${index + 1}`, url)
    );

    // Initialize the game controller
    new GameController(gameItems, rootElement);
}