import { Header } from '@/components/Header';
import { EmergencyMap } from '@/components/EmergencyMap';
import { AIChatbot } from '@/components/AIChatbot';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockEmergencies, mockResponders } from '@/data/mockData';
import { Activity } from 'lucide-react';
import { useState } from 'react';

export default function Tracking() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Real-Time Emergency Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EmergencyMap emergencies={mockEmergencies} responders={mockResponders} />
          </CardContent>
        </Card>
      </main>
      <AIChatbot isOpen={showChat} onToggle={() => setShowChat(!showChat)} />
    </div>
  );
}
