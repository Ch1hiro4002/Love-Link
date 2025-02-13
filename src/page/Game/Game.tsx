// src/page/Game/Game.tsx

import Logo from '../../assets/Logo/Logo'
import  Sidebar  from "./Components/Up_Part/Sidebar/Sidebar";
import Button from './Components/Down_Part/Button/Button';
import Backpack from './Components/Down_Part/Backpack/Backpack';
import './Game.css'
const Game = () => {
    return(
        <div className="game-container">
            <div className="up-container">
                <div className="logo-container">
                    <Logo />
                </div>
                <div className="Sidebar-container">
                    <Sidebar />
                </div>
            </div>
            <div className="down-container">
                <Button />
                <Backpack />
            </div>
        </div>
    )
}

export default Game;