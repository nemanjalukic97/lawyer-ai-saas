-- Page search calls search_legal_articles_keyword as service_role.
-- That role has no statement_timeout, so authenticator's 8s stays armed.
-- PostgREST applies this setting to service_role requests after the reload.
-- No other role. No other setting.
-- Nemanja runs this in the Supabase SQL editor. Do not run from the app.

ALTER ROLE service_role SET statement_timeout = '30s';

NOTIFY pgrst, 'reload config';
