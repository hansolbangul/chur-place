# express node template

express node template is an express template based on jwt token.

# how to use

All packages must be installed with npm install before use.

```bash
npm install
```

# setting jwt secretkey

To use jwt token, you need to register your own secret key. It can be set through the environment variable .env file.

```bash
SECRETKEY=USERKEY
ISSUER=USERISS
```

# setting database

The express node template is written based on mysql DB. If you do not want to use it, you can remove the configuration file, and if you want to use it, you can use it through settings in the .env file.

```bash
HOSTNAME=USERHOST
PASSWORD=USERPASSWORD
USERNAME=USERNAME
DATABASE=USERDATABASE
```

