export interface Emergency {
  id: string;
  type: 'medical' | 'fire' | 'police' | 'accident';
  location: string;
  coordinates: { x: number; y: number };
  status: 'pending' | 'responding' | 'resolved';
  time: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface Responder {
  id: string;
  type: 'ambulance' | 'fire_truck' | 'police_car';
  status: 'available' | 'dispatched' | 'on_scene';
  coordinates: { x: number; y: number };
  targetCoordinates?: { x: number; y: number };
  eta?: number;
}

export const mockEmergencies: Emergency[] = [
  {
    id: 'EM001',
    type: 'medical',
    location: '123 Main Street',
    coordinates: { x: 25, y: 30 },
    status: 'responding',
    time: '2 min ago',
    description: 'Chest pain reported',
    priority: 'critical',
  },
  {
    id: 'EM002',
    type: 'fire',
    location: '456 Oak Avenue',
    coordinates: { x: 60, y: 45 },
    status: 'pending',
    time: '5 min ago',
    description: 'Kitchen fire',
    priority: 'high',
  },
  {
    id: 'EM003',
    type: 'police',
    location: '789 Pine Road',
    coordinates: { x: 40, y: 70 },
    status: 'resolved',
    time: '15 min ago',
    description: 'Noise complaint',
    priority: 'low',
  },
  {
    id: 'EM004',
    type: 'accident',
    location: 'Highway 101 & Exit 5',
    coordinates: { x: 75, y: 20 },
    status: 'responding',
    time: '8 min ago',
    description: 'Multi-vehicle collision',
    priority: 'high',
  },
  {
    id: 'EM005',
    type: 'medical',
    location: '321 Elm Street',
    coordinates: { x: 15, y: 55 },
    status: 'pending',
    time: '1 min ago',
    description: 'Difficulty breathing',
    priority: 'critical',
  },
];

export const mockResponders: Responder[] = [
  {
    id: 'R001',
    type: 'ambulance',
    status: 'dispatched',
    coordinates: { x: 10, y: 20 },
    targetCoordinates: { x: 25, y: 30 },
    eta: 3,
  },
  {
    id: 'R002',
    type: 'fire_truck',
    status: 'available',
    coordinates: { x: 50, y: 50 },
  },
  {
    id: 'R003',
    type: 'police_car',
    status: 'dispatched',
    coordinates: { x: 55, y: 65 },
    targetCoordinates: { x: 40, y: 70 },
    eta: 2,
  },
  {
    id: 'R004',
    type: 'ambulance',
    status: 'dispatched',
    coordinates: { x: 80, y: 15 },
    targetCoordinates: { x: 75, y: 20 },
    eta: 1,
  },
];

export const mockStats = {
  totalRequests: 1247,
  activeEmergencies: 5,
  avgResponseTime: '4.2 min',
  resolvedToday: 23,
  nearbyUnits: 12,
  coverage: '98.5%',
};

export const adminEmergencyData: Emergency[] = [
  ...mockEmergencies,
  {
    id: 'EM006',
    type: 'fire',
    location: '555 Cedar Lane',
    coordinates: { x: 30, y: 40 },
    status: 'resolved',
    time: '25 min ago',
    description: 'False alarm - smoke from cooking',
    priority: 'medium',
  },
  {
    id: 'EM007',
    type: 'police',
    location: '888 Birch Boulevard',
    coordinates: { x: 65, y: 55 },
    status: 'responding',
    time: '12 min ago',
    description: 'Suspicious activity reported',
    priority: 'medium',
  },
  {
    id: 'EM008',
    type: 'medical',
    location: '222 Maple Drive',
    coordinates: { x: 45, y: 25 },
    status: 'resolved',
    time: '30 min ago',
    description: 'Minor injury - treated on scene',
    priority: 'low',
  },
  {
    id: 'EM009',
    type: 'accident',
    location: 'Downtown Intersection',
    coordinates: { x: 50, y: 35 },
    status: 'resolved',
    time: '45 min ago',
    description: 'Fender bender - no injuries',
    priority: 'low',
  },
  {
    id: 'EM010',
    type: 'medical',
    location: '999 Walnut Way',
    coordinates: { x: 20, y: 80 },
    status: 'pending',
    time: 'Just now',
    description: 'Elderly fall - possible fracture',
    priority: 'high',
  },
];

export const chatbotResponses = [
  { trigger: 'help', response: "I'm here to help. Please describe your emergency situation, and I'll guide you through the next steps." },
  { trigger: 'medical', response: "For medical emergencies: Stay calm. Is the person conscious and breathing? If not, begin CPR if trained. Help is on the way." },
  { trigger: 'fire', response: "For fire emergencies: Evacuate immediately. Stay low if there's smoke. Don't use elevators. Meet at your designated meeting point." },
  { trigger: 'police', response: "For police assistance: Stay in a safe location. Do not confront any suspects. Document what you can safely observe." },
  { trigger: 'accident', response: "For accidents: Check if anyone is injured. Don't move injured persons unless there's immediate danger. Turn on hazard lights." },
  { trigger: 'status', response: "Your emergency request has been received. Emergency responders have been notified and are en route. ETA: 4 minutes." },
  { trigger: 'calm', response: "Take slow, deep breaths. Help is on the way. Stay on the line with emergency services if possible." },
  { trigger: 'default', response: "I understand you need help. Please stay calm. Can you tell me more about your situation? Emergency services are standing by." },
];
