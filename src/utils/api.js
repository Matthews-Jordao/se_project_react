const baseUrl = 'http://localhost:3001';

function processServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export function getItems() {
  return fetch(`${baseUrl}/items`).then(processServerResponse);
}

export function addItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      _id: Date.now().toString(), // simple ID generation for now
      name: item.name,
      weather: item.weather,
      imageUrl: item.link || item.imageUrl,
    }),
  }).then(processServerResponse);
}

export function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
  }).then(processServerResponse);
}