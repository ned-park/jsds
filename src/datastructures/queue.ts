import LinearBase from "../baseclasses/linearbase";

export default class Queue<T> extends LinearBase<T> {
  constructor() {
    super();
  }

  unshift(): T | undefined {
    if (!this.head) {
      return undefined;
    }

    const first = this.head;
    this.head = this.head.next;

    --this.length;

    if (this.length === 0) {
      this.tail = null;
    }

    return first.val;
  }

  dequeue(): T | undefined {
    return this.unshift();
  }

  enqueue(value: T): void {
    super.push(value);
  }

  peek(): T | undefined {
    if (!this.head) {
      return undefined;
    }

    return this.head.val;
  }
}