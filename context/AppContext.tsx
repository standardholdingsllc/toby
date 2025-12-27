import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Language, translations, TranslationKey } from '@/data/translations';
import {
  Client, Pet, Appointment, Message, Campaign, User, MedicalRecord,
  Segment, Template, Workflow,
  initialClients, initialPets, initialAppointments, initialMessages,
  initialCampaigns, initialUsers, initialMedicalRecords,
  initialSegments, initialTemplates, initialWorkflows
} from '@/data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  
  // Theme
  darkMode: boolean;
  toggleDarkMode: () => void;
  
  // Current User
  currentUser: User;
  setCurrentUser: (user: User) => void;
  
  // Data
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => void;
  updateClient: (id: string, data: Partial<Client>) => void;
  
  pets: Pet[];
  setPets: React.Dispatch<React.SetStateAction<Pet[]>>;
  addPet: (pet: Omit<Pet, 'id'>) => void;
  updatePet: (id: string, data: Partial<Pet>) => void;
  
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointment: (id: string, data: Partial<Appointment>) => void;
  
  messages: { [clientId: string]: Message[] };
  setMessages: React.Dispatch<React.SetStateAction<{ [clientId: string]: Message[] }>>;
  addMessage: (clientId: string, message: Omit<Message, 'id' | 'timestamp' | 'clientId'>) => void;
  
  campaigns: Campaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
  addCampaign: (campaign: Omit<Campaign, 'id' | 'sentAt'>) => void;
  
  segments: Segment[];
  setSegments: React.Dispatch<React.SetStateAction<Segment[]>>;
  addSegment: (segment: Omit<Segment, 'id' | 'createdAt'>) => void;
  
  templates: Template[];
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>;
  addTemplate: (template: Omit<Template, 'id' | 'createdAt'>) => void;
  
  workflows: Workflow[];
  setWorkflows: React.Dispatch<React.SetStateAction<Workflow[]>>;
  updateWorkflow: (id: string, data: Partial<Workflow>) => void;
  
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  addUser: (user: Omit<User, 'id'>) => void;
  removeUser: (id: string) => void;
  
  medicalRecords: MedicalRecord[];
  
  // Toast notifications
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Language state - default to Spanish
  const [language, setLanguage] = useState<Language>('es');
  
  // Theme state - default to dark mode
  const [darkMode, setDarkMode] = useState(true);
  
  // Current user
  const [currentUser, setCurrentUser] = useState<User>(initialUsers[0]);
  
  // Data states
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [pets, setPets] = useState<Pet[]>(initialPets);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [messages, setMessages] = useState<{ [clientId: string]: Message[] }>(initialMessages);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [segments, setSegments] = useState<Segment[]>(initialSegments);
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [workflows, setWorkflows] = useState<Workflow[]>(initialWorkflows);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [medicalRecords] = useState<MedicalRecord[]>(initialMedicalRecords);
  
  // Toast state
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  // Translation function
  const t = useCallback((key: TranslationKey): string => {
    return translations[language][key] || key;
  }, [language]);
  
  // Theme toggle
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);
  
  // Toast functions
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);
  
  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);
  
  // Client functions
  const addClient = useCallback((clientData: Omit<Client, 'id' | 'createdAt'>) => {
    const newClient: Client = {
      ...clientData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setClients(prev => [...prev, newClient]);
    showToast(t('clientAdded'));
  }, [showToast, t]);
  
  const updateClient = useCallback((id: string, data: Partial<Client>) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    showToast(t('clientUpdated'));
  }, [showToast, t]);
  
  // Pet functions
  const addPet = useCallback((petData: Omit<Pet, 'id'>) => {
    const newPet: Pet = {
      ...petData,
      id: Date.now().toString(),
    };
    setPets(prev => [...prev, newPet]);
    // Update client's pet count
    setClients(prev => prev.map(c => 
      c.id === petData.ownerId 
        ? { ...c, numberOfPets: c.numberOfPets + 1 }
        : c
    ));
    showToast(t('petAdded'));
  }, [showToast, t]);
  
  const updatePet = useCallback((id: string, data: Partial<Pet>) => {
    setPets(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
    showToast(t('petUpdated'));
  }, [showToast, t]);
  
  // Appointment functions
  const addAppointment = useCallback((appointmentData: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(),
    };
    setAppointments(prev => [...prev, newAppointment]);
    showToast(t('appointmentCreated'));
  }, [showToast, t]);
  
  const updateAppointment = useCallback((id: string, data: Partial<Appointment>) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
    if (data.status === 'cancelled') {
      showToast(t('appointmentCancelled'));
    } else {
      showToast(t('appointmentUpdated'));
    }
  }, [showToast, t]);
  
  // Message functions
  const addMessage = useCallback((clientId: string, messageData: Omit<Message, 'id' | 'timestamp' | 'clientId'>) => {
    const newMessage: Message = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      clientId,
    };
    setMessages(prev => ({
      ...prev,
      [clientId]: [...(prev[clientId] || []), newMessage],
    }));
    console.log('Message sent:', newMessage);
  }, []);
  
  // Campaign functions
  const addCampaign = useCallback((campaignData: Omit<Campaign, 'id' | 'sentAt'>) => {
    const newCampaign: Campaign = {
      ...campaignData,
      id: Date.now().toString(),
      sentAt: new Date().toISOString(),
    } as Campaign;
    setCampaigns(prev => [newCampaign, ...prev]);
    showToast(t('campaignSent'));
  }, [showToast, t]);
  
  // Segment functions
  const addSegment = useCallback((segmentData: Omit<Segment, 'id' | 'createdAt'>) => {
    const newSegment: Segment = {
      ...segmentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setSegments(prev => [...prev, newSegment]);
    showToast('Segment created successfully!');
  }, [showToast]);
  
  // Template functions
  const addTemplate = useCallback((templateData: Omit<Template, 'id' | 'createdAt'>) => {
    const newTemplate: Template = {
      ...templateData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTemplates(prev => [...prev, newTemplate]);
    showToast('Template created successfully!');
  }, [showToast]);
  
  // Workflow functions
  const updateWorkflow = useCallback((id: string, data: Partial<Workflow>) => {
    setWorkflows(prev => prev.map(w => w.id === id ? { ...w, ...data } : w));
  }, []);
  
  // User functions
  const addUser = useCallback((userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
    };
    setUsers(prev => [...prev, newUser]);
    showToast(t('userAdded'));
  }, [showToast, t]);
  
  const removeUser = useCallback((id: string) => {
    if (id === currentUser.id) return; // Can't remove yourself
    setUsers(prev => prev.filter(u => u.id !== id));
    showToast(t('userRemoved'));
  }, [currentUser.id, showToast, t]);
  
  const value: AppContextType = {
    language,
    setLanguage,
    t,
    darkMode,
    toggleDarkMode,
    currentUser,
    setCurrentUser,
    clients,
    setClients,
    addClient,
    updateClient,
    pets,
    setPets,
    addPet,
    updatePet,
    appointments,
    setAppointments,
    addAppointment,
    updateAppointment,
    messages,
    setMessages,
    addMessage,
    campaigns,
    setCampaigns,
    addCampaign,
    segments,
    setSegments,
    addSegment,
    templates,
    setTemplates,
    addTemplate,
    workflows,
    setWorkflows,
    updateWorkflow,
    users,
    setUsers,
    addUser,
    removeUser,
    medicalRecords,
    toasts,
    showToast,
    removeToast,
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

