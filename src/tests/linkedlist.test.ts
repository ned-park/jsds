import { ListNode } from "../types/listnode";
import { LinkedList } from "../index";

let list: LinkedList<number>;
describe('linked list tests', () => {
  beforeEach(() => {
    list = new LinkedList<number>();
  });

  test('New Linked List is empty', () => {
    expect(list.size()).toEqual(0);
    expect(list.size()).toEqual(0);
    expect(list.pop()).toEqual(undefined);
    expect(list.shift()).toEqual(undefined);
    expect(list.size()).toEqual(0);
  });

  test('Test push works', () => {
    expect(list.size()).toEqual(0);
    list.push(1);
    expect(list.getTailValue()).toEqual(1);
    expect(list.size()).toEqual(1);
    list.push(2);
    expect(list.getHeadValue()).toEqual(1);
    expect(list.getTailValue()).toEqual(2);
    expect(list.size()).toEqual(2);

    list.push(3);
    expect(list.getTailValue()).toEqual(3);
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
    expect(list.getHeadValue()).toEqual(undefined);
    expect(list.getTailValue()).toEqual(undefined);
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
    expect(list.getHeadValue()).toEqual(undefined);
    expect(list.getTailValue()).toEqual(undefined);
    expect(list.shift()).toEqual(undefined);
    expect(list.size()).toEqual(0);

  });

  test('Test unshift works', () => {
    expect(list.size()).toEqual(0);
    list.unshift(1);
    expect(list.getHeadValue()).toEqual(1);
    expect(list.size()).toEqual(1);
    list.unshift(2);
    expect(list.getHeadValue()).toEqual(2);
    expect(list.size()).toEqual(2);

    list.unshift(3);
    expect(list.getHeadValue()).toEqual(3);
    expect(list.size()).toEqual(3);
  });

  test('Test getHeadValue', () => {
    expect(list.getHeadValue()).toEqual(undefined);

    list.push(1);
    expect(list.getHeadValue()).toEqual(1);
    list.push(2);
    expect(list.getHeadValue()).toEqual(1);
    list.unshift(-1);

    expect(list.getHeadValue()).toEqual(-1);
    list.pop();
    expect(list.getHeadValue()).toEqual(-1);
    list.shift();
    expect(list.getHeadValue()).toEqual(1);
    list.shift();
    expect(list.getHeadValue()).toEqual(undefined);
  });

  test('Test getTailValue', () => {
    expect(list.getTailValue()).toEqual(undefined);

    list.push(1);
    expect(list.getTailValue()).toEqual(1);
    list.push(2);
    expect(list.getTailValue()).toEqual(2);
    list.unshift(-1);
    expect(list.getTailValue()).toEqual(2);
    list.pop();
    expect(list.getTailValue()).toEqual(1);
    list.pop();
    expect(list.getTailValue()).toEqual(-1);
    list.pop();
    expect(list.getTailValue()).toEqual(undefined);
  });

  test('Test toString', () => {
    expect(list.toString()).toEqual('');

    list.push(1);
    expect(list.toString()).toEqual('1');
    list.push(2);
    expect(list.toString()).toEqual([1, 2].join(' -> '));
    list.push(3);
    expect(list.toString()).toEqual([1, 2, 3].join(' -> '));
    list.shift();
    expect(list.toString()).toEqual([2, 3].join(' -> '));
    list.shift();
    expect(list.toString()).toEqual([3].join(' -> '));
    list.shift();
    expect(list.toString()).toEqual([].join(' -> '));
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
    expect(list.traverse().join(',')).toEqual([-1, 0, 1, 2, 3, 4, 5, 6, 7, 8].join(','));

    expect(() => list.insertNodeAt(null, 0)).toThrowError('Parameter node cannot be null');

  });

  test('insertAt index works correctly', () => {
    expect(() => {
      list.insertAt(-1, -1);
    }).toThrowError();

    list.insertAt(1, 0);
    expect(list.getHeadValue()).toEqual(1);

    list.insertAt(4, 1);
    expect(list.getTailValue()).toEqual(4);

    list.insertAt(2, 1);
    list.insertAt(3, 2);
    expect(list.toString()).toEqual([1, 2, 3, 4].join(' -> '));
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
    expect(list.traverse().join(',')).toEqual([].join(','));
    list.push(0);
    list.unshift(-1);
    list.insertAt(0.5, 1);
    list.push(2);
    list.push(3);
    list.unshift(-2);

    expect(() => list.removeAt(-1)).toThrowError("Index out of bounds");
    expect(() => list.removeAt(list.size())).toThrowError("Index out of bounds");


    expect(list.traverse().join(',')).toEqual([-2, -1, 0.5, 0, 2, 3].join(','));
    list.removeAt(2);
    expect(list.traverse().join(',')).toEqual([-2, -1, 0, 2, 3].join(','));
    expect(list.removeAt(0)).toBeCalled;
    expect(list.traverse().join(',')).toEqual([-1, 0, 2, 3].join(','));
    list.removeAt(list.size() - 1);
    expect(list.traverse().join(',')).toEqual([-1, 0, 2].join(','));
  });

  test('removeNode works correctly', () => {
    expect(() => list.removeNode({ val: 0, next: null } as ListNode<number>)).toThrowError('No matching node found');
    list.push(0);
    list.unshift(-1);
    list.insertAt(0.5, 1);
    list.push(2);
    list.push(3);
    list.unshift(-2);

    let node = list.getNodeAt(0);
    list.removeNode(node);
    expect(() => list.removeNode(node)).toThrowError('No matching node found');
    expect(list.traverse().join(',')).toEqual([-1, 0.5, 0, 2, 3].join(','));

    node = list.getNodeAt(list.size() - 1);
    list.removeNode(node);
    expect(() => list.removeNode(node)).toThrowError('No matching node found');
    expect(list.traverse().join(',')).toEqual([-1, 0.5, 0, 2].join(','));

    node = list.getNodeAt(2);
    list.removeNode(node);
    expect(() => list.removeNode(node)).toThrowError('No matching node found');
    expect(list.traverse().join(',')).toEqual([-1, 0.5, 2].join(','));
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
    expect(list.getHeadValue()).toEqual(0);
    list.updateAt(3, 3); // tail
    expect(list.getTailValue()).toEqual(3);
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

  test('getNodes', () => {
    list.push(0);
    list.push(1);
    list.push(2);
    list.push(3);
    list.push(4);

    const nodes = list.getNodes();
    let arr = [];
    let expected = 1;

    while (arr.length < list.size()) {
      arr.push(nodes.next());
      expected++;
    }

    arr.forEach((node, i) => expect((node.value)?.val).toEqual(i));
    expect(nodes.next().done).toEqual(true);
  });


});
