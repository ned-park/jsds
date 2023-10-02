type Node<T> = {
  val: T,
  back?: Node<T>
}

export default class Stack<T> {
  private tail: undefined | Node<T>;
  private length: number;

  constructor() {
    this.tail = undefined;
    this.length = 0;
  }

  push(val: T) {
    const node = { val: val } as Node<T>;
    if (!this.tail) {
      this.tail = node;
    } else {
      node.back = this.tail;
      this.tail = node;
    }
    ++this.length;
  }

  pop(): T | undefined {
    if (!this.tail) {
      return undefined;
    }

    const tmp = this.tail;
    this.tail = this.tail.back;
    --this.length;

    return tmp.val;
  }

  size(): number {
    return this.length;
  }

}