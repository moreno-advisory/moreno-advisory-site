# Moreno Advisory Platform Roadmap

## Current Phase

The current priority is to keep the public website stable, clearer, bilingual, commercially aligned, and lightweight enough to be used comfortably from modest Linux machines.

The public website should remain focused on B2B lead generation, LinkedIn outreach, strategic prospecting, decision-maker mapping, and strategic partnerships.

## User Environment

The owner uses EndeavourOS on the main computer and Manjaro on a weaker secondary computer.

The weaker computer has:

- Older Intel i3 processor
- 8 GB RAM
- Integrated video with 128 MB
- Gemini may be running at the same time as the internal app/CRM

Because of this, the future CRM/App must be designed as a lightweight browser-based web app, not a heavy desktop application.

## Future Vision

The future vision is to evolve Moreno Advisory into an integrated internal platform, including:

- Public website
- Internal app
- CRM
- Admin/CMS area for website content
- Central cloud database
- Multi-user access
- Pipeline management
- Tasks
- Leads
- Contacts
- Companies
- Opportunities
- Activity history
- Future automations

## Important Note

The existing `crm/` and `moreno-advisory-app/` directories should not be considered production-ready. They must be audited separately before any integration or rebuild.

## Performance Principles

The future internal app/CRM must be lightweight and usable on a low-spec Manjaro machine with 8 GB RAM.

Avoid:

- Electron
- Heavy dashboards
- Excessive client-side rendering
- Large unpaginated tables
- Expensive animations
- Aggressive polling
- Heavy chart libraries by default
- Local database dependency
- Excessive memory usage
- GPU-heavy effects

Prefer:

- Browser-based web app
- Cloud-hosted backend
- Centralized cloud database
- Server-side processing where possible
- Pagination
- Lazy loading
- Debounced search
- Minimal dependencies
- Simple tables
- Lightweight UI
- Fast navigation
- Low memory footprint
- Progressive enhancement

## Recommended MVP

A realistic MVP should include:

- Internal login
- Dashboard
- Leads module
- Contacts module
- Companies module
- Simple pipeline
- Tasks
- Website form saving leads into the CRM
- Newsletter saving subscribers
- Basic site content editing
- Admin users
- Cloud database
- Preparation for multi-user usage

## Recommended Technical Direction

The platform should be planned in phases.

Do not mix a public website redesign with a complete HubSpot-like CRM rebuild in a single step.

Recommended phases:

1. Public website revamp
2. Technical audit of `crm/` and `moreno-advisory-app/`
3. Architecture decision
4. Database and authentication foundation
5. CRM MVP
6. CMS/admin
7. Multi-user permissions
8. Real-time sync
9. Future automations and integrations

## Bilingual Requirement

The public website must remain bilingual in English and Portuguese.

The EN/PT language switcher must remain available in the Header.

All public-facing content should have equivalent English and Portuguese versions.

## Cloud Direction

The current public website is already prepared for Google Cloud Run deployment. The future CRM/App should use a centralized cloud database so data is shared across machines and users.

Google One is useful as a personal Google storage/subscription product, but it is not the same thing as Google Cloud Platform infrastructure. A CRM needs a real cloud database and backend.

Options to evaluate in the next phase:

- Google Cloud Run + Cloud SQL PostgreSQL for a Google Cloud-centered relational architecture.
- Firebase Auth + Firestore for Google ecosystem authentication and real-time sync.
- Supabase Auth + Postgres + Realtime if speed of MVP and built-in real-time database features are prioritized.

No cloud database, authentication provider, or CRM rebuild should be implemented before the dedicated audit and architecture decision phase.
