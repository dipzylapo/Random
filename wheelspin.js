let container = document.querySelector(".container");
let btn = document.getElementById("spin");
let number = Math.ceil(Math.random() * 5000);

// Create popup elements
const popup = document.createElement('div');
popup.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
    display: none;
    z-index: 100;
`;

const popupText = document.createElement('p');
popupText.style.cssText = `
    margin: 0 0 15px 0;
    font-size: 18px;
    text-align: center;
`;

const closeButton = document.createElement('button');
closeButton.textContent = 'Close';
closeButton.style.cssText = `
    display: block;
    margin: 0 auto;
    padding: 8px 20px;
    background: #34495e;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

popup.appendChild(popupText);
popup.appendChild(closeButton);
document.body.appendChild(popup);

// Corrected function to get the selected number based on final rotation
function getSelectedNumber(degrees) {
    // Normalize the degrees to 0-360 range and account for clockwise rotation
    const normalizedDegrees = (360 - (degrees % 360)) % 360;
    // Each sector is 45 degrees (360/8)
    const sector = Math.floor((normalizedDegrees + 22.5) / 45) % 8;
    // Corrected number mapping to match wheel segments
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
    return numbers[sector];
}

// Close popup when close button is clicked
closeButton.onclick = function() {
    popup.style.display = 'none';
};

btn.onclick = function () {
    // Disable the button while spinning
    btn.disabled = true;
    
    // Generate new rotation (ensure it spins at least 2 full rotations)
    const extraSpins = 2 * 360;
    const randomDegrees = Math.ceil(Math.random() * 360);
    const totalDegrees = extraSpins + randomDegrees;
    number += totalDegrees;
    
    // Apply rotation
    container.style.transform = "rotate(" + number + "deg)";
    
    // Wait for animation to finish (5 seconds as per CSS transition)
    setTimeout(() => {
        const selectedNumber = getSelectedNumber(number);
        popupText.textContent = `You got number ${selectedNumber}!`;
        popup.style.display = 'block';
        btn.disabled = false;
    }, 5000);
};
