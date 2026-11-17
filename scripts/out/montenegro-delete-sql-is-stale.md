# Do not run montenegro-delete.sql

`montenegro-delete.sql` in this folder is stale as of 17 November 2026.

It deletes Montenegro rows whose text equals `text_local` and whose `is_excerpt` flag is true, for a fixed list of law names. That list includes both `ZAKON O ADMINISTRATIVNIM TAKSAMA` and `USTAVCRNE GORE`.

Those two laws have 478 tail rows that were never part of the excerpt delete. They are now `is_excerpt` true. Running the SQL file would delete all 478 of them.

Do not run it.
