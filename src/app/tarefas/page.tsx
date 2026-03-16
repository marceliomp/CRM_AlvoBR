import { Shell } from '@/components/crm/Shell';
import { SimpleTable } from '@/components/crm/SimpleTable';
import { tarefas } from '@/data/mock';

export default function TarefasPage() {
  return (
    <Shell title="Tarefas">
      <SimpleTable
        headers={['Título', 'Cliente', 'Responsável', 'Vencimento', 'Prioridade', 'Status']}
        rows={tarefas.map((t) => [t.titulo, t.cliente, t.responsavel, t.vencimento, t.prioridade, t.status])}
      />
    </Shell>
  );
}
