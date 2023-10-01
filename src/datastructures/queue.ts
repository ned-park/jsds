type Node<T> = {
  val: T,
  next?: Node<T>
}

export default class Queue<T> {
  private start?: Node<T>;
  private end?: Node<T>;
  private length: number;

  constructor() {
    this.start = undefined;
    this.end = undefined;
    this.length = 0;
  }

  dequeue(): T | undefined {
    if (!this.start) {
      return undefined;
    }

    const first = this.start;
    this.start = this.start.next;

    --this.length;

    if (this.length === 0) {
      this.end = undefined;
    }

    return first.val;
  }

  enqueue(value: T): void {
    const node = { val: value } as Node<T>;
    if (this.length === 0 || !this.end) {
      this.start = this.end = node;
    } else {
      this.end.next = node;
      this.end = node;
    }

    ++this.length;
  }

  peek(): T | undefined {
    if (!this.start) {
      return undefined;
    }

    return this.start.val;
  }

  size(): number {
    return this.length;
  }

  toString(): string {
    let values: T[] = [];
    let curr = this.start;
    while (curr) {
      values.push(curr.val);
      curr = curr.next;
    }

    return values.join(' -> ');
  }

}