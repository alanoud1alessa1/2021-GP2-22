Project Title: Filmey 

Introduction: Filmey is a website with its own recommendation system. Our website will be recommending movies based on user’s interests and ratings. Filmey is a single platform for users who are interested in movies. It will save their time and effort from useless searches thus increase customer experience and satisfaction. It aims to serve local Saudi community to share their feedback and search for movies and learn what is new in cinemas across kingdom.

Languages: JavaScript,CSS,Python

Environments Used: Visual Studio Code, pgAdmin

To be installed:
React.js (for frontend)
Node.js (with npm) (for backend)
Postgres (database server)
pgAdmin (database administrator for postgres)
python

To start:
-npm init
-Add UserBasedKNN file to server/api/model folder
- in client folder 
•	delete node-modules 
•	“npm install” (to install the frontend dependencies)
•	“npm start” (to run frontend)


- in server folder 
•	delete node-modules
•	“npm install” (to install the backend dependencies) , 
•	npx knex migrate:latest (create database schema)
•	npx knex seed:run (run seed file)
•	“npm start” (to run backend)

-in server folder 
•	python3 flaskServer.py (to run flaskServer).



