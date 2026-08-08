# Moreno Advisory — Website Institucional

> **Building Strategic Partnerships. Driving Global Growth.**

Site institucional completo da **Moreno Advisory** — consultoria estratégica global. Desenvolvido com Next.js 15, totalmente bilíngue (PT-BR / EN-US), implantado no Google Cloud Run.

🌐 **Site ao vivo:** [morenoadvisory.com](https://morenoadvisory.com)

---

## Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15.5 (App Router) |
| Linguagem | TypeScript 5 |
| Estilo | Tailwind CSS 3 |
| Animações | Framer Motion |
| i18n | next-intl (EN + PT-BR) |
| Formulários | react-hook-form + zod |
| Ícones | Lucide React |
| Fontes | Cormorant Garamond + Inter |
| E-mail | Nodemailer (SMTP) |
| Hospedagem | Google Cloud Run |
| Imagens | Google Container Registry |
| Secrets | Google Secret Manager |

---

## Estrutura do Projeto

```
moreno-advisory/
├── src/
│   ├── app/
│   │   ├── [locale]/              ← Páginas localizadas (EN + PT)
│   │   │   ├── layout.tsx         ← Layout com i18n provider
│   │   │   ├── page.tsx           ← Home
│   │   │   ├── about/             ← Sobre
│   │   │   ├── services/          ← Serviços (index + 8 páginas)
│   │   │   ├── industries/        ← Setores
│   │   │   ├── contact/           ← Contato
│   │   │   └── blog/              ← Insights (editorial + RSS)
│   │   ├── api/
│   │   │   ├── contact/route.ts   ← Formulário de contato
│   │   │   └── newsletter/route.ts← Newsletter
│   │   ├── sitemap.ts             ← Sitemap dinâmico
│   │   └── robots.ts              ← Robots.txt
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx         ← Nav responsiva + language switcher
│   │   │   └── Footer.tsx         ← Footer completo
│   │   ├── sections/
│   │   │   ├── Hero.tsx           ← Hero animado
│   │   │   ├── ServicesOverview.tsx
│   │   │   ├── Stats.tsx          ← Contadores animados
│   │   │   ├── AboutPreview.tsx
│   │   │   ├── IndustriesPreview.tsx
│   │   │   ├── WorldPresence.tsx  ← Mapa SVG global
│   │   │   ├── Testimonials.tsx   ← Carrossel
│   │   │   ├── ContactSection.tsx ← Formulário
│   │   │   ├── Newsletter.tsx
│   │   │   └── ServiceDetail.tsx  ← Template de serviço
│   │   └── ui/
│   │       ├── Logo.tsx
│   │       ├── WhatsAppButton.tsx ← Botão flutuante
│   │       ├── ScrollToTop.tsx
│   │       ├── AnimatedCounter.tsx
│   │       └── LanguageSwitcher.tsx
│   ├── i18n/
│   │   ├── routing.ts             ← Configuração de locales
│   │   ├── request.ts             ← next-intl server config
│   │   └── messages/
│   │       ├── en.json            ← Tradução inglês
│   │       └── pt.json            ← Tradução português
│   ├── lib/
│   │   ├── constants.ts           ← Dados em inglês (serviços, indústrias)
│   │   ├── constants.pt.ts        ← Dados em português
│   │   ├── getLocaleData.ts       ← Utilitário de dados por locale
│   │   ├── metadata.ts            ← SEO helpers
│   │   ├── rss.ts                 ← Feed de notícias (RSS gratuito)
│   │   └── utils.ts               ← Helpers gerais
│   ├── types/index.ts             ← Interfaces TypeScript
│   └── middleware.ts              ← Roteamento i18n
├── public/
│   └── assets/
│       ├── logo-main.png          ← Logo principal
│       └── perfil.png             ← Foto Carlos Eduardo Moreno
├── Dockerfile                     ← Build de produção (multi-stage)
├── deploy.sh                      ← Script de deploy GCP
├── .env.example                   ← Template de variáveis
├── next.config.ts
├── tailwind.config.ts
└── DEPLOY.md                      ← Documentação de deploy
```

---

## Páginas

| Rota | Descrição |
|---|---|
| `/en` e `/pt` | Home com Hero, Serviços, Stats, About, Setores, Mapa, Depoimentos |
| `/en/about` `/pt/about` | Sobre + Fundador Carlos Eduardo Moreno + Metodologia |
| `/en/services` `/pt/services` | Índice dos 8 serviços |
| `/en/services/[slug]` `/pt/services/[slug]` | Página individual de serviço |
| `/en/industries` `/pt/industries` | 9 setores atendidos |
| `/en/contact` `/pt/contact` | Formulário + Mapa + FAQ |
| `/en/blog` `/pt/blog` | Insights editoriais + Feed RSS ao vivo |
| `/sitemap.xml` | Sitemap dinâmico |
| `/robots.txt` | Robots.txt |

### 8 Serviços
1. Business Development / Desenvolvimento de Negócios
2. Executive Business Partnership / Parceria Executiva
3. Strategic Partnerships / Parcerias Estratégicas
4. Global Lead Generation / Geração Global de Leads
5. International Expansion / Expansão Internacional
6. Business Consulting / Consultoria Empresarial
7. Commercial Intelligence / Inteligência Comercial
8. International Business Representation / Representação Comercial Internacional

---

## Desenvolvimento Local

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com seus dados

# 3. Iniciar servidor de desenvolvimento
npm run dev
# Acesse http://localhost:3000 → redireciona para /en
```

### Variáveis de Ambiente

```env
# .env.local
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=cemoreno@morenoadvisory.com
SMTP_PASS=sua-senha-app-gmail
SMTP_FROM_EMAIL=cemoreno@morenoadvisory.com
CONTACT_EMAIL=cemoreno+faleconosco@morenoadvisory.com
NEWSLETTER_EMAIL=cemoreno+newsletter@morenoadvisory.com

NEXT_PUBLIC_SITE_URL=https://morenoadvisory.com
NEXT_PUBLIC_WHATSAPP_NUMBER=5511910685040
```

### Scripts disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção local
npm run lint         # ESLint
npm run type-check   # Verificação TypeScript
```

---

## Deploy — Google Cloud Run

### Pré-requisitos
- Docker instalado e rodando
- gcloud CLI autenticado: `gcloud auth login`
- Projeto configurado: `gcloud config set project moreno-advisory`

### Deploy completo

```bash
bash deploy.sh
```

O script executa automaticamente:
1. Autenticação no GCR
2. Build da imagem Docker (multi-stage)
3. Push para o Container Registry
4. Deploy no Cloud Run
5. Exibe a URL do serviço

### Informações do projeto GCP

| Item | Valor |
|---|---|
| Project ID | `moreno-advisory` |
| Project Number | `122521770527` |
| Region | `us-central1` |
| Service | `moreno-advisory-web` |
| Container | `gcr.io/moreno-advisory/moreno-advisory-web` |
| Billing | `0125B6-4EAB2D-7BABC2` |

### Atualizar o site após mudanças

```bash
cd /run/media/cemoreno/Nexus/moreno-advisory
bash deploy.sh
```

---

## Bilinguismo (i18n)

O site usa `next-intl` com roteamento baseado em URL:

- `/en/...` → Inglês (padrão)
- `/pt/...` → Português Brasileiro

### Adicionar/editar traduções

```
src/i18n/messages/en.json   ← Strings de UI em inglês
src/i18n/messages/pt.json   ← Strings de UI em português
src/lib/constants.ts        ← Dados de conteúdo em inglês
src/lib/constants.pt.ts     ← Dados de conteúdo em português
```

---

## Funcionalidades

| Funcionalidade | Implementação |
|---|---|
| Hero animado | Framer Motion + CSS gradiente |
| Language Switcher | next-intl + botão EN/PT |
| Formulário de contato | react-hook-form + zod + honeypot |
| WhatsApp flutuante | Botão animado → wa.me/5511910685040 |
| Feed RSS ao vivo | 5 fontes PT + 5 fontes EN (cache 30min) |
| Contadores animados | IntersectionObserver + requestAnimationFrame |
| Mapa mundial | SVG customizado com pontos animados |
| Scroll to top | Aparece após 400px de scroll |
| Dark/Light mode | next-themes (padrão: light) |
| SEO completo | JSON-LD, Open Graph, hreflang, sitemap |
| Performance | SSG + ISR, imagens otimizadas, lazy loading |

---

## Configurar E-mail (Formulário de Contato)

Atualmente o formulário captura dados mas não envia e-mail. Para ativar:

### Opção A — Gmail App Password
1. Ative 2FA em [myaccount.google.com/security](https://myaccount.google.com/security)
2. Crie App Password em [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Atualize o secret no GCP:

```bash
echo -n "sua-senha-16-chars" | gcloud secrets versions add smtp-pass --data-file=-
```

4. Faça redeploy: `bash deploy.sh`

### Opção B — Resend.com (recomendado)
1. Crie conta em [resend.com](https://resend.com) — grátis 3.000 e-mails/mês
2. Obtenha a API Key
3. Atualize `src/app/api/contact/route.ts` para usar a API do Resend

---

## Google Analytics

```bash
# 1. Crie uma propriedade GA4 em analytics.google.com
# 2. Adicione ao .env.local:
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# 3. Adicione o script em src/app/[locale]/layout.tsx
```

---

## Contato e Informações

| | |
|---|---|
| **Empresa** | Moreno Advisory |
| **Fundador** | Carlos Eduardo Moreno |
| **E-mail** | cemoreno@morenoadvisory.com |
| **Telefone** | +55 11 9 1068-5040 |
| **WhatsApp** | +55 11 9 1068-5040 |
| **Brasil** | Mairinque, SP |
| **USA** | Houston, TX |
| **LinkedIn** | linkedin.com/company/moreno-advisory |
| **Site** | morenoadvisory.com |

---

*Moreno Advisory — Building Strategic Partnerships. Driving Global Growth.*
