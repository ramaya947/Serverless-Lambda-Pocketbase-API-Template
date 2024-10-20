# Serverless | Lambda | Pocketbase API Template

This project provides a template for quickly setting up a serverless API using NodeJS, AWS Lambda, and Pocketbase. It's designed to help developers jumpstart their projects with a robust backend infrastructure on their local machine.

## Technologies Used

- **Serverless-Offline**: For local Lambda function testing
- **NodeJS**: Runtime environment
- **AWS Lambda**: Serverless compute service
- **Pocketbase**: Open source backend in a single file

## Features

- Serverless architecture for scalability and cost-effectiveness
- Local development environment with Serverless-Offline
- Integration with Pocketbase for rapid database setup and management
- Pre-configured API endpoints (customize as needed)

## Quick Start

1. Clone this repository:
2. Install dependencies:
3. Unzip Pocketbase.zip and extract to ```src/pocketbase```
4. Start the Pocketbase server ```npm run pocketbase```
5. Navigate to http://127.0.0.1:8090/_/
6. Create test account for Unit Tests to use in the 'User' Collection
```
Email: test-user@email.com
Password: Test!2024
```

Other credentials may be used, just update the configuration file.

7. Create Example collection with the fields
- name
- description

## API Endpoints

Base URL: http://localhost:3000

### Example
- GET /example *Get All Examples*
- GET /example?id={ID} *Get Example by Id*
- GET /example?key={ATTB_KEY}&value={ATTB_VALUE} *Get Example by Parameter*
- POST /example *Add Example Record*
- PUT /example *Update Example Record*
- DELETE /example?id={ID}
### User
- POST /user *Login*
- POST /user/register *Register*
- GET /user/logout *Logout* [Note that Pocketbase doesn't support token invalidation, so this just removes the last saved authenticated user from the client]
- GET /user *Refresh Token*

## Configuration

- ```test/Config.json``` contains login credentials for the test account used in Jest tests

## Running the Project
- ```npm run pocketbase```
- ```npm run start```

Run Pocketbase first, then start serverless-offline

## Run Jest Unit Tests
```npm run test```