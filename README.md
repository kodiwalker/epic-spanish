# OpenLibro: Immersive Spanish Learning Through Storytelling

OpenLibro is an innovative progressive web application designed to transform the way English-speaking users learn Spanish. Dive into custom short stories, synchronized with high-quality audiobooks, to ensure a comprehensive and effective learning experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Dev Plan](#dev-plan)
- [User Journey](#user-journey)
- [Subscription Model](#subscription-model)
- [License](#license)

## Features

- **Interactive Learning**: Custom short stories accompanied by high-quality audiobooks.
- **Personalized User Experience**: Stories tailored to user's proficiency level and preferences.
- **Custom Story Generation**: Choose the genre, read time, grammar rules, and more.
- **Integrated Audiobooks**: Using Amazon Polly, users can listen to the stories in their chosen dialect.
- **In-built Translation**: Click on any word to view its English translation.
- **Efficient Data Storage and Retrieval**: Powered by Postgres and AWS S3.

## Tech Stack

- **Backend**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Frontend**: [React](https://reactjs.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Story Generation**: [OpenAI's GPT-3.5](https://www.openai.com/)
- **Audiobook Creation**: [Amazon Polly](https://aws.amazon.com/polly/)
- **Translation**: [Google Translate API](https://cloud.google.com/translate)
- **Storage**: [AWS S3](https://aws.amazon.com/s3/)
- **Payments**: [PayPal Integration](https://developer.paypal.com/)

## Getting Started

Details will be updated once the app is ready for initial deployment. Stay tuned!

## Dev Plan

1. **Account / Settings Page**
    - Manage account details.
    - Set proficiency level and dialect preference.
2. **Library Page**
    - Navigate between "Saved" and “Recent” stories.
    - Manage story preferences and history.
3. **Create a Story Page**
    - Customize and generate new stories with chosen settings.
    - Get redirected to the "Reader" page to enjoy the freshly minted story.
4. **Reader Page**
    - Accessible after story generation or from the library.
    - Interactive story with integrated MP3 player and clickable words for translations.

## User Journey

1. **Homepage Introduction**: Learn about OpenLibro's offerings.
2. **Sign-up & Subscription**: Opt for free or premium services.
3. **Story Creation**: Jump straight into generating the first story!
4. **Continuous Learning**: On subsequent visits, directly access the library.

## Subscription Model

- **Free Tier**: Generate 1 story/day with limited features.
- **Unlimited Tier**: $7.99/month for unlimited story generations and enhanced features.

## License

This project and its source code are proprietary and confidential. Unauthorized copying or use is strictly prohibited. Please see the [LICENSE](./LICENSE) file for more details.

---

**Developed by**: [Kodi Walker](https://github.com/kodiwalker) - Full Stack Developer specializing in immersive applications. Using cutting-edge technology to revolutionize language learning.

---
