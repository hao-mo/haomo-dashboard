alter table "public"."profiles" drop constraint "profiles_role_check";

alter table "public"."profiles" alter column "role" set default 'user'::"Role";

alter table "public"."profiles" alter column "role" set not null;

alter table "public"."profiles" alter column "role" set data type "Role" using "role"::"Role";


