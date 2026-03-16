import { Shell } from '@/components/crm/Shell';
import { SimpleTable } from '@/components/crm/SimpleTable';
import { oportunidades, pipelineStages } from '@/data/mock';

export default function OportunidadesPage() {
  return (
    <Shell title="Oportunidades">
      <article className="card" style={{ marginBottom: 12 }}>
        <h3>Pipeline</h3>
        <p>{pipelineStages.join('  →  ')}</p>
      </article>

      <SimpleTable
        headers={[
          'Cliente',
          'Estágio',
          'Valor estimado',
          'Produto/interesse',
          'Probabilidade',
          'Data prevista',
          'Motivo de perda'
        ]}
        rows={oportunidades.map((o) => [
          o.cliente,
          o.estagio,
          o.valor,
          o.produto,
          o.probabilidade,
          o.dataPrevista,
          o.motivoPerda
        ])}
      />
    </Shell>
  );
}
