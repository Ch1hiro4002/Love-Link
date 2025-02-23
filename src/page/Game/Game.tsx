import { useEffect, useRef } from 'react';
import Sidebar from './Components/Up_Part/Sidebar/Sidebar';
import Button from './Components/Down_Part/Button/Button';
import Backpack from './Components/Down_Part/Backpack/Backpack';
import Chat from '../../eliza/chat/Chat';
import './Game.css';

// 引入 Phaser 和游戏创建函数
import createGame from './Components/Map/Map';

const Game = () => {
    const handleSuccess = () => {
        console.log('消息成功发送');
    };

    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const gameRef = useRef<Phaser.Game | null>(null);

    useEffect(() => {
        console.log('Game Component Mounted');

        // 保存 Phaser 游戏实例
        if (mapContainerRef.current) {
            gameRef.current = createGame(mapContainerRef.current); 
        }

        return () => {
            console.log('Cleaning up Phaser Game');
            // 销毁 Phaser 游戏实例
            if (gameRef.current) {
                gameRef.current.destroy(true); 
                gameRef.current = null;
            }
        };
    }, []);

    return (
        <div className="game-container">
            <div className="up-container">
                <div className="Map-container" ref={mapContainerRef}>
                    {/* Phaser 游戏将渲染到这里 */}
                </div>
                <div className="Sidebar-container">
                    <Sidebar />
                </div>
                <div className="Chat-container">
                    <Chat onSuccess={handleSuccess} />
                </div>
            </div>
            <div className="down-container">
                <Button />
                <Backpack />
            </div>
        </div>
    );
};

export default Game;
