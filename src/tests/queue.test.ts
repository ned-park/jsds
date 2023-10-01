import { Queue } from "../index"

describe('Queue tests', () => {
  test('Created Queue is empty', () => {
    const q = new Queue<number>();
    expect(q.size()).toEqual(0);
    expect(q.dequeue()).toEqual(undefined);
    expect(q.size()).toEqual(0);
  });

  test('Enqueuing works and size correct', () => {
    const q = new Queue<number>();
    q.enqueue(1);
    expect(q.size()).toEqual(1);
    q.enqueue(2);
    q.enqueue(3);
    expect(q.size()).toEqual(3);
  });

  test('Enqueuing and Dequeuing work with correct values and queue size', () => {
    const q = new Queue<number>();

    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);

    expect(q.size()).toEqual(3);
    expect(q.dequeue()).toEqual(1);
    expect(q.size()).toEqual(2);

    q.enqueue(4);
    expect(q.size()).toEqual(3);

    expect(q.dequeue()).toEqual(2);
    expect(q.size()).toEqual(2);

    expect(q.dequeue()).toEqual(3);
    expect(q.size()).toEqual(1);

    expect(q.dequeue()).toEqual(4);
    expect(q.size()).toEqual(0);

    q.enqueue(10);
    expect(q.size()).toEqual(1);

    expect(q.dequeue()).toEqual(10);
  });

  test('Peek works as expected', () => {
    const q = new Queue<number>();
    expect(q.peek()).toEqual(undefined);
    q.enqueue(1);
    expect(q.peek()).toEqual(1);
    q.enqueue(2);
    q.enqueue(3);
    expect(q.peek()).toEqual(1);
    q.dequeue();
    q.dequeue();
    expect(q.peek()).toEqual(3);
    q.dequeue();
    expect(q.peek()).toEqual(undefined);
    q.enqueue(10);
    expect(q.peek()).toEqual(10);
    q.dequeue();
    expect(q.peek()).toEqual(undefined);
  });

  test('toString works as expected', () => {
    class Point {
      private x: number;
      private y: number;
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
      }

      toString(): string {
        return `(${this.x}, ${this.y})`
      }
    }
    const points = new Array();
    for (let i = 0; i < 10; i++) {
      points[i] = new Point(i, i);
    }

    const q = new Queue<Point>();
    expect(q.toString()).toEqual("");

    points.forEach(point => q.enqueue(point));
    expect(q.toString() == points.join(" -> "));
  })
});
