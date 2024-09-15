let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let messageDiv = document.querySelector(".message");

let turnO = true;
let gameActive = true;

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

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "" && gameActive) {
            if (turnO) {
                box.innerText = "O";
                turnO = false;
            } else {
                box.innerText = "X";
                turnO = true;
            }
            box.disabled = true;
            checkWinner();
        }
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                gameActive = false;
                messageDiv.innerText = `Player ${pos1} Wins!`;
                return;
            }
        }
    }

    // Check for a draw
    if ([...boxes].every(box => box.innerText !== "")) {
        messageDiv.innerText = "It's a Draw!";
        gameActive = false;
    }
};

resetBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    turnO = true;
    gameActive = true;
    messageDiv.innerText = "";
});
