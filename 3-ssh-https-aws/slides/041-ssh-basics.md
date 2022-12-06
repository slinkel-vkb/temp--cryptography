# SSH Basics

SSH-Schlüssel auf den Server kopieren:
```bash
ssh-copy-id [user]@[domain/IP]
```

- Nach dem Befehl ist kein User-Passwort mehr zum Login notwendig
  + Jedoch immernoch das Passwort des SSH-Schlüssels
- Dein öffentlicher Schlüssel wird auf dem Server unter `.ssh/authorized_keys` gespeichert


