import * as Phaser from "phaser";

class MyScene extends Phaser.Scene {
  constructor() {
    // Phaser.Sceneのコンストラクタにはstringかオブジェクト（Phaser.Types.Scenes.SettingsConfig）を渡す
    // 以下は { key: 'myscene' } を渡したのと同義になる
    super("myscene");
  }

  preload() {}

  create() {
    const { width, height } = this.game.canvas;

    const addTxt = this.add
      .text(400, 300, "RPG Battle", { fontFamily: "arial", fontSize: "60px" })
      .setOrigin(0.5);
    const zone = this.add.zone(width / 2, height / 2, width, height);

    // Zoneをクリックできるように設定
    zone.setInteractive({
      useHandCursor: true, // マウスオーバーでカーソルが指マークになる
    });

    zone.on("pointerdown", () => {
      this.scene.start("janken");
    });
  }
}

class Janken extends Phaser.Scene {
  constructor() {
    super("janken");
  }
  preload() {}
  create() {
    const turnEv = () => {
      zone.removeListener("pointerup");
      const types = ["武器", "魔法", "弓矢"];

      const randKey = Math.floor(Math.random() * types.length);

      const msg = this.add
        .text(400, 400, `主人公の${types[randKey]}攻撃`)
        .setOrigin(0.5, 0.5);
      const listener_2 = zone.addListener("pointerup", () => {
        zone.removeListener("pointerup");
        msg.removeFromDisplayList();

        const eneRandKey = Math.floor(Math.random() * types.length);
        const offset = randKey - eneRandKey;
        if (offset == 0) {
          const msg2 = this.add
            .text(400, 400, "互角の戦い！")
            .setOrigin(0.5, 0.5);
          const listener_3 = zone.addListener("pointerup", () => {
            zone.removeListener("pointerup");
            msg2.removeFromDisplayList();
            turnEv();
          });
        }
        if (offset == 1 || offset == -2) {
          const msg2 = this.add
            .text(400, 400, "好相性！ 相手にダメージ！")
            .setOrigin(0.5, 0.5);
          eneHP -= 50;
          const listener_3 = zone.addListener("pointerup", () => {
            zone.removeListener("pointerup");
            msg2.removeFromDisplayList();
            turnEv();
          });
        }

        if (offset == 2 || offset == -1) {
          myHP -= 50;
          const msg2 = this.add
            .text(400, 400, "悪相性！ 自分にダメージ！")
            .setOrigin(0.5, 0.5);
          const listener_3 = zone.addListener("pointerup", () => {
            zone.removeListener("pointerup");
            msg2.removeFromDisplayList();
            turnEv();
          });
        }

        myHPT.setText(myHP.toString());
        eneHPT.setText(eneHP.toString());
        
      });
    };

    let myHP = 500;
    let eneHP = 350;

    const { width, height } = this.game.canvas;
    const zone = this.add.zone(width / 2, height / 2, width, height);

    const enemy = this.add
      .text(400, 300, "敵", { fontSize: "128px", color: "#999999" })
      .setOrigin(0.5, 0.5);

    const myHPT = this.add.text(400, 50, myHP.toString()).setOrigin(0.5, 0.5);
    const eneHPT = this.add
      .text(400, 550, eneHP.toString())
      .setOrigin(0.5, 0.5);

    zone.setInteractive();

    const listener_1 = zone.addListener("pointerup", () => {
      turnEv();
    });
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO, // webGLを使うかcanvasを使うかをphaserが自動で判断してくれる
  width: 800,
  height: 600,
  parent: "game-app", // #game-app内にcanvasを生成
  scene: [MyScene, Janken],
};

new Phaser.Game(config);
