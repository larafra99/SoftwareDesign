from numpy import number


class GameBoard: 
    height: int 
    width: int
    points_to_win: int 

    def choose_size():
        sizex= input ('Weite eingeben')

        if sizex > 3:
            sizex= input ('Weite muss größer als 3 sein')
        else:
            size = sizex

        sizey = input ('Breite eingeben')
        if sizey > 3:
            sizey= input ('Breite muss größer als 3 sein')
        else:
            size.append(sizey)
        
        return size
    
    def choose_points_to_win(boardsize):
        winpoints = input('Nötige Punkte zum Sieg ')
        if boardsize > winpoints:
            winpoints = input('Punkte müssen weniger sein als', boardsize)
        else:
            return winpoints

    
