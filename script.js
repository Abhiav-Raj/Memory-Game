const plus = document.querySelector(".bi-plus");
const minus = document.querySelector(".bi-dash");
const resetButton = document.querySelector("button");
let counter = 2;

function generatePairs() {
    const pairs = [];
    const totalBlocks = counter * counter;
    const uniqueNumbers = totalBlocks / 2;

    for (let i = 1; i <= uniqueNumbers; i++) {
        pairs.push(i);
        pairs.push(i);
    }

    return pairs.sort(() => Math.random() - 0.5);
}

function updateBlocks() {
    const numbers = generatePairs();
    let clutter = "";

    for (let i = 0; i < numbers.length; i++) {
        clutter += `<div class="min-blocks">
            <h3>${numbers[i]}</h3>
        </div>`;
    }

    document.querySelector(".blocks").innerHTML = clutter;
    document.querySelector(".blocks").style.gridTemplateColumns = `repeat(${counter}, 1fr)`;

    let firstBlock = null;
    let secondBlock = null;

    const minBlocks = document.querySelectorAll(".min-blocks");

    minBlocks.forEach((element) => {
        const h3 = element.querySelector("h3");
        h3.style.opacity = "0";
        element.style.backgroundColor = "white";

        element.addEventListener("click", () => {
            if (h3.style.opacity === "1" || (firstBlock && secondBlock)) {
                return;
            }

            h3.style.opacity = "1";
            element.style.backgroundColor = "aqua";

            if (!firstBlock) {
                firstBlock = element;
            } else {
                secondBlock = element;

                const firstNumber = firstBlock.querySelector("h3").textContent;
                const secondNumber = secondBlock.querySelector("h3").textContent;

                if (firstNumber === secondNumber) {
                    firstBlock.style.backgroundColor = "aquamarine";
                    secondBlock.style.backgroundColor = "aquamarine";
                    firstBlock = null;
                    secondBlock = null;
                } else {
                    setTimeout(() => {
                        firstBlock.querySelector("h3").style.opacity = "0";
                        secondBlock.querySelector("h3").style.opacity = "0";
                        firstBlock.style.backgroundColor = "white";
                        secondBlock.style.backgroundColor = "white";
                        firstBlock = null;
                        secondBlock = null;
                    }, 500);
                }
            }
        });
    });
}

function resetBlocks() {
    updateBlocks();
}

plus.addEventListener("click", () => {
    if (counter < 8) {
        counter++;
        document.querySelector("#value").innerHTML = counter;
        updateBlocks();
    }
});

minus.addEventListener("click", () => {
    if (counter > 2) {
        counter--;
        document.querySelector("#value").innerHTML = counter;
        updateBlocks();
    }
});

resetButton.addEventListener("click", resetBlocks);

updateBlocks();
