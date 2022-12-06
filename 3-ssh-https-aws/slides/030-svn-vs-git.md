# SVN vs. Git
<style>
table, th, td {
  border:1px solid white;
}
table {
    width: 100%;
}
td {
    text-align: center;
}
</style>
<table>
<tr><th>SVN</th><th>Git</th></tr>
<tr><td>centralized</td><td>decentralized</td></tr>
<tr><td>branches are directories inside of repository</td><td>branches are references to a commit</td></tr>
<tr><td>built-in AC per file</td><td>usually AC per repository (not really part of git, but rather the server hosting it)</td></tr>
<tr><td>natively handles binaries quite well</td><td>natively struggles with binaries</td></tr>
</table>