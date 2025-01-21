document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.getElementById("welcomeScreen");
  const mainContent = document.getElementById("mainContent");
  const enterButton = document.getElementById("enterButton");
  const birthdaySong = document.getElementById("birthdaySong");
  const toggleMusic = document.getElementById("toggleMusic");
  const timerDisplay = document.getElementById("timer");
  const countdown = document.getElementById("countdown");
  const countdownNumber = document.querySelector(".countdown-number");
  let isPlaying = false;
  let timerInterval;

  // Format time function
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  // Update timer function
  function updateTimer() {
    const currentTime = birthdaySong.currentTime;
    const duration = birthdaySong.duration;
    timerDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(
      duration
    )}`;
  }

  // Start countdown function
  function startCountdown() {
    let count = 10;
    welcomeScreen.style.display = "none";
    countdown.style.display = "flex";
    birthdaySong.play();
    isPlaying = true;
    toggleMusic.textContent = "🎵 Pause Music";

    const countInterval = setInterval(() => {
      count--;
      countdownNumber.textContent = count;

      if (count <= 0) {
        clearInterval(countInterval);
        countdown.style.display = "none";
        mainContent.style.display = "block";
        startConfetti();
        timerInterval = setInterval(updateTimer, 1000);
      }
    }, 1000);
  }

  // Welcome screen animation
  enterButton.addEventListener("click", startCountdown);

  // Music controls
  toggleMusic.addEventListener("click", () => {
    if (isPlaying) {
      birthdaySong.pause();
      toggleMusic.textContent = "🎵 Play Music";
      clearInterval(timerInterval);
    } else {
      birthdaySong.play();
      toggleMusic.textContent = "🎵 Pause Music";
      timerInterval = setInterval(updateTimer, 1000);
    }
    isPlaying = !isPlaying;
  });

  // Update timer when audio loads
  birthdaySong.addEventListener("loadedmetadata", () => {
    updateTimer();
  });

  // Handle audio ending
  birthdaySong.addEventListener("ended", () => {
    isPlaying = false;
    toggleMusic.textContent = "🎵 Play Music";
    clearInterval(timerInterval);
    updateTimer();
  });

  // Confetti animation
  function startConfetti() {
    const duration = 15 * 1000,
      animationEnd = Date.now() + duration,
      defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#ffd700", "#ffeb3b", "#2c1810", "#ffffff"],
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#ffd700", "#ffeb3b", "#2c1810", "#ffffff"],
        })
      );
    }, 250);
  }

  // Create floating balloons
  function createBalloons() {
    const colors = ["#ffd700", "#ffeb3b", "#2c1810"];
    const mainContent = document.getElementById("mainContent");

    for (let i = 0; i < 10; i++) {
      const balloon = document.createElement("div");
      balloon.className = "balloon";
      balloon.style.cssText = `
                position: fixed;
                bottom: -100px;
                left: ${Math.random() * 100}vw;
                width: 30px;
                height: 40px;
                background-color: ${
                  colors[Math.floor(Math.random() * colors.length)]
                };
                border-radius: 50%;
                animation: floatBalloon ${
                  10 + Math.random() * 10
                }s linear infinite;
                z-index: -1;
            `;
      mainContent.appendChild(balloon);
    }
  }

  // Add balloon animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes floatBalloon {
            0% {
                transform: translateY(100vh) rotate(0deg);
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
            }
        }
    `;
  document.head.appendChild(style);

  // Start balloon animation
  createBalloons();
  setInterval(createBalloons, 15000); // Create new balloons every 15 seconds
});
