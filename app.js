let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true; // true for "O", false for "X"
let clicks = 0;

let xPositions = []; // Tracks positions of "X"
let oPositions = []; // Tracks positions of "O"

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    clicks = 0;
    turnO = true;
    xPositions = [];
    oPositions = [];
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was clicked");

        if (turnO) {
            oPositions.push(box);
            if (oPositions.length > 3) {
                let oldestBox = oPositions.shift();
                oldestBox.innerText = ""; // Clear the oldest "O"
                oldestBox.disabled = false; // Re-enable the box
            }
            box.innerText = "O";
            box.style.color = "orange";
            turnO = false;
        } else {
            xPositions.push(box);
            if (xPositions.length > 3) {
                let oldestBox = xPositions.shift();
                oldestBox.innerText = ""; // Clear the oldest "X"
                oldestBox.disabled = false; // Re-enable the box
            }
            box.innerText = "X";
            box.style.color = "#b0413e";
            turnO = true;
        }

        clicks++;
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congo 🎉 Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const drawMessage = () => {
    msg.innerText = `The Game is Draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return;
            }
        }
    }

    // Check for draw
    // if (clicks === 9) {
    //     drawMessage();
    // }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
