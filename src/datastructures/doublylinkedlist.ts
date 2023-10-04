import Deque from "./deque";
import type { Node } from "./deque";

export default class DoublyLinkedList<T> extends Deque<T> {
  constructor() {
    super();
  }

  insertAt(val: T, index: number) {
    this.insertNodeAt({ val: val } as Node<T>, index);
  }

  insertNodeAt(node: Node<T>, index: number) {
    if (index > this.size() || index < 0) {
      throw new Error(`index: ${index} out of bounds`);
    }

    if (index == 0) {
      node.fwd = this.head;
      if (this.head) {
        this.head.rev = node;
      }
      this.head = node;
      if (!this.tail) {
        this.tail = this.head;
      }
      ++this.length;
      return;
    } else if (index === this.size()) {
      this.tail!.fwd = node; // since this.size() != 0, tail exists
      node.rev = this.tail;
      this.tail = node;
      ++this.length;
      return;
    }

    let curr = this.head;
    while (--index > 0) {
      curr = curr!.fwd;
    }

    node.fwd = curr!.fwd;
    node.rev = curr;

    curr!.fwd = node;
    node.fwd!.rev = node; // since insertion isn't at thistail, node.fwd always exists

    ++this.length;
  }

  removeAt(index: number): T | undefined {
    if (index >= this.size() || index < 0) {
      throw new Error("Index out of bounds");
    }

    if (index === 0) {
      return this.shift();
    } else if (index === this.size() - 1) {
      return this.pop();
    }

    let curr = this.head;
    while (--index > 0) {
      curr = curr!.fwd;
    }

    --this.length;

    curr!.fwd!.rev = curr!.rev;
    curr!.rev!.fwd = curr!.fwd;
    curr!.fwd = undefined;
    curr!.rev = undefined;

    return curr!.val;
  }

  traverse(): Array<T> {
    const vals: T[] = [];
    if (!this.head) {
      return vals;
    }
    let curr: Node<T> | undefined = this.head;
    while (curr) {
      vals.push(curr.val);
      curr = curr.fwd;
    }

    return vals;
  }

  traverseBackwards(): Array<T> {
    const vals: T[] = [];
    let curr = this.tail;
    while (curr) {
      vals.push(curr.val);
      curr = curr.rev;
    }

    return vals;
  }

  *getNodes(node = this.head) {
    while (node) {
      yield node;
      node = node.fwd;
    }

  }

  *getNodesInReverse(node = this.tail) {
    while (node) {
      yield node;
      node = node.rev;
    }
  }

  *[Symbol.iterator]() {
    let node = this.head;

    while (node) {
      yield node;
      node = node.fwd;
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
    while (index-- > 0 && curr.fwd) {
      curr = curr!.fwd;
    }

    curr.val = val;
  }

  getValueAt(index: number) {
    if (index >= this.size() || index < 0 || !this.head || !this.tail) {
      throw new Error("Index out of bounds");
    }

    let curr = this.head;
    while (index-- > 0 && curr.fwd) {
      curr = curr!.fwd;
    }
    return curr.val;
  }

}

