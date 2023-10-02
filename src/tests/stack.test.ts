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

});
