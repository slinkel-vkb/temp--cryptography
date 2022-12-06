# SSH Basics

Einen anderen Schlüssel benutzen:
```bash
ssh -i .ssh/anderer-schluessel [user]@[domain/IP]
```

```bash
ssh-copy-id -i .ssh/anderer-schluessel [user]@[domain/IP]
```

```bash
scp -i .ssh/anderer-schluessel ./local/path [user]@[domain/IP]:remote/path
```

