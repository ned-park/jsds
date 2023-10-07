import LinearBase from "../baseclasses/linearbase";
import { ListNode } from "../types/listnode";

export default class Stack<T> extends LinearBase<T> {
  constructor() {
    super();
  }

  push(val: T) {
    const node = {
      val: val,
      next: null, prev: this.tail
    } as ListNode<T>;

    if (!this.tail) {
      this.tail = node;
      this.head = node;
    } else {
      node!.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    ++this.length;
  }

  pop(): T | undefined {
    if (!this.tail) {
      return undefined;
    }

    const tmp = this.tail;
    this.tail = this.tail!.prev || null;
    if (this.tail) {
      this.tail.next = null;
    }
    --this.length;
    if (this.length === 0) {
      this.head = null;
    }

    return tmp.val;
  }

  peek(): T | undefined {
    if (!this.tail) {
      return undefined;
    }

    return this.tail.val;
  }

}