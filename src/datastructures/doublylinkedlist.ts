import Deque from "./deque";
import { ListNode } from "../types/listnode";

export default class DoublyLinkedList<T> extends Deque<T> {
  constructor() {
    super();
  }

  insertAt(val: T, index: number) {
    this.insertNodeAt({ val: val } as ListNode<T>, index);
  }

  insertNodeAt(node: ListNode<T>, index: number) {
    if (index > this.size() || index < 0) {
      throw new Error(`index: ${index} out of bounds`);
    } else if (!node) {
      throw new Error("Parameter node cannot be null");
    }

    if (index === 0) {
      node.next = this.head;
      if (this.head) {
        this.head.prev = node;
      }
      this.head = node;
      if (!this.tail) {
        this.tail = this.head;
      }
      ++this.length;
      return;
    } else if (index === this.size()) {
      this.tail!.next = node; // since this.size() != 0, tail exists
      node.prev = this.tail;
      this.tail = node;
      ++this.length;
      return;
    }

    let curr: ListNode<T> = this.head;
    while (index-- > 0) {
      curr = curr!.next;
    }

    console.log(curr!.val)
    node.next = curr;
    node.prev = curr!.prev;

    node.prev!.next = node;
    node.next!.prev = node; // since insertion isn't at this tail, node.next always exists

    ++this.length;
  }

  removeAt(index: number): T | undefined {
    if (index >= this.size() || index < 0 || !this.head) {
      throw new Error("Index out of bounds");
    }

    if (index === 0) {
      return this.shift();
    } else if (index === this.size() - 1) {
      return this.pop();
    }

    let curr:ListNode<T> = this.head;
    while (--index > 0) {
      curr = curr!.next;
    }

    --this.length;

    curr!.next!.prev = curr!.prev;
    curr!.prev!.next = curr!.next;
    curr!.next = null;
    curr!.prev = null;

    return curr!.val;
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

  traverseBackwards(): Array<T> {
    const vals: T[] = [];
    let curr = this.tail;
    while (curr) {
      vals.push(curr.val);
      curr = curr.prev || null;
    }

    return vals;
  }

  *getNodes(node = this.head) {
    while (node) {
      yield node;
      node = node.next;
    }

  }

  *getNodesInReverse(node = this.tail) {
    while (node) {
      yield node;
      node = node.prev || null;
    }
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

  updateAt(val: T, index: number) {
    if (index >= this.size() || index < 0 || !this.head || !this.tail) {
      throw new Error("Index out of bounds");
    }

    if (index === 0) {
      this.head.val = val;
      return;
    } else if (index === this.size() - 1) {
      this.tail.val = val;
      return;
    }

    let curr = this.head;
    while (index-- > 0 && curr.next) {
      curr = curr!.next;
    }

    curr.val = val;
  }

  getValueAt(index: number) {
    if (index >= this.size() || index < 0 || !this.head || !this.tail) {
      throw new Error("Index out of bounds");
    }

    let curr = this.head;
    while (index-- > 0 && curr.next) {
      curr = curr!.next;
    }
    return curr.val;
  }

}

