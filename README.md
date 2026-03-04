# ShizenFlow

An AI-powered personal finance tracker. Live at [shizenflow.store](https://www.shizenflow.store).

## Tech Stack

- **React** + **TypeScript**
- **Vite** (build tool and dev server)
- **Tailwind CSS** + **shadcn/ui** (styling and components)
- **Supabase** (database and backend)

## Getting Started

### Prerequisites

- Node.js and npm. Install via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

### Local Setup
```bash
# Clone the repo
git clone https://github.com/AbhishekSinghShekhawatSDE/ShizenFlow.git

# Move into the project directory
cd ShizenFlow

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app runs at `http://localhost:8080` by default.

## Project Structure
```
src/          # Application source code
supabase/     # Database migrations and config
public/       # Static assets
```

## Deployment

The project deploys to [shizenflow.store](https://www.shizenflow.store).

For your own deployment, build the project and serve the `dist` folder:
```bash
npm run build
```

## Contributing

1. Fork the repo
2. Create a feature branch
3. Push your changes
4. Open a pull request
