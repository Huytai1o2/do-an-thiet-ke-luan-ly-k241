// Function to toggle LED
const lightbulbImage = document.getElementById("lightbulbImage");

function toggleLED() {
    fetch('/toggle')
        .then(response => response.text())
        .then(data => {
            // alert(data); // Show the LED state in an alert

            // Check if data indicates LED is ON or OFF
            if (data.includes("LED ON")) {
                lightbulbImage.src = "images/on.png"; // Show "on" image
            } else if (data.includes("LED OFF")) {
                lightbulbImage.src = "images/off.png"; // Show "off" image
            }
        })
        .catch(error => alert('Error: ' + error));
}



function updateSensorData() {
    fetch('/getData')
    .then(response => response.json())
    .then(data => {
        // Uncomment this block for debugging purposes only

        // Assign mock data for debugging
        // data = {
        //     moisture: 10,       // Set moisture to 10 for debugging
        //     temperature: 25.5,  // Example temperature
        //     light: 300,         // Example luminosity
        //     humidity: 45,       // Example humidity
        //     distance: 20        // Example distance
        // };

        // Update text values with units
        document.getElementById('moistureValue').textContent = `${data.moisture} %`;
        document.getElementById('temperatureValue').textContent = `${data.temperature.toFixed(2)} °C`;
        document.getElementById('luminosityValue').textContent = `${data.light} lux`;
        document.getElementById('humidityValue').textContent = `${data.humidity.toFixed(2)} g/m³`;
        document.getElementById('distanceValue').textContent = `${data.distance} cm`;

        // Calculate percentages and apply gradients
        const moisturePercent = Math.min(100, (data.moisture / 300) * 100);
        const temperaturePercent = Math.min(100, (data.temperature / 100) * 100);
        const humidityPercent = Math.min(100, data.humidity);
        const distancePercent = Math.min(100, (data.distance / 100) * 100);  // Example scaling

        // document.getElementById('moistureCircle').style.background = 
        //     `conic-gradient(#4ade80 ${moisturePercent}%, #333333 0%)`;
        // document.getElementById('temperatureCircle').style.background = 
        //     `conic-gradient(#4ade80 ${temperaturePercent}%, #333333 0%)`;
        // document.getElementById('luminosityCircle').style.background = 
        //     `conic-gradient(${data.light >= 550 ? '#ff0000' : '#333333'} 100%, #333333 0%)`;
        // document.getElementById('humidityCircle').style.background = 
        //     `conic-gradient(#4ade80 ${humidityPercent}%, #333333 0%)`;
        // document.getElementById('distanceCircle').style.background = 
        //     `conic-gradient(#4ade80 ${distancePercent}%, #333333 0%)`;
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Initial data fetch when the page loads
updateSensorData();
toggleLED();

// Set an interval to update sensor data every 5 seconds
setInterval(updateSensorData, 5000);
