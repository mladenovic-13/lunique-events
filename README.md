# Lunique Events

## Technologies

- **Next.js**: A React framework that enables server-side rendering and static site generation, providing a great developer experience and optimized performance.
- **tRPC**: A framework for building end-to-end typesafe APIs using TypeScript, enabling easy and efficient communication between client and server.
- **Supabase (PostgreSQL)**: An open-source Firebase alternative that provides a backend with real-time capabilities, leveraging PostgreSQL for database management.
- **Prisma**: A modern ORM (Object-Relational Mapping) tool for Node.js and TypeScript, simplifying database access and enabling type-safe database queries.
- **Auth.js**: A library for managing user authentication and authorization in web applications, providing secure and easy-to-implement authentication flows.
- **Zustand**: A small, fast, and scalable state management library for React, allowing for easy and efficient state management.
- **TailwindCSS + Shadcn/UI**: TailwindCSS is a utility-first CSS framework for rapid UI development, while Shadcn/UI is a component library that complements TailwindCSS for building beautiful and responsive UIs.
- **Resend + React Email**: Resend is a service for sending transactional emails, and React Email is a library for building emails with React components, providing a seamless way to handle email communication in your application.
- **Tanstack Table**: A headless table library for building powerful and customizable data grids in React, offering extensive features and performance optimizations.
- **Framer Motion**: An animation library for React that provides a simple and declarative way to create complex animations and interactions, enhancing the user experience.


## Description

Lunique Events is an application designed for creating and managing various types of events (educational, concerts, parties, etc.). Users start by creating an account with their email address. They receive a confirmation email with a "magic" link that grants them access to their home page, where they can see all the events they have created.

Users can then create events, specifying required information for guests to register. Using our invitation modal, users can send invites via email. When a guest receives an invitation, they can click the link to go to the event landing page and RSVP.

Event creators can manage their events and view a table of all invited guests along with their RSVP status.

Users who want to create events under the name of an organization (e.g., club, agency) can subscribe to the premium package.

# Project Setup

## Prerequisites

Before starting, ensure you have the following software installed on your machine:
- Node.js (>=14.x)
- pnpm (>=6.x)
- PostgreSQL
- AWS CLI (for AWS credentials setup)
- Upstash Redis account
- LemonSqueezy account
- Google Maps API key

## Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables:

### PostgreSQL

- `DATABASE_URL`: URL for your PostgreSQL database
- `DIRECT_URL`: Direct URL for connecting to your PostgreSQL database

### Next.js

- `NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL=localhost`: Set the production URL to localhost
- `NEXTAUTH_URL=localhost`: Set the authentication URL to localhost
- `NEXTAUTH_SECRET`: Generate a secret key (instructions below)

### Email Provider

- `EMAIL_SERVER_USER`: Your email server user
- `EMAIL_SERVER_PASSWORD`: Your email server password
- `EMAIL_SERVER_HOST`: Your email server host
- `EMAIL_SERVER_PORT`: Your email server port
- `EMAIL_FROM`: The email address from which emails will be sent

### AWS

- `REGION`: Your AWS region
- `AWS_ACCESS_KEY_ID`: Your AWS access key ID
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key
- `BUCKET_NAME`: Your S3 bucket name
- `NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN`: Your AWS CloudFront domain

### Upstash Redis

- `UPSTASH_REDIS_REST_URL`: Your Upstash Redis REST URL
- `UPSTASH_REDIS_REST_TOKEN`: Your Upstash Redis REST token

### LemonSqueezy

- `LEMONSQUEEZY_API_KEY`: Your LemonSqueezy API key
- `LEMONSQUEEZY_PRODUCT_ID`: Your LemonSqueezy product ID
- `LEMONSQUEEZY_STORE_ID`: Your LemonSqueezy store ID
- `LEMONSQUEEZY_WEBHOOK_SECRET`: Your LemonSqueezy webhook secret
- `LEMONSQUEEZY_WEBHOOK_URL`: Your LemonSqueezy webhook URL

### Google Maps

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Your Google Maps API key
- `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID`: Your Google Maps map ID

## Generating a Secret Key

To generate a secret key for `NEXTAUTH_SECRET` on macOS, use the following command in your terminal:

```sh
openssl rand -base64 32
```

## Installation
1. Clone the repository:
```sh
git clone <repository-url>
cd <repository-directory>
```
2. Install the dependencies:
```sh
pnpm install
```
3. Set up your PostgreSQL database and ensure it is running.
4. Ensure all required environment variables are added to your `.env.local` file.

## Running the Project

To start the development server, run:
```sh
pnpm run dev
```
This will start the server at `http://localhost:3000`.

## Additional Setup

### Upstash Redis
Sign up for an Upstash account and create a Redis database. Copy the REST URL and REST token to your `.env.local` file.

### LemonSqueezy
Sign up for a LemonSqueezy account, create a product, and set up your store. Obtain the API key, product ID, store ID, webhook secret, and webhook URL, and add them to your `.env.local` file.

### Google Maps
Obtain a Google Maps API key and map ID from the Google Cloud Console. Add these to your `.env.local` file.

**You're all set! Your project should now be properly configured and ready for development.**

# Image Optimization CloudFormation Setup

## Prerequisites
Ensure you have the following prerequisites installed on your local machine:
- Node.js
- AWS CLI
- AWS CDK

## Step-by-Step Instructions

1. **Clone the Repository**

    Clone the following GitHub repository to your local machine:

    ```bash
    git clone https://github.com/mladenovic-13/lunique-events-aws-image-optimization
    ```

2. **Navigate to the Project Directory**

    Change your working directory to the cloned repository:

    ```bash
    cd image-optimization
    ```

3. **Install Dependencies**

    Install the necessary dependencies using npm:

    ```bash
    npm install
    ```

4. **Bootstrap the CDK**

    Initialize the AWS CDK environment:

    ```bash
    cdk bootstrap
    ```

5. **Build the Project**

    Compile the TypeScript project:

    ```bash
    npm run build
    ```

6. **Deploy the Stack**

    Deploy the CloudFormation stack:

    ```bash
    cdk deploy
    ```

## Post-Deployment Instructions

When the deployment completes (typically within a few minutes), the AWS CDK output will include crucial information such as the domain name of the CloudFront distribution created for image optimization.

- **Image Delivery Domain**: This is the CloudFront distribution domain (e.g., `YOURDISTRIBUTION.cloudfront.net`).
- **Original Images S3 Bucket**: This is the S3 bucket containing sample images (e.g., `YourS3BucketWithOriginalImagesGeneratedName`).

## Verification

To verify that the setup is working correctly, you can test an optimized image URL:
https://YOURDISTRIBUTION.cloudfront.net/images/rio/1.jpeg?format=auto&width=300

Replace `YOURDISTRIBUTION` with the actual CloudFront distribution domain provided in the CDK output.

## Deployment in Production

For production deployments, it is recommended to use an existing S3 bucket where your images are stored. Deploy the stack in the same region as your S3 bucket using the following command:

```bash
cdk deploy -c S3_IMAGE_BUCKET_NAME='YOUR_S3_BUCKET_NAME'
```

##Configurable Parameters

The solution allows for several configurable parameters:

- **S3_IMAGE_BUCKET_NAME**: Specify the name of an existing S3 bucket where your images are stored.
- **STORE_TRANSFORMED_IMAGES**: Determine whether to store transformed images in S3.
- **STORE_TRANSFORMED_IMAGES_TTL**: Set the duration (in days) after which transformed images are automatically removed from S3.
- **S3_TRANSFORMED_IMAGE_CACHE_TTL**: Define the Cache-Control header value for transformed images.
These parameters can be specified during the deployment process to tailor the stack to your specific needs.



## License
This project is licensed under the MIT License

## Authors
- Nikola Mladenovic - @mladenovic13
- Luka Stojadinovic - @Lukiano99