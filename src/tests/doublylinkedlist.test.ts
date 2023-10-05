import { DoublyLinkedList } from "../index";
import { ListNode } from "src/datastructures/types/listnode";

// Since these are already covered by Deque tests, they aren't necessary.
// Although, in the event that the implementation stop inheriting from 
// Deque, it seems wise to keep them here.  
// 
// TODO: Generalize these to take in an instance of a data structure and 
// then import and run as shared common tests.  
let list: DoublyLinkedList<number>;
describe('DoublyLinkedList tests based on inheritance from Deque', () => {
  beforeEach(() => {
    list = new DoublyLinkedList<number>();
  });

  test('Created DoublyLinkedList is empty', () => {
    expect(list.size()).toEqual(0);
    expect(list.pop()).toEqual(undefined);
    expect(list.shift()).toEqual(undefined);
    expect(list.size()).toEqual(0);
  });

  test('Test push works', () => {
    expect(list.size()).toEqual(0);
    list.push(1);
    expect(list.back()).toEqual(1);
    expect(list.size()).toEqual(1);
    list.push(2);
    expect(list.back()).toEqual(2);
    expect(list.size()).toEqual(2);

    list.push(3);
    expect(list.back()).toEqual(3);
    expect(list.size()).toEqual(3);
  });

  test('Test pop works', () => {
    expect(list.pop()).toEqual(undefined);
    list.push(1);
    expect(list.pop()).toEqual(1);
    list.push(2);
    list.push(1);
    expect(list.pop()).toEqual(1);
    list.push(3);
    expect(list.pop()).toEqual(3);
    expect(list.pop()).toEqual(2);
    expect(list.size()).toEqual(0);
    expect(list.front()).toEqual(undefined);
    expect(list.back()).toEqual(undefined);
    expect(list.pop()).toEqual(undefined);
    expect(list.size()).toEqual(0);
  });

  test('Test shift works', () => {
    expect(list.shift()).toEqual(undefined);
    list.push(1);
    expect(list.shift()).toEqual(1);
    list.push(2);
    list.push(1);
    expect(list.shift()).toEqual(2);
    list.unshift(3);
    expect(list.shift()).toEqual(3);
    expect(list.shift()).toEqual(1);
    expect(list.size()).toEqual(0);
    expect(list.front()).toEqual(undefined);
    expect(list.back()).toEqual(undefined);
    expect(list.shift()).toEqual(undefined);
    expect(list.size()).toEqual(0);

  });

  test('Test unshift works', () => {
    expect(list.size()).toEqual(0);
    list.unshift(1);
    expect(list.front()).toEqual(1);
    expect(list.size()).toEqual(1);
    list.unshift(2);
    expect(list.front()).toEqual(2);
    expect(list.size()).toEqual(2);

    list.unshift(3);
    expect(list.front()).toEqual(3);
    expect(list.size()).toEqual(3);
  });

  test('Test front', () => {
    expect(list.front()).toEqual(undefined);

    list.push(1);
    expect(list.front()).toEqual(1);
    list.push(2);
    expect(list.front()).toEqual(1);
    list.unshift(-1);

    expect(list.front()).toEqual(-1);
    list.pop();
    expect(list.front()).toEqual(-1);
    list.shift();
    expect(list.front()).toEqual(1);
    list.shift();
    expect(list.front()).toEqual(undefined);
  });

  test('Test back', () => {
    expect(list.back()).toEqual(undefined);

    list.push(1);
    expect(list.back()).toEqual(1);
    list.push(2);
    expect(list.back()).toEqual(2);
    list.unshift(-1);
    expect(list.back()).toEqual(2);
    list.pop();
    expect(list.back()).toEqual(1);
    list.pop();
    expect(list.back()).toEqual(-1);
    list.pop();
    expect(list.back()).toEqual(undefined);
  });

  test('Test toString', () => {
    expect(list.toString()).toEqual('');

    list.push(1);
    expect(list.toString()).toEqual('1');
    list.push(2);
    expect(list.toString()).toEqual([1, 2].join(' <-> '));
    list.push(3);
    expect(list.toString()).toEqual([1, 2, 3].join(' <-> '));
    list.shift();
    expect(list.toString()).toEqual([2, 3].join(' <-> '));
    list.shift();
    expect(list.toString()).toEqual([3].join(' <-> '));
    list.shift();
    expect(list.toString()).toEqual([].join(' <-> '));
    list.shift();
  });

  test('Test size', () => {
    expect(list.size()).toEqual(0);
    list.push(5);
    expect(list.size()).toEqual(1);

    list.pop();
    expect(list.size()).toEqual(0);
    list.shift();
    expect(list.size()).toEqual(0);

    list.push(5);
    list.unshift(7);
    expect(list.size()).toEqual(2);

    for (let i = 0; i < 10; i++) {
      list.push(i);
      expect(list.size()).toEqual(i + 3);
    }

    for (let i = list.size() - 1; i >= 0; i--) {
      list.pop();
      expect(list.size()).toEqual(i);
    }
    list.pop();
    expect(list.size()).toEqual(0);
  });

});

describe('DoublyLinkedList tests for non-inherited methods', () => {
  beforeEach(() => {
    list = new DoublyLinkedList<number>();
  });
  test('insertNodeAt index works correctly', () => {
    const mod = 3;
    let nodes: ListNode<number>[] = [];
    let offset = 0;
    for (let i = 0; i < mod * mod; i++) {
      if (i > 0 && i % mod == 0) {
        offset--;
        continue;
      }
      nodes[i] = { val: i } as ListNode<number>;
      list.insertNodeAt(nodes[i], i + offset);
    }

    for (let i = mod; i < list.size(); i += mod) {
      nodes[i] = { val: i } as ListNode<number>;
      list.insertNodeAt(nodes[i], i);
    }

    nodes.unshift({ val: -1 } as ListNode<number>);
    list.insertNodeAt(nodes[0], 0);

    const arr = [...list];
    expect(arr.every((n, i) => n == nodes[i])).toEqual(true);
    expect(list.traverse().join(',')).toEqual(list.traverseBackwards().reverse().join(','));
  });

  test('insertAt index works correctly', () => {
    expect(() => {
      list.insertAt(-1, -1);
    }).toThrowError();

    list.insertAt(1, 0);
    expect(list.front()).toEqual(1);

    list.insertAt(4, 1);
    expect(list.back()).toEqual(4);

    list.insertAt(2, 1);
    list.insertAt(3, 2);
    expect(list.toString()).toEqual([1, 2, 3, 4].join(' <-> '));
  })

  test('getValueAt index works correctly', () => {
    expect(() => {
      list.getValueAt(0);
    }).toThrowError();

    list.push(1);
    list.push(2);
    list.push(3);
    list.push(4);

    expect(list.getValueAt(0)).toEqual(1);
    expect(list.getValueAt(2)).toEqual(3);
    expect(list.getValueAt(3)).toEqual(4);
  })

  test('removeAt index works correctly', () => {
    expect(list.traverse().join(',')).toEqual(list.traverseBackwards().reverse().join(','));
    list.push(0);
    list.unshift(-1);
    list.insertAt(0.5, 1);
    list.push(2);
    list.push(3);
    list.unshift(-2);
    expect(() => list.removeAt(-1)).toThrowError("Index out of bounds");
    expect(() => list.removeAt(list.size())).toThrowError("Index out of bounds");
    expect(list.traverse().join(',')).toEqual(list.traverseBackwards().reverse().join(','));
    //-2, -1, 0, 0.5, 2, 3
    list.removeAt(3);
    //-2, -1, 0, 2, 3
    expect(list.traverse().join(',')).toEqual(list.traverseBackwards().reverse().join(','));
    list.removeAt(0);
    expect(list.traverse().join(',')).toEqual(list.traverseBackwards().reverse().join(','));
    list.removeAt(list.size() - 1);
    expect(list.traverse().join(',')).toEqual(list.traverseBackwards().reverse().join(','));
  });

  test('updateAt index works correctly', () => {
    expect(() => {
      list.updateAt(-1, 0);
    }).toThrowError("Index out of bounds");
    list.push(1);
    list.push(1);
    list.push(1);
    list.push(1);

    list.updateAt(0, 0); // head
    expect(list.front()).toEqual(0);
    list.updateAt(3, 3); // tail
    expect(list.back()).toEqual(3);
    list.updateAt(2, 2); // between nodes
    expect(list.getValueAt(2)).toEqual(2);

    expect(() => {
      list.updateAt(-1, -1);
    }).toThrowError("Index out of bounds");

    expect(() => {
      list.updateAt(-1, list.size());
    }).toThrowError("Index out of bounds");

  });

  test('forEach works', () => {
    list.push(1);
    list.push(2);
    list.push(3);
    list.push(4);
    let expectedValue = 1;
    list.forEach((node: ListNode<number>) => {
      if (!node) throw new Error("Unexpected null node")
      expect(node.val).toEqual(expectedValue);
      expectedValue++;
    });

  });

  test('traverse traverseBackwards are consistent with each other', () => {
    expect(list.traverse().join(',')).toEqual(list.traverseBackwards().reverse().join(','));
    list.push(0);
    list.unshift(-1);
    list.insertAt(0.5, 1);
    list.push(2);
    list.push(3);
    list.unshift(-2);
    expect(list.traverse().join(',')).toEqual(list.traverseBackwards().reverse().join(','));
    //-2, -1, 0, 0.5, 2, 3
    list.removeAt(3);
    //-2, -1, 0, 2, 3
    expect(list.traverse().join(',')).toEqual(list.traverseBackwards().reverse().join(','));
    list.removeAt(0);
    expect(list.traverse().join(',')).toEqual(list.traverseBackwards().reverse().join(','));
    list.removeAt(list.size() - 1);
    expect(list.traverse().join(',')).toEqual(list.traverseBackwards().reverse().join(','));
  });

  test('iterator', () => {
    let nodes: ListNode<number>[] = [];
    for (let i = 0; i < 100; i++) {
      nodes[i] = { val: i } as ListNode<number>;
      list.insertNodeAt(nodes[i], i);
    }

    const arr = [...list];
    expect(arr.every((n, i) => n == nodes[i])).toEqual(true);
    expect(list.traverse().join(',')).toEqual(list.traverseBackwards().reverse().join(','));

  });

  test('getNodes and getNodeInReverse both work and are consistent', () => {
    const arr = [];
    const rra = [];
    list.push(1);
    list.push(2);
    list.push(3);
    list.push(4);
    list.push(5);
    
    const forwardNodes = list.getNodes();
    const backwardNodes = list.getNodesInReverse();

    while (arr.length < list.size()) {
      arr.push(forwardNodes.next());
      rra.push(backwardNodes.next());
    }
    
    expect(arr.length).toEqual(rra.length);
    for (let i = 0; i < arr.length; i++) {
      expect(arr[i]).toEqual(rra[rra.length - 1 - i]);
    }

    list.removeAt(3);

  });

});
