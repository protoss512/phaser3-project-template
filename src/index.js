import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import desert from './assets/desert.jpg';
import leftArrow from './assets/leftArrow.svg';
var language;
if (localStorage.getItem("language") == null) language = 'zh'

function lang(s) {
    return langText[s][language]
}

class SettingMenu extends Phaser.Scene {
    constructor() {
        super('SettingMenu');
    }

    preload() {
        this.load.image('leftArrow', leftArrow);
    }

    create() {

        //var back = this.add.sprite(50, 50, 'leftArrow');
        var back = this.add.image(50, 50, 'leftArrow');
        back.setOrigin(0.5);
        back.setInteractive();
        back.on('pointerdown',()=>{
            this.scene.start('MainMenu');
        });
    }
}

class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        this.load.image('desert', desert);
    }

    create() {

        const cameraWidth = this.cameras.main.width
        const cameraHeight = this.cameras.main.height

        var desert = this.add.image(0, 0, 'desert').setOrigin(0)
        desert.setScale(Math.max(cameraWidth / desert.width, cameraHeight / desert.height))

        this.tweens.add({
            targets: desert,
            scale: { to: 0.2, from: 0.3 },
            duration: 50000,
            from: { x: cameraWidth / 2, y: cameraHeight / 2 },
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        })

        var title = this.add
            .text(this.cameras.main.width / 2, 50, lang('gameTitle'), {
                color: '#ffffff',
                font: '80px Arial Black',
                align: 'center',
                fontWeight: 'bold',
                stroke: '#222222',
                strokeThickness: 6,
                fill: '#FF9224'
            })
            .setOrigin(0.5)

        const startGameBtn = this.add
            .text(this.cameras.main.width / 2, this.cameras.main.height / 2, lang('startGame'), {
                color: '#ffffff',
                font: '40px Arial Black',
                align: 'center',
                fontWeight: 'bold',
                stroke: '#222222',
                strokeThickness: 6,
                fill: '#CCCCCC'
            })
            .setOrigin(0.5).setInteractive()
        startGameBtn.on('pointerdown', function (pointer) {

            console.log("down")

        });

        const settingBtn = this.add
            .text(this.cameras.main.width / 2, (this.cameras.main.height / 2) + 50, lang('setting'), {
                color: '#ffffff',
                font: '40px Arial Black',
                align: 'center',
                fontWeight: 'bold',
                stroke: '#222222',
                strokeThickness: 6,
                fill: '#CCCCCC'
            })
            .setOrigin(0.5).setInteractive()
        settingBtn.on('pointerdown', (pointer) => {

            this.scene.start('SettingMenu');

        });
    }
}

class MyGame extends Phaser.Scene {
    constructor() {
        super('MyGame');
    }

    preload() {
        this.load.image('logo', logoImg);
    }

    create() {
        console.log("hello")
        const logo = this.add.image(400, 150, 'logo');

        this.tweens.add({
            targets: logo,
            y: 400,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });

        const title = this.add
            .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
                color: '#ffffff',
                fontSize: 40
            })
            .setOrigin(1, 0).setInteractive()

        title.on('pointerdown', function (pointer) {

            console.log("down")

        });
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#222222',
    scene: [MainMenu, MyGame, SettingMenu]
};

const game = new Phaser.Game(config);
