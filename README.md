# BACKEND

Laravel API
This is an example API where users can signup and then chat with each other.

## Requirements:
PHP 8.1 or higher
Laravel 10
Composer 2.*

## Installation:
1- Clone the repository: git clone https://github.com/ahsanhanif999/sockets.git
2- Navigate to "backend" directory
3- Install dependencies: composer install
4- Create the database: symfony console doctrine:database:create
5- Configure your database connection in the .env file
6- Run database migrations: php artisan migrate
7- Open /database/seeders/DatabaseSeeder.php and uncomment the line that creates users from User::factory
7- Run Seeders: php artisan db:seed
8- Start the development server: php artisan serve

# FRONTEND

## Requirements:
NodeJS 19.7.0 or higher
VueJS 3

## Installation:
1- Clone the repository: git clone https://github.com/ahsanhanif999/sockets.git
2- Navigate to "frontend" directory
3- Install dependencies: npm install
4- Start the development server: npm run dev

# WEB SOCKETS via SOCKET.IO

## Requirements:
NodeJS 19.7.0 or higher

## SERVER SETUP
1- Clone the repository
2- Navigate to "frontend" directory
3- Install dependencies: npm install
4- Start the node server that run web sockets: node server.js

# CONTRIBUTING:

Contributions to this project are welcome from the public. If you would like to contribute, please follow the guidelines outlined above and submit your commit requests.

# LICENSE:

This project is licensed under an open-source license. You are free to use, reproduce, or distribute any part of this repository in accordance with the terms of the license.