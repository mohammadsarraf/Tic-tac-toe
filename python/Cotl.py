from Colt_Claas import Colt_Claas
from Colt_Claas_Bot import Colt_Claas_Bot 
import os
import random


os.system('cls')
Player1 = Colt_Claas("Moe")
# Player2 = Colt_Claas("Sahar")
Player2 = Colt_Claas("Sahar")


turn = random.randint(1, 2)
start = True

while start:
    if turn == 1:
        Player1.play(Player2)
        if all(cell != 0 for col in (Player1.column[0], Player1.column[1], Player1.column[2]) for cell in col):
            print("Game over!")
            start = False
        # if (Player1.done == True):
        #     break
        turn = 2
    else:
        Player2.play(Player1)
        if all(cell != 0 for col in (Player2.column[0], Player2.column[1], Player2.column[2]) for cell in col):
            print("Game over!")
            start = False
        # if (Player2.done == True):
        #     break
        turn = 1

    os.system('cls')
    print(Player1)
    print(Player2)

os.system('cls')
print(Player1)
print(Player2)

if (Player1.score > Player2.score):
    print("{name} WON!".format(name = Player1.name))
elif (Player1.score < Player2.score):
    print("{name} WON!".format(name = Player2.name))
else:
    print("Draw!")