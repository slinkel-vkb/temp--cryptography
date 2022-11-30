# Sicherheit

## Kryptografie

- kryptos: geheim, verborgen
- graphein: schreiben

- Ziel
  - Verschlüsselung

- Alternative
  - Steganografie

> "*M*anche bezweigeln *e*inen Grundsatz *i*n Physik, *n*ämlich dass *N*euorientierung von *a*llen Teilchen *m*it dem *E*inpendeln erfolgt. *G*anz sicher? *O*b wir *l*inks schwingend *o*der eher *r*echts schwingend *o*szillieren, ist *d*och tatsächlich *e*her ziemlich *n*ebensächlich."

- Schlagworte
  - https://de.wikipedia.org/wiki/Cicada_3301
  - https://en.wikipedia.org/wiki/11B-X-1371 (NSFW)
  - https://en.wikipedia.org/wiki/A86_(software)

- Gegenstück
  - Kryptoanalyse

- "Vorurteile"
  - Schwierig / komplex
  - "schon mal gehört"
- Konzepte statt Implementierungen

- Wozu braucht man das?
  - Sensible / sensitive Daten
  - Personenbezogene Daten
  - Privatsphäre
  - Gesetzliche Anforderungen

- Historische Beispiele
  - Beale-Chiffre
    - Anfang des 19. Jahrhunderts
    - 3 Seiten (nur eine konnte entschlüsselt werden)
    - 2. Seite basiert auf der amerikanischen Unabhängigkeitserklärung
    - "Buch-Chiffre"
  - Voynich-Manuskript
    - ~ Mittelalter
    - unentschlüsselt
  - Navajo
    - Deren Sprache wurde als Code verwendet

## Cäsar-Chiffre

- Nachricht ("Klartext", "plain text")
- Verschlüsselung (Algorithmus + Schlüssel)
- Geheimtext ("Chiffre", "cipher text")
- Entschlüsselung (Algorithmus + Schlüssel)
- Klartext

```
Klartext        ABCDEFGHIJKLMNOPQRSTUVWXYZ
                                              -3    <- Schlüssel
Geheimtext      XYZABCDEFGHIJKLMNOPQRSTUVW

HALLO WELT
EXIIL TBIQ <- Geheimtext (-3)
```

- Größe des Schlüsselraums: 25
- Verschlüsselung brechen?
  - Durch einfaches Ausprobieren, maximal 25 Versuche notwendig
  - "Brute Force"

## Verbesserte Cäsar-Chiffre

```
Klartext        ABCDEFGHIJKLMNOPQRSTUVWXYZ
Geheimtext      UGDABEJHCFILTMNOKPWQRVXSZY (durcheinandergewürfelt)

HALLO WELT
HULLN XBLQ
```

- Funktioniert Brute-Force hier auch?
  - Größe des Schlüsselraums berechnen
  - 26 * 25 * 24 * ... * 2 * 1 = 26! => eine sehr große Zahl ;-)
  - Daraus folgt, das ist **deutlich** sicherer als die klassische Cäsar-Chiffre

- Sprachprofil erstellen (zählen, welches Zeichen wie oft vorkommt)
  - Im Deutschen
    - "E" kommt am häufigsten vor
    - "N" kommt am zweithäufigsten vor
    - ...

```
EINE KLEINE ENTE
BCMB ILBCMB BMQB
```

- B: 6 (Vermutung: E)
- C: 2
- M: 3 (Vermutung: N)
- I: 1
- L: 1
- Q: 1

```
BCMB ILBCMB BMQB
E.NE ..E.NE EN.E

=> Raten: C bedeutet wohl I wegen des ersten Wortes

BCMB ILBCMB BMQB
EINE ..EINE EN.E

Und so weiter …
```

- Monoalphabetische Verschlüsselungen
  - Bilden 1 Alphabet auf 1 anderes Alphabet ab
  - Relativ unsicher, unabhängig von der Größe des Schlüsselraums
  - "Sprachprofil" kann verwendet werden
    - Muster aus dem Klartext finden sich auch im Geheimtext
    - Idee: Muster suchen, um Rückschlüsse auf den Klartext ziehen zu können

## ROT13

- Cäsar mit Schlüssel 13
  - "Rotiert" an der Hälfte des Alphabets
  - ROT13, ist quasi Cäsar mit hartcodiertem Schlüssel 13

## Vigenère-Chiffre

- ~ 16. Jahrhundert
- Idee: Polyalphabetische Verschlüsselung

```
Klartext        ABCDEFGHIJKLMNOPQRSTUVWXYZ
                                              Schlüssel "DIE" (4, 9, 5)
Geheimtext +4   EFGHIJKLMNOPQRSTUVWXYZABCD
Geheimtext +9   JKLMNOPQRSTUVWXYZABCDEFGHI
Geheimtext +5   FGHIJKLMNOPQRSTUVWXYZABCDE

HALLO WELT
LJQPX BIUY

EINE KLEINE ENTE
IRSI TQIRSI NSXN
```

- Das heißt, es wird besser, aber nicht perfekt
  - Muster *können* immer noch auftreten
  - Problematisch: Buchstabenabstände entsprechen der Schlüssellänge
- Je länger der Schlüssel, und je vielfältiger der Schlüssel, desto besser
- https://de.wikipedia.org/wiki/Zodiac-Killer

## One-time pad (OTP)

- Mathematisch nachweisbar unknackbar
- Die "perfekte" Verschlüsselung

```
Klartext        ABCDEFGHIJKLMNOPQRSTUVWXYZ
Geheimtext #1   HIJKLMNOPQRSTUVWXYZABCDEFG     +7
Geheimtext #2   DEFGHIJKLMNOPQRSTUVWXYZABC     +3
Geheimtext #3   IJKLMNOPQRSTUVWXYZABCDEFGH     +8
Geheimtext #4   ABCDEFGHIJKLMNOPQRSTUVWXYZ     +0
Geheimtext #5   QRSTUVWXYZABCDEFGHIJKLMNOP     +16

Klartext      HALLO
Geheimtext    ODTLE
```

- Häufigkeitsanalyse funktioniert nicht, weil Schlüssel zufällig gebildet
- Größe des Schlüsselraums
  - 26^5 = 11.881.376
  - => Brute-Force sollte möglich sein, da überschaubare Anzahl von Schlüsseln

- Anforderungen
  - Schlüssel **muss** zufällig sein
  - Schlüssel muss so lang sein wie der Klartext
  - Schlüssel darf nur ein einziges Mal verwendet werden

- Probleme
  - Wo kommen die zufällig generierten Schlüssel her?
  - Wie funktioniert der Schlüsseltausch?
  - Wie und wo bewahrt man die Schlüssel auf?

## Zufall

- Siehe `rng.ts`
- Starten über `npm run rng`

- PRNG
  - Pseudo random number generator
  - `math.random()` in JavaScript
  - `rand.Int()` in Go
- CSRNG
  - Cryptographically secure random number generator
  - `crypto.randomBytes()` in Node.js

## Block-Chiffren

```
HALLO WELT

=> Blöcke bilden mit einer Länge von 16 Bit

"HA", "LL", "O ", "WE", "LT"
```

- Im Prinzip arbeiten die ähnlich zu den Verfahren, die wir schon kennen
- Hauptunterschied ist, dass sie auf Blöcken und nicht auf einzelnen Zeichen arbeiten

- Bekannte Verfahren
  - RC4 (veraltet)
  - DES (Data Encryption Standard, veraltet)
  - 3DES (Triple DES, veraltet)
  - AES (Advanced Encryption Standard, basiert auf Rijndael und Blowfish)
    - Verschiedene Blockgrößen
      - 128 Bit (veraltet)
      - 192 Bit (veraltet)
      - 256 Bit
    - Verschiedene Modi
      - ECB (Electronic Codebook, veraltet)
      - CBC (Cipher Block Chaining)
      - Und viele weitere …

- zB "AES-256-CBC"

```
DASISTEINHALLOWELTPROGRAMM

1. Schritt: Blöcke bilden (beispielsweise mit 32 Bit, wären eigentlich 256 Bit)
DASI STEI NHAL LOWE LTPR OGRA MM

2. Schritt: Padding hinzufügen (falls notwendig, von rechts gelesen)
DASI STEI NHAL LOWE LTPR OGRA MM_2

3. Schritt (stark vereinfacht): Blockweise verschlüsselt
FTHB VJZT LISW BZUB FTUZ ZUKG FTZU

------

ECB-Modus:

TICK TRICK UND TRACK

1. Schritt: Blöcke bilden (beispielsweise mit 16 Bit, wären eigentlich 256 Bit)
TI CK _T RI CK _U ND _T RA CK

2. Schritt: Padding hinzufügen
TI CK _T RI CK _U ND _T RA CK _2

3. Schritt (stark vereinfacht): Blockweise verschlüsseln
NZ RT BL WE RT CV UI BL ZU RT NN
   ^^       ^^             ^^
      ^^             ^^

=> ECB funktioniert zwar, ist aber nicht besonders gut und anfällig für Angriffe, weil Muster aus dem Klartext im Geheimtext erhalten bleiben

------

CBC-Modus:

Klartext          TICK TRICK UND TRACK

1. Schritt: Blöcke bilden (beispielsweise mit 16 Bit, wären eigentlich 256 Bit)
TI CK _T RI CK _U ND _T RA CK

2. Schritt: Padding hinzufügen
TI CK _T RI CK _U ND _T RA CK _2

3. Schritt: Initialisierungsvektor (IV) hinzufügen (zufällig gewählt!)
Klartext        TI CK _T RI CK _U ND _T RA CK _2
Geheimtext   BW

4. Schritt (stark vereinfacht): Blockweise verschlüsseln, aber wir kombinieren jeden Block mit seinem direkten Vorgängerblock
Klartext        TI CK _T RI CK _U ND _T RA CK _2
Geheimtext   BW SJ ZU RT BL WE ...

a) Block 1: AES(TI XOR BW) => SJ
b) Block 2: AES(CK XOR SJ) => ZU
c) Block 3: AES(_T XOR ZU) => RT
d) Block 4: AES(RI XOR RT) => BL
e) Block 5: AES(CK XOR BL) => WE
f) ...
```

## Verschlüsselt != fälschungssicher

```
HALLO
          Cäsar +1
IBMMP

IBMMP ---> Ändert Text ----> IFMMP ----> entschlüsselt ----> HELLO
```

- David Kriesel: "Trau keinem Scan, den Du nicht selbst gefälscht hast"
  - https://www.youtube.com/watch?v=7FeqF1-Z1g0

## Schlüsseltausch (Diffie-Hellmann Key-Exchange Verfahren)

- Standardisierte Rollen in der Kryptografie
  - Sender: Alice
  - Empfänger: Bob
  - Drittes: Eve

```
Alice                                                 Bob
  |                                                    |
  +---------------------> gelb <-----------------------+
  |                                                    |
  +--> rot                                     blau <--+
  |                                                    |
  +--> gelb+rot                           gelb+blau <--+
      = orange                              = grün
          |                                     |
          +-------------------------------------)------> gelb, blau, grün, orange
                                                |
gelb, rot, orange, grün <-----------------------+

         grün + rot => ocker                  orange + blau => ocker
(gelb + blau) + rot => ocker            (gelb + rot) + blau => ocker


                          Eve

                  Gemeinsame Farbe: gelb
                  Mischfarbe (Alice): orange
                  Mischfarbe (Bob): grün

                    orange + grün => nicht ocker
              (gelb + rot) + (gelb + blau)
               gelb + rot + gelb + blau
               gelb + gelb + rot + blau
              gelb + (gelb + rot + blau)
```

### Mathematische Version

```
Alice                                               Bob
                            g = 5
                            p = 7

s(private)                                          t(private)
S(public) = g ^ s mod p                             T(public) = g ^ t mod p
   => 6                                                => 6

(g ^ t mod p) = 6                                   (g ^ s mod p) = 6
(g ^ t mod p) ^ s mod p                             (g ^ s mod p) ^ t mod p
 6            ^ s mod 7                              6            ^ t mod 7

                  Gemeinsames (geheimes) Ergebnis: 6


                        y = ((g ^ s mod p) ^ t mod p)
                        y = ((g ^ t mod p) ^ s mod p)


Alle wissen:

g ^ t mod p = 6
5 ^ t mod 7 = 6

Was Eve machen *müsste*:

5 ^ t mod 7 = 6      <- Potenzrechung (aber halt mit Modulo …)
t = log5(6) mod 7    <- Diskrete Logarithmus (nur sehr schwer berechenbar)
```

## Hash-Funktionen

- `hashFn(message) => hashValue`
- Eigenschaften
  - Berechnet stets gleich große Hash-Werte, unabhängig von der Nachricht
  - Einwegfunktion (Nachricht kann nicht aus Hash-Wert wiederhergestellt werden)
  - Geringfügig unterschiedliche Nachrichten führen zu deutlich unterschiedlichen Hash-Werten
  - Kollisionen sind nicht unmöglich, sollten aber nicht einfach herstellbar sein
    - Mit anderen Worten: Es sollte unmöglich sein, gezielt eine Nachricht zu einem gegebenen Hash-Wert zu erstellen

- Anschauliches Beispiel: Quersumme
  - 3141526 => 4
  - 3147526 => 1

- Algorithmen
  - MD5 (Message Digest, veraltet)
  - SHA1 (Secure Hash Algorithm, veraltet)
  - SHA2
    - SHA-224 (selten)
    - SHA-256 (<--)
    - SHA-384 (selten)
    - SHA-512 (<--)
  - SHA3 (kaum unterstützt)

- Hash = Digitaler Fingerabdruck
  - Nachricht: HALLO WELT
  - Verschlüsseln: IBMMP XFMU
  - Hash berechnen: sha256(HALLO WELT) => 8611d7193c6fc0f23a7d9b0ce5341ec5154877759516c0c0917e1890c627de92
- Ermöglicht das Prüfen der Integrität von Daten

## Passwörter speichern

```
Login     Password
------------------------
jane      secret
joe       qwertz123

---

Login     Hash(Password)
------------------------
jane      g467gfuz4q3g76
joe       f43t68f43gf873

Angriff #1: Vorberechnete Hash-Tabellen (Rainbow Tables)
Angriff #2: Zwei Personen, gleiches Passwort => gleicher Hash

---

Login     Salt     Hash(Salt+Password)
--------------------------------------
jane      g6og     fgufegwuzfguz
joe       v436     4367gd4zg4ceg

---

Login     Salt     Hash(Hash(Salt+Password))
--------------------------------------------
jane      g6og     hf8h478hgp348
joe       v436     fh3478fgh478q

---

Login     Salt     Alg     #Iteration    Hash(...(Hash(Salt+Password)))
-----------------------------------------------------------------------
jane      g6og     sha256  10000         hf8h478hgp348
joe       v436     sha224  3000          fh3478fgh478q
```

- Spezifische Algorithmen für das Passwort-Hashing
  - pbkdf2 (Password-based key derivation function v2)
  - bcrypt
  - scrypt

## MAC (Message Authentication Code)

```
Alice                                            Bob

HALLO WELT ------------------------------------> HALLO WELT
hash: 67234gd4736 -----------------------------> ok
hash(HALLO WELT)

Schutz vor Übertragungsfehlern


Alice                                            Bob

HALLO WELT -------------A>E--------------------> HELLO WELT
hash: 67234gd4736 -------!---------------------> vermeintlich (!) alles ok
hash(HALLO WELT)         ^ hash(HELLO WELT)
                         |
                        Eve

Kein Schutz vor Manipulation, da auch Hash manipuliert werden kann


Alice                                            Bob

DHKE -------------------> secret <-------------- DHKE

HALLO WELT --------------A>E-------------------> HELLO WELT
hash: fg468fg4gfg --------?--------------------> Manipulation!
hash(HALLO WELT+secret)   ^
                          |
                         Eve

Schutz vor Übertragungsfehlern + Manipulation
```

- Standardisierte Algorithmen
  - HMAC (Hash-based Message Authentication Code)

## Schlüsselaustausch

```
Alice <-------------> Bob
  ^              --->
  |        /----/
  v  <----/
 Eve                 Mallory
```


- Schlüsselzahl nach Personen
  - 2 Personen: 1 Schlüssel
  - 3 Personen: 3 Schlüssel (+2)
  - 4 Personen: 6 Schlüssel (+3)
  - 5 Personen: 10 Schlüssel (+4)

- Berechnen
  - n Personen: 1 + 2 + 3 + 4 + ... + n-1
  - Allgemeine Summenformel
    - Summe(1...n) = n * (n+1) / 2
  - n Personen: Summe(1...n-1) = (n-1) * n / 2
  - ZB für 17 Personen: 16 * 17 / 2 = 136 (!) Schlüssel

- Aufwand für den Schlüsselaustausch und auch Anzahl der Schlüssel steigt ungefähr quadratisch mit der Anzahl der Personen

- Ziele
  - Weniger Schlüssel
  - Effizienter ad-hoc-Austausch von Schlüsseln

## Asymmetrische Verschlüsselung

- Ablauf
  - Bob kauft ein Vorhängeschloss (inklusive Schlüssel)
  - Alice fordert von Bob ein Vorhängeschloss an
  - Alice verfasst Nachricht, packt die Nachricht in eine Kiste und verschließt die Kiste mit dem Vorhängeschloss
  - Alice schickt die Kiste an Bob
  - Bob öffnet die Kiste mit dem Vorhängeschloss
- Komponenten
  - Bauplan für Schlösser (Algorithmus)
  - Schlüssel (privat)
  - Schloss (öffentlich)

## RSA

- Algorithmus (Ron Rivest, Adi Shamir, Leonard Adleman)
- Unternehmen (RSA Security)

- Ablauf des Algorithmus
  - Zwei Primzahlen wählen: `p` und `q`
  - Modulus `N`berechnen: `N = p * q`
  - Phi-Funktion (von Euler): `phi(N) = (p-1) * (q-1)`
  - Zahl `e` wählen, so dass sie teilerfremd zu `phi(N)` ist
  - Verschlüsseln: `c = m^e mod N` (m = message, c = ciphertext)
  - Entschlüsseln: `m = c^d mod N` (d = private key)
  - `d` berechnen
    - `d` muss zu `e` passen: `d` und `e` müssen sich gegenseitig aufheben
    - Das heißt, `d * e = 1 mod phi(N)`
    - Sicherheit von RSA basiert auf der Schwierigkeit, phi(N) zu berechnen, ohne p und q zu kennen (und die wiederum sind schwer zu berechnen, da die Faktorisierung von N schwierig ist)
  - Erweiterter Euklidischen Algorithmus

- Beispiel
  - Bob bereitet vor
    - `p = 7` und `q = 11` (geheim)
    - `N = 7 * 11 = 77`
    - `phi(N) = (7-1) * (11-1) = 6 * 10 = 60`
    - `e = 13`
    - Öffentliche Schlüssel ist `(N, e)` = `(77, 13)`
  - Alice (oder sonstjemand) verschlüsselt mit den öffentlichen Zahlen von Bob
    - `m = 42` => 42 ^ 13 mod 77 = 14 => `c`
    - Zwischenergebnis: Nachricht `m = 42` ergibt Geheimtext `c = 14`
  - Bob berechnet seinen privaten Schlüssel `d`
    - Gegeben: phi(N) = 60, e = 13
    - Euklid:

```
phi(N)    e
 |        |
 v        v
60 = 4 * 13 + 8
         ^    ^
  /-----/  /-/
 v        v
13 = 1 * 8 + 5
         ^   ^
  /-----/ /-/
 v       v
 8 = 1 * 5 + 3
 5 = 1 * 3 + 2
 3 = 1 * 2 + 1
 2 = 2 * 1 + 0 (die letzte Zeile ignorieren wir)


 1 = 3 - 1 * 2 (vorletzte Zeile, aufgelöst zum Rest)
 1 = 3 - 1 * (5 - 1 * 3)
 1 = 2 * 3 - 1 * 5
 1 = 2 * (8 - 1 * 5) - 1 * 5
 1 = 2 * 8 - 3 * 5
 1 = 2 * 8 - 3 * (13 - 1 * 8)
 1 = 5 * 8 - 3 * 13
 1 = 5 * (60 - 4 * 13) - 3 * 13
 1 = 5 * 60 - 23 * 13
          ^         ^
          |         |
        phi(N)      e

 d = -23
```

    - c = 14, d = -23 (=37 (mod phi(N))), N = 77
    - m = c^d mod N
    - m = 14^37 mod 77 => 42

- Vorteile von RSA
  - Deutlich weniger Schlüssel werden benötigt
  - Schlüsselaustausch kann öffentlich erfolgen
- Nachteile von RSA
  - Sehr langsam (~ Faktor 10.000 langsamer als AES)
  - Nachrichtenlänge drastisch begrenzt (durch Schlüssellänge)
  - Schlüssel sind sehr lang (1024 Bit, 2048 Bit, 4096 Bit)
  - Primfaktorzerlegung ist nicht mehr so unlösbar wie sie das mal war

## Digitale Signaturen

```
m = (m ^ e mod N) ^ d mod N = m ^ e*d mod N
                            = m ^ d*e mod N
```

- Erkenntnis
  - Man kann mit öffentlichem Schlüssel verschlüsseln und mit privatem entschlüsseln
  - Man kann mit privatem Schlüssel verschlüsseln und mit öffentlichem entschlüsseln

```
Alice -> m -> prvA(m) -> signedM -> pubB(signedM) -> encryptM -> Bob

Bob -> encryptM -> prvB(encryptM) -> signedM -> pubA(signedM) -> m
```

- Digitale Signaturen funktionieren haargenau so wie asymmetrische Verschlüsselung, es werden lediglich die Rollen von dem öffentlichen und dem privaten Schlüssel vertauscht

## Hybrid-Verfahren

```
Alice -> m
      -> erfindet zufälligen AES-Schlüssel
      -> AES(m, aesKey)
      -> SHA256(m)
      -> RSA(hash, privateKey(Alice))
      -> RSA(aesKey, publicKey(Bob))
```

- Eigentliche Nachricht effizient mit AES und Zufallsschlüssel verschlüsseln
- AES-Schlüssel und Hash mit RSA signieren und verschlüsseln
  - Das kann man n Mal parallel machen, um eine Nachricht zB an verschiedene Empfänger:innen gleichzeitig zu verschicken

## Elliptische Kurven (EC)

- ECC = Elliptic Curve Cryptography

```
Lineare Funktionen:
  y = m * x + b

Quadratische Funktionen:
  y = a*x^2 + b*x + c

Kubische Funktionen:
  y = a*x^3 + b*x^2 + c*x + d

Elliptische Kurven:
  y^2 = x^3 + a*x + b         | sqrt()
  y   = sqrt(x^3 + a*x + b)   => 2 (!) Lösungen, ein positives und ein negatives

```

- Form der elliptischen Kurve hängt im Wesentlichen von den Koeffizienten a und b ab

- Vorgehen
  - Alice wählt einen Startpunkt `P` auf der Kurve
  - Alice überlegt sich einen geheimen Faktor `a`
  - Alice konstruiert einen Punkt `a*P`
  - Dieser Punkt hat eine X-Koordinate, diese nennen wir `A`
    - `A` ist der öffentliche Schlüssel von Alice
    - `a` ist der private Schlüssel von Alice
  - Bob macht das gleiche (vom gleichen Punkt `P` ausgehend)
  - Bob überlegt sich einen geheimen Faktor `b``
  - Bob konstruiert einen Punkt `b*P`
  - Dieser Punkt hat eine X-Koordinate, diese nennen wir `B`
    - `B` ist der öffentliche Schlüssel von Bob
    - `b` ist der private Schlüssel von Bob
  - Gemeinsamer Schlüssel
    - `a * b * P`
    - Das ist für Alice leicht: `a * B` = `a * (b * P)`
    - Das ist für Bob leicht:   `b * A` = `b * (a * P)`
  - Für Eve
    - Eve kann den gemeinsamen Schlüssel nicht (effizient) berechnen
    - Dafür bräuchte sie `a` und `b`
  - Das ist ECDH: Elliptic-Curve Diffie-Hellman

```
227P = P + P + P + P + ... + P    (227 Mal)
227P = 128P + 64P + 32P + 2P + 1P (deutlich weniger Aufwand)
```

## Grundbausteine

- Symmetrische Verschlüsselung
  - Monoalphabetische Verfahren (Cäsar, ROT13, Erweiterter Cäsar)
  - Polyalphabetische Verfahren (Vigenère, Zodiac)
  - One-Time Pad
  - Block-basierte Verfahren (AES-CBC, AES-ECB)
- Asymmetrische Verschlüsselung
  - RSA, Elliptische Kurven
  - Digitale Signaturen
- Zufallszahlengeneratoren
- Schlüsselaustausch (Diffie-Hellman, ECDH)
- Hash-Funktionen (SHA2-Familie)
- MAC (HMAC)
- Passwörter speichern (pbkdf2, bcrypt, scrypt)

## HTTPS

- HTTPS = HTTP over TLS
  - TLS = Transport Layer Security
  - SSL = Secure Sockets Layer (alter Name für TLS)
- Zwei Zielsetzungen
  - Verbindung soll verschlüsselt sein (Vertraulichkeit)
  - Verbindung soll authentifiziert sein (Authentifikation)
    - Man in the Middle (MITM) Angriffe vermeiden / verhindern

```
Client (vkb.de) -----------------> Server (vkb.de)
- RootCA-Zertifikat                 - Private Key
                                    - Zertifikat
                                      - Public Key
                                      - Domain: vkb.de
                                      - Gültig bis: 11/2023
                                      - CA: CA#1
                                      - CA-Zertifikat:
                                        - Public Key
                                        - Domain: ca1.com
                                        - Gültig bis: 11/2027
                                        - CA: CA#2
                                        - CA-Zertifikat:
                                          - Public Key
                                          - Domain: ca2.com
                                          - Gültig bis: 11/2032
                                          - CA: RootCA
                                          - CA-Zertifikat:
                                            - Public Key
                                            - Domain: rootca.com
                                            - CA: RootCA
                                            - Digitale Signatur
                                          - Digitale Signatur
                                        - Digitale Signatur
                                      - Digitale Signatur <-----+
                                                                |
                                   Certificate Authority (CA#1) |
                                   - Private Key ---------------+
                                   - Zertifikat
                                     - Public Key
                                     - Domain: ca1.com
                                     - Gültig bis: 11/2027
                                     - CA: CA#2
                                     - Digitale Signatur <-------+
                                                                 |
                                   Certificate Authority (CA#2)  |
                                   - Private Key ----------------+
                                   - Zertifikat
                                     - Public Key
                                     - Domain: ca2.com
                                     - Gültig bis: 11/2032
                                     - CA: RootCA
                                     - Digitale Signatur <-------+
                                                                 |
                                   Root Certificate Authority    |
                                   - Private Key ----------------+
                                   - Zertifikat
                                     - Public Key
                                     - Domain: rootca.com
                                     - CA: RootCA
                                     - Digitale Signatur
```

- Für die lokale Entwicklung
  - Zertifikat für `localhost` benötigt
  - Zertifikat für `staging.vkb-internal.local`
- Ein Zertifikat anfordern
  - Private Key erstellen
  - Public Key erstellen
  - Bestellformular für Zertifikat ausstellen (Certificate Signing Request (CSR))
    - Public Key
    - Metadaten (Domain, Inhaber, …)
  - Optionen
    - CSR an CA schicken, Geld bezahlen, warten, Zertifikat bekommen :-)
    - CSR selbst in ein Zertifikat umwandeln und selbst unterschreiben
      - Self-Signed Certificate
        - Technisch ist das ein legitimes Zertifikat
        - Aber es wird nicht als vertrauenswürdig eingestuft

## Partial Keys

- Man hat ein Secret
  - Möchte aber, dass mehrere Personen den Vorgang gemeinsam freischalten müssen
  - Man braucht mehr als 1 Passwort, man hat also N Passwörter
  - Aber man braucht nicht alle N Passwörter, um den Vorgang freizuschalten

- Konzeptionell

```
Passwort: secret

# Personen:            3
# Passwörter benötigt: 2

s _ c r _ t     _ e c _ e t     s e _ r e _
    #1               #2              #3
```

- Mathematisch
  - Secret: `Y`
  - Öffentlich: `X`

- Lineare Funktion (<- wenn zwei Personen genügen sollen)
  - y = m*x + b
  - Kann durch zwei Punkte genau bestimmt werden
  - Ich brauche mindestens zwei Punkte => wenn jede Person einen Punkt kennt, genügen zwei Personen

- Quadratische Funktion (<- wenn drei Personen genügen sollen)
  - y = a*x^2 + b*x + c
  - Kann durch drei Punkte genau bestimmt werden
  - Ich brauche mindestens drei Punkte => wenn jede Person einen Punkt kennt, genügen drei Personen

- Allgemein
  - Wenn n Personen genügen sollen, braucht man ein Polynom vom Grad n-1

- Algorithmus dafür
  - Von Adi Shamir
  - "Shamir's Secret Sharing"

## Links

- [Crypto 101](https://www.crypto101.io/)

## Fragen für morgen (und die weiteren Tage ;-))

- Digitale Souveränität / Self Custody
- Wie geht man mit kompromittierten Schlüsseln um?
