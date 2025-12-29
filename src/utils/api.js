import { checkResponse } from './request.js';

// Force HTTPS in production
const baseUrl = import.meta.env.VITE_API_BASE_URL || 
  (!import.meta.env.DEV ? "https://api.wtwr.bad.mn" : "http://localhost:3001");

console.log('API Base URL:', baseUrl, 'Mode:', import.meta.env.MODE, 'DEV:', import.meta.env.DEV, 'PROD:', import.meta.env.PROD);

export function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

export function addItem(item, token) {
  // Check if item is FormData (file upload) or regular object (URL)
  const isFormData = item instanceof FormData;
  
  const options = {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  if (isFormData) {
    // Don't set Content-Type for FormData, let browser set it with boundary
    options.body = item;
  } else {
    // Regular JSON request
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify({
      name: item.name,
      weather: item.weather,
      imageUrl: item.link || item.imageUrl,
    });
  }

  return fetch(`${baseUrl}/items`, options).then(checkResponse);
}

export function deleteItem(id, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function likeItem(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function unlikeItem(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function updateProfile({ name, avatar }, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}
