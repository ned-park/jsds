import { ListNode } from "src/types/listnode";

export default abstract class LinearBase<T> {
  protected head: ListNode<T>;
  protected tail: ListNode<T>;
  protected length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  size(): number {
    return this.length;
  }

  toString(separator: string=',') {
    let values: T[] = [];
    let curr = this.head;
    while (curr) {
      values.push(curr.val);
      curr = curr.next;
    }
    return values.join(separator);
  }

  push(val: T) {
    ++this.length;

    const newTail = {
      val: val,
      next: null
    } as ListNode<T>;

    if (!this.tail) {
      this.head = this.tail = newTail;
      return;
    }

    this.tail.next = newTail;
    this.tail = newTail;
  }

  }