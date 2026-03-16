import { Shell } from '@/components/crm/Shell';
import { SimpleTable } from '@/components/crm/SimpleTable';
import { clientes } from '@/data/mock';

export default function ClientesPage() {
  return (
    <Shell title="Clientes">
      <SimpleTable
        headers={[
          'Nome',
          'Telefone',
          'Email',
          'Origem',
          'Cidade',
          'Interesse principal',
          'Objetivo',
          'Faixa entrada',
          'Capacidade mensal',
          'Prazo',
          'Temperatura',
          'Responsável',
          'Última interação',
          'Próxima ação'
        ]}
        rows={clientes.map((c) => [
          c.nome,
          c.telefone,
          c.email,
          c.origem,
          c.cidade,
          c.interesse,
          c.objetivo,
          c.entrada,
          c.capacidade,
          c.prazo,
          c.temperatura,
          c.responsavel,
          c.ultimaInteracao,
          c.proximaAcao
        ])}
      />
    </Shell>
  );
}
