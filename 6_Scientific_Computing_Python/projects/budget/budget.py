class Category:

  def __init__(self, name):
    self.name = name
    self.ledger = []

  def __str__(self):
    title = f"{self.name:*^30}\n"
    items = ""
    total = 0
    for item in self.ledger:
      items += f"{item['description'][:23]:23}" \
               f"{item['amount']:>7.2f}\n"
      total += item['amount']
    output = title + items + f"Total: {total:.2f}"
    return output

  def deposit(self, amount, description=""):
    # Add deposit amount to ledger
    self.ledger.append({"amount": amount, "description": description})

  def withdraw(self, amount, description=""):
    # Add withdraw amount (negative) to ledger if funds are available
    if self.check_funds(amount):
      self.ledger.append({"amount": -amount, "description": description})
      return True
    return False

  def get_balance(self):
    # Calculate balance from all deposits and withdrawals
    balance = 0
    for item in self.ledger:
      balance += item["amount"]
    return balance

  def transfer(self, amount, category):
    # Transfer funds from one category to another
    if self.check_funds(amount):
      self.withdraw(amount, f"Transfer to {category.name}")
      category.deposit(amount, f"Transfer from {self.name}")
      return True
    return False

  def check_funds(self, amount):
    # Check if amount is greater than available funds
    return amount <= self.get_balance()


def create_spend_chart(categories):
  # Create a list to store the withdrawals for each category
  withdrawals = []
  for category in categories:
    withdrawal = sum(transaction["amount"] for transaction in category.ledger
                     if transaction["amount"] < 0)
    withdrawals.append(withdrawal)

  # Calculate the total withdrawals across all categories
  total_withdrawals = sum(withdrawals)

  # Calculate the percentage spent for each category and store it in a list
  percentages = []
  for withdrawal in withdrawals:
    percentage = withdrawal / total_withdrawals * 100 if total_withdrawals != 0 else 0
    percentage = int(percentage // 10) * 10
    percentages.append(percentage)

  # Create the chart header
  chart = "Percentage spent by category\n"

  # Create the rows of the chart
  for i in range(100, -10, -10):
    row = "{:>3}| ".format(i)
    for percentage in percentages:
      if percentage >= i:
        row += "o  "
      else:
        row += "   "
    chart += row + "\n"

  # Create the horizontal line at the bottom of the chart
  chart += "    " + "-" * (len(categories) * 3 + 1) + "\n"

  # Create the category labels and append them to the chart
  labels = []
  max_length = max(len(category.name) for category in categories)
  for i in range(max_length):
    label = "     "
    for category in categories:
      if i < len(category.name):
        label += category.name[i] + "  "
      else:
        label += "   "
    labels.append(label)
  chart += "\n".join(labels)

  return chart
