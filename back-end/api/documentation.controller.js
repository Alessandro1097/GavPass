var fs = require('fs');

module.exports = function (app) {

  app.get('/api/Documentation', function (req, res) {

    // TODO - documentation
    var main = fs.readFileSync('./pages/main.htm', 'utf8');
    var table = fs.readFileSync('./pages/table.htm', 'utf8');
    var api = fs.readFileSync('./pages/api.htm', 'utf8');

    var baseUrl = 'http://localhost:3000';

    var tables = '';
    var APIs = '';
    var newTable = '';
    var newApi = '';

    newTable = table.replace('{Entity}', "Categories");
    APIs = ''

    newApi = api;
    newApi = newApi.replace('{Description}', "Get all");
    newApi = newApi.replace('{Url}', baseUrl + "/api/Categories");
    newApi = newApi.replace('{Input}', "");
    newApi = newApi.replace('{Output}', JSON.stringify([
      {
        "_id": "5c241965cf159e1ce00a1e55",
        "name": "Email",
        "user": "master",
        "__v": 0
      },
      {
        "_id": "5c241965cf159e1ce00a1e58",
        "name": "Business",
        "user": "master",
        "__v": 0
      }
    ]
    ));
    APIs += newApi;

    newApi = api;
    newApi = newApi.replace('{Description}', "Get Name & Id");
    newApi = newApi.replace('{Url}', baseUrl + "/api/Categories/name");
    newApi = newApi.replace('{Input}', "");
    newApi = newApi.replace('{Output}', JSON.stringify([
      {
        "_id": "5c241965cf159e1ce00a1e55",
        "name": "Email"
      },
      {
        "_id": "5c241965cf159e1ce00a1e58",
        "name": "Business"
      }
    ]
    ));
    APIs += newApi;

    newApi = api;
    newApi = newApi.replace('{Description}', "Get by ID");
    newApi = newApi.replace('{Url}', baseUrl + "/api/Categories/getById/:id");
    newApi = newApi.replace('{Input}', "URL: api/Categories/getById/5c241965cf159e1ce00a1e55");
    newApi = newApi.replace('{Output}', JSON.stringify({
      "_id": "5c241965cf159e1ce00a1e55",
      "name": "Email",
      "user": "master",
      "__v": 0
    }
    ));
    APIs += newApi;

    newApi = api;
    newApi = newApi.replace('{Description}', "Get by Name");
    newApi = newApi.replace('{Url}', baseUrl + "/api/Categories/getByName/:name");
    newApi = newApi.replace('{Input}', "URL: api/Categories/getByName/Email");
    newApi = newApi.replace('{Output}', JSON.stringify({
      "_id": "5c241965cf159e1ce00a1e55",
      "name": "Email",
      "user": "master",
      "__v": 0
  }
  ));
    APIs += newApi;

    newApi = api;
    newApi = newApi.replace('{Description}', "Post Insert");
    newApi = newApi.replace('{Url}', baseUrl + "/api/Categories/save");
    newApi = newApi.replace('{Input}', JSON.stringify({
      "name": "Porn",
    "user": "master"
  }
  ));
    newApi = newApi.replace('{Output}', "1 document inserted");
    APIs += newApi;

    newApi = api;
    newApi = newApi.replace('{Description}', "Post Update");
    newApi = newApi.replace('{Url}', baseUrl + "/api/Categories/save");
    newApi = newApi.replace('{Input}', JSON.stringify({
      "_id": "5c241965cf159e1ce00a1e55",
      "name": "Google Mail"
    }
    ));
    newApi = newApi.replace('{Output}', "1 document updated");
    APIs += newApi;

    newApi = api;
    newApi = newApi.replace('{Description}', "Delete");
    newApi = newApi.replace('{Url}', baseUrl + "/api/Categories/delete/:id");
    newApi = newApi.replace('{Input}', "URL: api/Categories/delete/5c44e3f5c3172622349cab5a");
    newApi = newApi.replace('{Output}', JSON.stringify({
      "message": "1 document deleted"
  }
  ));
    APIs += newApi;

    tables += newTable.replace('{APIs}', APIs);


    newTable = table.replace('{Entity}', "Sites");
    APIs = ''

    newApi = api;
    newApi = newApi.replace('{Description}', "Get all");
    newApi = newApi.replace('{Url}', baseUrl + "/api/Sites");
    newApi = newApi.replace('{Input}', "");
    newApi = newApi.replace('{Output}', JSON.stringify([
      {
          "_id": "5c31353580c2251ed8802917",
          "url": "https://www.libero.it/",
          "name": "Libero",
          "category": "5c241965cf159e1ce00a1e55",
          "username": "g",
          "pwd": "passwordbella",
          "note": "Note importanti",
          "__v": 0
      },
      {
          "_id": "5c31355a80c2251ed8802918",
          "url": "https://www.gmail.com/",
          "name": "Gmail",
          "category": "5c241965cf159e1ce00a1e55",
          "username": "g",
          "pwd": "passwordbella",
          "note": "Note importanti",
          "__v": 0
      }
  ]
  ));
    APIs += newApi;

    newApi = api;
    newApi = newApi.replace('{Description}', "Get by ID");
    newApi = newApi.replace('{Url}', baseUrl + "/api/Sites/getById/:id");
    newApi = newApi.replace('{Input}', "URL: api/Sites/getById/5c31353580c2251ed8802917");
    newApi = newApi.replace('{Output}', JSON.stringify({
      "_id": "5c31353580c2251ed8802917",
      "url": "https://www.libero.it/",
      "name": "Libero",
      "category": "5c241965cf159e1ce00a1e55",
      "username": "g",
      "pwd": "passwordbella",
      "note": "Note importanti",
      "__v": 0
  }
  ));
    APIs += newApi;

    newApi = api;
    newApi = newApi.replace('{Description}', "Get by Category");
    newApi = newApi.replace('{Url}', baseUrl + "/api/Sites/getByCategory/:categoryName");
    newApi = newApi.replace('{Input}', "URL: api/Sites/getByCategory/Email");
    newApi = newApi.replace('{Output}', JSON.stringify([
      {
          "_id": "5c31353580c2251ed8802917",
          "url": "https://www.libero.it/",
          "name": "Libero",
          "category": "5c241965cf159e1ce00a1e55",
          "username": "g",
          "pwd": "passwordbella",
          "note": "Note importanti",
          "__v": 0
      },
      {
          "_id": "5c31355a80c2251ed8802918",
          "url": "https://www.gmail.com/",
          "name": "Gmail",
          "category": "5c241965cf159e1ce00a1e55",
          "username": "g",
          "pwd": "passwordbella",
          "note": "Note importanti",
          "__v": 0
      },
      {
          "_id": "5c43bea01b034932a07a2b6f",
          "user": "fissoDaFrontEnd@tuttomail.com",
          "url": "https://github.com/Alessandro1097/GavPass",
          "name": "GavPass GitHub",
          "category": "5c241965cf159e1ce00a1e55",
          "username": "Caaaaaav",
          "pwd": "ah",
          "note": "CAV è pazzo come un cavallo treno",
          "__v": 0
      }
  ]
  ));
    APIs += newApi;

    newApi = api;
    newApi = newApi.replace('{Description}', "Post Insert");
    newApi = newApi.replace('{Url}', baseUrl + "/api/Sites/save");
    newApi = newApi.replace('{Input}', JSON.stringify({
      "user": "prova@tuttomail.com",
      "url": "https://github.com/Alessandro1097/GavPass",
      "name": "YouPorn",
      "category": "5c241965cf159e1ce00a1e55",
      "username": "YP!!",
      "pwd": "password",
      "note": "@@"
    }
    ));
    newApi = newApi.replace('{Output}', JSON.stringify({
      "message": "1 document inserted"
  }
  ));
    APIs += newApi;

    newApi = api;
    newApi = newApi.replace('{Description}', "Post Update");
    newApi = newApi.replace('{Url}', baseUrl + "/api/Sites/save");
    newApi = newApi.replace('{Input}', JSON.stringify({
      "_id": "5c44ec46c3172622349cab5b",
      "url": "https://github.com/Alessandro1097/GavPass",
      "name": "YouPorn",
      "category": "5c241965cf159e1ce00a1e55",
      "username": "YP!!",
      "pwd": "password",
      "note": "@@"
    }
    ));
    newApi = newApi.replace('{Output}', JSON.stringify({
      "message": "1 document updated"
  }
  ));
    APIs += newApi;

    newApi = api;
    newApi = newApi.replace('{Description}', "Delete");
    newApi = newApi.replace('{Url}', baseUrl + "/api/Sites/delete/:id");
    newApi = newApi.replace('{Input}', "URL: api/Sites/delete/5c44ec46c3172622349cab5b");
    newApi = newApi.replace('{Output}', JSON.stringify({
      "message": "1 document deleted"
  }
  ));
    APIs += newApi;

    tables += newTable.replace('{APIs}', APIs);


    newTable = table.replace('{Entity}', "New");
    APIs = ''

    newApi = api;
    newApi = newApi.replace('{Description}', "");
    newApi = newApi.replace('{Url}', baseUrl + "");
    newApi = newApi.replace('{Input}', JSON.stringify());
    newApi = newApi.replace('{Output}', JSON.stringify());
    APIs += newApi;

    tables += newTable.replace('{APIs}', APIs);


    var html = main.replace('{Tables}', tables);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  });
};