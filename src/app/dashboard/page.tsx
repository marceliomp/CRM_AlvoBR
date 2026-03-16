import { Shell } from '@/components/crm/Shell';

const indicadores = [
  ['Leads por origem', 'Instagram: 34 | Indicação: 21 | Tráfego pago: 18'],
  ['Taxa de contato', '67%'],
  ['Taxa de qualificação', '48%'],
  ['Reuniões agendadas', '19 no mês'],
  ['Oportunidades por estágio', 'Negociação: 12 | Proposta enviada: 9'],
  ['Sem interação +7 dias', '4 oportunidades'],
  ['Conversão por responsável', 'João: 22% | Ana: 28% | Lucas: 18%'],
  ['Motivos de perda', 'Preço (41%), Prazo (27%), Crédito (19%)'],
  ['Tarefas atrasadas', '6 tarefas']
];

export default function DashboardPage() {
  return (
    <Shell title="Dashboard Comercial">
      <div className="grid">
        {indicadores.map(([titulo, valor]) => (
          <article key={titulo} className="card kpi">
            <h3>{titulo}</h3>
            <p>{valor}</p>
          </article>
        ))}
      </div>
    </Shell>
  );
}
