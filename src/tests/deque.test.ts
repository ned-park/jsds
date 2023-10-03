import { Deque } from "../index";

describe('Deque tests', () => {
  test('Created Deque is empty', () => {
    const deque = new Deque<number>();
    expect(deque.size()).toEqual(0);
    expect(deque.pop()).toEqual(undefined);
    expect(deque.shift()).toEqual(undefined);
    expect(deque.size()).toEqual(0);
  });

  test('Test push works', () => {
    const deque = new Deque<number>();
    expect(deque.size()).toEqual(0);
    deque.push(1);
    expect(deque.back()).toEqual(1);
    expect(deque.size()).toEqual(1);
    deque.push(2);
    expect(deque.back()).toEqual(2);
    expect(deque.size()).toEqual(2);

    deque.push(3);
    expect(deque.back()).toEqual(3);
    expect(deque.size()).toEqual(3);
  });

  test('Test pop works', () => {
    const deque = new Deque<number>();
    expect(deque.pop()).toEqual(undefined);
    deque.push(1);
    expect(deque.pop()).toEqual(1);
    deque.push(2);
    deque.push(1);
    expect(deque.pop()).toEqual(1);
    deque.push(3);
    expect(deque.pop()).toEqual(3);
    expect(deque.pop()).toEqual(2);
    expect(deque.size()).toEqual(0);
    expect(deque.front()).toEqual(undefined);
    expect(deque.back()).toEqual(undefined);
    expect(deque.pop()).toEqual(undefined);
    expect(deque.size()).toEqual(0);
  });

  test('Test shift works', () => {
    const deque = new Deque<number>();
    expect(deque.shift()).toEqual(undefined);
    deque.push(1);
    expect(deque.shift()).toEqual(1);
    deque.push(2);
    deque.push(1);
    expect(deque.shift()).toEqual(2);
    deque.unshift(3);
    expect(deque.shift()).toEqual(3);
    expect(deque.shift()).toEqual(1);
    expect(deque.size()).toEqual(0);
    expect(deque.front()).toEqual(undefined);
    expect(deque.back()).toEqual(undefined);
    expect(deque.shift()).toEqual(undefined);
    expect(deque.size()).toEqual(0);

  });

  test('Test unshift works', () => {
    const deque = new Deque<number>();
    expect(deque.size()).toEqual(0);
    deque.unshift(1);
    expect(deque.front()).toEqual(1);
    expect(deque.size()).toEqual(1);
    deque.unshift(2);
    expect(deque.front()).toEqual(2);
    expect(deque.size()).toEqual(2);

    deque.unshift(3);
    expect(deque.front()).toEqual(3);
    expect(deque.size()).toEqual(3);
  });

  test('Test front', () => {
    const deque = new Deque<number>();
    expect(deque.front()).toEqual(undefined);

    deque.push(1);
    expect(deque.front()).toEqual(1);
    deque.push(2);
    expect(deque.front()).toEqual(1);
    deque.unshift(-1);

    expect(deque.front()).toEqual(-1);
    deque.pop();
    expect(deque.front()).toEqual(-1);
    deque.shift();
    expect(deque.front()).toEqual(1);
    deque.shift();
    expect(deque.front()).toEqual(undefined);
  });

  test('Test back', () => {
    const deque = new Deque<number>();
    expect(deque.back()).toEqual(undefined);

    deque.push(1);
    expect(deque.back()).toEqual(1);
    deque.push(2);
    expect(deque.back()).toEqual(2);
    deque.unshift(-1);
    expect(deque.back()).toEqual(2);
    deque.pop();
    expect(deque.back()).toEqual(1);
    deque.pop();
    expect(deque.back()).toEqual(-1);
    deque.pop();
    expect(deque.back()).toEqual(undefined);
  });

  test('Test toString', () => {
    const deque = new Deque<number>();
    expect(deque.toString()).toEqual('');

    deque.push(1);
    expect(deque.toString()).toEqual('1');
    deque.push(2);
    expect(deque.toString()).toEqual([1, 2].join(' <-> '));
    deque.push(3);
    expect(deque.toString()).toEqual([1, 2, 3].join(' <-> '));
    deque.shift();
    expect(deque.toString()).toEqual([2, 3].join(' <-> '));
    deque.shift();
    expect(deque.toString()).toEqual([3].join(' <-> '));
    deque.shift();
    expect(deque.toString()).toEqual([].join(' <-> '));
    deque.shift();
  });

  test('Test size', () => {
    const deque = new Deque<number>();
    expect(deque.size()).toEqual(0);
    deque.push(5);
    expect(deque.size()).toEqual(1);

    deque.pop();
    expect(deque.size()).toEqual(0);
    deque.shift();
    expect(deque.size()).toEqual(0);
    
    deque.push(5);
    deque.unshift(7);
    expect(deque.size()).toEqual(2);
    
    for (let i = 0; i < 10; i++) {
      deque.push(i);
      expect(deque.size()).toEqual(i+3);
    }
    
    for (let i = deque.size()-1; i >= 0; i--) {
      deque.pop();
      expect(deque.size()).toEqual(i);
    }
    deque.pop();
    expect(deque.size()).toEqual(0);
  });

});
