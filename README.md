# Home Challenge Setup

Welcome to the Home Challenge project!

## Prerequisites

- Docker
- Docker Compose

Ensure you have Docker and Docker Compose installed on your machine before proceeding.

## Setup Instructions

Follow these steps to get the project up and running:

1. **Build the Docker Images**

   First, you need to build the Docker images for the services.

   ```sh
   docker compose build
   ```

2. **Start the Services**
    
    This will create and start the containers.

    ```sh
    docker compose up
    ```

3. **Install Backend Dependencies**

    ```sh
    docker compose exec backend composer install

    docker compose exec backend php artisan passport:install
    ```

4. **Install Frontend Dependencies**

    ```sh
    docker compose exec frontend npm install
    ```

# Additional Commands

   **To stop the services:**
    
    docker compose down

   **To rebuild the images and restart the services:**

    docker compose up --build

