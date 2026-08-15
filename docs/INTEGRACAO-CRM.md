# Contrato Hermes ↔ CRM

A integração deve ser uma camada estreita entre o Hermes e a API do CRM. Não entregue ao agente acesso direto ao banco.

## Capacidades iniciais

| Capacidade | Piloto | Confirmação |
|---|---:|---:|
| Buscar contato ou empresa | sim | não |
| Resumir histórico | sim | não |
| Listar negócios e tarefas | sim | não |
| Preparar nota ou mensagem | sim | não |
| Criar contato | depois | sim |
| Alterar etapa de negócio | depois | sim |
| Enviar WhatsApp ou e-mail | fora do pacote | sempre |

## Variáveis

```bash
CRM_BASE_URL=http://127.0.0.1:3001
CRM_AGENT_TOKEN=gere-uma-credencial-exclusiva
CRM_MODE=read_only
```

## Regras do conector

1. Não aceitar SQL arbitrário.
2. Não devolver segredos nem campos internos.
3. Limitar resultados e paginação.
4. Registrar operador, ação, alvo e horário.
5. Implementar idempotência nas escritas.
6. Recusar escrita quando `CRM_MODE=read_only`.
7. Exigir confirmação para toda mutação.
8. Não permitir que texto do modelo defina preço, pagamento, permissão ou identidade.

## Eventos úteis

- `contact.created`
- `deal.stage_changed`
- `activity.created`
- `task.due`
- `message.received`

A primeira versão pode ser somente leitura. Isso já permite ao Hermes localizar registros, resumir contexto e preparar próximos passos sem colocar o banco em risco.
