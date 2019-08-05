# GavPass

## Description

GavPass is a software that allows you to store all your personal data (access credentials and personal notes) safely.

The application have a few but important point.
As startpage (homepage) you have the categories that contains all of your site, from here you can add a site clicking the + button, this will open a dialog that allow you to add the site by insert some information as: name of the site, url, username and password.
You can do the same inside a category.
You can also delete and update your site.

## Technical description

We decided to use NodeJs as backend and as a frontend we decided to use Angular 7.

To start using the application you have to download node: <https://nodejs.org/it/>
To start the frontend go to the folder front-end and run: <b>npm install</b>, and after that <b>ng serve -o</b>.
To start the backend go to the folder backend and run: <b>npm install</b>, and after that <b>node index.js</b>.

Once you have done that you'll be able to use GavPass.

# Per Alessandro
TODO : 
- cerca che mostra sia siti che categorie
- handling of untagged category
- trash (mostly backend)

FIXME:
- validazione del form modifica sito da correggere e controlli che bloccano il continua in caso di errore
