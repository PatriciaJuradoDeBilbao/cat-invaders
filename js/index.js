window.onload = () => {
    document.getElementById('play-button').onclick = () => {
        start();
        document.getElementById('play-button').blur()
    };

    function start() {
        game.init('catInvadersCanvas')
    }    
};