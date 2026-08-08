#!/bin/bash
# ============================================================
# Moreno Advisory — Google Cloud Run Deploy Script
# ============================================================
# Usage: bash deploy.sh
# Requires: gcloud CLI, Docker Desktop running
# ============================================================

set -e

# ── CONFIGURE THESE ─────────────────────────────────────────
PROJECT_ID="moreno-advisory"          # seu Google Cloud Project ID
REGION="us-central1"                  # região mais próxima: southamerica-east1 = São Paulo
SERVICE_NAME="moreno-advisory-web"
IMAGE="gcr.io/$PROJECT_ID/$SERVICE_NAME"
# ────────────────────────────────────────────────────────────

echo ""
echo "🚀 Moreno Advisory — Deploy para Google Cloud Run"
echo "=================================================="
echo "Projeto  : $PROJECT_ID"
echo "Região   : $REGION"
echo "Imagem   : $IMAGE"
echo ""

# 1. Autenticar no GCP
echo "→ [1/6] Autenticando no Google Cloud..."
gcloud auth configure-docker --quiet

# 2. Selecionar projeto
echo "→ [2/6] Configurando projeto: $PROJECT_ID"
gcloud config set project $PROJECT_ID

# 3. Build da imagem Docker
echo "→ [3/6] Construindo imagem Docker..."
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL="https://morenoadvisory.com" \
  --build-arg NEXT_PUBLIC_WHATSAPP_NUMBER="5511910685040" \
  -t $IMAGE \
  .

# 4. Push para Google Container Registry
echo "→ [4/6] Enviando imagem para Container Registry..."
docker push $IMAGE

# 5. Deploy no Cloud Run
echo "→ [5/6] Fazendo deploy no Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image $IMAGE \
  --region $REGION \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --set-env-vars "NEXT_PUBLIC_SITE_URL=https://morenoadvisory.com" \
  --set-env-vars "NEXT_PUBLIC_WHATSAPP_NUMBER=5511910685040" \
  --set-env-vars "SMTP_FROM_EMAIL=cemoreno@morenoadvisory.com" \
  --set-env-vars "CONTACT_EMAIL=cemoreno+faleconosco@morenoadvisory.com" \
  --set-env-vars "NEWSLETTER_EMAIL=cemoreno+newsletter@morenoadvisory.com" \
  --set-secrets "SMTP_HOST=smtp-host:latest,SMTP_PORT=smtp-port:latest,SMTP_SECURE=smtp-secure:latest,SMTP_USER=smtp-user:latest,SMTP_PASS=smtp-pass:latest"

# 6. Mostrar URL
echo ""
echo "→ [6/6] Deploy concluído!"
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region $REGION --format 'value(status.url)')
echo ""
echo "✅ Site no ar: $SERVICE_URL"
echo ""
echo "Próximo passo: mapear o domínio morenoadvisory.com"
echo "  gcloud run domain-mappings create --service $SERVICE_NAME --domain morenoadvisory.com --region $REGION"
echo ""
