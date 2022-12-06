# SSH für Sysadmins

fail2ban:

- Es gibt viele Bots die IP-Adressen großer Hosten nach schwachen SSH Logins scannen
- fail2ban bannt diese Bots nach zu vielen falschen Loginveruchen
- fail2ban hat eine gute Standardconfig
  + in der Regel reicht es einfach fail2ban zu installieren
  + `apt install fail2ban` auf Debian-Derivaten (unter anderem Ubuntu)

