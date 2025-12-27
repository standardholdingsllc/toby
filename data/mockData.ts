// Mock Data for VetCRM Demo

export interface CustomProperty {
  id: string;
  name: string;
  value: string;
  type: 'text' | 'number' | 'date' | 'select';
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  numberOfPets: number;
  createdAt: string;
  tags: string[];
  customProperties?: CustomProperty[];
}

// Available client tag definitions (for UI)
export const clientTagDefinitions = [
  { id: 'vip', name: 'VIP', color: 'amber' },
  { id: 'new-client', name: 'New Client', color: 'green' },
  { id: 'frequent-visitor', name: 'Frequent Visitor', color: 'blue' },
  { id: 'needs-followup', name: 'Needs Follow-up', color: 'red' },
  { id: 'payment-pending', name: 'Payment Pending', color: 'orange' },
  { id: 'senior-pet', name: 'Senior Pet Owner', color: 'purple' },
  { id: 'puppy-kitten', name: 'Puppy/Kitten Owner', color: 'pink' },
  { id: 'multiple-pets', name: 'Multiple Pets', color: 'indigo' },
  { id: 'grooming-regular', name: 'Grooming Regular', color: 'cyan' },
  { id: 'dental-care', name: 'Dental Care Plan', color: 'teal' },
  { id: 'insurance', name: 'Has Insurance', color: 'emerald' },
  { id: 'referral-source', name: 'Referral Source', color: 'violet' },
  { id: 'boarding-client', name: 'Boarding Client', color: 'sky' },
  { id: 'special-needs', name: 'Special Needs Pet', color: 'rose' },
  { id: 'breeder', name: 'Breeder', color: 'fuchsia' },
];

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
  passedAway?: boolean;
  customProperties?: CustomProperty[];
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
    type: 'days_before_appointment' | 'days_after_visit' | 'pet_birthday' | 'vaccination_due' | 'new_client' | 'inactive_client' | 'payment_received' | 'invoice_overdue';
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

export interface FinanceRecord {
  id: string;
  type: 'payment' | 'invoice' | 'receipt';
  clientId: string;
  clientName: string;
  petId?: string;
  petName?: string;
  appointmentId?: string;
  amount: number;
  description: string;
  date: string;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  paymentMethod?: 'cash' | 'card' | 'transfer' | 'other';
  invoiceNumber?: string;
  receiptNumber?: string;
  items?: FinanceItem[];
  notes?: string;
}

export interface FinanceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface CustomWorkflow {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: 'days_before_appointment' | 'days_after_visit' | 'pet_birthday' | 'vaccination_due' | 'new_client' | 'inactive_client' | 'payment_received' | 'invoice_overdue';
    value?: number;
    conditions?: WorkflowCondition[];
  };
  actions: WorkflowAction[];
  status: 'active' | 'paused' | 'draft';
  stats: {
    sent: number;
    opened: number;
    clicked: number;
  };
  createdAt: string;
  isCustom: boolean;
}

export interface WorkflowCondition {
  field: string;
  operator: 'equals' | 'contains' | 'greaterThan' | 'lessThan';
  value: string | number;
}

export interface WorkflowAction {
  id: string;
  type: 'send_email' | 'send_whatsapp' | 'wait' | 'add_tag' | 'remove_tag';
  templateId?: string;
  delayDays?: number;
  tagId?: string;
  customMessage?: string;
  customSubject?: string;
}

// Initial Mock Data - 18 clients with varied tags
export const initialClients: Client[] = [
  // Original 6 clients with tags added
  { id: '1', name: 'María García', phone: '+51 999 123 456', email: 'maria.garcia@email.com', address: 'Av. Sánchez Cerro 123, Piura', numberOfPets: 2, createdAt: '2024-06-15', tags: ['vip', 'frequent-visitor', 'multiple-pets'] },
  { id: '2', name: 'John Smith', phone: '+51 999 234 567', email: 'john.smith@email.com', address: 'Jr. Libertad 456, Piura', numberOfPets: 1, createdAt: '2024-08-22', tags: ['needs-followup', 'dental-care'] },
  { id: '3', name: 'Ana Rodríguez', phone: '+51 999 345 678', email: 'ana.rodriguez@email.com', address: 'Calle Tacna 789, Piura', numberOfPets: 3, createdAt: '2024-09-10', tags: ['vip', 'multiple-pets', 'insurance'] },
  { id: '4', name: 'Carlos Mendez', phone: '+51 999 456 789', email: 'carlos.mendez@email.com', address: 'Av. Grau 321, Piura', numberOfPets: 1, createdAt: '2024-10-05', tags: ['grooming-regular'] },
  { id: '5', name: 'Sarah Johnson', phone: '+51 999 567 890', email: 'sarah.j@email.com', address: 'Jr. Arequipa 654, Piura', numberOfPets: 2, createdAt: '2024-11-18', tags: ['senior-pet', 'multiple-pets', 'frequent-visitor'] },
  { id: '6', name: 'Roberto Fernández', phone: '+51 999 678 901', email: 'roberto.f@email.com', address: 'Calle Lima 987, Piura', numberOfPets: 1, createdAt: '2024-12-01', tags: ['new-client', 'puppy-kitten'] },

  // 12 new clients with varied demographics and tags
  { id: '7', name: 'Emily Watson', phone: '+51 999 789 012', email: 'emily.watson@email.com', address: 'Av. Bolognesi 147, Piura', numberOfPets: 1, createdAt: '2024-07-20', tags: ['vip', 'insurance', 'frequent-visitor'] },
  { id: '8', name: 'Miguel Torres', phone: '+51 999 890 123', email: 'miguel.t@email.com', address: 'Jr. San Martín 258, Piura', numberOfPets: 2, createdAt: '2024-05-12', tags: ['breeder', 'multiple-pets', 'dental-care'] },
  { id: '9', name: 'Jennifer Lee', phone: '+51 999 901 234', email: 'jennifer.lee@email.com', address: 'Calle Huancavelica 369, Piura', numberOfPets: 1, createdAt: '2024-09-28', tags: ['senior-pet', 'special-needs'] },
  { id: '10', name: 'David Kim', phone: '+51 999 012 345', email: 'david.kim@email.com', address: 'Av. Sánchez Cerro 480, Piura', numberOfPets: 3, createdAt: '2024-04-15', tags: ['vip', 'multiple-pets', 'boarding-client', 'insurance'] },
  { id: '11', name: 'Sofia Reyes', phone: '+51 999 123 789', email: 'sofia.reyes@email.com', address: 'Jr. Cusco 591, Piura', numberOfPets: 1, createdAt: '2024-11-05', tags: ['new-client', 'puppy-kitten', 'grooming-regular'] },
  { id: '12', name: 'James Wilson', phone: '+51 999 234 890', email: 'james.w@email.com', address: 'Calle Ayacucho 702, Piura', numberOfPets: 2, createdAt: '2024-08-03', tags: ['referral-source', 'frequent-visitor'] },
  { id: '13', name: 'Isabella Martinez', phone: '+51 999 345 901', email: 'isabella.m@email.com', address: 'Av. Ica 813, Piura', numberOfPets: 1, createdAt: '2024-10-22', tags: ['payment-pending', 'needs-followup'] },
  { id: '14', name: 'William Brown', phone: '+51 999 456 012', email: 'william.b@email.com', address: 'Jr. Puno 924, Piura', numberOfPets: 4, createdAt: '2024-03-08', tags: ['vip', 'multiple-pets', 'breeder', 'insurance'] },
  { id: '15', name: 'Camila Herrera', phone: '+51 999 567 123', email: 'camila.h@email.com', address: 'Calle Trujillo 135, Piura', numberOfPets: 1, createdAt: '2024-12-10', tags: ['new-client', 'referral-source'] },
  { id: '16', name: 'Alexander Davis', phone: '+51 999 678 234', email: 'alex.davis@email.com', address: 'Av. Chiclayo 246, Piura', numberOfPets: 2, createdAt: '2024-06-30', tags: ['boarding-client', 'grooming-regular', 'multiple-pets'] },
  { id: '17', name: 'Valentina Ruiz', phone: '+51 999 789 345', email: 'valentina.r@email.com', address: 'Jr. Cajamarca 357, Piura', numberOfPets: 1, createdAt: '2024-07-14', tags: ['senior-pet', 'dental-care', 'special-needs'] },
  { id: '18', name: 'Christopher Taylor', phone: '+51 999 890 456', email: 'chris.taylor@email.com', address: 'Calle Chimbote 468, Piura', numberOfPets: 2, createdAt: '2024-12-18', tags: ['new-client', 'puppy-kitten', 'insurance'] },
];

export const initialPets: Pet[] = [
  // Original 10 pets
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
  
  // New pets for new clients - including more species common in Peruvian vet clinics
  { id: '11', name: 'Daisy', species: 'Dog', breed: 'French Bulldog', age: 2, ownerId: '7', ownerName: 'Emily Watson', allergies: 'Grain', vaccinations: 'Up to date', notes: 'Snores loudly, very affectionate' },
  { id: '12', name: 'Thor', species: 'Dog', breed: 'Rottweiler', age: 4, ownerId: '8', ownerName: 'Miguel Torres', allergies: 'None', vaccinations: 'Up to date', notes: 'Well trained, gentle giant' },
  { id: '13', name: 'Nala', species: 'Dog', breed: 'Rottweiler', age: 3, ownerId: '8', ownerName: 'Miguel Torres', allergies: 'None', vaccinations: 'Up to date', notes: 'Thor\'s sister, breeding female' },
  { id: '14', name: 'Ginger', species: 'Cat', breed: 'Ragdoll', age: 12, ownerId: '9', ownerName: 'Jennifer Lee', allergies: 'Fish', vaccinations: 'Up to date', notes: 'Senior cat, arthritis medication' },
  { id: '15', name: 'Duke', species: 'Dog', breed: 'Great Dane', age: 5, ownerId: '10', ownerName: 'David Kim', allergies: 'None', vaccinations: 'Up to date', notes: 'Gentle giant, needs large space' },
  { id: '16', name: 'Princess', species: 'Cat', breed: 'Scottish Fold', age: 3, ownerId: '10', ownerName: 'David Kim', allergies: 'None', vaccinations: 'Up to date', notes: 'Very vocal, loves attention' },
  { id: '17', name: 'Shadow', species: 'Cat', breed: 'Black Domestic', age: 2, ownerId: '10', ownerName: 'David Kim', allergies: 'None', vaccinations: 'Up to date', notes: 'Shy but sweet' },
  { id: '18', name: 'Mochi', species: 'Dog', breed: 'Shiba Inu', age: 1, ownerId: '11', ownerName: 'Sofia Reyes', allergies: 'None', vaccinations: 'Puppy series in progress', notes: 'Still in training, very smart' },
  { id: '19', name: 'Charlie', species: 'Dog', breed: 'Cocker Spaniel', age: 7, ownerId: '12', ownerName: 'James Wilson', allergies: 'Pork', vaccinations: 'Up to date', notes: 'Ear infections history' },
  { id: '20', name: 'Pepper', species: 'Cat', breed: 'Tuxedo', age: 4, ownerId: '12', ownerName: 'James Wilson', allergies: 'None', vaccinations: 'Up to date', notes: 'Indoor/outdoor cat' },
  { id: '21', name: 'Lola', species: 'Dog', breed: 'Chihuahua', age: 3, ownerId: '13', ownerName: 'Isabella Martinez', allergies: 'None', vaccinations: 'Needs booster', notes: 'Nervous around other dogs' },
  { id: '22', name: 'Zeus', species: 'Dog', breed: 'Doberman', age: 5, ownerId: '14', ownerName: 'William Brown', allergies: 'None', vaccinations: 'Up to date', notes: 'Show dog, excellent temperament' },
  { id: '23', name: 'Athena', species: 'Dog', breed: 'Doberman', age: 4, ownerId: '14', ownerName: 'William Brown', allergies: 'None', vaccinations: 'Up to date', notes: 'Breeding female, champion bloodline' },
  { id: '24', name: 'Apollo', species: 'Dog', breed: 'Doberman', age: 2, ownerId: '14', ownerName: 'William Brown', allergies: 'Chicken', vaccinations: 'Up to date', notes: 'Young male, in training' },
  { id: '25', name: 'Cleo', species: 'Cat', breed: 'Sphynx', age: 3, ownerId: '14', ownerName: 'William Brown', allergies: 'None', vaccinations: 'Up to date', notes: 'Needs regular skin care' },
  { id: '26', name: 'Biscuit', species: 'Dog', breed: 'Corgi', age: 1, ownerId: '15', ownerName: 'Camila Herrera', allergies: 'None', vaccinations: 'Puppy series complete', notes: 'Full of energy, loves to play' },
  { id: '27', name: 'Tucker', species: 'Dog', breed: 'Australian Shepherd', age: 4, ownerId: '16', ownerName: 'Alexander Davis', allergies: 'None', vaccinations: 'Up to date', notes: 'Very active, needs lots of exercise' },
  { id: '28', name: 'Maple', species: 'Cat', breed: 'Calico', age: 6, ownerId: '16', ownerName: 'Alexander Davis', allergies: 'Beef', vaccinations: 'Up to date', notes: 'Calm and independent' },
  { id: '29', name: 'Rosie', species: 'Dog', breed: 'Cavalier King Charles', age: 10, ownerId: '17', ownerName: 'Valentina Ruiz', allergies: 'None', vaccinations: 'Up to date', notes: 'Heart murmur, on medication' },
  { id: '30', name: 'Scout', species: 'Dog', breed: 'Border Collie', age: 1, ownerId: '18', ownerName: 'Christopher Taylor', allergies: 'None', vaccinations: 'Puppy series in progress', notes: 'Extremely intelligent, learning tricks' },
  { id: '31', name: 'Willow', species: 'Cat', breed: 'Norwegian Forest', age: 1, ownerId: '18', ownerName: 'Christopher Taylor', allergies: 'None', vaccinations: 'Kitten series complete', notes: 'Long fur, needs regular brushing' },
  
  // Additional pets - Rabbits (common in Peru)
  { id: '32', name: 'Pelusa', species: 'Rabbit', breed: 'Holland Lop', age: 2, ownerId: '1', ownerName: 'María García', allergies: 'None', vaccinations: 'Up to date', notes: 'Very gentle, loves hay' },
  { id: '33', name: 'Copito', species: 'Rabbit', breed: 'Rex', age: 1, ownerId: '11', ownerName: 'Sofia Reyes', allergies: 'None', vaccinations: 'Up to date', notes: 'Soft fur, friendly' },
  
  // Guinea Pigs (Cuyes - very popular in Peru)
  { id: '34', name: 'Manchas', species: 'Guinea Pig', breed: 'American', age: 1, ownerId: '6', ownerName: 'Roberto Fernández', allergies: 'None', vaccinations: 'N/A', notes: 'Tricolor, very vocal when hungry' },
  { id: '35', name: 'Caramelo', species: 'Guinea Pig', breed: 'Peruvian', age: 2, ownerId: '6', ownerName: 'Roberto Fernández', allergies: 'None', vaccinations: 'N/A', notes: 'Long-haired, needs regular grooming' },
  { id: '36', name: 'Bolita', species: 'Guinea Pig', breed: 'Teddy', age: 1, ownerId: '15', ownerName: 'Camila Herrera', allergies: 'None', vaccinations: 'N/A', notes: 'Very round and fluffy' },
  
  // Hamsters
  { id: '37', name: 'Bigotes', species: 'Hamster', breed: 'Syrian', age: 1, ownerId: '13', ownerName: 'Isabella Martinez', allergies: 'None', vaccinations: 'N/A', notes: 'Golden color, nocturnal' },
  { id: '38', name: 'Chispa', species: 'Hamster', breed: 'Dwarf Campbell', age: 1, ownerId: '18', ownerName: 'Christopher Taylor', allergies: 'None', vaccinations: 'N/A', notes: 'Very active, loves running wheel' },
  
  // Birds (common pet birds in Peru)
  { id: '39', name: 'Piolín', species: 'Bird', breed: 'Canary', age: 3, ownerId: '3', ownerName: 'Ana Rodríguez', allergies: 'None', vaccinations: 'N/A', notes: 'Beautiful singer, yellow' },
  { id: '40', name: 'Coco', species: 'Bird', breed: 'Cockatiel', age: 4, ownerId: '9', ownerName: 'Jennifer Lee', allergies: 'None', vaccinations: 'N/A', notes: 'Can whistle tunes, very social' },
  { id: '41', name: 'Verde', species: 'Bird', breed: 'Budgerigar', age: 2, ownerId: '12', ownerName: 'James Wilson', allergies: 'None', vaccinations: 'N/A', notes: 'Green and yellow, learning to talk' },
  
  // Turtles
  { id: '42', name: 'Tortuga', species: 'Turtle', breed: 'Red-eared Slider', age: 8, ownerId: '7', ownerName: 'Emily Watson', allergies: 'None', vaccinations: 'N/A', notes: 'Aquatic, needs UV lighting' },
  { id: '43', name: 'Lento', species: 'Turtle', breed: 'Russian Tortoise', age: 15, ownerId: '17', ownerName: 'Valentina Ruiz', allergies: 'None', vaccinations: 'N/A', notes: 'Land tortoise, loves leafy greens' },
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

  // January 2026 Appointments - scattered across weekdays (no Sundays), realistic distribution
  { id: '12', date: '2026-01-02', time: '10:00', petId: '11', petName: 'Daisy', ownerId: '7', ownerName: 'Emily Watson', type: 'Check-up', status: 'scheduled', notes: 'New client wellness exam' },
  { id: '13', date: '2026-01-02', time: '14:30', petId: '32', petName: 'Pelusa', ownerId: '1', ownerName: 'María García', type: 'Check-up', status: 'scheduled', notes: 'Rabbit wellness check' },
  { id: '14', date: '2026-01-03', time: '10:00', petId: '10', petName: 'Simba', ownerId: '6', ownerName: 'Roberto Fernández', type: 'Vaccination', status: 'scheduled', notes: 'First year vaccinations' },
  { id: '15', date: '2026-01-03', time: '14:30', petId: '12', petName: 'Thor', ownerId: '8', ownerName: 'Miguel Torres', type: 'Vaccination', status: 'scheduled', notes: 'Annual booster' },
  { id: '16', date: '2026-01-05', time: '09:00', petId: '34', petName: 'Manchas', ownerId: '6', ownerName: 'Roberto Fernández', type: 'Check-up', status: 'scheduled', notes: 'Guinea pig wellness' },
  { id: '17', date: '2026-01-06', time: '09:00', petId: '14', petName: 'Ginger', ownerId: '9', ownerName: 'Jennifer Lee', type: 'Check-up', status: 'scheduled', notes: 'Senior pet check-up' },
  { id: '18', date: '2026-01-06', time: '11:00', petId: '15', petName: 'Duke', ownerId: '10', ownerName: 'David Kim', type: 'Grooming', status: 'scheduled', notes: 'Full service grooming' },
  { id: '19', date: '2026-01-06', time: '14:30', petId: '16', petName: 'Princess', ownerId: '10', ownerName: 'David Kim', type: 'Vaccination', status: 'scheduled', notes: 'Feline leukemia booster' },
  { id: '20', date: '2026-01-07', time: '10:30', petId: '17', petName: 'Shadow', ownerId: '10', ownerName: 'David Kim', type: 'Check-up', status: 'scheduled', notes: 'Annual exam' },
  { id: '21', date: '2026-01-08', time: '09:00', petId: '18', petName: 'Mochi', ownerId: '11', ownerName: 'Sofia Reyes', type: 'Vaccination', status: 'scheduled', notes: 'Puppy series completion' },
  { id: '22', date: '2026-01-08', time: '14:00', petId: '19', petName: 'Charlie', ownerId: '12', ownerName: 'James Wilson', type: 'Check-up', status: 'scheduled', notes: 'Senior dog wellness' },
  { id: '23', date: '2026-01-09', time: '10:30', petId: '20', petName: 'Pepper', ownerId: '12', ownerName: 'James Wilson', type: 'Vaccination', status: 'scheduled', notes: 'Annual feline vaccination' },
  { id: '24', date: '2026-01-10', time: '09:30', petId: '21', petName: 'Lola', ownerId: '13', ownerName: 'Isabella Martinez', type: 'Check-up', status: 'scheduled', notes: 'Anxiety behavior assessment' },
  { id: '25', date: '2026-01-10', time: '14:00', petId: '22', petName: 'Zeus', ownerId: '14', ownerName: 'William Brown', type: 'Grooming', status: 'scheduled', notes: 'Show dog grooming' },
  { id: '26', date: '2026-01-12', time: '09:00', petId: '40', petName: 'Coco', ownerId: '9', ownerName: 'Jennifer Lee', type: 'Check-up', status: 'scheduled', notes: 'Cockatiel wellness exam' },
  { id: '27', date: '2026-01-13', time: '09:00', petId: '23', petName: 'Athena', ownerId: '14', ownerName: 'William Brown', type: 'Vaccination', status: 'scheduled', notes: 'Breeding female vaccination' },
  { id: '28', date: '2026-01-13', time: '11:00', petId: '24', petName: 'Apollo', ownerId: '14', ownerName: 'William Brown', type: 'Check-up', status: 'scheduled', notes: 'Young dog development check' },
  { id: '29', date: '2026-01-13', time: '14:30', petId: '25', petName: 'Cleo', ownerId: '14', ownerName: 'William Brown', type: 'Check-up', status: 'scheduled', notes: 'Sphynx skin care exam' },
  { id: '30', date: '2026-01-13', time: '16:00', petId: '26', petName: 'Biscuit', ownerId: '15', ownerName: 'Camila Herrera', type: 'Vaccination', status: 'scheduled', notes: 'Puppy vaccination series' },
  { id: '31', date: '2026-01-14', time: '10:30', petId: '27', petName: 'Tucker', ownerId: '16', ownerName: 'Alexander Davis', type: 'Check-up', status: 'scheduled', notes: 'Active dog wellness exam' },
  { id: '32', date: '2026-01-15', time: '09:00', petId: '28', petName: 'Maple', ownerId: '16', ownerName: 'Alexander Davis', type: 'Check-up', status: 'scheduled', notes: 'Senior cat check-up' },
  { id: '33', date: '2026-01-15', time: '14:00', petId: '29', petName: 'Rosie', ownerId: '17', ownerName: 'Valentina Ruiz', type: 'Check-up', status: 'scheduled', notes: 'Heart condition monitoring' },
  { id: '34', date: '2026-01-16', time: '10:30', petId: '30', petName: 'Scout', ownerId: '18', ownerName: 'Christopher Taylor', type: 'Vaccination', status: 'scheduled', notes: 'Puppy series in progress' },
  { id: '35', date: '2026-01-16', time: '15:00', petId: '31', petName: 'Willow', ownerId: '18', ownerName: 'Christopher Taylor', type: 'Grooming', status: 'scheduled', notes: 'Long-haired kitten first groom' },
  { id: '36', date: '2026-01-17', time: '09:30', petId: '1', petName: 'Luna', ownerId: '1', ownerName: 'María García', type: 'Vaccination', status: 'scheduled', notes: 'Annual vaccination due' },
  { id: '37', date: '2026-01-17', time: '14:00', petId: '2', petName: 'Max', ownerId: '1', ownerName: 'María García', type: 'Check-up', status: 'scheduled', notes: 'Senior cat wellness' },
  { id: '38', date: '2026-01-19', time: '10:00', petId: '42', petName: 'Tortuga', ownerId: '7', ownerName: 'Emily Watson', type: 'Check-up', status: 'scheduled', notes: 'Turtle shell inspection' },
  { id: '39', date: '2026-01-20', time: '10:30', petId: '3', petName: 'Buddy', ownerId: '2', ownerName: 'John Smith', type: 'Check-up', status: 'scheduled', notes: 'Post-vaccination check' },
  { id: '40', date: '2026-01-20', time: '15:00', petId: '4', petName: 'Whiskers', ownerId: '3', ownerName: 'Ana Rodríguez', type: 'Vaccination', status: 'scheduled', notes: 'Annual feline vaccination' },
  { id: '41', date: '2026-01-21', time: '09:00', petId: '5', petName: 'Rocky', ownerId: '3', ownerName: 'Ana Rodríguez', type: 'Check-up', status: 'scheduled', notes: 'Post-surgery follow-up' },
  { id: '42', date: '2026-01-21', time: '11:00', petId: '6', petName: 'Mittens', ownerId: '3', ownerName: 'Ana Rodríguez', type: 'Vaccination', status: 'scheduled', notes: 'One year booster' },
  { id: '43', date: '2026-01-21', time: '14:30', petId: '7', petName: 'Coco', ownerId: '4', ownerName: 'Carlos Mendez', type: 'Check-up', status: 'scheduled', notes: 'Annual wellness exam' },
  { id: '44', date: '2026-01-22', time: '10:30', petId: '8', petName: 'Oliver', ownerId: '5', ownerName: 'Sarah Johnson', type: 'Check-up', status: 'scheduled', notes: 'Weight management follow-up' },
  { id: '45', date: '2026-01-23', time: '09:00', petId: '9', petName: 'Bella', ownerId: '5', ownerName: 'Sarah Johnson', type: 'Vaccination', status: 'scheduled', notes: 'Annual vaccination' },
  { id: '46', date: '2026-01-23', time: '14:00', petId: '35', petName: 'Caramelo', ownerId: '6', ownerName: 'Roberto Fernández', type: 'Grooming', status: 'scheduled', notes: 'Long-haired guinea pig trim' },
  { id: '47', date: '2026-01-24', time: '10:30', petId: '11', petName: 'Daisy', ownerId: '7', ownerName: 'Emily Watson', type: 'Vaccination', status: 'scheduled', notes: 'Annual booster' },
  { id: '48', date: '2026-01-24', time: '15:00', petId: '12', petName: 'Thor', ownerId: '8', ownerName: 'Miguel Torres', type: 'Check-up', status: 'scheduled', notes: 'Annual wellness exam' },
  { id: '49', date: '2026-01-26', time: '10:00', petId: '37', petName: 'Bigotes', ownerId: '13', ownerName: 'Isabella Martinez', type: 'Check-up', status: 'scheduled', notes: 'Hamster health check' },
  { id: '50', date: '2026-01-27', time: '09:00', petId: '13', petName: 'Nala', ownerId: '8', ownerName: 'Miguel Torres', type: 'Grooming', status: 'scheduled', notes: 'Full grooming service' },
  { id: '51', date: '2026-01-27', time: '11:00', petId: '14', petName: 'Ginger', ownerId: '9', ownerName: 'Jennifer Lee', type: 'Check-up', status: 'scheduled', notes: 'Arthritis medication review' },
  { id: '52', date: '2026-01-27', time: '14:30', petId: '15', petName: 'Duke', ownerId: '10', ownerName: 'David Kim', type: 'Check-up', status: 'scheduled', notes: 'Giant breed wellness' },
  { id: '53', date: '2026-01-28', time: '09:30', petId: '16', petName: 'Princess', ownerId: '10', ownerName: 'David Kim', type: 'Vaccination', status: 'scheduled', notes: 'Annual feline vaccination' },
  { id: '54', date: '2026-01-28', time: '14:00', petId: '17', petName: 'Shadow', ownerId: '10', ownerName: 'David Kim', type: 'Check-up', status: 'scheduled', notes: 'Shy cat wellness exam' },
  { id: '55', date: '2026-01-29', time: '10:30', petId: '18', petName: 'Mochi', ownerId: '11', ownerName: 'Sofia Reyes', type: 'Check-up', status: 'scheduled', notes: 'Puppy development check' },
  { id: '56', date: '2026-01-29', time: '15:00', petId: '19', petName: 'Charlie', ownerId: '12', ownerName: 'James Wilson', type: 'Check-up', status: 'scheduled', notes: 'Ear infection monitoring' },
  { id: '57', date: '2026-01-30', time: '09:00', petId: '20', petName: 'Pepper', ownerId: '12', ownerName: 'James Wilson', type: 'Check-up', status: 'scheduled', notes: 'Annual feline wellness' },
  { id: '58', date: '2026-01-30', time: '14:00', petId: '21', petName: 'Lola', ownerId: '13', ownerName: 'Isabella Martinez', type: 'Vaccination', status: 'scheduled', notes: 'Annual vaccination' },
  { id: '59', date: '2026-01-31', time: '10:30', petId: '22', petName: 'Zeus', ownerId: '14', ownerName: 'William Brown', type: 'Vaccination', status: 'scheduled', notes: 'Annual booster' },
  { id: '60', date: '2026-01-31', time: '15:00', petId: '39', petName: 'Piolín', ownerId: '3', ownerName: 'Ana Rodríguez', type: 'Check-up', status: 'scheduled', notes: 'Canary wellness check' },

  // February 2026 Appointments - fewer than January, scattered across weekdays (no Sundays)
  { id: '61', date: '2026-02-02', time: '10:00', petId: '1', petName: 'Luna', ownerId: '1', ownerName: 'María García', type: 'Check-up', status: 'scheduled', notes: 'Follow-up wellness exam' },
  { id: '62', date: '2026-02-03', time: '09:30', petId: '23', petName: 'Athena', ownerId: '14', ownerName: 'William Brown', type: 'Grooming', status: 'scheduled', notes: 'Breeding show grooming' },
  { id: '63', date: '2026-02-03', time: '14:30', petId: '22', petName: 'Zeus', ownerId: '14', ownerName: 'William Brown', type: 'Check-up', status: 'scheduled', notes: 'Show dog annual exam' },
  { id: '64', date: '2026-02-04', time: '10:00', petId: '36', petName: 'Bolita', ownerId: '15', ownerName: 'Camila Herrera', type: 'Check-up', status: 'scheduled', notes: 'Guinea pig wellness' },
  { id: '65', date: '2026-02-05', time: '14:00', petId: '24', petName: 'Apollo', ownerId: '14', ownerName: 'William Brown', type: 'Check-up', status: 'scheduled', notes: 'Young dog development' },
  { id: '66', date: '2026-02-06', time: '09:00', petId: '33', petName: 'Copito', ownerId: '11', ownerName: 'Sofia Reyes', type: 'Check-up', status: 'scheduled', notes: 'Rabbit dental check' },
  { id: '67', date: '2026-02-07', time: '10:30', petId: '2', petName: 'Max', ownerId: '1', ownerName: 'María García', type: 'Vaccination', status: 'scheduled', notes: 'Senior cat vaccination' },
  { id: '68', date: '2026-02-09', time: '09:00', petId: '41', petName: 'Verde', ownerId: '12', ownerName: 'James Wilson', type: 'Check-up', status: 'scheduled', notes: 'Budgie wellness exam' },
  { id: '69', date: '2026-02-10', time: '09:00', petId: '3', petName: 'Buddy', ownerId: '2', ownerName: 'John Smith', type: 'Vaccination', status: 'scheduled', notes: 'Annual booster' },
  { id: '70', date: '2026-02-10', time: '14:00', petId: '4', petName: 'Whiskers', ownerId: '3', ownerName: 'Ana Rodríguez', type: 'Check-up', status: 'scheduled', notes: 'Annual feline wellness' },
  { id: '71', date: '2026-02-11', time: '10:30', petId: '5', petName: 'Rocky', ownerId: '3', ownerName: 'Ana Rodríguez', type: 'Check-up', status: 'scheduled', notes: 'Post-dental cleaning check' },
  { id: '72', date: '2026-02-12', time: '09:00', petId: '6', petName: 'Mittens', ownerId: '3', ownerName: 'Ana Rodríguez', type: 'Check-up', status: 'scheduled', notes: 'Young adult wellness' },
  { id: '73', date: '2026-02-12', time: '14:30', petId: '7', petName: 'Coco', ownerId: '4', ownerName: 'Carlos Mendez', type: 'Vaccination', status: 'scheduled', notes: 'Annual vaccination' },
  { id: '74', date: '2026-02-13', time: '10:30', petId: '8', petName: 'Oliver', ownerId: '5', ownerName: 'Sarah Johnson', type: 'Check-up', status: 'scheduled', notes: 'Weight management progress' },
  { id: '75', date: '2026-02-14', time: '09:00', petId: '9', petName: 'Bella', ownerId: '5', ownerName: 'Sarah Johnson', type: 'Check-up', status: 'scheduled', notes: 'Annual wellness' },
  { id: '76', date: '2026-02-16', time: '10:00', petId: '43', petName: 'Lento', ownerId: '17', ownerName: 'Valentina Ruiz', type: 'Check-up', status: 'scheduled', notes: 'Tortoise annual exam' },
  { id: '77', date: '2026-02-17', time: '10:30', petId: '11', petName: 'Daisy', ownerId: '7', ownerName: 'Emily Watson', type: 'Vaccination', status: 'scheduled', notes: 'Annual booster' },
  { id: '78', date: '2026-02-18', time: '09:00', petId: '12', petName: 'Thor', ownerId: '8', ownerName: 'Miguel Torres', type: 'Grooming', status: 'scheduled', notes: 'Full service grooming' },
  { id: '79', date: '2026-02-18', time: '14:30', petId: '13', petName: 'Nala', ownerId: '8', ownerName: 'Miguel Torres', type: 'Check-up', status: 'scheduled', notes: 'Annual wellness' },
  { id: '80', date: '2026-02-19', time: '10:30', petId: '14', petName: 'Ginger', ownerId: '9', ownerName: 'Jennifer Lee', type: 'Check-up', status: 'scheduled', notes: 'Senior arthritis monitoring' },
  { id: '81', date: '2026-02-20', time: '09:00', petId: '15', petName: 'Duke', ownerId: '10', ownerName: 'David Kim', type: 'Vaccination', status: 'scheduled', notes: 'Annual vaccination' },
  { id: '82', date: '2026-02-21', time: '10:30', petId: '17', petName: 'Shadow', ownerId: '10', ownerName: 'David Kim', type: 'Vaccination', status: 'scheduled', notes: 'Annual vaccination' },
  { id: '83', date: '2026-02-23', time: '09:00', petId: '38', petName: 'Chispa', ownerId: '18', ownerName: 'Christopher Taylor', type: 'Check-up', status: 'scheduled', notes: 'Hamster health check' },
  { id: '84', date: '2026-02-24', time: '09:00', petId: '18', petName: 'Mochi', ownerId: '11', ownerName: 'Sofia Reyes', type: 'Check-up', status: 'scheduled', notes: 'Young dog wellness' },
  { id: '85', date: '2026-02-24', time: '14:30', petId: '19', petName: 'Charlie', ownerId: '12', ownerName: 'James Wilson', type: 'Vaccination', status: 'scheduled', notes: 'Annual booster' },
  { id: '86', date: '2026-02-25', time: '10:30', petId: '20', petName: 'Pepper', ownerId: '12', ownerName: 'James Wilson', type: 'Check-up', status: 'scheduled', notes: 'Annual wellness' },
  { id: '87', date: '2026-02-26', time: '09:00', petId: '21', petName: 'Lola', ownerId: '13', ownerName: 'Isabella Martinez', type: 'Check-up', status: 'scheduled', notes: 'Behavioral progress check' },
  { id: '88', date: '2026-02-27', time: '10:30', petId: '26', petName: 'Biscuit', ownerId: '15', ownerName: 'Camila Herrera', type: 'Vaccination', status: 'scheduled', notes: 'Puppy vaccination completion' },
  { id: '89', date: '2026-02-28', time: '09:00', petId: '27', petName: 'Tucker', ownerId: '16', ownerName: 'Alexander Davis', type: 'Check-up', status: 'scheduled', notes: 'Active dog wellness' },

  // March 2026 Appointments - fewer than February, scattered across weekdays (no Sundays)
  { id: '90', date: '2026-03-02', time: '10:00', petId: '1', petName: 'Luna', ownerId: '1', ownerName: 'María García', type: 'Vaccination', status: 'scheduled', notes: 'Booster shots' },
  { id: '91', date: '2026-03-03', time: '09:30', petId: '10', petName: 'Simba', ownerId: '6', ownerName: 'Roberto Fernández', type: 'Check-up', status: 'scheduled', notes: 'Annual wellness' },
  { id: '92', date: '2026-03-04', time: '14:00', petId: '22', petName: 'Zeus', ownerId: '14', ownerName: 'William Brown', type: 'Grooming', status: 'scheduled', notes: 'Show preparation' },
  { id: '93', date: '2026-03-05', time: '10:30', petId: '3', petName: 'Buddy', ownerId: '2', ownerName: 'John Smith', type: 'Check-up', status: 'scheduled', notes: 'Routine check' },
  { id: '94', date: '2026-03-06', time: '09:00', petId: '32', petName: 'Pelusa', ownerId: '1', ownerName: 'María García', type: 'Vaccination', status: 'scheduled', notes: 'Rabbit vaccination' },
  { id: '95', date: '2026-03-07', time: '14:30', petId: '11', petName: 'Daisy', ownerId: '7', ownerName: 'Emily Watson', type: 'Check-up', status: 'scheduled', notes: 'Wellness exam' },
  { id: '96', date: '2026-03-09', time: '10:00', petId: '14', petName: 'Ginger', ownerId: '9', ownerName: 'Jennifer Lee', type: 'Check-up', status: 'scheduled', notes: 'Senior cat monitoring' },
  { id: '97', date: '2026-03-10', time: '09:00', petId: '5', petName: 'Rocky', ownerId: '3', ownerName: 'Ana Rodríguez', type: 'Vaccination', status: 'scheduled', notes: 'Annual vaccination' },
  { id: '98', date: '2026-03-11', time: '14:00', petId: '15', petName: 'Duke', ownerId: '10', ownerName: 'David Kim', type: 'Check-up', status: 'scheduled', notes: 'Giant breed wellness' },
  { id: '99', date: '2026-03-12', time: '10:30', petId: '34', petName: 'Manchas', ownerId: '6', ownerName: 'Roberto Fernández', type: 'Check-up', status: 'scheduled', notes: 'Guinea pig checkup' },
  { id: '100', date: '2026-03-13', time: '09:00', petId: '18', petName: 'Mochi', ownerId: '11', ownerName: 'Sofia Reyes', type: 'Vaccination', status: 'scheduled', notes: 'Annual shots' },
  { id: '101', date: '2026-03-14', time: '14:30', petId: '29', petName: 'Rosie', ownerId: '17', ownerName: 'Valentina Ruiz', type: 'Check-up', status: 'scheduled', notes: 'Heart monitoring' },
  { id: '102', date: '2026-03-16', time: '10:00', petId: '40', petName: 'Coco', ownerId: '9', ownerName: 'Jennifer Lee', type: 'Check-up', status: 'scheduled', notes: 'Bird wellness' },
  { id: '103', date: '2026-03-17', time: '09:30', petId: '7', petName: 'Coco', ownerId: '4', ownerName: 'Carlos Mendez', type: 'Grooming', status: 'scheduled', notes: 'Regular grooming' },
  { id: '104', date: '2026-03-18', time: '14:00', petId: '12', petName: 'Thor', ownerId: '8', ownerName: 'Miguel Torres', type: 'Check-up', status: 'scheduled', notes: 'Annual wellness' },
  { id: '105', date: '2026-03-19', time: '10:30', petId: '27', petName: 'Tucker', ownerId: '16', ownerName: 'Alexander Davis', type: 'Vaccination', status: 'scheduled', notes: 'Annual booster' },
  { id: '106', date: '2026-03-20', time: '09:00', petId: '2', petName: 'Max', ownerId: '1', ownerName: 'María García', type: 'Check-up', status: 'scheduled', notes: 'Senior cat wellness' },
  { id: '107', date: '2026-03-21', time: '14:30', petId: '19', petName: 'Charlie', ownerId: '12', ownerName: 'James Wilson', type: 'Check-up', status: 'scheduled', notes: 'Ear check' },
  { id: '108', date: '2026-03-23', time: '10:00', petId: '30', petName: 'Scout', ownerId: '18', ownerName: 'Christopher Taylor', type: 'Check-up', status: 'scheduled', notes: 'Young dog wellness' },
  { id: '109', date: '2026-03-24', time: '09:30', petId: '23', petName: 'Athena', ownerId: '14', ownerName: 'William Brown', type: 'Check-up', status: 'scheduled', notes: 'Breeding exam' },
  { id: '110', date: '2026-03-25', time: '14:00', petId: '9', petName: 'Bella', ownerId: '5', ownerName: 'Sarah Johnson', type: 'Grooming', status: 'scheduled', notes: 'Bath and trim' },
  { id: '111', date: '2026-03-26', time: '10:30', petId: '42', petName: 'Tortuga', ownerId: '7', ownerName: 'Emily Watson', type: 'Check-up', status: 'scheduled', notes: 'Turtle wellness' },
  { id: '112', date: '2026-03-27', time: '09:00', petId: '21', petName: 'Lola', ownerId: '13', ownerName: 'Isabella Martinez', type: 'Vaccination', status: 'scheduled', notes: 'Annual vaccination' },
  { id: '113', date: '2026-03-28', time: '14:30', petId: '16', petName: 'Princess', ownerId: '10', ownerName: 'David Kim', type: 'Check-up', status: 'scheduled', notes: 'Feline wellness' },
  { id: '114', date: '2026-03-30', time: '10:00', petId: '26', petName: 'Biscuit', ownerId: '15', ownerName: 'Camila Herrera', type: 'Check-up', status: 'scheduled', notes: 'Young dog wellness' },
  { id: '115', date: '2026-03-31', time: '09:30', petId: '8', petName: 'Oliver', ownerId: '5', ownerName: 'Sarah Johnson', type: 'Check-up', status: 'scheduled', notes: 'Weight check' },
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
    clientCount: 4,
    createdAt: '2025-01-01T00:00:00',
    isSystem: true,
  },
  {
    id: 'seg-2',
    name: 'Vaccination Due',
    description: 'Pets with vaccinations due soon',
    filters: [{ field: 'all', operator: 'equals', value: 'vaccination_due' }],
    clientCount: 5,
    createdAt: '2025-01-01T00:00:00',
    isSystem: true,
  },
  {
    id: 'seg-3',
    name: 'Inactive Clients (90+ Days)',
    description: 'Clients with no visit in the last 90 days',
    filters: [{ field: 'lastVisit', operator: 'daysAgo', value: 90 }],
    clientCount: 4,
    createdAt: '2025-01-01T00:00:00',
    isSystem: true,
  },
  {
    id: 'seg-4',
    name: 'Dog Owners',
    description: 'All clients with at least one dog',
    filters: [{ field: 'species', operator: 'equals', value: 'Dog' }],
    clientCount: 14,
    createdAt: '2025-01-01T00:00:00',
    isSystem: true,
  },
  {
    id: 'seg-5',
    name: 'Cat Owners',
    description: 'All clients with at least one cat',
    filters: [{ field: 'species', operator: 'equals', value: 'Cat' }],
    clientCount: 10,
    createdAt: '2025-01-01T00:00:00',
    isSystem: true,
  },
  {
    id: 'seg-6',
    name: 'Multiple Pet Owners',
    description: 'Clients with 2 or more pets',
    filters: [{ field: 'petCount', operator: 'greaterThan', value: 1 }],
    clientCount: 8,
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

// Finance Data
export const initialFinanceRecords: FinanceRecord[] = [
  {
    id: 'fin-1',
    type: 'receipt',
    clientId: '1',
    clientName: 'María García',
    petId: '1',
    petName: 'Luna',
    appointmentId: '10',
    amount: 150,
    description: 'Annual check-up and vaccination',
    date: '2025-12-20',
    status: 'paid',
    paymentMethod: 'card',
    receiptNumber: 'REC-2025-001',
    items: [
      { id: 'item-1', description: 'Annual Check-up', quantity: 1, unitPrice: 80, total: 80 },
      { id: 'item-2', description: 'Rabies Vaccination', quantity: 1, unitPrice: 50, total: 50 },
      { id: 'item-3', description: 'Deworming', quantity: 1, unitPrice: 20, total: 20 },
    ],
  },
  {
    id: 'fin-2',
    type: 'invoice',
    clientId: '3',
    clientName: 'Ana Rodríguez',
    petId: '5',
    petName: 'Rocky',
    appointmentId: '6',
    amount: 450,
    description: 'Dental cleaning under anesthesia',
    date: '2025-12-30',
    status: 'pending',
    invoiceNumber: 'INV-2025-042',
    items: [
      { id: 'item-4', description: 'Dental Cleaning', quantity: 1, unitPrice: 300, total: 300 },
      { id: 'item-5', description: 'Anesthesia', quantity: 1, unitPrice: 100, total: 100 },
      { id: 'item-6', description: 'Post-op Medication', quantity: 1, unitPrice: 50, total: 50 },
    ],
  },
  {
    id: 'fin-3',
    type: 'receipt',
    clientId: '4',
    clientName: 'Carlos Mendez',
    petId: '7',
    petName: 'Coco',
    amount: 85,
    description: 'Full grooming session',
    date: '2025-12-15',
    status: 'paid',
    paymentMethod: 'cash',
    receiptNumber: 'REC-2025-002',
    items: [
      { id: 'item-7', description: 'Full Grooming', quantity: 1, unitPrice: 70, total: 70 },
      { id: 'item-8', description: 'Nail Trimming', quantity: 1, unitPrice: 15, total: 15 },
    ],
  },
  {
    id: 'fin-4',
    type: 'invoice',
    clientId: '2',
    clientName: 'John Smith',
    petId: '3',
    petName: 'Buddy',
    appointmentId: '2',
    amount: 120,
    description: 'Rabies booster vaccination',
    date: '2025-12-27',
    status: 'pending',
    invoiceNumber: 'INV-2025-043',
    items: [
      { id: 'item-9', description: 'Consultation', quantity: 1, unitPrice: 50, total: 50 },
      { id: 'item-10', description: 'Rabies Booster', quantity: 1, unitPrice: 70, total: 70 },
    ],
  },
  {
    id: 'fin-5',
    type: 'receipt',
    clientId: '5',
    clientName: 'Sarah Johnson',
    petId: '8',
    petName: 'Oliver',
    amount: 200,
    description: 'Weight management consultation and diet food',
    date: '2025-12-10',
    status: 'paid',
    paymentMethod: 'transfer',
    receiptNumber: 'REC-2025-003',
    items: [
      { id: 'item-11', description: 'Consultation', quantity: 1, unitPrice: 80, total: 80 },
      { id: 'item-12', description: 'Prescription Diet Food (5kg)', quantity: 1, unitPrice: 120, total: 120 },
    ],
  },
  {
    id: 'fin-6',
    type: 'invoice',
    clientId: '13',
    clientName: 'Isabella Martinez',
    petId: '21',
    petName: 'Lola',
    amount: 95,
    description: 'Anxiety behavior assessment',
    date: '2025-12-05',
    status: 'overdue',
    invoiceNumber: 'INV-2025-038',
    items: [
      { id: 'item-13', description: 'Behavioral Consultation', quantity: 1, unitPrice: 95, total: 95 },
    ],
    notes: 'Payment reminder sent on Dec 15',
  },
  {
    id: 'fin-7',
    type: 'receipt',
    clientId: '7',
    clientName: 'Emily Watson',
    petId: '11',
    petName: 'Daisy',
    amount: 180,
    description: 'New client wellness exam',
    date: '2025-12-18',
    status: 'paid',
    paymentMethod: 'card',
    receiptNumber: 'REC-2025-004',
    items: [
      { id: 'item-14', description: 'Comprehensive Wellness Exam', quantity: 1, unitPrice: 120, total: 120 },
      { id: 'item-15', description: 'Blood Work', quantity: 1, unitPrice: 60, total: 60 },
    ],
  },
  {
    id: 'fin-8',
    type: 'receipt',
    clientId: '14',
    clientName: 'William Brown',
    petId: '22',
    petName: 'Zeus',
    amount: 350,
    description: 'Show dog grooming and health certificate',
    date: '2025-12-12',
    status: 'paid',
    paymentMethod: 'card',
    receiptNumber: 'REC-2025-005',
    items: [
      { id: 'item-16', description: 'Show Grooming', quantity: 1, unitPrice: 200, total: 200 },
      { id: 'item-17', description: 'Health Certificate', quantity: 1, unitPrice: 100, total: 100 },
      { id: 'item-18', description: 'Nail Care', quantity: 1, unitPrice: 50, total: 50 },
    ],
  },
  {
    id: 'fin-9',
    type: 'payment',
    clientId: '10',
    clientName: 'David Kim',
    amount: 500,
    description: 'Annual care package - 3 pets',
    date: '2025-12-01',
    status: 'paid',
    paymentMethod: 'transfer',
    receiptNumber: 'REC-2025-006',
    items: [
      { id: 'item-19', description: 'Annual Care Package (3 pets)', quantity: 1, unitPrice: 500, total: 500 },
    ],
  },
  {
    id: 'fin-10',
    type: 'invoice',
    clientId: '17',
    clientName: 'Valentina Ruiz',
    petId: '29',
    petName: 'Rosie',
    amount: 280,
    description: 'Heart condition monitoring and medication',
    date: '2025-12-22',
    status: 'pending',
    invoiceNumber: 'INV-2025-044',
    items: [
      { id: 'item-20', description: 'Cardiac Consultation', quantity: 1, unitPrice: 150, total: 150 },
      { id: 'item-21', description: 'ECG', quantity: 1, unitPrice: 80, total: 80 },
      { id: 'item-22', description: 'Heart Medication (30 days)', quantity: 1, unitPrice: 50, total: 50 },
    ],
  },
  // Historical data for charts
  {
    id: 'fin-11',
    type: 'receipt',
    clientId: '1',
    clientName: 'María García',
    amount: 120,
    description: 'Consultation',
    date: '2025-11-15',
    status: 'paid',
    paymentMethod: 'cash',
    receiptNumber: 'REC-2025-007',
  },
  {
    id: 'fin-12',
    type: 'receipt',
    clientId: '8',
    clientName: 'Miguel Torres',
    amount: 250,
    description: 'Breeding consultation',
    date: '2025-11-20',
    status: 'paid',
    paymentMethod: 'card',
    receiptNumber: 'REC-2025-008',
  },
  {
    id: 'fin-13',
    type: 'receipt',
    clientId: '9',
    clientName: 'Jennifer Lee',
    amount: 180,
    description: 'Senior pet check-up',
    date: '2025-11-25',
    status: 'paid',
    paymentMethod: 'transfer',
    receiptNumber: 'REC-2025-009',
  },
  {
    id: 'fin-14',
    type: 'receipt',
    clientId: '12',
    clientName: 'James Wilson',
    amount: 95,
    description: 'Ear infection treatment',
    date: '2025-11-28',
    status: 'paid',
    paymentMethod: 'cash',
    receiptNumber: 'REC-2025-010',
  },
  {
    id: 'fin-15',
    type: 'receipt',
    clientId: '16',
    clientName: 'Alexander Davis',
    amount: 160,
    description: 'Grooming and boarding',
    date: '2025-11-30',
    status: 'paid',
    paymentMethod: 'card',
    receiptNumber: 'REC-2025-011',
  },
];

// Monthly finance summary for dashboard
export const monthlyFinanceSummary = [
  { month: 'Jan', revenue: 5200, expenses: 1800, profit: 3400 },
  { month: 'Feb', revenue: 4800, expenses: 1650, profit: 3150 },
  { month: 'Mar', revenue: 6100, expenses: 2100, profit: 4000 },
  { month: 'Apr', revenue: 5500, expenses: 1900, profit: 3600 },
  { month: 'May', revenue: 7200, expenses: 2400, profit: 4800 },
  { month: 'Jun', revenue: 6800, expenses: 2200, profit: 4600 },
  { month: 'Jul', revenue: 7500, expenses: 2500, profit: 5000 },
  { month: 'Aug', revenue: 8100, expenses: 2700, profit: 5400 },
  { month: 'Sep', revenue: 7300, expenses: 2400, profit: 4900 },
  { month: 'Oct', revenue: 8500, expenses: 2800, profit: 5700 },
  { month: 'Nov', revenue: 9200, expenses: 3000, profit: 6200 },
  { month: 'Dec', revenue: 8500, expenses: 2900, profit: 5600 },
];

// Payment methods distribution
export const paymentMethodsData = [
  { method: 'Card', count: 45, amount: 12500, color: '#3b82f6' },
  { method: 'Cash', count: 30, amount: 5800, color: '#22c55e' },
  { method: 'Transfer', count: 20, amount: 8200, color: '#8b5cf6' },
  { method: 'Other', count: 5, amount: 1000, color: '#f59e0b' },
];

