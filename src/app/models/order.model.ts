export interface Order {
  id: number;
  userId: number;
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
}
