export const pipelineStages = [
  'Lead entrou',
  'Sem contato',
  'Contatado',
  'Qualificado',
  'Reunião agendada',
  'Atendimento realizado',
  'Proposta enviada',
  'Negociação',
  'Ganhou',
  'Perdeu'
];

export const clientes = [
  {
    nome: 'Mariana Silva',
    telefone: '(11) 99999-0011',
    email: 'mariana@email.com',
    origem: 'Instagram',
    cidade: 'São Paulo',
    interesse: 'Apartamento 2 dormitórios',
    objetivo: 'Morar',
    entrada: 'R$ 80.000',
    capacidade: 'R$ 4.200/mês',
    prazo: '3 meses',
    temperatura: 'Quente',
    responsavel: 'João (SDR)',
    ultimaInteracao: 'Hoje, 09:30',
    proximaAcao: 'Enviar simulação'
  },
  {
    nome: 'Carlos Mendes',
    telefone: '(11) 98888-2222',
    email: 'carlos@email.com',
    origem: 'Indicação',
    cidade: 'Santo André',
    interesse: 'Casa em condomínio',
    objetivo: 'Investimento',
    entrada: 'R$ 150.000',
    capacidade: 'R$ 6.000/mês',
    prazo: '6 meses',
    temperatura: 'Morno',
    responsavel: 'Ana (Closer)',
    ultimaInteracao: 'Ontem, 17:45',
    proximaAcao: 'Agendar visita'
  }
];

export const interacoes = [
  {
    cliente: 'Mariana Silva',
    tipo: 'WhatsApp',
    data: '2026-03-16 09:30',
    responsavel: 'João',
    resumo: 'Solicitou condições de entrada para unidade 2 dormitórios.',
    proximaAcao: 'Enviar proposta preliminar'
  },
  {
    cliente: 'Carlos Mendes',
    tipo: 'Ligação',
    data: '2026-03-15 17:45',
    responsavel: 'Ana',
    resumo: 'Confirmou interesse em casa com 3 vagas.',
    proximaAcao: 'Marcar visita no sábado'
  }
];

export const oportunidades = [
  {
    cliente: 'Mariana Silva',
    estagio: 'Proposta enviada',
    valor: 'R$ 520.000',
    produto: 'Apto 2 dorm | Zona Sul',
    probabilidade: '70%',
    dataPrevista: '2026-03-30',
    motivoPerda: '-'
  },
  {
    cliente: 'Carlos Mendes',
    estagio: 'Negociação',
    valor: 'R$ 890.000',
    produto: 'Casa condomínio | ABC',
    probabilidade: '60%',
    dataPrevista: '2026-04-10',
    motivoPerda: '-'
  }
];

export const tarefas = [
  {
    titulo: 'Retornar contato da Mariana',
    cliente: 'Mariana Silva',
    responsavel: 'João',
    vencimento: '2026-03-16 14:00',
    prioridade: 'Alta',
    status: 'Pendente'
  },
  {
    titulo: 'Agendar visita do Carlos',
    cliente: 'Carlos Mendes',
    responsavel: 'Ana',
    vencimento: '2026-03-17 10:00',
    prioridade: 'Média',
    status: 'Em andamento'
  }
];
