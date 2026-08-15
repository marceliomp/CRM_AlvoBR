#!/usr/bin/env bash
set -euo pipefail

git submodule update --init --recursive

if [ ! -f .env ]; then
  cp .env.example .env
fi

echo "Pacote preparado."
echo "Próximo passo: leia docs/INSTALACAO.md"
