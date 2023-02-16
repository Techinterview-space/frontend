export default class Assertion {
  public static notNull<T>(
    anyInstance: T, paramName: string, className: string | null = null): void {
    if (anyInstance == null) {
      let message = `Parameter '${paramName}' should not be null`;

      if (className != null) {
        message += `. Class '${className}'`;
      }
      throw Error(message);
    }
  }

  public static notNullOrEmpty<T extends any[] | []>(anyArray: T, paramName: string): void {
    if (anyArray == null) {
      throw Error(`Array '${paramName}' should not be null`);
    }

    if (anyArray.length === 0) {
      throw Error(`Array '${paramName}' should not be empty`);
    }
  }

  public static stringNotNullOrEmpty(anyString: string | null, paramName: string): void {
    this.notNull(anyString, paramName);

    if (anyString === '') {
      throw Error(`The string ${paramName} should not be empty`);
    }
  }

  public static equal<T extends number | string | boolean>(expected: T, fact: T): void {
    if (expected !== fact) {
      throw Error(`The fact '${fact}' is not equal to expected '${expected}'`);
    }
  }
}
