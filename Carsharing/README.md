# SoftwareDesign Prüfung Carsharing

## Anwendung
Die Anwendung arbeitet mit einer MongoDB Datenbank und einem Heroku Server und Github- Pages. Die Webseite braucht beim ersten Aufruf etwas länger da der Server erst gestarted werden muss. Danach sollte es nicht mehr so lange dauern.
Die Anwendung finden sie unter: https://larafra99.github.io/SoftwareDesign/Carsharing/html/register.html

## Admin
Benutzername: admin
Passwort: adminpassword1234

## Design Patterns
1. Wird das Nullobjekt Design Pattern verwendet. Dies deaktiviert Instanzen von damit keine Aktion ausgeführt wird. Verwendet wird dies vorallem in der server.ts
2. Des Weiteren wird eine Fabrikmethode als Design Pattern verwendet. Dort wird mithilfe eines Ausrufes einer Methode die Klasse erzeugt als mit einem Konstruktoraufruf. Verwendet wird dies zum Beispiel in der statistic.ts

## Regular Expression
Wird verwendet um den Nutzernamen und Passwort zu überprüfen. Auch in der register.ts wird mit der Regularexpression geschaut das der Nutzername nur alphanummerisch ist. Die deklarierende Datei für die RegEx befindet sich im Ordner function in der Datei regex.ts

## Unit Test
Der Test befindet sich im Ordner unitest um ihn auszuführen muss der Befehl --experimental-vm-modules node_modules/jest/bin/jest.js in Softwaredesign ausgeführt werden.Jest wird trotz dem Befehl einen Fehler werfen aber die Tests werden korrrekt durchgeführt. Anscheinend liegt es daran, dass im Package.json als "module" es2015 angegeben ist. Wird das auf commonjs geändert verschwinden die Fehler. Daraufhin kann die Website aber nicht mehr mit der Modularisierung umgehen.

## Diagramme 
Die drei Diagrammformen liegen im Unterordner Diagramme
