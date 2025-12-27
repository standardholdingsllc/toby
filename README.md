# VetCare - Veterinary Clinic Management Demo

A comprehensive demo web application for veterinary clinic management built with Next.js, TypeScript, and Tailwind CSS.

![VetCare Demo](https://img.shields.io/badge/Demo-VetCare-22c55e)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## Features

### 📅 Appointment Calendar
- Interactive monthly calendar view
- Create, view, and cancel appointments
- Color-coded appointment types (Check-up, Vaccination, Surgery, Grooming, Emergency)
- Today's date highlighting

### 👥 Client Management (CRM)
- Complete client directory with search functionality
- Client detail pages with contact information
- Link clients to their pets
- View appointment history per client

### 🐕 Pet Management
- Pet profiles with medical information
- Species and breed tracking
- Vaccination status monitoring
- Medical history records
- Owner association

### 💬 Integrated Communications
- WhatsApp chat simulation
- Real-time messaging interface
- Call client simulation
- Direct communication from client profiles

### 📣 Marketing Campaigns
- Email and WhatsApp campaign creation
- Recipient selection (all clients or specific)
- Campaign history tracking
- Channel statistics

### 📊 Business Dashboard
- Revenue overview with charts
- Appointment statistics
- Client acquisition metrics
- Interactive data visualization using Chart.js

### ⚙️ Settings & User Management
- Language toggle (English/Spanish)
- Dark/Light theme support
- User profile management
- Team member management (add/remove users)
- Role-based display (Admin, Veterinarian, Receptionist)

### 🌐 Internationalization
- Full English and Spanish language support
- Real-time language switching
- Comprehensive translation coverage

## Tech Stack

- **Framework**: Next.js 14 with Pages Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **Date Handling**: date-fns
- **State Management**: React Context API
- **Icons**: Custom SVG components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd toby
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── components/           # Reusable UI components
│   ├── icons/           # SVG icon components
│   ├── ChatWindow.tsx   # WhatsApp chat interface
│   ├── Layout.tsx       # Main app layout with navigation
│   ├── Modal.tsx        # Reusable modal component
│   └── Toast.tsx        # Toast notification component
├── context/
│   └── AppContext.tsx   # Global state management
├── data/
│   ├── mockData.ts      # Sample data for demo
│   └── translations.ts  # i18n translations
├── pages/
│   ├── calendar.tsx     # Appointments calendar
│   ├── clients/         # Client management pages
│   ├── dashboard.tsx    # Business dashboard
│   ├── marketing.tsx    # Marketing campaigns
│   ├── pets/            # Pet management pages
│   ├── profile.tsx      # User profile
│   ├── settings.tsx     # App settings
│   └── team.tsx         # Team management
└── styles/
    └── globals.css      # Global styles and Tailwind imports
```

## Demo Data

The application comes pre-loaded with:
- 6 sample clients
- 10 pets with varied species and breeds
- 11 appointments across different dates
- Sample chat conversations
- Marketing campaign history
- 4 team members with different roles

## Customization

### Adding New Languages

Edit `data/translations.ts` to add new language support:

```typescript
export const translations = {
  en: { ... },
  es: { ... },
  // Add new language
  fr: { ... },
};
```

### Modifying Theme Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
theme: {
  extend: {
    colors: {
      primary: { ... },
      accent: { ... },
    },
  },
}
```

## Deployment

This app is ready to deploy on Vercel:

```bash
npm run build
```

Or deploy directly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Notes

- This is a **demo application** using in-memory/mock data
- No backend or database integration
- No real authentication system
- All data resets on page refresh
- WhatsApp and call features are simulated

## License

MIT License - Feel free to use this as a starting point for your own project.

