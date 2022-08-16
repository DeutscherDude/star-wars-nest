import { exceptionMessages } from '../enums/exceptionsMessages.enum';

export class LinkedListException extends Error {
  constructor(message?: string) {
    super(message ? message : exceptionMessages.DEFAULT);
  }
}

export class OutOfBoundsException extends Error {
  constructor(message?: string) {
    super(message ? message : exceptionMessages.OUT_OF_BOUNDS);
  }
}
