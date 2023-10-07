import Stack from "./stack";
import { ListNode } from "../types/listnode";

export default class Deque<T> extends Stack<T> {
  constructor() {
    super();
  }

  shift(): T | undefined {
    if (this.length <= 1 || !this.head) {
      return this.pop();
    }

    const tmp = this.head;
    this.head = tmp.next;
    tmp.next = null;
    this.head!.prev = null; // length >= 2 => new this.head exists

    --this.length;
    return tmp.val;
  }

  unshift(val: T) {
    if (this.length === 0 || !this.head) {
      this.push(val);
      return;
    }

    const node = {
      val: val,
      next: this.head
    } as ListNode<T>;

    this.head.prev = node;
    this.head = node;
    ++this.length;
  }

  peekHead(): T | undefined {
    if (!this.head) {
      return undefined;
    }

    return this.head.val;
  }

  peekTail(): T | undefined {
    if (!this.tail) {
      return undefined;
    }

    return this.tail.val;
  }

}