# Quill - The SaaS App 

Welcome to Quill - The SaaS app! This README provides comprehensive information about our SaaS application, including features, setup instructions, and more.

## Overview

Quill is a powerful SaaS application that allows users to upload PDF documents, engage in real-time chat with PDFs and ask questions right away, and upgrade to our Pro plan for exclusive benefits. Our platform seamlessly integrates with Stripe for secure payment processing and utilizes CockroachDB and Pinecone for efficient data management. Additionally, we leverage Langchain and OpenAI API to enhance functionality and user experience.

## Features

- **PDF Upload**: Easily upload PDF documents to the platform using UploadThing.
- **Real-time Chat**: Engage in real-time conversations with other users.
- **Pro Plan**: Unlock exclusive benefits by upgrading to our Pro plan.
- **Stripe Integration**: Secure payment processing with Stripe.
- **CockroachDB**: Resilient and scalable SQL database solution.
- **Pinecone**: Efficient vector database for data storage and retrieval.
- **Langchain**: Utilized for document loading and processing.
- **OpenAI API**: Enhance document understanding and analysis.

## Setup

To set up the environment variables, use the following format:

```plaintext
KINDE_CLIENT_ID=your_kinde_client_id
KINDE_CLIENT_SECRET=your_kinde_client_secret
KINDE_ISSUER_URL=your_kinde_issuer_url
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard

DATABASE_URL="your_database_url"

UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id

PINECONE_API_KEY=your_pinecone_api_key

OPENAI_API_KEY=your_openai_api_key

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## Live Demo

Check out our live demo [here](https://quill-six-mocha.vercel.app/). 

## Mobile Responsiveness

Quill is fully responsive, ensuring a seamless experience across various devices.

## Authentication

For authentication, we've implemented Kinde Auth for secure user management.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/tejus05/quill.git
    ```

2. Install dependencies:

    ```bash
    cd quill
    npm install
    ```

3. Set up environment variables as described above.

4. Run the development server:

    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/your_username/quill/blob/main/LICENSE) file for details.
