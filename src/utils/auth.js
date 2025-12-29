import { checkResponse } from './request.js';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.MODE === "production" || import.meta.env.PROD
    ? "https://api.wtwr.bad.mn"
    : "http://localhost:3001");

export function signup({ name, avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
}

export function signin({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export function checkToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
