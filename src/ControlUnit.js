import './ControlUnit.css';

export default function ControlUnit ({resetGame, joinGame}){
    
    function showSideMenu(e){
        e.target = e.target.parentNode;
        e.target.classList.toggle('control-appear');
        
        const sideMenu = document.getElementsByClassName("top-control-section")[0];
        sideMenu.classList.toggle('control-appear');
    }
    return(
        <>
            <button className='buttonStyle gear-button' onClick={showSideMenu}><span>⚙</span></button>
            <section className="top-control-section">
                <button className='buttonStyle join-game-button' onClick={joinGame}>Join Game</button>
                <button className='buttonStyle reset-game-button' onClick={resetGame}>Reset Game</button>
                <button className='buttonStyle about-button'>About Us</button>
                <button className='buttonStyle howToPlay-button'>How to Play</button>
            </section>
        </>
    )
}