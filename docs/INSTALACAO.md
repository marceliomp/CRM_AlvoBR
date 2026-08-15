# Instalação

## 1. Requisitos

- Linux ou macOS;
- Git;
- Docker e Docker Compose;
- Bun;
- Node.js 18 ou superior;
- um número dedicado de WhatsApp para o Hermes.

## 2. Baixar o pacote

```bash
git clone --recurse-submodules --branch share/crm-hermes \
  https://github.com/marceliomp/CRM_AlvoBR.git crm-hermes
cd crm-hermes
```

Se já clonou sem os submódulos:

```bash
git submodule update --init --recursive
```

## 3. Subir o CRM

```bash
cd crm
cp .env.example .env
```

Preencha no `crm/.env`:

- `BETTER_AUTH_SECRET`;
- `ALLOWED_SIGN_IN`;
- Google OAuth ou Microsoft Entra para autenticação.

Depois:

```bash
bun install
docker compose up -d
bun run db:deploy
bun run dev
```

O CRM abre em `http://localhost:3000` e a API em `http://localhost:3001`.

Não execute `bun run db:seed` em produção. O seed é apenas demonstração.

## 4. Instalar o Hermes

Use o instalador oficial:

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
source ~/.bashrc
```

Execute o assistente de configuração do provedor de IA. Depois copie o cérebro neutro apenas em uma instalação nova:

```bash
cp ../hermes/SOUL.md ~/.hermes/SOUL.md
```

Não copie esse arquivo sobre um Hermes já configurado sem revisar o conteúdo existente.

## 5. Conectar o WhatsApp

Configure um número dedicado:

```bash
hermes whatsapp
```

Escolha o modo de número separado e leia o QR code em WhatsApp → Aparelhos conectados.

No arquivo `~/.hermes/.env`, mantenha:

```bash
WHATSAPP_ENABLED=true
WHATSAPP_MODE=bot
WHATSAPP_ALLOWED_USERS=55DDDNUMERO
```

A lista deve conter somente as pessoas autorizadas a operar o assistente. Nunca use `*` para um Hermes com ferramentas de terminal, arquivos ou CRM.

No `~/.hermes/config.yaml`:

```yaml
unauthorized_dm_behavior: pair

whatsapp:
  unauthorized_dm_behavior: ignore
  reply_prefix: ""
  send_read_receipts: false

gateway:
  platforms:
    whatsapp:
      extra:
        text_batch_delay_seconds: 5.0
        text_batch_split_delay_seconds: 10.0
```

Finalmente:

```bash
hermes gateway install
hermes gateway start
```

## 6. Ligar Hermes ao CRM

O Hermes não recebe acesso automático ao CRM. Crie uma credencial técnica com privilégio mínimo e exponha apenas as ações necessárias, conforme [INTEGRACAO-CRM.md](INTEGRACAO-CRM.md).

Comece somente com leitura e elaboração de rascunhos. Escrita de contatos, mudança de etapa e envio de mensagens devem exigir confirmação até a auditoria do piloto ser concluída.

## 7. Aceite do piloto

- CRM abre sem dados de demonstração;
- somente e-mails autorizados entram;
- Hermes responde apenas aos números da allowlist;
- desconhecidos são ignorados;
- sessão do WhatsApp não está no Git;
- nenhum segredo aparece em logs ou commits;
- ações externas pedem confirmação;
- backup e restauração foram testados.
