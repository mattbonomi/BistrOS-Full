import { supabase } from '../supabaseClient'
import { Table, Order } from '../types'

/**
 * MESAS
 */

export async function getTables(): Promise<Table[]> {
  const { data, error } = await supabase.from('tables').select('*').order('id', { ascending: true })
  if (error) throw error
  return data || []
}

export async function getTableById(tableId: string): Promise<Table | null> {
  const { data, error } = await supabase
    .from('tables')
    .select('*')
    .eq('id', tableId)
    .single()

  if (error) return null
  return data
}

// Simulación de escaneo de QR: busca mesa por ID
export async function scanQR(tableId: string): Promise<Table | null> {
  return getTableById(tableId)
}

// Actualiza el carrito de una mesa
export async function updateCart(tableId: string, cart: any): Promise<void> {
  const { error } = await supabase
    .from('tables')
    .update({ cart })
    .eq('id', tableId)

  if (error) throw error
}

// Pide mozo
export async function requestWaiter(tableId: string): Promise<void> {
  const { error } = await supabase
    .from('tables')
    .update({ waiter_requested: true })
    .eq('id', tableId)

  if (error) throw error
}

// Pide la cuenta
export async function requestBill(tableId: string): Promise<void> {
  const { error } = await supabase
    .from('tables')
    .update({ bill_requested: true })
    .eq('id', tableId)

  if (error) throw error
}

// Cierra mesa: limpia flags y carrito
export async function closeTable(tableId: string): Promise<void> {
  const { error } = await supabase
    .from('tables')
    .update({
      cart: [],
      waiter_requested: false,
      bill_requested: false,
      status: 'closed'
    })
    .eq('id', tableId)

  if (error) throw error
}

/**
 * ÓRDENES
 */

export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

// Crea una nueva orden
export async function placeOrder(order: Partial<Order>): Promise<void> {
  const { error } = await supabase.from('orders').insert(order)
  if (error) throw error
}

// Cambia estado de una orden (pending → preparing → ready → delivered, etc.)
export async function setOrderState(orderId: string, state: string): Promise<void> {
  const { error } = await supabase
    .from('orders')
    .update({ state })
    .eq('id', orderId)

  if (error) throw error
}

/**
 * REALTIME
 */

// Suscripción a una mesa específica (para cliente y vista de mesa)
export function subscribeToTable(
  tableId: string,
  callback: (payload: any) => void
) {
  return supabase
    .channel(`table-${tableId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'tables',
        filter: `id=eq.${tableId}`,
      },
      callback
    )
    .subscribe()
}

// Suscripción global para manager (todas las órdenes)
export function subscribeManager(callback: (payload: any) => void) {
  return supabase
    .channel('manager-orders')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'orders',
      },
      callback
    )
    .subscribe()
}}

export async function setOrderState(orderId: string, state: string): Promise<void> {
  const { error } = await supabase
    .from('orders')
    .update({ state })
    .eq('id', orderId)
  if (error) throw error
}

export async function requestWaiter(tableId: string): Promise<void> {
  const { error } = await supabase
    .from('tables')
    .update({ waiter_requested: true })
    .eq('id', tableId)
  if (error) throw error
}

export async function requestBill(tableId: string): Promise<void> {
  const { error } = await supabase
    .from('tables')
    .update({ bill_requested: true })
    .eq('id', tableId)
  if (error) throw error
}

export async function closeTable(tableId: string): Promise<void> {
  const { error } = await supabase
    .from('tables')
    .update({ cart: null, waiter_requested: false, bill_requested: false })
    .eq('id', tableId)
  if (error) throw error
}

export function subscribeToTable(tableId: string, callback: (payload: any) => void) {
  return supabase
    .channel(`table-${tableId}`)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'tables',
      filter: `id=eq.${tableId}`,
    }, callback)
    .subscribe()
}

export function subscribeManager(callback: (payload: any) => void) {
  return supabase
    .channel('manager-orders')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'orders',
    }, callback)
    .subscribe()
}
