import { Stack } from "../index"

describe('Stacktests', () => {
  test('Created Stack is empty', () => {
    const stack = new Stack<number>();
    expect(stack.size()).toEqual(0);
    expect(stack.pop()).toEqual(undefined);
    expect(stack.size()).toEqual(0);
  });

  test('Enqueuing works and size correct', () => {
    const stack = new Stack<number>();
    stack.push(1);
    expect(stack.size()).toEqual(1);
    stack.push(2);
    stack.push(3);
    expect(stack.size()).toEqual(3);
  });

  test('Enqueuing and Dequeuing work with correct values and queue size', () => {
    const stack = new Stack<number>();

    expect(stack.size()).toEqual(0);
    expect(stack.pop()).toEqual(undefined);

    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.size()).toEqual(3);
    expect(stack.pop()).toEqual(3);
    expect(stack.size()).toEqual(2);

    stack.push(4);
    expect(stack.size()).toEqual(3);

    expect(stack.pop()).toEqual(4);
    expect(stack.size()).toEqual(2);

    expect(stack.pop()).toEqual(2);
    expect(stack.size()).toEqual(1);

    expect(stack.pop()).toEqual(1);
    expect(stack.size()).toEqual(0);

    stack.push(10);
    expect(stack.size()).toEqual(1);

    expect(stack.pop()).toEqual(10);
  });

  test('peek works as expected', () => {
    const stack = new Stack<number>();
    expect(stack.peek()).toEqual(undefined);
    stack.push(1);
    expect(stack.peek()).toEqual(1);
    stack.push(2);
    stack.push(3);
    expect(stack.peek()).toEqual(3);
    stack.pop();
    expect(stack.peek()).toEqual(2);
    stack.pop();
    stack.push(3);
    expect(stack.peek()).toEqual(3);
    stack.pop();
    expect(stack.peek()).toEqual(1);
    stack.pop();
    expect(stack.peek()).toEqual(undefined);
  });

  test('toString works as expected', () => {
    const stack = new Stack<number>();
    expect(stack.toString()).toEqual("");
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.toString()).toEqual([1, 2, 3].join(','));
    stack.pop();
    expect(stack.toString()).toEqual([1, 2].join(','));
    stack.pop();
    expect(stack.toString()).toEqual([1].join(','));
    stack.pop();
    expect(stack.toString()).toEqual("");
  });


});
