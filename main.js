(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("storyReelRoot");
    if (!root) return;

    const odrag = root.querySelector("#drag-container");
    const ospin = root.querySelector("#spin-container");
    const ground = root.querySelector("#ground");
    const canvas = root.querySelector("#canvas");

    if (!odrag || !ospin || !ground || !canvas) return;

    let radius = 240;
    const autoRotate = true;
    const rotateSpeed = -60;
    const imgWidth = 120;
    const imgHeight = 170;

    const images = ospin.getElementsByTagName("img");
    const videos = ospin.getElementsByTagName("video");
    const items = [...images, ...videos];

    if (!items.length) return;

    ospin.style.width = `${imgWidth}px`;
    ospin.style.height = `${imgHeight}px`;
    ground.style.width = `${radius * 3}px`;
    ground.style.height = `${radius * 3}px`;

    const init = (delayTime) => {
      items.forEach((el, i) => {
        el.style.transform = `rotateY(${i * (360 / items.length)}deg) translateZ(${radius}px)`;
        el.style.transition = "transform 1s";
        el.style.transitionDelay = delayTime || `${(items.length - i) / 4}s`;
      });
    };

    setTimeout(init, 1000);

    let desX = 0;
    let desY = 0;
    let tX = 0;
    let tY = 10;

    const applyTransform = () => {
      if (tY > 180) tY = 180;
      if (tY < 0) tY = 0;
      odrag.style.transform = `rotateX(${-tY}deg) rotateY(${tX}deg)`;
    };

    if (autoRotate) {
      const animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
      ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
    }

    const setSpinPlayState = (running) => {
      ospin.style.animationPlayState = running ? "running" : "paused";
    };

    odrag.addEventListener("pointerdown", (e) => {
      clearInterval(odrag.timer);
      let startX = e.clientX;
      let startY = e.clientY;

      const onPointerMove = (moveEvent) => {
        const nX = moveEvent.clientX;
        const nY = moveEvent.clientY;
        desX = nX - startX;
        desY = nY - startY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTransform();
        startX = nX;
        startY = nY;
      };

      const onPointerUp = () => {
        odrag.timer = setInterval(() => {
          desX *= 0.95;
          desY *= 0.95;
          tX += desX * 0.1;
          tY += desY * 0.1;
          applyTransform();
          setSpinPlayState(false);

          if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
            clearInterval(odrag.timer);
            setSpinPlayState(true);
          }
        }, 17);

        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
      };

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    });

    odrag.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        const delta = e.deltaY ? -e.deltaY / 30 : e.wheelDelta / 20;
        radius += delta;
        init(1);
      },
      { passive: false }
    );

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles = [];

    const resizeCanvas = () => {
      canvas.width = root.clientWidth;
      canvas.height = root.clientHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const rand = (min, max) => Math.random() * (max - min) + min;

    const spawnParticle = () => {
      const isHeart = Math.random() > 0.55;
      particles.push({
        x: rand(0, canvas.width),
        y: canvas.height + rand(0, 40),
        vx: rand(-0.5, 0.5),
        vy: rand(-2.6, -1.1),
        size: rand(6, 14),
        life: 1,
        decay: rand(0.004, 0.012),
        isHeart,
        hue: rand(320, 360)
      });
    };

    const drawHeart = (x, y, size, alpha, hue) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 14, size / 14);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-7, -7, -14, 3, 0, 14);
      ctx.bezierCurveTo(14, 3, 7, -7, 0, 0);
      ctx.fillStyle = `hsla(${hue}, 95%, 66%, ${alpha})`;
      ctx.fill();
      ctx.restore();
    };

    const drawSpark = (x, y, size, alpha, hue) => {
      ctx.beginPath();
      ctx.arc(x, y, size / 3, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hue}, 95%, 72%, ${alpha})`;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.22) spawnParticle();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.isHeart) {
          drawHeart(p.x, p.y, p.size, p.life, p.hue);
        } else {
          drawSpark(p.x, p.y, p.size, p.life, p.hue);
        }

        if (p.life <= 0 || p.y < -20) particles.splice(i, 1);
      }

      requestAnimationFrame(animate);
    };

    animate();
  });
})();
