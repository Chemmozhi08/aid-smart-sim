import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { EmergencyMap } from '@/components/EmergencyMap';
import { AIChatbot } from '@/components/AIChatbot';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { mockStats } from '@/data/mockData';
import { 
  Ambulance, 
  Flame, 
  Shield, 
  Car, 
  Clock, 
  MapPin, 
  Activity,
  CheckCircle,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

const emergencyTypes = [
  { 
    type: 'medical', 
    icon: Ambulance, 
    label: 'Medical Emergency', 
    description: 'Injuries, chest pain, difficulty breathing',
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20 hover:border-red-500/50'
  },
  { 
    type: 'fire', 
    icon: Flame, 
    label: 'Fire Emergency', 
    description: 'Fire, smoke, gas leaks',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20 hover:border-orange-500/50'
  },
  { 
    type: 'police', 
    icon: Shield, 
    label: 'Police Emergency', 
    description: 'Crime, suspicious activity, threats',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20 hover:border-blue-500/50'
  },
  { 
    type: 'accident', 
    icon: Car, 
    label: 'Accident Emergency', 
    description: 'Vehicle collisions, road incidents',
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20 hover:border-yellow-500/50'
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Welcome Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold">
            Welcome back, <span className="text-primary">{user?.name || 'User'}</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Select an emergency type or view the live tracking map
          </p>
        </div>

        {/* Emergency Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {emergencyTypes.map((emergency, i) => (
            <Link
              key={emergency.type}
              to={`/emergency?type=${emergency.type}`}
              className="animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Card className={`h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-2 ${emergency.border} group cursor-pointer`}>
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-2xl ${emergency.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <emergency.icon className={`h-8 w-8 ${emergency.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{emergency.label}</h3>
                  <p className="text-sm text-muted-foreground">{emergency.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Clock, label: 'Avg Response', value: mockStats.avgResponseTime, color: 'text-primary' },
            { icon: MapPin, label: 'Nearby Units', value: mockStats.nearbyUnits, color: 'text-info' },
            { icon: CheckCircle, label: 'Resolved Today', value: mockStats.resolvedToday, color: 'text-success' },
            { icon: TrendingUp, label: 'Coverage', value: mockStats.coverage, color: 'text-warning' },
          ].map((stat, i) => (
            <Card key={i} className="animate-fade-in" style={{ animationDelay: `${0.4 + i * 0.1}s` }}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-secondary`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Live Emergency Map
                </CardTitle>
                <Link to="/tracking">
                  <Button variant="outline" size="sm">View Full Map</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <EmergencyMap compact />
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { type: 'Medical', time: '2 min ago', status: 'responding' },
                  { type: 'Fire', time: '5 min ago', status: 'pending' },
                  { type: 'Police', time: '15 min ago', status: 'resolved' },
                  { type: 'Accident', time: '25 min ago', status: 'resolved' },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-sm">{activity.type} Emergency</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activity.status === 'resolved' ? 'bg-success/10 text-success' :
                      activity.status === 'responding' ? 'bg-warning/10 text-warning' :
                      'bg-destructive/10 text-destructive'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* AI Chatbot */}
      <AIChatbot isOpen={showChat} onToggle={() => setShowChat(!showChat)} />
    </div>
  );
}
