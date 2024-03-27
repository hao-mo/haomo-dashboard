revoke delete on table "public"."Profile" from "anon";

revoke insert on table "public"."Profile" from "anon";

revoke references on table "public"."Profile" from "anon";

revoke select on table "public"."Profile" from "anon";

revoke trigger on table "public"."Profile" from "anon";

revoke truncate on table "public"."Profile" from "anon";

revoke update on table "public"."Profile" from "anon";

revoke delete on table "public"."Profile" from "authenticated";

revoke insert on table "public"."Profile" from "authenticated";

revoke references on table "public"."Profile" from "authenticated";

revoke select on table "public"."Profile" from "authenticated";

revoke trigger on table "public"."Profile" from "authenticated";

revoke truncate on table "public"."Profile" from "authenticated";

revoke update on table "public"."Profile" from "authenticated";

revoke delete on table "public"."Profile" from "service_role";

revoke insert on table "public"."Profile" from "service_role";

revoke references on table "public"."Profile" from "service_role";

revoke select on table "public"."Profile" from "service_role";

revoke trigger on table "public"."Profile" from "service_role";

revoke truncate on table "public"."Profile" from "service_role";

revoke update on table "public"."Profile" from "service_role";

alter table "public"."Profile" drop constraint "Profile_pkey";

drop index if exists "public"."Profile_email_key";

drop index if exists "public"."Profile_pkey";

drop table "public"."Profile";

create table "public"."Test" (
    "id" text not null,
    "username" text not null,
    "email" text not null,
    "role" "Role" not null default 'user'::"Role",
    "created_at" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updated_at" timestamp(3) without time zone not null
);


create table "public"."profiles" (
    "id" uuid not null,
    "updated_at" timestamp with time zone,
    "username" text,
    "avatar_url" text,
    "role" text
);


alter table "public"."profiles" enable row level security;

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

CREATE UNIQUE INDEX "Profile_email_key" ON public."Test" USING btree (email);

CREATE UNIQUE INDEX "Profile_pkey" ON public."Test" USING btree (id);

alter table "public"."Test" add constraint "Profile_pkey" PRIMARY KEY using index "Profile_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_role_check" CHECK ((role = ANY (ARRAY['admin'::text, 'user'::text]))) not valid;

alter table "public"."profiles" validate constraint "profiles_role_check";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

alter table "public"."profiles" add constraint "username_length" CHECK ((char_length(username) >= 3)) not valid;

alter table "public"."profiles" validate constraint "username_length";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.profiles (id, avatar_url)
  values (new.id, new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$function$
;

grant delete on table "public"."Test" to "anon";

grant insert on table "public"."Test" to "anon";

grant references on table "public"."Test" to "anon";

grant select on table "public"."Test" to "anon";

grant trigger on table "public"."Test" to "anon";

grant truncate on table "public"."Test" to "anon";

grant update on table "public"."Test" to "anon";

grant delete on table "public"."Test" to "authenticated";

grant insert on table "public"."Test" to "authenticated";

grant references on table "public"."Test" to "authenticated";

grant select on table "public"."Test" to "authenticated";

grant trigger on table "public"."Test" to "authenticated";

grant truncate on table "public"."Test" to "authenticated";

grant update on table "public"."Test" to "authenticated";

grant delete on table "public"."Test" to "service_role";

grant insert on table "public"."Test" to "service_role";

grant references on table "public"."Test" to "service_role";

grant select on table "public"."Test" to "service_role";

grant trigger on table "public"."Test" to "service_role";

grant truncate on table "public"."Test" to "service_role";

grant update on table "public"."Test" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

create policy "Public profiles are viewable by everyone."
on "public"."profiles"
as permissive
for select
to public
using (true);


create policy "Users can insert their own profile."
on "public"."profiles"
as permissive
for insert
to public
with check ((auth.uid() = id));


create policy "Users can update own profile."
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = id));



