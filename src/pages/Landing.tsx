import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { 
  Shield, 
  Zap, 
  Clock, 
  MapPin, 
  Phone, 
  Brain,
  Ambulance,
  Flame,
  Car,
  Users
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-destructive/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="container relative z-10 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Pulse Effect */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              AI-Powered Emergency Response
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
              When Every Second
              <span className="block text-primary">Counts</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              RapidAid AI uses advanced artificial intelligence to analyze emergencies, 
              dispatch the nearest response units, and provide real-time assistance.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 animate-glow" asChild>
                <Link to="/dashboard">
                  <Phone className="mr-2 h-5 w-5" />
                  Request Emergency
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6" asChild>
                <Link to="/login">Login to Dashboard</Link>
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {[
              { value: '< 4 min', label: 'Avg Response Time' },
              { value: '98.5%', label: 'Coverage Area' },
              { value: '24/7', label: 'Available' },
              { value: '10K+', label: 'Lives Saved' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl glass-card">
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powered by Intelligence</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI system processes emergency calls in milliseconds, analyzing voice, text, 
              and location data to ensure the fastest possible response.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI Analysis',
                description: 'Advanced AI analyzes emergency situations in real-time to determine priority and required resources.',
              },
              {
                icon: MapPin,
                title: 'Live Tracking',
                description: 'Track emergency responders on a real-time map with accurate ETAs and status updates.',
              },
              {
                icon: Zap,
                title: 'Instant Dispatch',
                description: 'Automatic dispatch of the nearest available units based on emergency type and location.',
              },
              {
                icon: Clock,
                title: 'Rapid Response',
                description: 'Average response time under 4 minutes with optimized routing and coordination.',
              },
              {
                icon: Users,
                title: 'Coordinated Teams',
                description: 'Seamless coordination between medical, fire, and police response teams.',
              },
              {
                icon: Shield,
                title: 'Always Ready',
                description: '24/7 monitoring and instant alerts ensure help is always available when needed.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Types */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">All Emergency Types Covered</h2>
            <p className="text-muted-foreground">One platform for all emergency situations</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Ambulance, label: 'Medical', color: 'text-red-500', bg: 'bg-red-500/10' },
              { icon: Flame, label: 'Fire', color: 'text-orange-500', bg: 'bg-orange-500/10' },
              { icon: Shield, label: 'Police', color: 'text-blue-500', bg: 'bg-blue-500/10' },
              { icon: Car, label: 'Accident', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
            ].map((type, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 text-center hover:-translate-y-1"
              >
                <div className={`w-20 h-20 rounded-2xl ${type.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <type.icon className={`h-10 w-10 ${type.color}`} />
                </div>
                <h3 className="text-xl font-semibold">{type.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Hotline Banner */}
      <section className="py-12 bg-primary">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-primary-foreground">
            <div className="flex items-center gap-4">
              <Phone className="h-10 w-10" />
              <div>
                <p className="text-lg font-medium opacity-90">Emergency Hotline</p>
                <p className="text-3xl font-bold">1-800-RAPID-AI</p>
              </div>
            </div>
            <Button size="lg" variant="secondary" className="text-lg" asChild>
              <Link to="/register">Create Free Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold">RapidAid AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 RapidAid AI. Academic Project Demonstration.
            </p>
            <div className="flex gap-6">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Login
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
