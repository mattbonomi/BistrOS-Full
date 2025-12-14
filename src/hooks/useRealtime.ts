import { supabase } from '../supabaseClient'

export function useRealtime(table, callback) {
  supabase
    .channel(`${table}-changes`)
    .on('postgres_changes', { event: '*', schema: 'public', table }, callback)
    .subscribe()
}
