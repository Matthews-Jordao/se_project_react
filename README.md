# WTWR (What To Wear?)

## About

This is the front end for my WTWR app. The idea is pretty simple - it checks the weather where you are and then shows you clothes from your wardrobe that match the conditions. So if it's cold out, you'll see your jackets and sweaters. If it's hot, t-shirts and shorts.

I built this with React and Vite. Users can sign up, log in, add their own clothes to the database, and like items. The weather data comes from OpenWeather API.

## Links

**Backend repo:** https://github.com/Matthews-Jordao/se_project_express

## What it does

- Shows current weather and temperature (you can switch between F and C)
- Suggests clothes based on how hot/cold it is
- Login and signup with JWT tokens
- Add new clothing items with an image URL
- Like/unlike clothes
- Edit your profile info
- Delete items you added

## Tech

- React
- React Router
- Vite
- Context API for state
- CSS

## Running it

```bash
npm install
npm run dev
```

Opens on localhost:3000. You'll need the backend running on port 3001 too.
