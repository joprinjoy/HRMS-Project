# HRMS-Project

- _Currrent credentials to login:_
- username:hr@company.com ,
  password:hrpassword
  
- _To register a new user Login use any third party tool like postman :_

   _Endpoint_: `http://127.0.0.1:5000/registeruser`

- _Json data model:_

    {
    username:"hr@company.com ",

    password:"hrpassword"
    }

- _Make sure a user is created before login._

- _Flask Running_ on http://127.0.0.1:5000.

- `requirements.txt` file attched to install all required packages for flask.
- _navigate to Flask/ and run_
- `. .venv/bin/activate` (`any virtual environemt can use`)
- `pip install -r requirements.txt`
- `flask --app hrms run --debug`

- **Unit Test :-**
- _create a new database and setup in in hrms.py and models to avoid losing project data_
- _navigate to Flask folder/_
- _follow the commands_
-  `pip install coverage`
- `coverage run -m unittest discover`
- `coverage report`
- `coverage html`
  



  

