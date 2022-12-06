# SSH Basics

Alias für Server einrichten:

`.ssh/config`:
```
Host [alias_name]
    User [user]
    HostName [domain/IP]
```

Zum Server verbinden:
```bash
ssh [alias_name]
```
