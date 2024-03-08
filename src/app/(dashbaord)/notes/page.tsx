import { getSupabaseServerClient } from '@/utils/supabase/server';

export default async function Notes() {
  const supabase = getSupabaseServerClient();
  const { data: notes } = await supabase.from('notes').select();

  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}
