                        //#responsibility
// Creating variables
var myX = 0, myY = 0;

function update() {
    
}

function draw() {
    // This is how you draw a rectangle
    context.fillRect(myX, myY, 30, 30);
};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};

function mouseup() {
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
};
