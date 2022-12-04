# Capture The Flag: Das geheime Eiscremerezept

Sie sind ein renommierter Hacker und wurden von der Firma Eisbär & Pinguin Eiswaren GmbH beauftragt, ein Eiscremerezept zu ergattern. Bei dem Rezept handelt es sich um das Rezept von Alfons Arktos, mit dem er weltbekanntheit erlangte.

Hier ist, was sie über den Verbleib des Rezepts wissen:

1. Alfons Arktos nutzt den Cloudspeicher "CTF File Store". Dort hat er sein Rezept unter dem Dateinamen `secret_ice_cream_recipe.txt` hochgeladen.
2. Durch ihre verbindungen in die Branche haben sie erfahren, dass bei CTF File Store auf symmetrische Verschlüsselung gesetzt wird. Die Datei liegt also verschlüsselt irgendwo im Dateisystem des Services.
3. Für jeden Nutzer wird ein eigener Schlüssel generiert und in einer SQL-Datenbank gespeichert.

Durch ihre langjährige Erfahrung als Hacker haben sie außerdem bereits eine recht genaue Vorstellung, wie der CTF File Store vermutlich die Dateien an die Nutzer ausliefert:

1. Der Nutzer loggt sich ein und erhält ein Session-Token.
2. Bei der Anfrage nach einer Datei wird das Session-Token geprüft.
3. Anhand des Session-Tokens wird der Schlüssel aus der Datenbank abgerufen.
4. Die Datei wird entschlüsselt und an den Nutzer gesendet.

Nach einiger Planung haben sie sich zwei Wege überlegt, um an die Datei heranzukommen:

1. Sie kommen irgendwie and die verschlüsselte Datei. Jetzt müssen sie die Datei nur noch entschlüsseln! Dazu besorgen sie sich auch irgendeinem Wege den Schlüssel. Den Rest erledigt ihr verlässlicher Partner, das "Decryptor"-Tool (die Anleitung dazu finden sie unten).
2. Sie tricksen das System aus und lassen es denken sie seien Alfons Arktos. Dann entschlüsselt das System die Datei ganz bequem für sie, und sie können sich zurücklehnen.

Vielleicht fällt ihnen ja noch ein weiterer Weg ein? Erstellen sie einfach mal einen Account und schauen sie sich etwas um ;-)

Bei ihrer Recherche sind sie bereits auf ein paar verdächtig aussehende Stellen gestoßen, und sie sind sich sicher, dass sie mit **SQL-Injection**, **OS-Command-Injection**, **XSS** oder vielleicht sogar einer **CSRF** ans Ziel kommen werden. Vielleicht braucht es auch eine Kombination aus Ansätzen?

Eins ist klar: Viele Wege führen zum Ziel. Happy Hacking :-D

## Wo finde ich den CTF File Store?

Sie wurden zu Beginn der Übung in ein Team eingewiesen. Jedes Team arbeitet auf einer eigenen Instanz des CTF File Store. Sie können ihre Instanz unter der folgenden URL finden:

- Team 1: https://team1.workshop.thenativeweb.io/
- Team 2: https://team2.workshop.thenativeweb.io/
- Team 3: https://team3.workshop.thenativeweb.io/

## Wie man den Decryptor benutzt

Sie haben die verschlüsselte Datei und den Schlüssel als Hex-String ergattert? Dann kann der Decryptor ihnen das Rezept entschlüsseln. Dazu brauchen sie nur Node.js.

Führen sie den Decryptor aus:
```shell
npm install
node decryptor.js
```

Das Programm fragt nun nach dem Ciphertext (dem verschlüsselten Rezept) und dem Schlüssel. Geben sie beides ein, und bestätigen sie mit Enter. Wenn sie alles richtig gemacht haben, erscheint das Rezept auf der Kommandozeile.
