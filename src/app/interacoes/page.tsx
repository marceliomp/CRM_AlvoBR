import { Shell } from '@/components/crm/Shell';
import { SimpleTable } from '@/components/crm/SimpleTable';
import { interacoes } from '@/data/mock';

export default function InteracoesPage() {
  return (
    <Shell title="Interações">
      <SimpleTable
        headers={['Cliente', 'Tipo', 'Data', 'Responsável', 'Resumo', 'Próxima ação']}
        rows={interacoes.map((item) => [
          item.cliente,
          item.tipo,
          item.data,
          item.responsavel,
          item.resumo,
          item.proximaAcao
        ])}
      />
    </Shell>
  );
}
