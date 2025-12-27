// Mock Data for VetCRM Demo

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  numberOfPets: number;
  createdAt: string;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  ownerId: string;
  ownerName: string;
  allergies: string;
  vaccinations: string;
  notes: string;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  petId: string;
  petName: string;
  ownerId: string;
  ownerName: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string;
}

export interface Message {
  id: string;
  sender: 'clinic' | 'client';
  text: string;
  timestamp: string;
  clientId: string;
}

export interface Campaign {
  id: string;
  channel: 'email' | 'whatsapp';
  message: string;
  recipients: number;
  sentAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'veterinarian' | 'receptionist';
  avatar?: string;
}

export interface MedicalRecord {
  id: string;
  petId: string;
  date: string;
  description: string;
  veterinarian: string;
}

// Initial Mock Data
export const initialClients: Client[] = [
  { id: '1', name: 'María García', phone: '+1 555-0101', email: 'maria.garcia@email.com', address: '123 Oak Street, Miami, FL', numberOfPets: 2, createdAt: '2024-06-15' },
  { id: '2', name: 'John Smith', phone: '+1 555-0102', email: 'john.smith@email.com', address: '456 Pine Avenue, Miami, FL', numberOfPets: 1, createdAt: '2024-08-22' },
  { id: '3', name: 'Ana Rodríguez', phone: '+1 555-0103', email: 'ana.rodriguez@email.com', address: '789 Maple Drive, Miami, FL', numberOfPets: 3, createdAt: '2024-09-10' },
  { id: '4', name: 'Carlos Mendez', phone: '+1 555-0104', email: 'carlos.mendez@email.com', address: '321 Cedar Lane, Miami, FL', numberOfPets: 1, createdAt: '2024-10-05' },
  { id: '5', name: 'Sarah Johnson', phone: '+1 555-0105', email: 'sarah.j@email.com', address: '654 Birch Road, Miami, FL', numberOfPets: 2, createdAt: '2024-11-18' },
  { id: '6', name: 'Roberto Fernández', phone: '+1 555-0106', email: 'roberto.f@email.com', address: '987 Elm Court, Miami, FL', numberOfPets: 1, createdAt: '2024-12-01' },
];

export const initialPets: Pet[] = [
  { id: '1', name: 'Luna', species: 'Dog', breed: 'Golden Retriever', age: 3, ownerId: '1', ownerName: 'María García', allergies: 'None', vaccinations: 'Up to date', notes: 'Very friendly, loves treats' },
  { id: '2', name: 'Max', species: 'Cat', breed: 'Persian', age: 5, ownerId: '1', ownerName: 'María García', allergies: 'Chicken', vaccinations: 'Up to date', notes: 'Indoor cat only' },
  { id: '3', name: 'Buddy', species: 'Dog', breed: 'Labrador', age: 2, ownerId: '2', ownerName: 'John Smith', allergies: 'None', vaccinations: 'Needs rabies booster', notes: 'High energy' },
  { id: '4', name: 'Whiskers', species: 'Cat', breed: 'Siamese', age: 4, ownerId: '3', ownerName: 'Ana Rodríguez', allergies: 'None', vaccinations: 'Up to date', notes: 'Shy around strangers' },
  { id: '5', name: 'Rocky', species: 'Dog', breed: 'German Shepherd', age: 6, ownerId: '3', ownerName: 'Ana Rodríguez', allergies: 'Beef', vaccinations: 'Up to date', notes: 'Guard dog, handle with care' },
  { id: '6', name: 'Mittens', species: 'Cat', breed: 'Maine Coon', age: 1, ownerId: '3', ownerName: 'Ana Rodríguez', allergies: 'None', vaccinations: 'Up to date', notes: 'Still a kitten at heart' },
  { id: '7', name: 'Coco', species: 'Dog', breed: 'Poodle', age: 4, ownerId: '4', ownerName: 'Carlos Mendez', allergies: 'None', vaccinations: 'Up to date', notes: 'Grooming every 6 weeks' },
  { id: '8', name: 'Oliver', species: 'Cat', breed: 'British Shorthair', age: 3, ownerId: '5', ownerName: 'Sarah Johnson', allergies: 'Dairy', vaccinations: 'Up to date', notes: 'Overweight - on diet' },
  { id: '9', name: 'Bella', species: 'Dog', breed: 'Beagle', age: 5, ownerId: '5', ownerName: 'Sarah Johnson', allergies: 'None', vaccinations: 'Up to date', notes: 'Loves to howl' },
  { id: '10', name: 'Simba', species: 'Cat', breed: 'Orange Tabby', age: 2, ownerId: '6', ownerName: 'Roberto Fernández', allergies: 'None', vaccinations: 'Up to date', notes: 'Very playful' },
];

export const initialAppointments: Appointment[] = [
  { id: '1', date: '2025-12-27', time: '09:00', petId: '1', petName: 'Luna', ownerId: '1', ownerName: 'María García', type: 'Check-up', status: 'scheduled', notes: 'Annual wellness exam' },
  { id: '2', date: '2025-12-27', time: '10:30', petId: '3', petName: 'Buddy', ownerId: '2', ownerName: 'John Smith', type: 'Vaccination', status: 'scheduled', notes: 'Rabies booster due' },
  { id: '3', date: '2025-12-27', time: '14:00', petId: '7', petName: 'Coco', ownerId: '4', ownerName: 'Carlos Mendez', type: 'Grooming', status: 'scheduled', notes: 'Full grooming session' },
  { id: '4', date: '2025-12-28', time: '09:30', petId: '4', petName: 'Whiskers', ownerId: '3', ownerName: 'Ana Rodríguez', type: 'Check-up', status: 'scheduled', notes: 'Follow-up visit' },
  { id: '5', date: '2025-12-28', time: '11:00', petId: '8', petName: 'Oliver', ownerId: '5', ownerName: 'Sarah Johnson', type: 'Check-up', status: 'scheduled', notes: 'Weight check and diet review' },
  { id: '6', date: '2025-12-30', time: '10:00', petId: '5', petName: 'Rocky', ownerId: '3', ownerName: 'Ana Rodríguez', type: 'Surgery', status: 'scheduled', notes: 'Dental cleaning under anesthesia' },
  { id: '7', date: '2025-12-30', time: '15:00', petId: '2', petName: 'Max', ownerId: '1', ownerName: 'María García', type: 'Vaccination', status: 'scheduled', notes: 'Annual vaccinations' },
  { id: '8', date: '2026-01-02', time: '09:00', petId: '9', petName: 'Bella', ownerId: '5', ownerName: 'Sarah Johnson', type: 'Check-up', status: 'scheduled', notes: 'Ear infection follow-up' },
  { id: '9', date: '2026-01-03', time: '10:00', petId: '10', petName: 'Simba', ownerId: '6', ownerName: 'Roberto Fernández', type: 'Vaccination', status: 'scheduled', notes: 'First year vaccinations' },
  { id: '10', date: '2025-12-20', time: '09:00', petId: '1', petName: 'Luna', ownerId: '1', ownerName: 'María García', type: 'Check-up', status: 'completed', notes: 'All good, healthy dog' },
  { id: '11', date: '2025-12-15', time: '11:00', petId: '6', petName: 'Mittens', ownerId: '3', ownerName: 'Ana Rodríguez', type: 'Vaccination', status: 'completed', notes: 'Kitten shots completed' },
];

export const initialMessages: { [clientId: string]: Message[] } = {
  '1': [
    { id: '1', sender: 'client', text: 'Hi, I need to reschedule Luna\'s appointment.', timestamp: '2025-12-26T10:30:00', clientId: '1' },
    { id: '2', sender: 'clinic', text: 'Of course! When would work better for you?', timestamp: '2025-12-26T10:32:00', clientId: '1' },
    { id: '3', sender: 'client', text: 'How about tomorrow at 9am?', timestamp: '2025-12-26T10:35:00', clientId: '1' },
    { id: '4', sender: 'clinic', text: 'Perfect! I\'ve rescheduled Luna\'s appointment for December 27th at 9:00 AM. See you then! 🐕', timestamp: '2025-12-26T10:38:00', clientId: '1' },
    { id: '5', sender: 'client', text: 'Thank you so much!', timestamp: '2025-12-26T10:40:00', clientId: '1' },
  ],
  '2': [
    { id: '1', sender: 'clinic', text: 'Hi John! Just a reminder that Buddy\'s rabies vaccination is due this month.', timestamp: '2025-12-24T09:00:00', clientId: '2' },
    { id: '2', sender: 'client', text: 'Thanks for the reminder! Can I book for this week?', timestamp: '2025-12-24T12:15:00', clientId: '2' },
    { id: '3', sender: 'clinic', text: 'Absolutely! We have availability on the 27th at 10:30 AM. Does that work?', timestamp: '2025-12-24T12:20:00', clientId: '2' },
    { id: '4', sender: 'client', text: 'Perfect, book it!', timestamp: '2025-12-24T12:25:00', clientId: '2' },
  ],
  '3': [
    { id: '1', sender: 'client', text: 'Is Rocky\'s surgery still scheduled for the 30th?', timestamp: '2025-12-25T14:00:00', clientId: '3' },
    { id: '2', sender: 'clinic', text: 'Yes! December 30th at 10:00 AM. Please remember no food after midnight the night before.', timestamp: '2025-12-25T14:10:00', clientId: '3' },
    { id: '3', sender: 'client', text: 'Got it. Will he need to stay overnight?', timestamp: '2025-12-25T14:15:00', clientId: '3' },
    { id: '4', sender: 'clinic', text: 'Most likely not. Dental cleanings are usually same-day procedures. We\'ll call you when he\'s ready for pickup.', timestamp: '2025-12-25T14:20:00', clientId: '3' },
  ],
};

export const initialCampaigns: Campaign[] = [
  { id: '1', channel: 'email', message: '🎄 Season\'s Greetings from VetCare Clinic! Wishing you and your furry friends a wonderful holiday season. Don\'t forget to schedule your pet\'s annual check-up!', recipients: 120, sentAt: '2025-12-01T10:00:00' },
  { id: '2', channel: 'whatsapp', message: '🐕 Reminder: January is Dental Health Month! Book your pet\'s dental cleaning this month and get 15% off. Reply YES to schedule.', recipients: 85, sentAt: '2025-12-15T09:00:00' },
];

export const initialUsers: User[] = [
  { id: '1', name: 'Dr. Juan Pérez', email: 'juan.perez@vetcare.com', role: 'admin' },
  { id: '2', name: 'Dr. Emily Chen', email: 'emily.chen@vetcare.com', role: 'veterinarian' },
  { id: '3', name: 'Sofia Martinez', email: 'sofia.martinez@vetcare.com', role: 'receptionist' },
  { id: '4', name: 'Dr. Michael Brown', email: 'michael.brown@vetcare.com', role: 'veterinarian' },
];

export const initialMedicalRecords: MedicalRecord[] = [
  { id: '1', petId: '1', date: '2025-12-20', description: 'Annual check-up - All vitals normal. Weight: 30kg. Coat healthy. Teeth clean.', veterinarian: 'Dr. Juan Pérez' },
  { id: '2', petId: '1', date: '2025-06-15', description: 'Vaccination - Rabies and DHPP boosters administered. No adverse reactions.', veterinarian: 'Dr. Emily Chen' },
  { id: '3', petId: '3', date: '2025-11-10', description: 'Ear infection - Prescribed antibiotic ear drops. Follow-up in 2 weeks.', veterinarian: 'Dr. Juan Pérez' },
  { id: '4', petId: '6', date: '2025-12-15', description: 'Kitten vaccination series completed. Next vaccines due in 1 year.', veterinarian: 'Dr. Emily Chen' },
  { id: '5', petId: '8', date: '2025-10-01', description: 'Weight management consultation - Current weight: 7kg (overweight). Started on prescription diet food.', veterinarian: 'Dr. Michael Brown' },
];

// Dashboard Data
export const revenueData = [
  { month: 'Jan', value: 5200 },
  { month: 'Feb', value: 4800 },
  { month: 'Mar', value: 6100 },
  { month: 'Apr', value: 5500 },
  { month: 'May', value: 7200 },
  { month: 'Jun', value: 6800 },
  { month: 'Jul', value: 7500 },
  { month: 'Aug', value: 8100 },
  { month: 'Sep', value: 7300 },
  { month: 'Oct', value: 8500 },
  { month: 'Nov', value: 9200 },
  { month: 'Dec', value: 8500 },
];

export const appointmentsByMonth = [
  { month: 'Jan', count: 85 },
  { month: 'Feb', count: 78 },
  { month: 'Mar', count: 95 },
  { month: 'Apr', count: 88 },
  { month: 'May', count: 102 },
  { month: 'Jun', count: 98 },
  { month: 'Jul', count: 110 },
  { month: 'Aug', count: 125 },
  { month: 'Sep', count: 108 },
  { month: 'Oct', count: 118 },
  { month: 'Nov', count: 130 },
  { month: 'Dec', count: 115 },
];

export const appointmentsByType = [
  { type: 'Check-up', count: 450, color: '#22c55e' },
  { type: 'Vaccination', count: 280, color: '#3b82f6' },
  { type: 'Surgery', count: 120, color: '#f59e0b' },
  { type: 'Grooming', count: 200, color: '#8b5cf6' },
  { type: 'Emergency', count: 85, color: '#ef4444' },
];

