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
      .text(400, 300, "JANKEN", { fontFamily: "arial", fontSize: "60px" })
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
    const g = this.add
      .text(400, 250, "グー", { fontSize: "36px" })
      .setOrigin(0.5, 0.5);
    g.setInteractive();
    const c = this.add
      .text(250, 400, "チョキ", { fontSize: "36px" })
      .setOrigin(0.5, 0.5);
    c.setInteractive();
    const p = this.add
      .text(650, 400, "パー", { fontSize: "36px" })
      .setOrigin(0.5, 0.5);
    p.setInteractive();

    g.on(
      "pointerup",
      (pointer: PointerEvent) => {
        console.log("グー");
        console.log(pointer);
      },
      this
    );
    c.on(
      "pointerup",
      (pointer: PointerEvent) => {
        console.log("チョキ");
        console.log(pointer);
      },
      this
    );
    p.on(
      "pointerup",
      (pointer: PointerEvent) => {
        console.log("パー");
        console.log(pointer);
      },
      this
    );
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
