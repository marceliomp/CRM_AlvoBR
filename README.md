# CRM limpo + Hermes no WhatsApp

Pacote de partida para uma empresa instalar um CRM agentic e um assistente interno Hermes acessível pelo WhatsApp, sem receber dados, credenciais, sessões ou memórias de outra operação.

## O que está incluído

- `crm/`: versão fixada do CRM open source que serve de base para a implantação;
- `hermes-agent/`: versão fixada do Hermes Agent;
- `hermes/SOUL.md`: cérebro empresarial neutro, sem contexto pessoal;
- configuração segura do WhatsApp com lista explícita de usuários;
- roteiro de instalação e checklist de segurança.

## O que não está incluído

- banco de contatos, negócios, conversas ou atividades;
- sessões do WhatsApp;
- arquivos `.env`, tokens, chaves ou credenciais;
- memórias, histórico e prompts privados;
- identidade visual ou regras comerciais da Alvo;
- automação de atendimento a leads.

O Hermes deste pacote é um assistente **interno**. Ele não deve conversar com clientes. Um agente de atendimento exige número empresarial, políticas, consentimento, handoff humano e, preferencialmente, WhatsApp Business Cloud API.

## Começo rápido

```bash
git clone --recurse-submodules --branch share/crm-hermes \
  https://github.com/marceliomp/CRM_AlvoBR.git crm-hermes
cd crm-hermes
cp .env.example .env
```

Depois siga [docs/INSTALACAO.md](docs/INSTALACAO.md).

## Fontes

A base do CRM vem de [trycompai/crm](https://github.com/trycompai/crm) e o cérebro de [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent), ambos sob licença MIT. Os submódulos estão fixados em commits específicos para permitir uma instalação reproduzível.
