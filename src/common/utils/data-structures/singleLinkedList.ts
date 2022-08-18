import { OutOfBoundsException } from '../exceptions/linkedList.exceptions';

export class ListNode<T> {
  value: T[] | T;
  nextNode: ListNode<T> | null;
  constructor(value: T[] | T, next: null | ListNode<T> = null) {
    this.value = value;
    this.nextNode = next;
  }
}

export class LinkedList<T> {
  length = 1;
  private head: ListNode<T>;
  private next: ListNode<T> | null;
  private tail: ListNode<T>;
  constructor(value: ListNode<T>) {
    this.head = value;
    this.tail = this.head;
    this.next = null;
  }

  async prepend(value: T[] | T): Promise<this> {
    const newNode = new ListNode<T>(value, this.tail);
    this.head = newNode;
    this.length += 1;
    return this;
  }

  async append(value: T[] | T): Promise<this> {
    const newNode = new ListNode(value);
    this.tail.nextNode = newNode;
    this.tail = newNode;
    this.length += 1;
    return this;
  }

  async insert(value: T[] | T, index: number): Promise<this> {
    if (this.isIndexExist(index)) {
      throw new OutOfBoundsException();
    }
    if (index === 0) {
      this.prepend(value);
      return this;
    }
    if (index === this.length) {
      this.append(value);
      return this;
    }

    const newNode = new ListNode(value);
    let previousNode = this.head;
    for (let node = 0; node < index; index++) {
      previousNode = previousNode.nextNode!;
    }

    const previousNext = previousNode.nextNode;
    newNode.nextNode = previousNext;
    previousNode.nextNode = newNode;

    this.length += 1;
    return this;
  }

  async remove(index: number): Promise<this> {
    if (this.isIndexExist(index)) {
      throw new OutOfBoundsException();
    }
    if (index === 0 && this.head.nextNode !== null) {
      this.head = this.head.nextNode;
      this.length--;
      return this;
    }
    if (index === this.length - 1 && this.head?.nextNode && this.head) {
      let lastNode = this.head.nextNode;
      let secondLastNode = this.head;
      while (lastNode.nextNode !== null) {
        secondLastNode = secondLastNode.nextNode!;
        lastNode = lastNode.nextNode;
      }

      secondLastNode.nextNode = null;
      this.tail = secondLastNode;

      this.length--;
      return this;
    }

    let previousNode = this.head;
    let succeedingNode = this.head.nextNode;
    for (let node = 0; node < index - 1; index++) {
      previousNode = previousNode.nextNode!;
      succeedingNode = previousNode.nextNode;
    }
    previousNode.nextNode = succeedingNode!.nextNode;

    this.length--;
    return this;
  }

  private isIndexExist(index: number) {
    return !Number.isInteger(index) || index < 0 || index > this.length + 1;
  }

  map(value?: any) {
    const res = [];
    const val = this.head;
    for (let i = 1; i < this.length - 1; i++) {
      res.push(val);
      // val = val.nextNode;
    }
  }

  printList() {
    let currentNode = this.head;
    const list = [];
    while (currentNode !== null) {
      list.push(currentNode.value);
      currentNode = currentNode.nextNode!;
    }
    console.log(list.join(' --> '));
  }
}
