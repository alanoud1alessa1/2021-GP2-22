Project Title: Filmey 

Introduction: Filmey is a website with its own recommendation system. Our website will be recommending movies based on user’s interests and ratings. Filmey is a single platform for users who are interested in movies. It will save their time and effort from useless searches thus increase customer experience and satisfaction. It aims to serve local Saudi community to share their feedback and search for movies and learn what is new in cinemas across kingdom.

Languages: 
• JavaScript
• CSS
• Python

Environments Used: 
• Visual Studio Code
• pgAdmin

To Be Installed:
• React.js (for frontend)
• Node.js (with npm) (for backend)
• Postgres (database server)
• pgAdmin (database administrator for postgres)
• python

To Start:
1. "npm init"
2. Add UserBasedKNN file to server/api/model folder'

- In client folder:
1. delete node-modules 
2. “npm install” (to install the frontend dependencies)
3. “npm start” (to run frontend)

- In server folder:
1. delete node-modules
2. "npm install" (to install the backend dependencies) 
3. "npx knex migrate:latest" (create database schema)
4. "npx knex seed:run" (run seed file)
5. "npm start" (to run backend)

- In server folder:
1. "python3 flaskServer.py" (to run flaskServer).



