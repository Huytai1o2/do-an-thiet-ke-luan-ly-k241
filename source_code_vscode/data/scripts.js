// Function to toggle LED
function toggleLED() {
    fetch('/toggle')
        .then(response => response.text())
        .then(data => alert(data))
        .catch(error => alert('Error: ' + error));
}

// Function to fetch sensor data and update values on the page
function updateSensorData() {
    fetch('/getData')
        .then(response => response.json())
        .then(data => {
            // Update text values
            document.getElementById('moistureValue').textContent = data.moisture;
            document.getElementById('temperatureValue').textContent = data.temperature.toFixed(2);
            document.getElementById('lumosityValue').textContent = data.light;
            document.getElementById('humidityValue').textContent = data.humidity.toFixed(2);
            document.getElementById('distanceValue').textContent = data.distance;

            // Calculate percentages and apply gradients
            const moisturePercent = Math.min(100, (data.moisture / 300) * 100);
            const temperaturePercent = Math.min(100, (data.temperature / 100) * 100);
            const humidityPercent = Math.min(100, data.humidity);
            const distancePercent = Math.min(100, (data.distance / 100) * 100);  // Example scaling

            document.getElementById('moistureCircle').style.background = 
                `conic-gradient(#4ade80 ${moisturePercent}%, #333333 0%)`;
            document.getElementById('temperatureCircle').style.background = 
                `conic-gradient(#4ade80 ${temperaturePercent}%, #333333 0%)`;
            document.getElementById('luminosityCircle').style.background = 
                `conic-gradient(${data.light >= 550 ? '#ff0000' : '#333333'} 100%, #333333 0%)`;
            document.getElementById('humidityCircle').style.background = 
                `conic-gradient(#4ade80 ${humidityPercent}%, #333333 0%)`;
            document.getElementById('distanceCircle').style.background = 
                `conic-gradient(#4ade80 ${distancePercent}%, #333333 0%)`;
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to manually fetch sensor data when button is pressed
function getUpdate() {
    updateSensorData();  // Call updateSensorData to fetch and display the sensor data
}

// Set an interval to update sensor data every 5 seconds
setInterval(updateSensorData, 5000);

// Initial data fetch when the page loads
updateSensorData();
