const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
let currentInput = "";
let lyricIndex = 0;
let charIndex = 0;
let typing = false;
let typingTimeout;
const cursor = document.createElement("span");
cursor.className = "cursor";
cursor.textContent = "|";

const lyrics = [
  "woooah, oh",
  "nandito ako",
  "umiibig sa'yo",
  "kahit na",
  "nagdurugo ang puso",
  "at kung sakaling",
  "iwanan ka niya",
  "wag kang mag-alala",
  "may nag mamahal sayo",
  "nandito ako."
];

const tempos = [150, 120, 120, 150, 150, 120, 120, 140, 120, 140, 160];
const pauses = [2000, 1000, 1000, 1500, 1500, 1000, 1000, 1400, 1000, 1400, 2000];

function updateDisplay(value) {
  display.textContent = value;
  display.appendChild(cursor);
}

function resetTyping() {
  clearTimeout(typingTimeout);
  lyricIndex = 0;
  charIndex = 0;
  typing = true;
  updateDisplay("");
  typeLyrics();
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;
    if (value === "AC") {
      resetTyping();
      return;
    }
    if (typing) return;
    if (value === "=") {
      try {
        currentInput = eval(currentInput.replace(/×/g, "*").replace(/÷/g, "/")).toString();
        updateDisplay(currentInput);
      } catch {
        updateDisplay("Error");
        currentInput = "";
      }
      return;
    }
    if (value === "√") {
      try {
        currentInput = Math.sqrt(eval(currentInput)).toString();
        updateDisplay(currentInput);
      } catch {
        updateDisplay("Error");
        currentInput = "";
      }
      return;
    }
    if (value === "+/-") {
      if (currentInput) {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay(currentInput);
      }
      return;
    }
    currentInput += value;
    updateDisplay(currentInput);
  });
});

function typeLyrics() {
  if (lyricIndex >= lyrics.length) {
    typing = false;
    return;
  }
  const speed = tempos[lyricIndex] || 120;
  if (charIndex < lyrics[lyricIndex].length) {
    updateDisplay(display.textContent.replace("|", "") + lyrics[lyricIndex][charIndex]);
    charIndex++;
    typingTimeout = setTimeout(typeLyrics, speed);
  } else {
    const pause = pauses[lyricIndex] || 1000;
    lyricIndex++;
    charIndex = 0;
    typingTimeout = setTimeout(() => {
      updateDisplay("");
      typeLyrics();
    }, pause);
  }
}
