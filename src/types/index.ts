export type Table = {
  id: string
  status: string | null
  cart: any[] | null
  waiter_requested: boolean
  bill_requested: boolean
}

export type Order = {
  id: string
  table_id: string
  items: { name: string; price: number }[]
  state: string
  total: number
  created_at?: string
}
