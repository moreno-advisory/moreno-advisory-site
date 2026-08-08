-- ============================================================
-- Moreno Advisory CRM — Supabase Schema (additive)
-- Runs against the SAME Supabase project already used by
-- moreno-advisory-app. Safe to run after that app's schema.sql.
-- ============================================================

-- ============================================================
-- LEADS
-- ============================================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  message TEXT,                      -- mensagem original do formulário de contato
  locale TEXT DEFAULT 'en' CHECK (locale IN ('en','pt')),
  source TEXT NOT NULL DEFAULT 'manual'
    CHECK (source IN ('site_contact_form','manual','referral','fiverr','linkedin','other')),

  stage TEXT NOT NULL DEFAULT 'lead'
    CHECK (stage IN ('lead','contato','proposta','negociacao','ganho','perdido')),
  stage_position INTEGER NOT NULL DEFAULT 0,   -- ordenação dentro da coluna Kanban
  lost_reason TEXT,

  value_estimate_usd NUMERIC(10,2),
  assigned_to TEXT DEFAULT 'cemoreno@morenoadvisory.com',

  metadata JSONB DEFAULT '{}'::jsonb, -- utm_source, page, ip, etc.

  converted_project_id TEXT,          -- preenchido quando stage = 'ganho'
  won_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_leads_stage ON leads(stage, stage_position);

-- ============================================================
-- LEAD ACTIVITIES (timeline: notas, mudanças de estágio, saídas de IA)
-- ============================================================
CREATE TABLE lead_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('note','stage_change','ai_output','email','call','system')),
  author TEXT,                        -- e-mail de quem registrou, ou 'gemini' / 'claude'
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_lead_activities_lead_id ON lead_activities(lead_id);

-- ============================================================
-- OAUTH ACCOUNTS (multi-conta Google — corporativa + pessoal)
-- ============================================================
CREATE TABLE oauth_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_email TEXT NOT NULL DEFAULT 'cemoreno@morenoadvisory.com', -- dono do CRM (login principal)
  account_type TEXT NOT NULL CHECK (account_type IN ('corporate','personal')),
  provider TEXT NOT NULL DEFAULT 'google',
  provider_account_email TEXT NOT NULL, -- cemoreno@morenoadvisory.com | carl.ed.moreno@gmail.com
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMPTZ,
  scopes TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (owner_email, account_type)
);

-- Observação de segurança: access_token/refresh_token devem ser gravados
-- apenas a partir do backend (service role), nunca do client anon key.
-- Considerar pgsodium/Vault do Supabase para criptografar essas colunas
-- antes de ir para produção.

-- ============================================================
-- AI PROVIDER KEYS (Gemini AI Studio e Claude — chave por conta)
-- ============================================================
CREATE TABLE ai_provider_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_email TEXT NOT NULL DEFAULT 'cemoreno@morenoadvisory.com',
  linked_account_type TEXT NOT NULL DEFAULT 'personal'
    CHECK (linked_account_type IN ('corporate','personal')),
  provider TEXT NOT NULL CHECK (provider IN ('gemini','claude')),
  api_key TEXT NOT NULL,
  label TEXT,                          -- ex: "Gemini AI Studio - conta pessoal"
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (owner_email, provider)
);

-- ============================================================
-- PROJECTS — extensão da tabela já existente em moreno-advisory-app
-- (ALTER, não recria — mesma tabela usada pelo /moreno-advisory-app)
-- ============================================================
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'manual'
    CHECK (source IN ('manual','crm')),
  ADD COLUMN IF NOT EXISTS platform TEXT DEFAULT 'Fiverr',
  ADD COLUMN IF NOT EXISTS delivery_link TEXT,        -- link de entrega Fiverr
  ADD COLUMN IF NOT EXISTS fiverr_order_id TEXT,
  ADD COLUMN IF NOT EXISTS notes TEXT;

-- Campos que hoje são NOT NULL mas são específicos do dashboard de outreach
-- (fiverr_username, calendar_color_id, target, target_label) passam a ter
-- defaults para permitir que o CRM crie projetos sem preenchê-los:
ALTER TABLE projects
  ALTER COLUMN fiverr_username DROP NOT NULL,
  ALTER COLUMN calendar_color_id SET DEFAULT 1,
  ALTER COLUMN target SET DEFAULT 0,
  ALTER COLUMN target_label SET DEFAULT '';

-- lib/projectStorage.ts (app) já usa 8 cores; o schema original só
-- permitia red/blue/yellow — alinhando o CHECK:
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_color_check;
ALTER TABLE projects ADD CONSTRAINT projects_color_check
  CHECK (color IN ('red','blue','yellow','green','purple','orange','teal','pink'));

CREATE INDEX IF NOT EXISTS idx_projects_lead_id ON projects(lead_id);

-- ============================================================
-- TRIGGERS updated_at (reaproveita update_updated_at() já criada
-- pelo schema.sql do moreno-advisory-app)
-- ============================================================
CREATE TRIGGER trg_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_oauth_accounts_updated_at BEFORE UPDATE ON oauth_accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_ai_provider_keys_updated_at BEFORE UPDATE ON ai_provider_keys
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TRIGGER: lead "ganho" → cria Projeto automaticamente
-- ============================================================
CREATE OR REPLACE FUNCTION create_project_from_won_lead()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.stage = 'ganho' AND OLD.stage IS DISTINCT FROM 'ganho' THEN
    NEW.won_at := NOW();

    INSERT INTO projects (
      id, name, client, fiverr_value_usd, deadline,
      status, type, color, lead_id, source
    ) VALUES (
      'lead-' || NEW.id::text,
      NEW.company,
      NEW.name,
      COALESCE(NEW.value_estimate_usd, 0),
      (NOW() + INTERVAL '30 days')::date,  -- prazo provisório, editável no CRM/app
      'active',
      'single_payment',
      'blue',
      NEW.id,
      'crm'
    )
    RETURNING id INTO NEW.converted_project_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_lead_won_creates_project
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION create_project_from_won_lead();

-- ============================================================
-- ROW LEVEL SECURITY (mesmo padrão do schema.sql existente —
-- deixado desabilitado até a autenticação estar 100% ligada;
-- habilitar antes de expor a chave anon publicamente)
-- ============================================================
-- ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE oauth_accounts ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ai_provider_keys ENABLE ROW LEVEL SECURITY;
