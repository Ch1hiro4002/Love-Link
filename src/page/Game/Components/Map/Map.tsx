import React, { useEffect } from 'react';
import Phaser from 'phaser';

const Map: React.FC = () => {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0,y: 0 },
          debug: false,
        },
      },
    };

    const game = new Phaser.Game(config);

    function preload(this: Phaser.Scene) {
      this.load.tilemapTiledJSON('map', 'maps/lovelink-map.json');
    }

    function create(this: Phaser.Scene) {
        // 创建用户互动按钮
        this.add.text(400, 300, 'Start Audio', { color: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => {
                // 创建 AudioContext
                new AudioContext();
                // 继续你的音频逻辑
                console.log('AudioContext created');
            });

        // 加载地图
        this.make.tilemap({ key: 'map' });
    }

    function update(this: Phaser.Scene) {
      // 更新逻辑
    }

    return () => {
      game.destroy(true); // 清理游戏实例
    };
  }, []);

  return <div id="game-container" />;
};

export default Map;