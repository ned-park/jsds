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

  peek(): T | undefined {
    if (!this.tail) {
      return undefined;
    }

    return this.tail.val;
  }

  size(): number {
    return this.length;
  }

  toString(): string {
    let vals: T[] = new Array(this.size());
    let curr = this.tail;
    for (let i = vals.length-1; i >= 0 && curr; i--) {
      vals[i] = curr.val;
      curr = curr.back;
    }

    return vals.join(' <- ');
  }

}