## Supabase Local Development

### Setup

Run the following commands to start the local development environment:

#### Login to Supabase CLI

```bash
supabase login
```

#### Initialize your project

```bash
supabase init
```

#### Start Supabase services

The `start` command uses Docker to start the Supabase services.

```bash
supabase start
```

#### Stop Supabase services

You can stop the all the services without resetting your local database by running the following command:

```bash
supabase stop
```

Use `supabase stop --no-backup` to stop all services and reset your local database.

### Database migrations

#### Create a new migration

It will create a `.sql` file after running the following command:

```bash
supabase migration new <migration_name>

```

After editing the migration files, use the `reset` command here to reset the database to the current migrations:

```bash
supabase db reset
```

#### Add new columns to a table

Add the following SQL to the sql file:

```sql
alter table
if exists public.<table_name> add <column_name> <column_type> default <default_value>;
```

#### Add sample data

```sql

-- in supabase/seed.sql
insert into
public.employees (name)
values
(<insert_value>),
(<insert_value>),
(<insert_value>);
```

And run `supabase db reset` to apply the changes.

### Deploy your project

#### Link your project

```bash
supabase link --project-ref <project-id>
# You can get <project-id> from your project's dashboard URL: https://supabase.com/dashboard/project/<project-id>

# DB password
# gTYBSYaX5OV65E3N

supabase db pull
# Capture any changes that you have made to your remote database before you went through the steps above
# If you have not made any changes to the remote database, skip this step
```

`supabase/migrations` is now populated with a migration in `<timestamp>_remote_schema.sql`.
This migration captures any changes required for your local database to match the schema of your remote Supabase project.

Review the generated migration file and once happy, apply the changes to your local instance:

```bash
# To apply the new migration to your local database:
supabase migration up

# To reset your local database completely:
supabase db reset
```

#### Deploy Database Changes

Deploy any changes to your remote database:

```bash
supabase db push
```

#### Deploy Edge Functions

If you have any edge functions, you can run the following command to deploy them:

```bash
supabase functions deploy <function_name>
```
