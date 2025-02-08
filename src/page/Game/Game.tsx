// src/page/Game/Game.tsx

import Logo from '../../assets/Logo/Logo'
import  Sidebar  from "./Components/Up_Part/Sidebar/Sidebar";
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
                <div className='action-button'>
                    <div className="button-group">
                        <div className="ac-button">商场</div>
                        <div className="ac-button">设置</div>
                    </div>
                    <div className="button-group">
                        <div className="ac-button">帮助</div>
                        <div className="ac-button">退出</div>
                    </div>
                </div>
                <div className='backpack'>
                    <div className="slot">格子 1</div>
                    <div className="slot">格子 2</div>
                    <div className="slot">格子 3</div>
                    <div className="slot">格子 4</div>
                    <div className="slot">格子 5</div>
                    <div className="slot">格子 6</div>
                    <div className="slot">格子 7</div>
                    <div className="slot">格子 8</div>
                </div>
            </div>
        </div>
    )
}

export default Game;