# Segurança e separação de dados

## Nunca compartilhar

- `.env`, tokens, chaves de API e cookies;
- diretórios de sessão do WhatsApp;
- bancos `.db`, dumps SQL e volumes Docker;
- logs, gravações, áudios e imagens;
- histórico e memórias do Hermes;
- listas de contatos, mensagens e negócios;
- prompts que contenham contexto pessoal ou estratégia confidencial.

## WhatsApp

O bridge rápido do Hermes usa o protocolo do WhatsApp Web. Use um número dedicado, allowlist fechada e conversas internas. Para atendimento de clientes em produção, use o adaptador oficial WhatsApp Business Cloud API.

A sessão pareada concede acesso à conta. Proteja-a como senha:

```bash
chmod 700 ~/.hermes/platforms/whatsapp/session
```

Se houver suspeita de vazamento, desvincule o aparelho pelo aplicativo do WhatsApp e faça novo pareamento.

## CRM

- banco novo e vazio por empresa;
- usuário de banco sem privilégios administrativos;
- autenticação com allowlist;
- backups criptografados;
- retenção mínima de logs;
- segregação entre desenvolvimento e produção;
- credencial exclusiva para o Hermes;
- trilha de auditoria para toda alteração.

## Regra operacional

O Hermes começa em modo de leitura e rascunho. Habilite escrita somente por ação, depois de teste, observabilidade e rollback. Envio a clientes não faz parte deste pacote.
