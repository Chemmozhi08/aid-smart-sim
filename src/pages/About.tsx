import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Brain, Zap, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-16 max-w-4xl">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">About RapidAid AI</h1>
          <p className="text-xl text-muted-foreground">AI-Powered Emergency Response System</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Brain, title: 'AI Analysis', desc: 'Real-time emergency analysis and priority assessment' },
            { icon: Zap, title: 'Instant Dispatch', desc: 'Automatic dispatch of nearest response units' },
            { icon: Users, title: 'Coordination', desc: 'Seamless multi-agency response coordination' },
          ].map((item, i) => (
            <Card key={i}>
              <CardContent className="p-6 text-center">
                <item.icon className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              <strong>Academic Disclaimer:</strong> This is a demonstration project for educational purposes. 
              For real emergencies, please call your local emergency services.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
