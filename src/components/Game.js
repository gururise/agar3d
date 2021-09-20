import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'

export default class Game {
  constructor (canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.engine = new BABYLON.Engine(this.canvas, true)
    this.time = 0
  }

  createScene () {
    this.scene = new BABYLON.Scene(this.engine)

    var box = BABYLON.BoxBuilder.CreateBox('box', {size: 0.25}, this.scene)

    box.registerInstancedBuffer('color', 4)
    box.instancedBuffers.color = new BABYLON.Color4(1, 0, 0, 1)
    this.scene.createDefaultLight()

    for (var index = 0; index < 10000; index++) {
      var instance = box.createInstance('box' + index)

      instance.rotation.x = Math.random() * 2 * Math.PI
      instance.rotation.y = Math.random() * 2 * Math.PI
      instance.rotation.z = Math.random() * 2 * Math.PI

      instance.position.x = 10 - Math.random() * 500
      instance.position.y = 10 - Math.random() * 500
      instance.position.z = 10 - Math.random() * 500

      instance.instancedBuffers.color = new BABYLON.Color4(1, Math.random(), Math.random(), 1)
    }

    this.camera = new BABYLON.FollowCamera('FollowCam', new BABYLON.Vector3(0, 0, 0), this.scene)
    this.camera.attachControl(this.canvas, true)

    var sphere = BABYLON.MeshBuilder.CreateSphere('player', {diameter: 1, segments: 32}, this.scene)
    // eslint-disable-next-line no-unused-expressions
    sphere.position === new BABYLON.Vector3(0, 0, 0)

    this.camera.lockedTarget = sphere
    this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0))

    this.scene.onKeyboardObservable.add((kbInfo) => {
      switch (kbInfo.type) {
        case BABYLON.KeyboardEventTypes.KEYDOWN:
          console.log('KEY DOWN: ', kbInfo.event.key)
          break
        case BABYLON.KeyboardEventTypes.KEYUP:
          console.log('KEY UP: ', kbInfo.event.keyCode)
          break
      }
    })
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
