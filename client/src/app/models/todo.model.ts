export interface Todo {
  id: number;
  title: string;
  completed: 0 | 1;
  user_id: string;
  created_at: string;
  
  isCompleted?: boolean; // optional computed field
}