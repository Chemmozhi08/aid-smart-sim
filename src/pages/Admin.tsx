import { Header } from '@/components/Header';
import { EmergencyMap } from '@/components/EmergencyMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { adminEmergencyData } from '@/data/mockData';
import { LayoutDashboard, AlertTriangle, CheckCircle, Clock, Activity } from 'lucide-react';

export default function Admin() {
  const stats = [
    { label: 'Total Requests', value: 47, icon: LayoutDashboard, color: 'text-primary' },
    { label: 'Pending', value: 3, icon: Clock, color: 'text-warning' },
    { label: 'Active', value: 5, icon: AlertTriangle, color: 'text-destructive' },
    { label: 'Resolved', value: 39, icon: CheckCircle, color: 'text-success' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-center gap-3">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5" />Live Map</CardTitle></CardHeader>
            <CardContent><EmergencyMap compact /></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Emergency Requests</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminEmergencyData.slice(0, 6).map((e) => (
                    <TableRow key={e.id}>
                      <TableCell className="font-mono text-xs">{e.id}</TableCell>
                      <TableCell className="capitalize">{e.type}</TableCell>
                      <TableCell className="text-xs">{e.location}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          e.status === 'resolved' ? 'bg-success/10 text-success' :
                          e.status === 'responding' ? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'
                        }`}>{e.status}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
