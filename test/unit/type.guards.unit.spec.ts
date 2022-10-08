import { isEmptyObject, isNull, isUndefined } from '@common/utils/type.guards';
import { isArray } from 'class-validator';

describe('Type guards', () => {
  describe('isUndefined', () => {
    describe('given an undefined value', () => {
      it('should return true', () => {
        const res = isUndefined(undefined);
        expect(res).toBe(true);
      });
    });
    describe('given a defined value', () => {
      it('should return false', () => {
        const res = isUndefined(1);
        expect(res).toBe(false);
      });
    });
    describe('given null', () => {
      it('should return false', () => {
        const res = isUndefined(null);
        expect(res).toBe(false);
      });
    });
  });

  describe('isNull', () => {
    describe('given an undefined value', () => {
      it('should return false', () => {
        const res = isNull(undefined);
        expect(res).toBe(false);
      });
    });
    describe('given a defined value', () => {
      it('should return false', () => {
        const res = isNull(1);
        expect(res).toBe(false);
      });
    });
    describe('given null', () => {
      it('should return true', () => {
        const res = isNull(null);
        expect(res).toBe(true);
      });
    });
  });

  describe('isArray', () => {
    describe('given undefined', () => {
      it('should return false', () => {
        const res = isArray(undefined);
        expect(res).toBe(false);
      });
    });
    describe('given null', () => {
      it('should return false', () => {
        const res = isArray(null);
        expect(res).toBe(false);
      });
    });
    describe('given a defined value different than Array', () => {
      it('should return false', () => {
        const res = isArray(1);
        const res1 = isArray('1');
        const res2 = isArray(true);
        const res3 = isArray({});
        expect(res).toBe(false);
        expect(res1).toBe(false);
        expect(res2).toBe(false);
        expect(res3).toBe(false);
      });
    });
    describe('given an array', () => {
      it('should return true', () => {
        const res = isArray([]);
        expect(res).toBe(true);
      });
    });
  });

  describe('isEmptyObject', () => {
    describe('given an object with some values', () => {
      it('should return false', () => {
        const res = isEmptyObject({ test: 'test' });
        expect(res).toBe(false);
      });
    });
    describe('given an empty object', () => {
      it('should return true', () => {
        const res = isEmptyObject({});
        expect(res).toBe(true);
      });
    });
  });
});
