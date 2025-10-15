// 1. Welcome alert upon link opening.
alert("Welcome to Online Store!");

// userName = "jesh";
// item = "food";


//2. Prompt for customer details
userName = prompt("Please enter your name:");
item = prompt("What item would you like to order?");

let quantity;
while (true) {
quantity = prompt("How many would you like to order? (1–99)");

// Requirements from top paragraph of assignment
    if (isNaN(quantity) || quantity < 1 || quantity > 99) {
        alert("Invalid quantity enter a number between 1 and 99.");
    }
    else 
        break;
} 
// 3. Determine time of day
currentTime = new Date();
hour = currentTime.getHours();
let timeGreeting;

if (hour < 12) {
  timeGreeting = "Good Morning";
} else if (hour < 18) {
  timeGreeting = "Good Afternoon";
} else {
  timeGreeting = "Good Evening";
}

// 4. Calculate expected arrival date (7 days later)
const arrivalDate = new Date(currentTime);
arrivalDate.setDate(currentTime.getDate() + 7);
const formattedArrival = arrivalDate.toDateString();

// 5. Display on HTML
document.getElementById("greeting").innerText = timeGreeting + " " + userName + ", thank you for ordering!";
document.getElementById("order").innerText = "Thank you for ordering " + quantity + " " + item + "(s).";
document.getElementById("arrival").innerText = "Your order will arrive on " + formattedArrival + ".";
