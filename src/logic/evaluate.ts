
import { Parser } from 'expr-eval';

export class ExpressionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ExpressionError";
  }
}

const parser = new Parser({
  operators: {
    add: true,
    subtract: true,
    multiply: true,
    divide: true,
    power: true,
    remainder: true,

    factorial: false,
    comparison: false,
    logical: false,
    conditional: false,
    assignment: false,
    concatenate: false,
    in: false,
  },
});

export function evaluate(input: string): number {

  if (!input || input.trim() === "") {
    throw new ExpressionError("Empty expression");
  }

  let expression = input
  .replaceAll("×", "*")
  .replaceAll("x", "*")
  .replaceAll("÷", "/")
  .replaceAll("−", "-")
  .replaceAll("x²", "^2")
  .replaceAll("xʸ", "^")
  .replaceAll("√(", "sqrt(")
  .replaceAll("π", "PI")
  .replace(/\be\b/g, "E")
  .replaceAll(",", ".")
  .replaceAll(" ", "")

  try {
    const result = parser.evaluate(expression);

    if (typeof result !== "number" || !Number.isFinite(result)) {
      throw new ExpressionError("Invalid mathematical result");
    }

    return result
  } catch (error) {
    if (error instanceof ExpressionError) {
      throw error;
    }

    throw new ExpressionError("Invalid expression");
  }
}
