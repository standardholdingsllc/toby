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
  subject?: string;
  message: string;
  recipients: number;
  segmentId?: string;
  segmentName?: string;
  templateId?: string;
  tags: string[];
  sentAt: string;
  scheduledFor?: string;
  status: 'sent' | 'scheduled' | 'draft';
  stats: {
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
  };
}

export interface Segment {
  id: string;
  name: string;
  description: string;
  filters: SegmentFilter[];
  clientCount: number;
  createdAt: string;
  isSystem: boolean;
}

export interface SegmentFilter {
  field: 'species' | 'lastVisit' | 'petCount' | 'createdAt' | 'breed' | 'all';
  operator: 'equals' | 'contains' | 'greaterThan' | 'lessThan' | 'between' | 'daysAgo';
  value: string | number | [number, number];
}

export interface Template {
  id: string;
  name: string;
  channel: 'email' | 'whatsapp' | 'both';
  subject?: string;
  content: string;
  category: 'reminder' | 'promotion' | 'greeting' | 'followup' | 'reengagement' | 'custom';
  tags: string[];
  createdAt: string;
  isSystem: boolean;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: 'days_before_appointment' | 'days_after_visit' | 'pet_birthday' | 'vaccination_due' | 'new_client' | 'inactive_client';
    value?: number;
  };
  actions: {
    type: 'send_email' | 'send_whatsapp';
    templateId: string;
    delayDays?: number;
  }[];
  status: 'active' | 'paused' | 'draft';
  stats: {
    sent: number;
    opened: number;
    clicked: number;
  };
  createdAt: string;
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
  { id: '1', name: 'María García', phone: '+51 999 123 456', email: 'maria.garcia@email.com', address: '123 Oak Street, Miami, FL', numberOfPets: 2, createdAt: '2024-06-15' },
  { id: '2', name: 'John Smith', phone: '+51 999 234 567', email: 'john.smith@email.com', address: '456 Pine Avenue, Miami, FL', numberOfPets: 1, createdAt: '2024-08-22' },
  { id: '3', name: 'Ana Rodríguez', phone: '+51 999 345 678', email: 'ana.rodriguez@email.com', address: '789 Maple Drive, Miami, FL', numberOfPets: 3, createdAt: '2024-09-10' },
  { id: '4', name: 'Carlos Mendez', phone: '+51 999 456 789', email: 'carlos.mendez@email.com', address: '321 Cedar Lane, Miami, FL', numberOfPets: 1, createdAt: '2024-10-05' },
  { id: '5', name: 'Sarah Johnson', phone: '+51 999 567 890', email: 'sarah.j@email.com', address: '654 Birch Road, Miami, FL', numberOfPets: 2, createdAt: '2024-11-18' },
  { id: '6', name: 'Roberto Fernández', phone: '+51 999 678 901', email: 'roberto.f@email.com', address: '987 Elm Court, Miami, FL', numberOfPets: 1, createdAt: '2024-12-01' },
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
  { 
    id: '1', 
    channel: 'email', 
    subject: 'Season\'s Greetings from Toby Clinic! 🎄',
    message: '🎄 Season\'s Greetings from Toby Clinic! Wishing you and your furry friends a wonderful holiday season. Don\'t forget to schedule your pet\'s annual check-up!', 
    recipients: 120, 
    sentAt: '2025-12-01T10:00:00',
    status: 'sent',
    tags: ['holiday', 'greeting'],
    stats: { delivered: 118, opened: 72, clicked: 28, bounced: 2 }
  },
  { 
    id: '2', 
    channel: 'whatsapp', 
    message: '🐕 Reminder: January is Dental Health Month! Book your pet\'s dental cleaning this month and get 15% off. Reply YES to schedule.', 
    recipients: 85, 
    sentAt: '2025-12-15T09:00:00',
    status: 'sent',
    tags: ['promotion', 'dental'],
    stats: { delivered: 85, opened: 0, clicked: 0, bounced: 0 }
  },
  { 
    id: '3', 
    channel: 'email', 
    subject: 'Your Pet\'s Vaccination Reminder 💉',
    message: 'Hi {{client_name}}, this is a friendly reminder that {{pet_name}} is due for their vaccination. Schedule an appointment today to keep your furry friend healthy!', 
    recipients: 45, 
    sentAt: '2025-11-20T14:00:00',
    segmentId: 'seg-2',
    segmentName: 'Vaccination Due',
    status: 'sent',
    tags: ['reminder', 'vaccination'],
    stats: { delivered: 44, opened: 38, clicked: 22, bounced: 1 }
  },
  { 
    id: '4', 
    channel: 'email', 
    subject: 'We Miss You! Come Back for a Check-up 🐾',
    message: 'Hi {{client_name}}, it\'s been a while since we\'ve seen {{pet_name}}! Schedule a wellness check-up today and get 10% off your visit.', 
    recipients: 32, 
    sentAt: '2025-11-10T10:00:00',
    segmentId: 'seg-3',
    segmentName: 'Inactive Clients',
    status: 'sent',
    tags: ['reengagement', 'promotion'],
    stats: { delivered: 30, opened: 18, clicked: 8, bounced: 2 }
  },
  { 
    id: '5', 
    channel: 'email', 
    subject: 'Welcome to Toby Clinic! 🎉',
    message: 'Welcome to the Toby family, {{client_name}}! We\'re thrilled to have you and {{pet_name}} as part of our community. Here\'s what you can expect from us...', 
    recipients: 8, 
    sentAt: '2025-12-20T09:00:00',
    segmentId: 'seg-1',
    segmentName: 'New Clients',
    status: 'sent',
    tags: ['welcome', 'onboarding'],
    stats: { delivered: 8, opened: 7, clicked: 5, bounced: 0 }
  },
  { 
    id: '6', 
    channel: 'whatsapp', 
    message: '🎂 Happy Birthday to {{pet_name}}! Wishing your furry friend a pawsome day. Stop by for a special birthday treat!', 
    recipients: 12, 
    sentAt: '2025-12-22T08:00:00',
    status: 'sent',
    tags: ['birthday', 'greeting'],
    stats: { delivered: 12, opened: 0, clicked: 0, bounced: 0 }
  },
];

export const initialSegments: Segment[] = [
  {
    id: 'seg-1',
    name: 'New Clients (Last 30 Days)',
    description: 'Clients who joined in the last 30 days',
    filters: [{ field: 'createdAt', operator: 'daysAgo', value: 30 }],
    clientCount: 2,
    createdAt: '2025-01-01T00:00:00',
    isSystem: true,
  },
  {
    id: 'seg-2',
    name: 'Vaccination Due',
    description: 'Pets with vaccinations due soon',
    filters: [{ field: 'all', operator: 'equals', value: 'vaccination_due' }],
    clientCount: 3,
    createdAt: '2025-01-01T00:00:00',
    isSystem: true,
  },
  {
    id: 'seg-3',
    name: 'Inactive Clients (90+ Days)',
    description: 'Clients with no visit in the last 90 days',
    filters: [{ field: 'lastVisit', operator: 'daysAgo', value: 90 }],
    clientCount: 2,
    createdAt: '2025-01-01T00:00:00',
    isSystem: true,
  },
  {
    id: 'seg-4',
    name: 'Dog Owners',
    description: 'All clients with at least one dog',
    filters: [{ field: 'species', operator: 'equals', value: 'Dog' }],
    clientCount: 4,
    createdAt: '2025-01-01T00:00:00',
    isSystem: true,
  },
  {
    id: 'seg-5',
    name: 'Cat Owners',
    description: 'All clients with at least one cat',
    filters: [{ field: 'species', operator: 'equals', value: 'Cat' }],
    clientCount: 4,
    createdAt: '2025-01-01T00:00:00',
    isSystem: true,
  },
  {
    id: 'seg-6',
    name: 'Multiple Pet Owners',
    description: 'Clients with 2 or more pets',
    filters: [{ field: 'petCount', operator: 'greaterThan', value: 1 }],
    clientCount: 3,
    createdAt: '2025-01-01T00:00:00',
    isSystem: true,
  },
];

export const initialTemplates: Template[] = [
  {
    id: 'tpl-1',
    name: 'Appointment Reminder (24h)',
    channel: 'both',
    subject: 'Reminder: {{pet_name}}\'s Appointment Tomorrow',
    content: 'Hi {{client_name}}, this is a reminder that {{pet_name}} has an appointment tomorrow at {{appointment_time}}. Please arrive 10 minutes early. See you soon!',
    category: 'reminder',
    tags: ['appointment', 'reminder'],
    createdAt: '2025-01-01T00:00:00',
    isSystem: true,
  },
  {
    id: 'tpl-2',
    name: 'Vaccination Due Notice',
    channel: 'email',
    subject: '{{pet_name}}\'s Vaccination is Due 💉',
    content: 'Hi {{client_name}},\n\nThis is a friendly reminder that {{pet_name}} is due for their vaccination. Keeping vaccinations up to date is essential for your pet\'s health.\n\nSchedule an appointment today!\n\nBest regards,\nThe Toby Clinic Team',
    category: 'reminder',
    tags: ['vaccination', 'health'],
    createdAt: '2025-01-01T00:00:00',
    isSystem: true,
  },
  {
    id: 'tpl-3',
    name: 'Welcome New Client',
    channel: 'email',
    subject: 'Welcome to Toby Clinic! 🎉',
    content: 'Welcome to the Toby family, {{client_name}}!\n\nWe\'re thrilled to have you and {{pet_name}} as part of our community. At Toby Clinic, we\'re committed to providing the best care for your furry family members.\n\nHere\'s what you can expect:\n• Compassionate, expert care\n• Easy online booking\n• 24/7 emergency support\n\nIf you have any questions, don\'t hesitate to reach out!\n\nWarm regards,\nThe Toby Clinic Team',
    category: 'greeting',
    tags: ['welcome', 'onboarding'],
    createdAt: '2025-01-01T00:00:00',
    isSystem: true,
  },
  {
    id: 'tpl-4',
    name: 'Re-engagement (Inactive)',
    channel: 'email',
    subject: 'We Miss You! 🐾',
    content: 'Hi {{client_name}},\n\nIt\'s been a while since we\'ve seen {{pet_name}} at Toby Clinic, and we miss you!\n\nRegular check-ups are important for your pet\'s health. Schedule a wellness visit today and receive 10% off your appointment.\n\nWe look forward to seeing you soon!\n\nBest,\nThe Toby Clinic Team',
    category: 'reengagement',
    tags: ['reengagement', 'promotion'],
    createdAt: '2025-01-01T00:00:00',
    isSystem: true,
  },
  {
    id: 'tpl-5',
    name: 'Happy Birthday',
    channel: 'whatsapp',
    content: '🎂 Happy Birthday to {{pet_name}}! 🎉\n\nWishing your furry friend a pawsome day filled with treats and belly rubs!\n\nStop by the clinic for a special birthday treat! 🦴',
    category: 'greeting',
    tags: ['birthday', 'greeting'],
    createdAt: '2025-01-01T00:00:00',
    isSystem: true,
  },
  {
    id: 'tpl-6',
    name: 'Post-Visit Follow-up',
    channel: 'email',
    subject: 'How is {{pet_name}} Doing?',
    content: 'Hi {{client_name}},\n\nWe hope {{pet_name}} is feeling great after their recent visit!\n\nIf you have any questions about the treatment or notice anything unusual, please don\'t hesitate to contact us.\n\nThank you for trusting us with {{pet_name}}\'s care.\n\nBest regards,\nThe Toby Clinic Team',
    category: 'followup',
    tags: ['followup', 'care'],
    createdAt: '2025-01-01T00:00:00',
    isSystem: true,
  },
  {
    id: 'tpl-7',
    name: 'Dental Month Promotion',
    channel: 'both',
    subject: 'January is Dental Health Month! 🦷',
    content: '🦷 January is Dental Health Month!\n\nDid you know that dental disease affects 80% of dogs and 70% of cats by age 3?\n\nBook {{pet_name}}\'s dental cleaning this month and get 15% off!\n\nHealthy teeth = Happy pet! 😊',
    category: 'promotion',
    tags: ['dental', 'promotion', 'health'],
    createdAt: '2025-01-01T00:00:00',
    isSystem: true,
  },
];

export const initialWorkflows: Workflow[] = [
  {
    id: 'wf-1',
    name: 'Appointment Reminder',
    description: 'Send reminder 24 hours before scheduled appointments',
    trigger: { type: 'days_before_appointment', value: 1 },
    actions: [
      { type: 'send_email', templateId: 'tpl-1' },
      { type: 'send_whatsapp', templateId: 'tpl-1' },
    ],
    status: 'active',
    stats: { sent: 156, opened: 142, clicked: 89 },
    createdAt: '2025-01-01T00:00:00',
  },
  {
    id: 'wf-2',
    name: 'New Client Welcome',
    description: 'Welcome email sent to new clients after registration',
    trigger: { type: 'new_client' },
    actions: [
      { type: 'send_email', templateId: 'tpl-3' },
    ],
    status: 'active',
    stats: { sent: 24, opened: 22, clicked: 18 },
    createdAt: '2025-01-01T00:00:00',
  },
  {
    id: 'wf-3',
    name: 'Vaccination Reminder',
    description: 'Remind clients when pet vaccinations are due',
    trigger: { type: 'vaccination_due', value: 14 },
    actions: [
      { type: 'send_email', templateId: 'tpl-2' },
    ],
    status: 'active',
    stats: { sent: 67, opened: 58, clicked: 34 },
    createdAt: '2025-01-01T00:00:00',
  },
  {
    id: 'wf-4',
    name: 'Post-Visit Follow-up',
    description: 'Check in with clients 3 days after their visit',
    trigger: { type: 'days_after_visit', value: 3 },
    actions: [
      { type: 'send_email', templateId: 'tpl-6' },
    ],
    status: 'active',
    stats: { sent: 89, opened: 71, clicked: 12 },
    createdAt: '2025-01-01T00:00:00',
  },
  {
    id: 'wf-5',
    name: 'Re-engagement Campaign',
    description: 'Reach out to clients inactive for 90+ days',
    trigger: { type: 'inactive_client', value: 90 },
    actions: [
      { type: 'send_email', templateId: 'tpl-4' },
    ],
    status: 'paused',
    stats: { sent: 32, opened: 18, clicked: 8 },
    createdAt: '2025-01-01T00:00:00',
  },
  {
    id: 'wf-6',
    name: 'Pet Birthday Wishes',
    description: 'Send birthday greetings on pet birthdays',
    trigger: { type: 'pet_birthday' },
    actions: [
      { type: 'send_whatsapp', templateId: 'tpl-5' },
    ],
    status: 'active',
    stats: { sent: 45, opened: 0, clicked: 0 },
    createdAt: '2025-01-01T00:00:00',
  },
];

export const initialUsers: User[] = [
  { id: '1', name: 'Dr. Juan Pérez', email: 'juan.perez@toby.com', role: 'admin' },
  { id: '2', name: 'Dr. Emily Chen', email: 'emily.chen@toby.com', role: 'veterinarian' },
  { id: '3', name: 'Sofia Martinez', email: 'sofia.martinez@toby.com', role: 'receptionist' },
  { id: '4', name: 'Dr. Michael Brown', email: 'michael.brown@toby.com', role: 'veterinarian' },
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

