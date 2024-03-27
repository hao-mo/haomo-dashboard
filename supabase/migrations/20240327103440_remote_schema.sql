revoke delete on table "public"."Test" from "anon";

revoke insert on table "public"."Test" from "anon";

revoke references on table "public"."Test" from "anon";

revoke select on table "public"."Test" from "anon";

revoke trigger on table "public"."Test" from "anon";

revoke truncate on table "public"."Test" from "anon";

revoke update on table "public"."Test" from "anon";

revoke delete on table "public"."Test" from "authenticated";

revoke insert on table "public"."Test" from "authenticated";

revoke references on table "public"."Test" from "authenticated";

revoke select on table "public"."Test" from "authenticated";

revoke trigger on table "public"."Test" from "authenticated";

revoke truncate on table "public"."Test" from "authenticated";

revoke update on table "public"."Test" from "authenticated";

revoke delete on table "public"."Test" from "service_role";

revoke insert on table "public"."Test" from "service_role";

revoke references on table "public"."Test" from "service_role";

revoke select on table "public"."Test" from "service_role";

revoke trigger on table "public"."Test" from "service_role";

revoke truncate on table "public"."Test" from "service_role";

revoke update on table "public"."Test" from "service_role";

alter table "public"."Test" drop constraint "Profile_pkey";

drop index if exists "public"."Profile_email_key";

drop index if exists "public"."Profile_pkey";

drop table "public"."Test";

create table "public"."projects" (
    "id" uuid not null,
    "name" text not null,
    "userId" text not null,
    "created_at" timestamp(6) with time zone not null default CURRENT_TIMESTAMP,
    "updated_at" timestamp(6) with time zone not null default CURRENT_TIMESTAMP
);


CREATE UNIQUE INDEX projects_pkey ON public.projects USING btree (id);

alter table "public"."projects" add constraint "projects_pkey" PRIMARY KEY using index "projects_pkey";

alter table "public"."projects" add constraint "projects_id_fkey" FOREIGN KEY (id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."projects" validate constraint "projects_id_fkey";

grant delete on table "public"."projects" to "anon";

grant insert on table "public"."projects" to "anon";

grant references on table "public"."projects" to "anon";

grant select on table "public"."projects" to "anon";

grant trigger on table "public"."projects" to "anon";

grant truncate on table "public"."projects" to "anon";

grant update on table "public"."projects" to "anon";

grant delete on table "public"."projects" to "authenticated";

grant insert on table "public"."projects" to "authenticated";

grant references on table "public"."projects" to "authenticated";

grant select on table "public"."projects" to "authenticated";

grant trigger on table "public"."projects" to "authenticated";

grant truncate on table "public"."projects" to "authenticated";

grant update on table "public"."projects" to "authenticated";

grant delete on table "public"."projects" to "service_role";

grant insert on table "public"."projects" to "service_role";

grant references on table "public"."projects" to "service_role";

grant select on table "public"."projects" to "service_role";

grant trigger on table "public"."projects" to "service_role";

grant truncate on table "public"."projects" to "service_role";

grant update on table "public"."projects" to "service_role";

alter table profiles
  enable row level security;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');
