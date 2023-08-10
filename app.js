const gridContainer = document.querySelector(".grid-container");
const newGridButton = document.querySelector(".new-grid");
const startOverButton = document.querySelector(".clear-grid")

function createBoard(boardSize) {
    gridContainer.innerHTML = ""; // Clear the previous grid
    const boardArea = boardSize * boardSize; //BoardSize deterned by user's input, creates boardArea
    
    for (let i = 0; i < boardArea; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("grid-square");
        newDiv.setAttribute("data-id", i);
        gridContainer.appendChild(newDiv);
        randomizeColor()
        
    }
    gridContainer.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;
}

window.addEventListener("load", () => {
    setOpacity()
  });

  

newGridButton.addEventListener("click", () => {
    while (true) {
        const newSize = prompt("Enter the side length of your grid:", "e.g., 16");
        const boardSize = parseInt(newSize);

        if (!isNaN(boardSize) && 100 > boardSize > 0) {
            createBoard(boardSize);
            break;
        } else {
            alert("Invalid input. Please enter a positive number.");
        }
    }
    setOpacity()
});


// Initial grid creation
createBoard(16);


// Apply random color variable to mouse enter event listener 
document.querySelectorAll(".grid-square").forEach(div => {
    div.addEventListener("mouseenter", () => {
        div.style.backgroundColor = randomizeColor();
    });

// Remove random color variable on mouse leave
    div.addEventListener("mouseleave", () => {
        div.style.backgroundColor = "black"; // Reset color on mouse leave
    });
});

//Clears board of all filled-in divs using removeColor function
startOverButton.addEventListener("click", () => {
    removeColor()
    setOpacity()
})

// Function to create random color variable
function randomizeColor() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    return "rgb(" + x + "," + y + "," + z + ")";
}

//Function removes background color from all divs
function removeColor() {
    document.querySelectorAll(".grid-square").forEach(div => {
        div.style.backgroundColor = ""
    })
}

//Function incrementally increases opacity each time mouse enters a div
function setOpacity() {
    document.querySelectorAll(".grid-square").forEach(div => {
        let opacity = 0
        div.addEventListener("mouseenter", () => {
            div.style.backgroundColor = randomizeColor();
        });
    
        div.addEventListener("mouseleave", () => {
            opacity += .1
            div.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`; // Use rgba to set background color with opacity
        });
    });
}