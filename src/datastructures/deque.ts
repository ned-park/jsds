import { ListNode } from "./types/listnode";

export default class Deque<T> {
  protected head: ListNode<T>;
  protected tail: ListNode<T>;
  protected length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val: T) {
    const node = { val: val } as ListNode<T>;
    if (!node) throw new Error("ListNode is null");
    if (this.length === 0 || !this.tail) {
      this.head = this.tail = node;
    } else {
      node.prev = this.tail;
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
    this.tail = this.tail.prev || null;
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }

    --this.length;
    return tmp.val;
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

  size(): number {
    return this.length;
  }

  front(): T | undefined {
    if (!this.head) {
      return undefined;
    }

    return this.head.val;
  }

  back(): T | undefined {
    if (!this.tail) {
      return undefined;
    }

    return this.tail.val;
  }

  toString(): string {
    const vals: (T|undefined)[] = [];

    let curr = this.head;
    while (curr) {
      vals.push(curr.val);
      curr = curr.next; 
    }

    return vals.join(' <-> ');
  }

}