import { UserController } from "./controllers/UserController";
const appElement : HTMLElement = document.querySelector('#app') as HTMLElement;

console.log('LoginForm');

if (appElement){
    let usercontroller: UserController = new UserController (appElement);
}

document.addEventListener('DOMContentLoaded', () => {
    const startGameBtn = document.getElementById('startGame');
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const usernameHelp = document.getElementById('usernameHelp');

    function validateUsername(username: string): boolean {
        return username.length >= 2 && /^[a-zA-Z0-9\s]+$/.test(username);
    }

    startGameBtn?.addEventListener('click', () => {
        const username = usernameInput?.value.trim();

        if (username && validateUsername(username)) {
            // Lưu tên người chơi vào sessionStorage
            sessionStorage.setItem('playerName', username);
            // Chuyển hướng đến trang game
            window.location.href = '/board';
        } else {
            usernameHelp?.classList.remove('d-none');
        }
    });

    // Ẩn thông báo lỗi khi người dùng bắt đầu nhập
    usernameInput?.addEventListener('input', () => {
        usernameHelp?.classList.add('d-none');
    });

    // Cho phép submit form bằng phím Enter
    usernameInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            startGameBtn?.click();
        }
    });
});