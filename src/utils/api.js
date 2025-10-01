// API utility functions for communicating with the json-server
// Base URL for all API requests

const baseUrl = 'http://localhost:3003';

// Helper function to process the server response
function processServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

// GET /items - Fetch all clothing items
export function getItems() {
  return fetch(`${baseUrl}/items`)
    .then(processServerResponse);
}

// POST /items - Add a new clothing item
export function addItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      _id: Date.now().toString(), // Generate a simple ID
      name: item.name,
      weather: item.weather,
      imageUrl: item.link || item.imageUrl, // Handle both possible property names
    }),
  }).then(processServerResponse);
}

// DELETE /items/:id - Delete a clothing item by ID
export function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
  }).then(processServerResponse);
}