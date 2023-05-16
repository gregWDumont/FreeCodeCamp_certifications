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
    self.ledger.append({"amount": amount, "description": description})

  def withdraw(self, amount, description=""):
    if self.check_funds(amount):
      self.ledger.append({"amount": -amount, "description": description})
      return True
    return False

  def get_balance(self):
    balance = 0
    for item in self.ledger:
      balance += item["amount"]
    return balance

  def transfer(self, amount, category):
    if self.check_funds(amount):
      self.withdraw(amount, f"Transfer to {category.name}")
      category.deposit(amount, f"Transfer from {self.name}")
      return True
    return False

  def check_funds(self, amount):
    return amount <= self.get_balance()


def create_spend_chart(categories):
  withdrawals = []
  for category in categories:
    withdrawal = sum(transaction["amount"] for transaction in category.ledger
                     if transaction["amount"] < 0)
    withdrawals.append(withdrawal)

  total_withdrawals = sum(withdrawals)

  percentages = []
  for withdrawal in withdrawals:
    percentage = withdrawal / total_withdrawals * 100 if total_withdrawals != 0 else 0
    percentage = int(percentage // 10) * 10
    percentages.append(percentage)

  chart = "Percentage spent by category\n"

  for i in range(100, -10, -10):
    row = "{:>3}| ".format(i)
    for percentage in percentages:
      if percentage >= i:
        row += "o  "
      else:
        row += "   "
    chart += row + "\n"

  chart += "    " + "-" * (len(categories) * 3 + 1) + "\n"

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
