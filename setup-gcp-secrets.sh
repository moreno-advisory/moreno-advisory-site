#!/bin/bash
# ============================================================
# Moreno Advisory — Setup de secrets para Cloud Run
# ============================================================
# Uso:
#   bash setup-gcp-secrets.sh
# Requisitos:
#   - gcloud autenticado
#   - projeto GCP correto selecionado
# ============================================================

set -e

PROJECT_ID="${PROJECT_ID:-moreno-advisory}"

echo ""
echo "🔐 Configuração de secrets — Moreno Advisory"
echo "============================================"
echo "Projeto: $PROJECT_ID"
echo ""

gcloud config set project "$PROJECT_ID"

read -r -p "SMTP host [smtp.gmail.com]: " SMTP_HOST
SMTP_HOST="${SMTP_HOST:-smtp.gmail.com}"

read -r -p "SMTP port [587]: " SMTP_PORT
SMTP_PORT="${SMTP_PORT:-587}"

read -r -p "SMTP secure (true/false) [false]: " SMTP_SECURE
SMTP_SECURE="${SMTP_SECURE:-false}"

read -r -p "SMTP user [cemoreno@morenoadvisory.com]: " SMTP_USER
SMTP_USER="${SMTP_USER:-cemoreno@morenoadvisory.com}"

read -r -s -p "SMTP app password: " SMTP_PASS
echo ""

printf "%s" "$SMTP_HOST" | gcloud secrets create smtp-host --replication-policy="automatic" --data-file=- 2>/dev/null || \
printf "%s" "$SMTP_HOST" | gcloud secrets versions add smtp-host --data-file=-

printf "%s" "$SMTP_PORT" | gcloud secrets create smtp-port --replication-policy="automatic" --data-file=- 2>/dev/null || \
printf "%s" "$SMTP_PORT" | gcloud secrets versions add smtp-port --data-file=-

printf "%s" "$SMTP_SECURE" | gcloud secrets create smtp-secure --replication-policy="automatic" --data-file=- 2>/dev/null || \
printf "%s" "$SMTP_SECURE" | gcloud secrets versions add smtp-secure --data-file=-

printf "%s" "$SMTP_USER" | gcloud secrets create smtp-user --replication-policy="automatic" --data-file=- 2>/dev/null || \
printf "%s" "$SMTP_USER" | gcloud secrets versions add smtp-user --data-file=-

printf "%s" "$SMTP_PASS" | gcloud secrets create smtp-pass --replication-policy="automatic" --data-file=- 2>/dev/null || \
printf "%s" "$SMTP_PASS" | gcloud secrets versions add smtp-pass --data-file=-

echo ""
echo "✅ Secrets atualizados com sucesso."
echo "Agora rode: bash deploy.sh"
echo ""
