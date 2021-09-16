import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'

export default class Game {
  constructor (canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.engine = new BABYLON.Engine(this.canvas, true)
    this.time = 0
  }

  createScene () {
    this.scene = new BABYLON.Scene(this.engine);

    this.camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
    this.camera.setTarget(BABYLON.Vector3.Zero())
    this.camera.attachControl(this.canvas, false)

    this.light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));

    let box = BABYLON.MeshBuilder.CreateBox("box", {});
  }

  doRender () {
    this.engine.runRenderLoop(() => {
      this.scene.render() 
    })

    window.addEventListener('resize', () => {
      this.engine.resize()
    })
  }
}
