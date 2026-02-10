## Recipe Share - Final Project

Recipe Share is a recipe sharing web app with a recipe board, detailed recipe views, a profile page, and a creation flow. The backend uses Node.js, Express, MongoDB, JWT auth, and a modular MVC structure with a services layer. The UI uses Bootstrap with a custom theme and responsive layout.

### Features

- Recipe board with search filters (ingredient, time, calories, title)
- Recipe detail page
- Recipe creation page
- Profile page
- JWT authentication with hashed passwords
- Role-based access (admin vs user)
- Validation and centralized error handling

### Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JWT for auth
- Joi validation
- Bootstrap 5 + EJS views

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file (see `.env.example`):

```bash
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/RecipeShare
JWT_SECRET=change_me
JWT_EXPIRES_IN=7d
```

3. Start the server:

```bash
npm run dev
```

The app runs on http://localhost:3000

## Database Collections

The project defines five collections:

- `User` (username, email, password, role, bio, avatarUrl)
- `Recipe` (title, description, ingredients, cookTimeMinutes, calories, author, category)
- `Category` (name, description)
- `Comment` (recipe, user, body)
- `Favorite` (recipe, user)

## API Documentation

### Authentication (Public)

- **POST /register**
	- Body: `{ "username": "", "email": "", "password": "", "role": "user" }`
	- Response: JWT token + user info

- **POST /login**
	- Body: `{ "email": "", "password": "" }`
	- Response: JWT token + user info

### User Management (Private)

- **GET /users/profile**
	- Headers: `Authorization: Bearer <token>`
	- Response: current user profile

- **PUT /users/profile**
	- Headers: `Authorization: Bearer <token>`
	- Body: `{ "username": "", "email": "", "bio": "", "avatarUrl": "" }`

### Recipe Management (Private)

- **POST /recipes**
	- Headers: `Authorization: Bearer <token>`
	- Body: `{ "title": "", "description": "", "ingredients": [""], "cookTimeMinutes": 30, "calories": 400, "imageUrl": "" }`

- **GET /recipes**
	- Headers: `Authorization: Bearer <token>`
	- Optional query: `title`, `ingredient`, `maxTime`, `maxCalories`

- **GET /recipes/:id**
	- Headers: `Authorization: Bearer <token>`

- **PUT /recipes/:id**
	- Headers: `Authorization: Bearer <token>`
	- Body: partial recipe fields

- **DELETE /recipes/:id**
	- Headers: `Authorization: Bearer <token>`
	- Admins can delete any recipe, users can delete their own.

## Pages

- `/` Recipe board with filters
- `/recipes/:id/view` Recipe detail page
- `/recipes/new` Recipe creation page
- `/profile` User profile page

## Notes

- Protected API endpoints require JWT auth.
- Passwords are hashed with bcrypt.
- Error handling returns meaningful HTTP status codes.
