import math
import string
from tkinter import *

def Button_Computer():
    return True
def Button_Cop():
    return False

class User:
    user_id: string
    passwort: string
    user_name: string

    def choose_opponent():
        computer = Button(text='1',
                         command=Button_Computer)
        cop = Button(text='1',
                         command=Button_Cop)

    def Customize_game_Board():
        x=1

    def login():
        username = input('Username')
        passwort = input('Passwort')
    def place_stone(x,y):
        x = 1
    def show_statistic():
        x = 1


