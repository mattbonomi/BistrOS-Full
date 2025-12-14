export type Table = {
  id: string
  status: string
  cart: any
  waiter_requested: boolean
  bill_requested: boolean
}

export type Order = {
  id: string
  table_id: string
  items: any
  state: string
  total: number
}
