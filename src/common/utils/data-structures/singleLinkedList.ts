import { OutOfBoundsException } from "../exceptions/linkedList.exceptions";

export class ListNode<T> {
  value: T[] | T;
  next: ListNode<T> | null;
  constructor(value: T[] | T, next = null) {
    this.value = value;
    this.next = next;
  }
}

export class LinkedList<T> {
  length = 1;
  head: ListNode<T>;
  next: ListNode<T> | null;
  tail: ListNode<T>;
  constructor(value: ListNode<T>) {
    this.head = value;
    this.next = null;
    this.tail = this.head;
  }

  async prepend(value: T[] | T): Promise<this> {
    const newNode = new ListNode(value, this.tail);
    this.head = newNode;
    this.length += 1;
    return this;
  }

  async append(value: T[] | T): Promise<this> {
    const newNode = new ListNode(value);
    this.tail.next = newNode;
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
      previousNode = previousNode.next;
    }

    const previousNext = previousNode.next;
    newNode.next = previousNext;
    previousNode.next = newNode;

    this.length += 1;
    return this;
  }

  async remove(index: number): Promise<this> {
    if (this.isIndexExist(index)) {
      throw new OutOfBoundsException();
    }
    if (index === 0) {
      this.head = this.head.next;
      this.length--;
      return this;
    }
    if (index === this.length - 1) {
      let lastNode = this.head.next;
      let secondLastNode = this.head;
      while (lastNode.next !== null) {
        secondLastNode = secondLastNode.next;
        lastNode.next;
      }
      secondLastNode.next = null;
      this.tail = secondLastNode;

      this.length--;
      return this;
    }

    let previousNode = this.head;
    let nextNode = this.head.next;
    for (let node = 0; node < index - 1; index++) {
      previousNode = previousNode.next;
      nextNode = previousNode.next;
    }
    previousNode.next = nextNode.next;

    this.length--;
    return this;
  }

  private isIndexExist(index: number) {
    return !Number.isInteger(index) || index < 0 || index > this.length + 1;
  }
}
