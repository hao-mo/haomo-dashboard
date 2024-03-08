import { getSupabaseServerClient } from '@/utils/supabase/server';

export default async function Page() {
  const supabase = getSupabaseServerClient();

  const { data } = await supabase.auth.getUser();

  return <div>{JSON.stringify(data)}</div>;
}
