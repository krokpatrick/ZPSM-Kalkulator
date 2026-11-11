
export class ExpressionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ExpressionError";
  }
}

export function evaluate(input: string): number {
  
  let result: number = 0;

  return result;
}
