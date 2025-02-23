import Phaser from 'phaser';

const config = {
    type: Phaser.AUTO,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
    },
    scene: {
        preload,
        create,
    },
    scale: {
        mode: Phaser.Scale.RESIZE,  
        autoCenter: Phaser.Scale.CENTER_BOTH,  
    }
};

function preload() {
    this.load.image('map', 'maps/lovelink-map.png');
};

function create() {
    const map = this.add.image(0, 0, 'map').setOrigin(0);
    const scaleX = this.cameras.main.width / map.width;
    const scaleY = this.cameras.main.height / map.height;
    
    const scale = Math.max(scaleX, scaleY);
    map.setScale(scale);
}

export default function createGame(container) {
    config.parent = container; 
    return(new Phaser.Game(config));
}



