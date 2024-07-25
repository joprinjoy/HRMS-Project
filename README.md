# HRMS-Project

**Setup and run Flask:-**

- _Flask Running_ on http://127.0.0.1:5000.
- `requirements.txt` file attched to install all required packages for flask.
- _navigate to Flask/ and run_
- `. .venv/bin/activate` (`any virtual environemt can use`)
- `pip install -r requirements.txt`
- `flask --app hrms run --debug`
- _close the flask program using_ `ctrl+c` 
- _configure the file named_ register_admin.py _with db name,username,password etc_
- _run the file_
- `python3 register_admin.py`
- _now run the flask again_
- `flask --app hrms run --debug`


 **React:-**
- _To run vite-react app,navigate to react app folder and run this command_
- `npm install`
- `npm run dev`


 **Unit Test :-**
- _create a new database and setup in in hrms.py and models to avoid losing project data_
- _navigate to Flask folder/_
- _follow the commands_
-  `pip install coverage`
- `coverage run -m unittest discover`
- `coverage report`
- `coverage html`


  **In the browser:-**
- _Currrent admin credentials to login:_
  
- username:admin@company.com

  
  password:admin

-Designations can be added from `Admin Tools` in the appbar.


-_Atleast one designation should be added before adding user_
  



  

