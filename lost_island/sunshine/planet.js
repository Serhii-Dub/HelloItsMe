AFRAME.registerComponent('planet', {
  schema: {
    dist: {type: 'number'},
    mass: {type: 'number'},
    name: {type: 'string'}
  },
  init: function () {
    this.angle = Math.random() * 360;
  },
  tick: function (time, timeDelta) {
    const radius = this.data.dist / 1e9;
    this.angle += (timeDelta / 1000) * 0.1;
    const rad = THREE.MathUtils.degToRad(this.angle);
    const x = radius * Math.cos(rad);
    const z = radius * Math.sin(rad);
    this.el.setAttribute('position', {x: x, y: 0, z: z});
  }
});

AFRAME.registerComponent("spin", {
  schema: {
    speed: { type: "number", default: 1 }
  },
  tick: function (time, timeDelta) {
    this.el.object3D.rotation.y += this.data.speed * timeDelta / 1000;
  }
});
