# Tic-Tac-Toe
This repository contains the source code for a Tic Tac Toe game implemented using ReactJS. The game allows two players to play Tic Tac Toe on a 9-square board, with each player taking turns to place their mark (random number determind by a dice). The game finishes when a player has no space left on their board, and the winner is the player with the higher point. The game also includes a dice feature, where it automatically rolls a number for the player after a move has been made.

# Rules
The game is played between two players, each with their own 3x3 board. Player One starts the game by rolling the dice and playing the number that is shown on it in any of the columns on their board. The next turn goes to the other player. The game continues until one of the players fills their board. The player with the highest score at the end of the game is declared the winner.

The score is calculated by adding the numbers in each column and adding the total points of all three columns together. If all the numbers in a column are the same, the score for that column is calculated by simply adding the three numbers. If there are two of the same numbers and a third different number, the score for that column is calculated by multiplying the repeated number by 4 and adding the result to the third number. If all three numbers are the same, the score is calculated by multiplying the repeated number by 9.

If at any point in the game a player plays a number that is the same as one in the other player's column, the second player loses all instances of that number in that column. This rule is in place to reward players for taking risks and having repeated numbers in their columns.



# Technology Stack
ReactJS
CSS

# Contributing
If you are interested in contributing to this project, feel free to open a pull request or create an issue.
