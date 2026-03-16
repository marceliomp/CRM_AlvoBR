import { Shell } from '@/components/crm/Shell';
import { DashboardKpis } from '@/components/crm/DashboardKpis';

export default function DashboardPage() {
  return (
    <Shell title="Dashboard Comercial">
      <DashboardKpis />
    </Shell>
  );
}
