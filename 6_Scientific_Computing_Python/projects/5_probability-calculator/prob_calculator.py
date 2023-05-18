import copy
import random
# Consider using the modules imported above.

class Hat:
  def __init__(self, **balls):
    self.contents = []
    for color, count in balls.items():
      self.contents.extend([color] * count)

  def draw(self, num_balls):
    if num_balls >= len(self.contents):
      return self.contents

    drawn_balls = random.sample(self.contents, num_balls)
    for ball in drawn_balls:
      self.contents.remove(ball)

    return drawn_balls


def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    expected_count = 0

    for _ in range(num_experiments):
        hat_copy = copy.deepcopy(hat)
        drawn_balls = hat_copy.draw(num_balls_drawn)
        
        # Check if the drawn balls match the expected balls
        drawn_count = {color: drawn_balls.count(color) for color in expected_balls}
        if all(drawn_count.get(color, 0) >= count for color, count in expected_balls.items()):
            expected_count += 1
    
    return expected_count / num_experiments
