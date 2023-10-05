export type ListNode<T> = null | {
  val: T,
  next: ListNode<T>,
  prev?: ListNode<T>
}