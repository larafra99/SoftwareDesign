## SoftwareDesign Prüfung Carsharing

# Unit Test
Der Test befindet sich im Ordner unitest um ihn auszuführen muss der Befehl --experimental-vm-modules node_modules/jest/bin/jest.js in Softwaredesign ausgeführt werden.Jest wird trotz dem Befehl einen Fehler werfen aber die Tests werden korrrekt durchgeführt. Anscheinend liegt es daran, dass im Package.json als "module" es2015 angegeben ist. Wird das auf commonjs geändert verschwinden die Fehler. Daraufhin kann die Website aber nicht mehr mit der Modularisierung umgehen.

# Regular Expression
Wird verwendet um den Nutzernamen und Passwort zu überprüfen. Auch in der register.ts wird mit der Regularexpression geschaut das der Nutzername nur alphanummerisch ist. Die deklarierende Datei für die RegEx befindet sich im Ordner function in der Datei regex.ts