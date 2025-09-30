// Temperature conversion utilities
// Helper functions for converting between Fahrenheit and Celsius

/**
 * Convert Fahrenheit to Celsius
 * @param {number} fahrenheit - Temperature in Fahrenheit
 * @returns {number} - Temperature in Celsius
 */
export function fahrenheitToCelsius(fahrenheit) {
  if (typeof fahrenheit !== 'number') return fahrenheit;
  return (fahrenheit - 32) * (5 / 9);
}

/**
 * Convert Celsius to Fahrenheit
 * @param {number} celsius - Temperature in Celsius
 * @returns {number} - Temperature in Fahrenheit
 */
export function celsiusToFahrenheit(celsius) {
  if (typeof celsius !== 'number') return celsius;
  return celsius * (9 / 5) + 32;
}

/**
 * Format temperature for display
 * @param {number} temperature - Temperature value
 * @param {boolean} isCelsius - Whether to display in Celsius (true) or Fahrenheit (false)
 * @returns {string} - Formatted temperature string
 */
export function formatTemperature(temperature, isCelsius = false) {
  if (typeof temperature !== 'number') return '--';
  
  const temp = isCelsius ? fahrenheitToCelsius(temperature) : temperature;
  const unit = isCelsius ? '°C' : '°F';
  
  return `${Math.round(temp)}${unit}`;
}

/**
 * Get weather condition based on temperature in the selected unit
 * @param {number} tempF - Temperature in Fahrenheit (from API)
 * @param {boolean} isCelsius - Whether user prefers Celsius
 * @returns {string} - Weather condition: "hot", "warm", "cold", or "unknown"
 */
export function getWeatherConditionWithUnit(tempF, isCelsius = false) {
  if (typeof tempF !== "number") return "unknown";
  
  // Convert thresholds if user prefers Celsius
  let hotThreshold = 86;  // 86°F = 30°C
  let warmThreshold = 66; // 66°F = 19°C
  
  if (isCelsius) {
    const tempC = fahrenheitToCelsius(tempF);
    hotThreshold = 30;   // 30°C
    warmThreshold = 19;  // 19°C
    
    if (tempC >= hotThreshold) return "hot";
    if (tempC >= warmThreshold) return "warm";
    return "cold";
  }
  
  // Use Fahrenheit thresholds
  if (tempF >= hotThreshold) return "hot";
  if (tempF >= warmThreshold) return "warm";
  return "cold";
}