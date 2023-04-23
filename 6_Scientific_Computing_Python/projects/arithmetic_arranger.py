def arithmetic_arranger(problems, show_answer=False):
  if len(problems) > 5:
    return "Error: Too many problems."

  arranged_problems = ["", "", "", ""]
  for problem in problems:
    # Split problem into operands and operator
    operands = problem.split()
    operand1 = operands[0]
    operator = operands[1]
    operand2 = operands[2]

    # Check for errors in input
    if not operand1.isdigit() or not operand2.isdigit():
      return "Error: Numbers must only contain digits."
    if len(operand1) > 4 or len(operand2) > 4:
      return "Error: Numbers cannot be more than four digits."
    if operator not in ["+", "-"]:
      return "Error: Operator must be '+' or '-'."

    # Convert operands to integers
    int1 = int(operand1)
    int2 = int(operand2)

    # Arrange problem vertically
    width = max(len(operand1), len(operand2)) + 2
    arranged_problems[0] += operand1.rjust(width)
    arranged_problems[1] += operator + " " + operand2.rjust(width - 2)
    arranged_problems[2] += "-" * width
    if show_answer:
      if operator == "+":
        result = int1 + int2
      else:
        result = int1 - int2
      arranged_problems[3] += str(result).rjust(width)

    arranged_problems[0] += "    "
    arranged_problems[1] += "    "
    arranged_problems[2] += "    "
    if show_answer:
      arranged_problems[3] += "    "

  arranged_output = "\n".join(arranged_problems[:-1]) + "\n"
  if show_answer:
    arranged_output += arranged_problems[-1]

  return arranged_output
