# PG Vector

## Basic Commands in PGVector
- `\l` List Databases
- `\c dbname` Connect to database
- `\dt` List Tables
- `\d table_name` Describe table
- `\dx` List Extensions
- `\1` Quit


1. Start docker container
```bash
docker compose up -d
```

2. Open interactive terminal 
```bash
docker exec -it pgvector-db psql -U postgres
```

3. List all databases
```bash
\l
```

4. Connect to sepecific Database
```bash
\c appdb
```
5. Create an extension
```bash
CREATE EXTENSION IF NOT EXISTS vector;
```
5. List extensions
```bash
\dx
```

## Create table
```sql
DROP TABLE IF EXISTS vector_data;

CREATE TABLE vector_data (
    id SERIAL PRIMARY KEY,
    content TEXT,
    embedding VECTOR(3)
);

```

## Insert Data into the table
```sql
INSERT INTO vector_data (content, embedding)
VALUES
('PostgreSQL tutorial', '[0.1, 0.2, 0.3, 1.2]'),
('Database indexing guide', '[0.2, 0.1, 0.4, 2.5]'),
('AI and vector search', '[0.9, 0.8, 0.7, 0.6]');

```

## Run your first similarity search
```sql
SELECT
    id,
    content,
    embedding <=> '[0.1, 0.2, 0.25]' AS distance
FROM documents
ORDER BY distance
LIMIT 2;

```