# SSH Basics

Einloggen:
```bash
ssh [user]@[domain/IP]
```

- Beim ersten Einloggen muss der `fingerprint` des Servers verifiziert werden
  + verifizierter Schlüssel wird unter `.ssh/known_hosts` gespeichert
- Wenn noch kein SSH-Key beim Server hinterlegt ist, muss mit dem Passwort authentifiziert werden

`fingerprint` unseres Servers

```
256 SHA256:R0YldyBThMBP2Fm3knqeBd3g3vyAiJWEChosgdp8jg8 root@ubuntu-2gb-fsn1-1 (ED25519)
```
