alter table "public"."profiles" drop constraint "profiles_id_fkey";

alter table "public"."projects" drop constraint "projects_id_fkey";

alter table "public"."projects" alter column "id" set default gen_random_uuid();

alter table "public"."projects" alter column "userId" drop not null;

alter table "public"."projects" alter column "userId" set data type uuid using "userId"::uuid;

alter table "public"."projects" add constraint "projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."projects" validate constraint "projects_userId_fkey";

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


