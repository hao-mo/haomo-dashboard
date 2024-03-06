import { createClient } from '@/utils/supabase/server';

export default async function Page() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  return <div>{JSON.stringify(data)}</div>;
}
