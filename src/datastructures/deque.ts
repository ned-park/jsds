type Node<T> = {
  val: T | undefined,
  fwd?: Node<T>,
  rev?: Node<T>
}

export default class Deque<T> {
  protected head?: Node<T>;
  protected tail?: Node<T>;
  protected length: number;

  constructor() {
    this.head = undefined;
    this.tail = undefined;
    this.length = 0;
  }

  push(val: T) {
    const node = { val: val } as Node<T>;
    if (this.length === 0 || !this.tail) {
      this.head = this.tail = node;
    } else {
      node.rev = this.tail;
      this.tail.fwd = node;
      this.tail = node;
    }

    ++this.length;
  }

  pop(): T | undefined {
    if (!this.tail) {
      return undefined;
    }

    const tmp = this.tail;
    this.tail = this.tail.rev;
    if (this.tail) {
      this.tail.fwd = undefined;
    } else {
      this.head = undefined;
    }

    --this.length;
    return tmp.val;
  }

  shift(): T | undefined {
    if (this.length <= 1 || !this.head) {
      return this.pop();
    }

    const tmp = this.head;
    this.head = tmp.fwd;
    tmp.fwd = undefined;
    if (this.head) {
      this.head.rev = undefined;
    }

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
      fwd: this.head
    } as Node<T>;

    this.head.rev = node;
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
      curr = curr.fwd; 
    }

    return vals.join(' <-> ');
  }

}