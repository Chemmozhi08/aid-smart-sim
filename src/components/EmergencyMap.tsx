import { useState, useEffect } from 'react';
import { Emergency, Responder, mockEmergencies, mockResponders } from '@/data/mockData';
import { Ambulance, Flame, Shield, Car, MapPin } from 'lucide-react';

interface EmergencyMapProps {
  emergencies?: Emergency[];
  responders?: Responder[];
  compact?: boolean;
}

const getEmergencyIcon = (type: Emergency['type']) => {
  switch (type) {
    case 'medical': return Ambulance;
    case 'fire': return Flame;
    case 'police': return Shield;
    case 'accident': return Car;
  }
};

const getStatusColor = (status: Emergency['status']) => {
  switch (status) {
    case 'pending': return 'bg-destructive';
    case 'responding': return 'bg-warning';
    case 'resolved': return 'bg-success';
  }
};

const getResponderColor = (type: Responder['type']) => {
  switch (type) {
    case 'ambulance': return 'bg-red-500';
    case 'fire_truck': return 'bg-orange-500';
    case 'police_car': return 'bg-blue-500';
  }
};

export function EmergencyMap({ 
  emergencies = mockEmergencies, 
  responders = mockResponders,
  compact = false 
}: EmergencyMapProps) {
  const [animatedResponders, setAnimatedResponders] = useState(responders);
  const [time, setTime] = useState(0);

  // Simulate responder movement
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 1);
      setAnimatedResponders(prev => 
        prev.map(responder => {
          if (responder.status === 'dispatched' && responder.targetCoordinates) {
            const progress = Math.min((time % 100) / 50, 1);
            const newX = responder.coordinates.x + (responder.targetCoordinates.x - responder.coordinates.x) * progress;
            const newY = responder.coordinates.y + (responder.targetCoordinates.y - responder.coordinates.y) * progress;
            return {
              ...responder,
              coordinates: { x: newX, y: newY }
            };
          }
          return responder;
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className={`relative ${compact ? 'h-64' : 'h-[500px]'} w-full rounded-2xl overflow-hidden bg-card border border-border`}>
      {/* City Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-muted/30">
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-muted-foreground" />
        </svg>
        
        {/* Roads simulation */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 right-0 h-2 bg-muted-foreground/10" />
          <div className="absolute top-1/2 left-0 right-0 h-3 bg-muted-foreground/15" />
          <div className="absolute top-3/4 left-0 right-0 h-2 bg-muted-foreground/10" />
          <div className="absolute left-1/4 top-0 bottom-0 w-2 bg-muted-foreground/10" />
          <div className="absolute left-1/2 top-0 bottom-0 w-3 bg-muted-foreground/15" />
          <div className="absolute left-3/4 top-0 bottom-0 w-2 bg-muted-foreground/10" />
        </div>
      </div>

      {/* Emergency Markers */}
      {emergencies.map((emergency) => {
        const Icon = getEmergencyIcon(emergency.type);
        const statusColor = getStatusColor(emergency.status);
        
        return (
          <div
            key={emergency.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${emergency.coordinates.x}%`, top: `${emergency.coordinates.y}%` }}
          >
            {/* Pulse rings */}
            {emergency.status !== 'resolved' && (
              <>
                <div className={`absolute inset-0 w-12 h-12 -m-3 ${statusColor} rounded-full animate-pulse-ring`} />
                <div className={`absolute inset-0 w-12 h-12 -m-3 ${statusColor} rounded-full animate-pulse-ring`} style={{ animationDelay: '0.5s' }} />
              </>
            )}
            
            {/* Marker */}
            <div className={`relative z-10 w-10 h-10 rounded-full ${statusColor} flex items-center justify-center shadow-lg animate-pulse-dot`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
              <div className="bg-popover text-popover-foreground text-xs rounded-lg px-3 py-2 shadow-lg whitespace-nowrap border border-border">
                <div className="font-semibold">{emergency.type.charAt(0).toUpperCase() + emergency.type.slice(1)}</div>
                <div className="text-muted-foreground">{emergency.location}</div>
                <div className="flex items-center gap-1 mt-1">
                  <div className={`w-2 h-2 rounded-full ${statusColor}`} />
                  <span className="capitalize">{emergency.status}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Responder Markers */}
      {animatedResponders.map((responder) => {
        const color = getResponderColor(responder.type);
        
        return (
          <div
            key={responder.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-linear z-20"
            style={{ 
              left: `${responder.coordinates.x}%`, 
              top: `${responder.coordinates.y}%`,
            }}
          >
            {/* Trail effect for moving responders */}
            {responder.status === 'dispatched' && (
              <div className={`absolute w-3 h-3 ${color} rounded-full opacity-30 -z-10`} 
                   style={{ transform: 'translate(-50%, -50%)' }} />
            )}
            
            {/* Responder marker */}
            <div className={`w-6 h-6 rounded-full ${color} flex items-center justify-center shadow-lg border-2 border-white/50`}>
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            
            {/* ETA badge */}
            {responder.eta && (
              <div className="absolute -top-1 -right-1 bg-foreground text-background text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {responder.eta}m
              </div>
            )}
          </div>
        );
      })}

      {/* Map Legend */}
      {!compact && (
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border text-xs">
          <div className="font-semibold mb-2">Legend</div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span>Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span>Responding</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span>Resolved</span>
            </div>
          </div>
        </div>
      )}

      {/* Zoom Controls (Visual) */}
      {!compact && (
        <div className="absolute top-4 right-4 flex flex-col gap-1">
          <button className="w-8 h-8 bg-background/90 backdrop-blur-sm rounded-lg border border-border flex items-center justify-center hover:bg-accent transition-colors">
            <span className="text-lg font-medium">+</span>
          </button>
          <button className="w-8 h-8 bg-background/90 backdrop-blur-sm rounded-lg border border-border flex items-center justify-center hover:bg-accent transition-colors">
            <span className="text-lg font-medium">−</span>
          </button>
        </div>
      )}

      {/* Location indicator */}
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-border">
        <MapPin className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium">Downtown District</span>
      </div>
    </div>
  );
}
