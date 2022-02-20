const container = document.getElementById('container');
const clear = document.getElementById('clear');
let black = true;
let num = 16;
let opacity = false;
// Create a webpage with a 16x16 grid of square divs.
// Create the divs using JavaScript. Don’t try making them by hand with copy and pasting in your HTML file!
// It’s best to put your grid squares inside another “container” div (which can go directly in your HTML).
// There are several different ways to make the divs appear as a grid (versus just one on each line). Feel free to use any or play with each of them:
// float/clear
// inline-block
// flexbox
// CSS Grid

function generateGrid(num) {
    for (let i = 0; i<(num*num); i++) {
        let newDiv = document.createElement('div');
        // Once entered, the new grid should be generated in the same total space as before (e.g. 960px wide) 
        newDiv.classList.add('grid');
        newDiv.style.width = `${960/num}px`;
        newDiv.style.height = `${960/num}px`; 
        newDiv.style.backgroundColor = `grey`;
        container.appendChild(newDiv);
      
        // Add an event listener to create a hover effect for the individual divs
        newDiv.addEventListener('mouseover', makeColor);
        let newOpacity = 0;
        function random_rgba() {
            let o = Math.round, r = Math.random, s = 255;
            return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
        }
        let color = random_rgba();
        function makeColor() {
            if (black) newDiv.style.backgroundColor = 'black';
            else {
                newDiv.style.backgroundColor = `${color}`;
            }
            if (opacity) {
                newOpacity += 0.1;
                newDiv.style.opacity = newOpacity; 
            }
        }
    }
}

document.getElementById('black').addEventListener('click', () => {
    if(!black) {
    black = true;
    generateGrid(num);
    }
});
document.getElementById('random').addEventListener('click', () => {
    if (black) {
    black = false;
    generateGrid(num);
    }
});
document.getElementById('opacity').addEventListener('click', () => {
    if (!opacity) {
    opacity = true;
    generateGrid(num);
    let grid = document.getElementsByClassName('grid')
    Array.from(grid).forEach(el => {
        el.style.opacity = 0;
    })
    } else {
        opacity = false;
        generateGrid(num);
        let grid = document.getElementsByClassName('grid')
        Array.from(grid).forEach(el => {
        el.style.opacity = 1;
    })
    }
})

// Add a button to the top of the screen which will clear the current grid and send the user a popup asking for the number of squares 
// per side for the new grid. 

clear.addEventListener('click', () => {
    container.innerHTML = ''
    let newGrid = +prompt('How many squares per side?');
    //  Set the limit for the user input to a maximum of 100. A larger number of squares results 
    // in more computer resources being used, potentially causing delays, freezing, or crashing that we want to prevent.
    while (newGrid > 100 || newGrid < 1) {
        newGrid = +prompt('Please enter a value between 1 and 100')
    }
    generateGrid(newGrid);
    num = newGrid;
    console.log(newGrid);
});

generateGrid(16);