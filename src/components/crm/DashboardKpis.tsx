'use client';

import { useEffect, useMemo, useState } from 'react';
import { getBrowserSupabaseClient } from '@/lib/supabase/browser';

type KPI = { titulo: string; valor: string };
type EstagioRow = { estagio: string | null };

const fallback: KPI[] = [
  { titulo: 'Leads por origem', valor: 'Instagram: 34 | Indicação: 21 | Tráfego pago: 18' },
  { titulo: 'Taxa de contato', valor: '67%' },
  { titulo: 'Taxa de qualificação', valor: '48%' },
  { titulo: 'Reuniões agendadas', valor: '19 no mês' },
  { titulo: 'Oportunidades por estágio', valor: 'Negociação: 12 | Proposta enviada: 9' },
  { titulo: 'Sem interação +7 dias', valor: '4 oportunidades' },
  { titulo: 'Conversão por responsável', valor: 'João: 22% | Ana: 28% | Lucas: 18%' },
  { titulo: 'Motivos de perda', valor: 'Preço (41%), Prazo (27%), Crédito (19%)' },
  { titulo: 'Tarefas atrasadas', valor: '6 tarefas' }
];

export function DashboardKpis() {
  const [kpis, setKpis] = useState<KPI[]>(fallback);

  useEffect(() => {
    const supabase = getBrowserSupabaseClient();

    const load = async () => {
      const leadsRes = await supabase.from('clientes').select('*', { count: 'exact', head: true });
      const oppsRes = await supabase.from('oportunidades').select('*', { count: 'exact', head: true });
      const tarefasRes = await supabase
        .from('tarefas')
        .select('*', { count: 'exact', head: true })
        .lt('vencimento', new Date().toISOString())
        .neq('status', 'concluida');

      const estagiosRes = await supabase.from('oportunidades').select('estagio');
      const porEstagio = ((estagiosRes.data as EstagioRow[] | null) ?? []);

      const estagios = porEstagio.reduce<Record<string, number>>((acc, item) => {
        const key = String(item.estagio ?? 'sem_estagio');
        acc[key] = (acc[key] ?? 0) + 1;
        return acc;
      }, {});

      const topEstagios = Object.entries(estagios)
        .slice(0, 3)
        .map(([k, v]) => `${k}: ${v}`)
        .join(' | ');

      const totalLeads = leadsRes.count ?? 0;
      const totalOportunidades = oppsRes.count ?? 0;
      const tarefasAtrasadas = tarefasRes.count ?? 0;

      setKpis((prev) =>
        prev.map((item) => {
          if (item.titulo === 'Leads por origem') return { ...item, valor: `${totalLeads} leads cadastrados` };
          if (item.titulo === 'Oportunidades por estágio') return { ...item, valor: topEstagios || 'Sem dados' };
          if (item.titulo === 'Tarefas atrasadas') return { ...item, valor: `${tarefasAtrasadas} tarefas` };
          if (item.titulo === 'Taxa de contato') {
            const taxa = totalLeads ? Math.min(100, Math.round((totalOportunidades / totalLeads) * 100)) : 0;
            return { ...item, valor: `${taxa}%` };
          }
          return item;
        })
      );
    };

    load();
  }, []);

  const cards = useMemo(() => kpis, [kpis]);

  return (
    <div className="grid">
      {cards.map(({ titulo, valor }) => (
        <article key={titulo} className="card kpi">
          <h3>{titulo}</h3>
          <p>{valor}</p>
        </article>
      ))}
    </div>
  );
}
