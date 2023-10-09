import { ListNode } from "../types/listnode";

export default class LinkedList<T> {
  head: ListNode<T>;
  tail: ListNode<T>
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  unshift(val: T) {
    ++this.length;

    const newHead = {
      val: val,
      next: this.head
    } as ListNode<T>;

    if (!this.tail) {
      this.head = this.tail = newHead;
      return;
    }

    this.head = newHead;
  }

  shift(): T | undefined {
    if (!this.head) {
      return undefined;
    }

    --this.length;

    const tmp = this.head;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
      return tmp. val;  
    }

    this.head = tmp.next;
    tmp.next = null;

    return tmp.val;
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

  pop(): T | undefined {
    if (!this.tail) {
      return undefined;
    }

    --this.length;
    const tmp = this.tail;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
      return tmp.val;
    }

    let curr = this.head;
    while (curr && curr.next != this.tail) {
      curr = curr.next;
    }

    curr!.next = null;
    this.tail = curr;
    return tmp.val;
  }

  size(): number {
    return this.length;
  }

  toString(): string {
    const vals: T[] = [];

    let curr = this.head;
    while (curr) {
      vals.push(curr.val);
      curr = curr.next;
    }

    return vals.join(',');
  }

  *[Symbol.iterator]() {
    let node = this.head;

    while (node) {
      yield node;
      node = node.next;
    }
  }

  forEach(f: Function) {
    let curr = this.head;
    while (curr) {
      return f(curr);
    }
  }

  *getNodes(node = this.head) {
    while (node) {
      yield node;
      node = node.next;
    }
  }

  insertAt(val: T, index: number) {
    this.insertNodeAt({val: val, next: null} as ListNode<T>, index);
  }

  removeAt(index: number): T | undefined {
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds.');
    }

    if (index === 0) {
      return this.shift();
    } else if (index === this.length - 1) {
      return this.pop();
    }

    let curr = this.head;
    while (--index > 0) {
      curr = curr!.next;
    }

    // curr.next exists since index is valid and curr isn't the tail
    const tmp = curr!.next;
    curr!.next = curr!.next!.next;

    --this.length;
    return tmp!.val;
  }

  removeNode(node: ListNode<T>) {
    const throwError = () => { throw new Error('No matching node found') };
    if (!this.head) {
      throwError();
    }

    if (node == this.head) {
      this.shift();
      return;
    } else if (node == this.tail) {
      this.pop();
      return;
    }

    let curr = this.head;
    while (curr && curr.next !== node) {
      curr = curr!.next;
    }

    if (!curr) {
      throwError();
    }

    // since curr exists and is not the tail, curr.next exists
    curr!.next = curr!.next!.next;
    --this.length;
  }

  insertNodeAt(node: ListNode<T>, index: number) {
    if (index < 0 || index > this.length) {
      throw new Error('Index out of bounds.');
    } else if (!node) {
      throw new Error('Parameter node cannot be null');
    }

    ++this.length;

    if (index === 0) {
      node.next = this.head;
      this.head = this.tail = node;
      return;
    }

    if (index === this.length - 1) {
      // either index is 0, so this isn't reached, or a tail exists
      this.tail!.next = node; 
      this.tail = node;
      return;
    }

    let curr: ListNode<T> = this.head;
    while (--index > 0) {
      curr = curr!.next;
    }

    node.next = curr!.next;
    curr!.next = node;
  }

  getValueAt(index: number): T {
    const node = this.getNodeAt(index);
    return node!.val;
  }

  getNodeAt(index: number): ListNode<T> {
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds.');
    }

    let curr = this.head;
    while (index-- > 0) {
      curr = curr!.next;
    }

    return curr;
  }

  updateAt(val: T, index: number) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds.');
    }

    let curr = this.head;
    while (index-- > 0) {
      curr = curr!.next;
    }

    curr!.val = val;
  }

  peekTail(): T | undefined {
    if (!this.tail) {
      return undefined;
    }

    return this.tail.val;
  }

  peekHead(): T | undefined {
    if (!this.head) {
      return undefined;
    }

    return this.head.val;
  }

  traverse(): Array<T> {
    const vals: T[] = [];
    if (!this.head) {
      return vals;
    }
    let curr: ListNode<T> | undefined = this.head;
    while (curr) {
      vals.push(curr.val);
      curr = curr.next;
    }

    return vals;
  }

}