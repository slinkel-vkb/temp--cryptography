# Protokolle über SSH

Git über SSH:

Bare Repository anlegen (auf dem Server):

```bash
mkdir [reponame]
cd [reponame]
git init --bare
```

- Legt ein `bare` Repository an
  + enthält nur das, was man lokal im `.git` Order hat
- Kann über ssh geclont werden
