AFRAME.registerComponent('planet', {
  schema: {
    dist: {type: 'number'},  // Відстань від Сонця
    mass: {type: 'number'},  // Масса планети
    name: {type: 'string'}   // Назва планети
  },
  init: function () {
    this.angle = Math.random() * 360;  // Початковий кут обертання
    this.orbitRadius = this.data.dist / 1e9;  // Визначаємо орбітальний радіус
  },
  tick: function (time, timeDelta) {
    // Вираховуємо нове положення планети по колу
    const speed = 0.1;  // Швидкість обертання планети
    this.angle += (timeDelta / 1000) * speed;

    const rad = THREE.MathUtils.degToRad(this.angle);
    const x = this.orbitRadius * Math.cos(rad);
    const z = this.orbitRadius * Math.sin(rad);

    // Оновлюємо позицію планети (враховуємо орбіту навколо Сонця)
    this.el.setAttribute('position', {x: x, y: 0, z: z});
  }
});
