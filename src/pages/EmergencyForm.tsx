import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Ambulance, Flame, Shield, Car, Loader2, CheckCircle, MapPin } from 'lucide-react';

const emergencyTypes = [
  { type: 'medical', icon: Ambulance, label: 'Medical', color: 'bg-red-500' },
  { type: 'fire', icon: Flame, label: 'Fire', color: 'bg-orange-500' },
  { type: 'police', icon: Shield, label: 'Police', color: 'bg-blue-500' },
  { type: 'accident', icon: Car, label: 'Accident', color: 'bg-yellow-500' },
];

export default function EmergencyForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialType = searchParams.get('type') || 'medical';
  
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(initialType);
  const [formData, setFormData] = useState({
    name: '', phone: '', location: '123 Demo Street, Downtown', description: ''
  });

  const handleSubmit = async () => {
    setStep(2);
    await new Promise(r => setTimeout(r, 2000));
    setStep(3);
    await new Promise(r => setTimeout(r, 1500));
    setStep(4);
  };

  if (step >= 2) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 flex items-center justify-center">
          <Card className="w-full max-w-md text-center p-8 animate-fade-in">
            {step === 2 && (
              <>
                <Loader2 className="h-16 w-16 text-primary mx-auto animate-spin mb-4" />
                <h2 className="text-xl font-bold">AI Analyzing Situation...</h2>
                <p className="text-muted-foreground mt-2">Processing emergency details</p>
              </>
            )}
            {step === 3 && (
              <>
                <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-warning">HIGH</span>
                </div>
                <h2 className="text-xl font-bold">Priority Level Determined</h2>
                <p className="text-muted-foreground mt-2">Dispatching nearest unit...</p>
              </>
            )}
            {step === 4 && (
              <>
                <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                <h2 className="text-xl font-bold text-success">Help is on the way!</h2>
                <p className="text-muted-foreground mt-2">ETA: 4 minutes</p>
                <Button className="mt-6" onClick={() => navigate('/tracking')}>Track Response</Button>
              </>
            )}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Report Emergency</h1>
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-4 gap-2">
              {emergencyTypes.map(({ type, icon: Icon, label, color }) => (
                <button key={type} onClick={() => setSelectedType(type)}
                  className={`p-4 rounded-xl border-2 transition-all ${selectedType === type ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <div className={`w-10 h-10 ${color}/10 rounded-lg flex items-center justify-center mx-auto mb-2`}>
                    <Icon className={`h-5 w-5 ${color.replace('bg-', 'text-')}`} />
                  </div>
                  <span className="text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label>Name</Label><Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your name" /></div>
              <div><Label>Phone</Label><Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="Phone number" /></div>
            </div>
            <div>
              <Label>Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
              </div>
            </div>
            <div><Label>Description</Label><Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe the emergency..." rows={4} /></div>
            <Button className="w-full" size="lg" onClick={handleSubmit}>Submit Emergency Request</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
