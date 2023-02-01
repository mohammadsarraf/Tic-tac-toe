import random

class Colt_Claas:

  def __init__(self, name):
    self.name = name
    self.column = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    self.score = 0
    self.played = [0, -1]
    self.done = False

  # def simulate_game(self, roll, other_player):
  #   """
  #   Method that simulates the game for a specific roll and returns
  #   True if the player wins or False if the player loses
  #   """
  #   # Make a copy of the player's board so we can change it without
  #   # affecting the actual game state
  #   cols = [self.col0[:], self.col1[:], self.col2[:]]
  #   other_cols = [other_player.col0[:], other_player.col1[:], other_player.col2[:]]
  #   score = 0
  #   for i in range(len(cols)):
  #     for j in range(len(cols[i])):
  #       if cols[i][j] == 0:
  #         cols[i][j] = roll
  #         score += self.points(cols[i])
  #         other_cols[i] = [0 if x==roll else x for x in other_cols[i]]
  #         if all(x != 0 for col in other_cols):
  #           return score > other_player.score
  #   return False

  #   def probability(self, other_player):
  #     """
  #     Method that calculates the wining probability of the player based on their current state
  #     """
  #     wins = 0
  #     total = 0
  #     for roll in range(1, 7):
  #       if self.simulate_game(roll, other_player):
  #         wins += 1
  #       total += 1
  #     return wins / total

  def points(self, column):
    if (column[0] == column[1]) and (column[0] == column[2]):
      return (column[0] * 9)
    if (column[0] == column[2]):
      return (column[0] * 4 + column[1])
    if (column[1] == column[2]):
      return (column[1] * 4 + column[0])
    if (column[0] == column[1]):
      return(column[0] * 4 + column[2])
    else:
      return (column[0] + column[1] + column[2])

  def play(self, other_Player):
    roll = random.randint(1, 6)
    print("dice is showing {num}".format(num = roll))
    while True:
        move_made = False
        try:
            index = int(input("{name} Pick a cell to play: ".format(name = self.name)))
            if index not in (0, 1, 2):
                raise IndexError
            
            if index == 0:
                col = self.column[0]
            elif index == 1:
                col = self.column[1]
            else:
                col = self.column[2]
                
            if not isinstance(col, list):
                raise TypeError
                
            if all(cell != 0 for cell in col):
                print("Column is full. Please choose a different column.")
                continue
            
            for i in range(len(col)):
                if col[i] == 0:
                    col[i] = roll
                    self.played = [roll, index]
                    move_made = True
                    break
                
        except ValueError:
            print("Please enter a valid integer.")
        except IndexError:
            print("Please enter a valid index (0, 1, or 2).")
        except TypeError:
            print("One of the column attributes is not a list.")
            
        if not any(0 in col for col in (self.column[0], self.column[1], self.column[2])):
            print("Game is over. You can't make any more moves.")
            return
        
        if not move_made:
            continue
        else:
            break
    if (self.played[1] == 0):
        other_Player.column[0] = [0 if x==self.played[0] else x for x in other_Player.column[0]]

    elif (self.played[1] == 1):
        other_Player.column[1] = [0 if x==self.played[0] else x for x in other_Player.column[1]]

    elif (self.played[1] == 2):
        other_Player.column[2] = [0 if x==self.played[0] else x for x in other_Player.column[2]]

    if all(cell != 0 for col in (self.column[0], self.column[1], self.column[2]) for cell in col):
        print("Game over!")
        self.done = True


  # def check_done(self):
  #   rows = [self.column0, self.column1, self.column2]
  #   for row in rows:
  #       if all(x != 0 for x in row):
  #           self.done = True

  def calc_score(self):
    self.score = (self.points(self.column[0]) + self.points(self.column[1]) + self.points(self.column[2]))
  
  def check(self):
    return self.played
  
  def sort(self):
    def sort_column(col):
        # Move all the zeros to the end of the list
        non_zeros = [x for x in col if x != 0]
        zeros = [x for x in col if x == 0]
        col[:] = non_zeros + zeros
    
    sort_column(self.column[0])
    sort_column(self.column[1])
    sort_column(self.column[2])

  
  # def update_file(self):
  #   f = open("demofile2.txt", "r")
  #   lines = []
  #   for line in f:
  #     lines.append(line)
  #   f.close()
  #   ###we have all the lines
  #   f = open("demofile2.txt", "w")
    
  #   string = self.name + " " + str(self.column) + "\n"
    
  #   if (lines[0].split()[0] == str(self.name)):
  #     newString = string + lines[1]
  #     # print(newString)
  #     f.write(newString)
  #   else:
  #     newString = lines[0] + string
  #     # print(newString)
  #     f.write(newString)
    
  #   f.close()
  def __str__(self):
    
    # self.update_file()
    self.sort()
    self.calc_score()
    
    return """{name}:{score}
      {sum0:2} {sum1:2} {sum2:2}
      -----------
      {column00:2} {column10:2} {column20:2}
      {column01:2} {column11:2} {column21:2}
      {column02:2} {column12:2} {column22:2}\n""".format( score = self.score, sum0 = self.points(self.column[0]), sum1 = self.points(self.column[1]),sum2 = self.points(self.column[2]),name = self.name, column00 = self.column[0][0], column01 = self.column[0][1], column02 = self.column[0][2], column10 = self.column[1][0], column11 = self.column[1][1], column12 = self.column[1][2], column20 = self.column[2][0], column21 = self.column[2][1], column22 = self.column[2][2])

