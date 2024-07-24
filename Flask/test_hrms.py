import unittest
from hrms import app, db,bcrypt
from models import Credential,Designation,Employee,Leave,UserRole
from flask import json,session


class TestLogin(unittest.TestCase):
    def setUp(self):

        self.app = app
        self.app_context = self.app.app_context()
        self.app_context.push()

        self.client = self.app.test_client()
        self.app.testing = True

        db.create_all()

        self.test_username = 'testuser'
        self.test_password = 'password123'

        hashed_password = bcrypt.hashpw(self.test_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        self.test_user = Credential(username=self.test_username,password =hashed_password,role=UserRole.USER)        
        db.session.add(self.test_user)
        db.session.commit 

    def tearDown(self):
        # # db.session.remove()
        # db.session.delete(self.test_user)
        # db.session.commit()
        db.session.remove()
        db.drop_all()

        # Pop the application context
        self.app_context.pop()

    
    def test_login_successful(self):
        response = self.client.post('/login', json={
            'username': self.test_username,
            'password': self.test_password
        })
        print(response.data,"response")
        # data = response.get_json()
        data = json.loads(response.data.decode('utf-8')) 
        self.assertEqual(data["status_message"],"Login Successful")


    def test_wrong_password(self):
       response = self.client.post('/login', json={
            'username': self.test_username,
            'password': "test"
            })
       data =json.loads(response.data.decode('utf-8'))
       self.assertEqual(data['status_message'],"Incorrect Password ")

    def test_wrong_username(self):
        response = self.client.post('/login', json={
            'username': "user",
            'password': self.test_password
            })
        data =json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['status_message'],"Username not Found")

    def test_empty_username_field(self):
        response = self.client.post('/login', json={
            'password':self.test_password
            
            })
        data =json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['status_message'],"Enter username")   

    def test_empty_password_field(self):
        response = self.client.post('/login', json={
            'username':self.test_username
            
            })
        data =json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['status_message'],"Enter password")   
     
     
class TestAddEmployee(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app_context = self.app.app_context()
        self.app_context.push()

        self.client = self.app.test_client()
        self.app.testing = True
        db.create_all()

        
        self.test_designation = Designation(name='Trainee',leaves_allotted='10')        
        db.session.add(self.test_designation)
        db.session.commit

    def tearDown(self):
        # # db.session.remove()
        # db.session.delete(self.test_user)
        # db.session.commit()
        db.session.remove()
        db.drop_all()

        # Pop the application context
        self.app_context.pop()
    
    def test_add_employee_wrong_designation(self):
        response = self.client.post('/addemployee', json={ 
            'first_name': "Joprin",
            'last_name': "Joy",
            'address': "Madhurayil puthen purayil",
            'phone': "9544846842",
            'email': "joprinjoy3@gmail.com",
            'designation': 'tester'
        })
        
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['status_message'], "Designation name not found")

    def test_add_employee_success(self):
        response = self.client.post('/addemployee', json={ 
            'first_name': "Joprin",
            'last_name': "Joy",
            'address': "Madhurayil puthen purayil",
            'phone': "9544846842",
            'email': "joprinjoy3@gmail.com",
            'designation': 'Trainee'
        })

        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['status_message'], "Employee Added Successfully")

    def test_add_employee_no_data(self):
        response = self.client.post('/addemployee', json={ 
            
        })

        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['status_message'], "Fill all the fields")

    def test_add_employee_missing_data(self):
        response = self.client.post('/addemployee', json={ 
            'first_name': "Joprin",
            'last_name': "Joy",
            'address': "Madhurayil puthen purayil",
            'phone': "9544846842",
            'email': "joprinjoy3@gmail.com",
            
        })

        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['status_message'], "Fill all the fields")  


    def test_add_employee_same_phone(self):
        #adding one employee to exist
        self.test_employee = Employee(first_name='Joprin',
                                  last_name='Joy',
                                  address='Madhurayil puthen purayil',
                                  phone='9544846842',
                                  email='joprinjoy3@gmail.com',
                                  designation_id=1,
                                  )        
        db.session.add(self.test_employee)
        db.session.commit


        response = self.client.post('/addemployee', json={ 
            'first_name': "Joprin",
            'last_name': "Joy",
            'address': "Madhurayil puthen purayil",
            'phone': "9544846842",
            'email': "joprinjoy3@gmail.com",
            'designation': 'Trainee'
            
        })
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['status_message'], "Phone number already exist")  

    def test_add_employee_same_email(self):
        #adding one employee to exist
        self.test_employee = Employee(first_name='Joprin',
                                  last_name='Joy',
                                  address='Madhurayil puthen purayil',
                                  phone='9544846842',
                                  email='joprinjoy3@gmail.com',
                                  designation_id=1,
                                  )        
        db.session.add(self.test_employee)
        db.session.commit


        response = self.client.post('/addemployee', json={ 
            'first_name': "Joprin",
            'last_name': "Joy",
            'address': "Madhurayil puthen purayil",
            'phone': "9556748654",
            'email': "joprinjoy3@gmail.com",
            'designation': 'Trainee'
            
        })
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['status_message'], "Email already exist")  



class TestEditEmployee(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app_context = self.app.app_context()
        self.app_context.push()

        self.client = self.app.test_client()
        self.app.testing = True
        db.create_all()

        #test designation
        self.test_designation = Designation(name='Trainee',leaves_allotted='10')        
        db.session.add(self.test_designation)
        db.session.commit

        #test employee
        self.test_employee = Employee(first_name='Joprin',
                                  last_name='Joy',
                                  address='Madhurayil puthen purayil',
                                  phone='9544846842',
                                  email='joprinjoy3@gmail.com',
                                  designation_id=1,
                                  )
                
        db.session.add(self.test_employee)
        db.session.commit
        self.test_leave = Leave(employee_id=1,
                                  leave_taken=1,
                                  )
        db.session.add(self.test_leave)
        db.session.commit

    def tearDown(self):
        # # db.session.remove()
        # db.session.delete(self.test_user)
        # db.session.commit()
        db.session.remove()
        db.drop_all()

        # Pop the application context
        self.app_context.pop()

    
    def test_update_employee_success(self):
        print(self.test_employee.id)
        response = self.client.put('/updateemployee', json={ 
            'id':1,
            'first_name': "Joprin",
            'last_name': "J",
            'address': "Madhurayil puthen purayil",
            'phone': "9556748654",
            'email': "joprinjoy3@gmail.com",
            'designation': 'Trainee',
            'leaves_taken':"2"
            
        })
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['status_message'], " Employee details updated successfully ")

    def test_update_employee_blank_field(self):
        print(self.test_employee.id)
        response = self.client.put('/updateemployee', json={ 
            'id':1,
            'first_name': "Joprin",
            'last_name': "J",
            'address': "Madhurayil puthen purayil",
            'phone': "9556748654",
            'email': "joprinjoy3@gmail.com",
            'designation': 'Trainee',
            
            
        })
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['status_message'], "Fill all fields ")  

    def test_update_employee_non_integer_leave(self):
        response = self.client.put('/updateemployee', json={ 
            'id':1,
            'first_name': "Joprin",
            'last_name': "J",
            'address': "Madhurayil puthen purayil",
            'phone': "9556748654",
            'email': "joprinjoy3@gmail.com",
            'designation': 'Trainee',
            'leaves_taken':"two"
            
            
        })
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['status_message'], "Leaves Should be Integer ")  
    
    def test_update_employee_exceed_leave(self):
        response = self.client.put('/updateemployee', json={ 
            'id':1,
            'first_name': "Joprin",
            'last_name': "J",
            'address': "Madhurayil puthen purayil",
            'phone': "9556748654",
            'email': "joprinjoy3@gmail.com",
            'designation': 'Trainee',
            'leaves_taken':"20"
            
            
        })
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['status_message'], " Employee exceeded allotted casual Leaves") 


class TestGetEmployee(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app_context = self.app.app_context()
        self.app_context.push()

        self.client = self.app.test_client()
        self.app.testing = True
        db.create_all()

        #test designation
        self.test_designation = Designation(name='Trainee',leaves_allotted='10')        
        db.session.add(self.test_designation)
        db.session.commit

        #test employee
        self.test_employee = Employee(first_name='Joprin',
                                  last_name='Joy',
                                  address='Madhurayil puthen purayil',
                                  phone='9544846842',
                                  email='joprinjoy3@gmail.com',
                                  designation_id=1,
                                  )
                
        db.session.add(self.test_employee)
        db.session.commit
        self.test_leave = Leave(employee_id=1,
                                  leave_taken=1,
                                  )
        db.session.add(self.test_leave)
        db.session.commit

    def tearDown(self):
        # # db.session.remove()
        # db.session.delete(self.test_user)
        # db.session.commit()
        db.session.remove()
        db.drop_all()

        # Pop the application context
        self.app_context.pop()


    def test_get_employee_succes(self):
        response=self.client.get('/employee')
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['status_message'], "Data Send Successfully ")


class TestAdDesignation(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app_context = self.app.app_context()
        self.app_context.push()

        self.client = self.app.test_client()
        self.app.testing = True
        db.create_all()

        #test designation
        self.test_designation = Designation(name='Trainee',leaves_allotted='10')        
        db.session.add(self.test_designation)
        db.session.commit

        
    def tearDown(self):
        # # db.session.remove()
        # db.session.delete(self.test_user)
        # db.session.commit()
        db.session.remove()
        db.drop_all()

    def test_add_designation_success(self):
        response = self.client.post('/adddesignation',json={ 
            'name': "Trainee",
            'leaves_allotted': "10",     
        })
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['status_message'], " Designation already Exist")

    def test_add_designation_duplicate(self):
        response = self.client.post('/adddesignation',json={ 
            'name': "Tester",
            'leaves_allotted': "20",     
        })
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['status_message'], " Designation added Succesfully")
    
    def test_add_designation_missing_fields(self):
        response = self.client.post('/adddesignation',json={ 
            'name': "Teester",
                
        })
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['status_message'], " Fill all the fields")

    
class TestUpdateDesignation(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app_context = self.app.app_context()
        self.app_context.push()

        self.client = self.app.test_client()
        self.app.testing = True
        db.create_all()

        #test designation
        self.test_designation = Designation(name='Trainee',leaves_allotted ='10')        
        db.session.add(self.test_designation)
        db.session.commit

        
    def tearDown(self):
        db.session.remove()
        db.drop_all()

    
    def test_update_designation_success(self):
            response = self.client.put('/updatedesignation', json={
                'id': "1",
                'name': "Trainee",
                'leaves_allotted': "10",
            })

            data = json.loads(response.data.decode('utf-8'))
            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['status_message'], "Designation Updated Successfully")

    def test_update_designation_empty_field(self):
            response = self.client.put('/updatedesignation', json={
                'id': "1",
                'name': "Trainee",
                
            })

            data = json.loads(response.data.decode('utf-8'))
            self.assertEqual(data['status_message'], "Fill all fields ")

    def test_update_designation_empty_unknown_id(self):
            response = self.client.put('/updatedesignation', json={
                
                'name': "Trainee",
                'leaves_allotted': "10",
                
            })

            data = json.loads(response.data.decode('utf-8'))
            self.assertEqual(data['status_message'], "Something went wrong while sending update")
    
           
class TestDeleteEmployee(unittest.TestCase):
    def setUp(self):
            self.app = app
            self.app_context = self.app.app_context()
            self.app_context.push()

            self.client = self.app.test_client()
            self.app.testing = True
            db.create_all()

            #test designation
            self.test_designation = Designation(name='Trainee',leaves_allotted='10')        
            db.session.add(self.test_designation)
            db.session.commit

            #test employee
            self.test_employee = Employee(first_name='Joprin',
                                    last_name='Joy',
                                    address='Madhurayil puthen purayil',
                                    phone='9544846842',
                                    email='joprinjoy3@gmail.com',
                                    designation_id=1,
                                    )
            
                    
            db.session.add(self.test_employee)
            db.session.commit
           
    def tearDown(self):
            
            db.session.remove()
            db.drop_all()

            # Pop the application context
            self.app_context.pop()

    def test_delete_employee_success(self):
            response = response = self.client.post('/delete/employee',json={
                "id":"1"
            })
            data = json.loads(response.data.decode('utf-8'))
            self.assertEqual(data['status_message'], "Employee Deleted")

    def test_delete_employee_Iderror(self):
            response = response = self.client.post('/delete/employee',json={
                "id":""
            })
            data = json.loads(response.data.decode('utf-8'))
            self.assertEqual(data['status_message'], "Error Deleting employee")

class TestGetDesignation(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app_context = self.app.app_context()
        self.app_context.push()

        self.client = self.app.test_client()
        self.app.testing = True
        db.create_all()

        #test designation
        self.test_designation = Designation(name='Trainee',leaves_allotted='10')        
        db.session.add(self.test_designation)
        db.session.commit


    def tearDown(self):
            
            db.session.remove()
            db.drop_all()

            # Pop the application context
            self.app_context.pop()

    def test_get_designation_succes(self):
        response=self.client.get('/designation')

        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['status_message'], "Data Send Successfully ")

class TestDeleteDesignations(unittest.TestCase):
    def setUp(self):
            self.app = app
            self.app_context = self.app.app_context()
            self.app_context.push()

            self.client = self.app.test_client()
            self.app.testing = True
            db.create_all()

            #test designation
            self.test_designation = Designation(name='Trainee',leaves_allotted='10')        
            db.session.add(self.test_designation)
            db.session.commit      
           
    def tearDown(self):
            db.session.remove()
            db.drop_all()
            # Pop the application context
            self.app_context.pop()

    def test_delete_designation_success(self):
            response = response = self.client.post('/deletedesigantion',json={
                "id":"1"
            })
            data = json.loads(response.data.decode('utf-8'))
            self.assertEqual(data['status_message'], "Data deleted Successfully ")

class TestRegisterCredentials(unittest.TestCase):
    def setUp(self):

        self.app = app
        self.app_context = self.app.app_context()
        self.app_context.push()

        self.client = self.app.test_client()
        self.app.testing = True

        db.create_all()


    def tearDown(self):
        db.session.remove()
        db.drop_all()

        # Pop the application context
        self.app_context.pop()

    
    def test_register_successful(self):
        response = self.client.post('/registeruser', json={
            'username': "admin@company.com",
            'password': "admin"
        })
        data = json.loads(response.data.decode('utf-8')) 
        self.assertEqual(data["status_message"],"User registered Successfully ")



class TestGetUser(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app_context = self.app.app_context()
        self.app_context.push()

        self.client = self.app.test_client()
        self.app.testing = True
        db.create_all()

        #test credential
        password = 'test'
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        self.test_user = Credential(username='test@company.com', password=hashed_password,role=UserRole.ADMIN)
        db.session.add(self.test_user)
        db.session.commit()
        
        


    def tearDown(self):
            
            db.session.remove()
            db.drop_all()

            # Pop the application context
            self.app_context.pop()

    def test_get_user_succes(self):
        response=self.client.get('/user')

        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['status_message'], "Data Send Successfully ")

class TestLogout(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app_context = self.app.app_context()
        self.app_context.push()

        self.client = self.app.test_client()
        self.app.testing = True

        db.create_all()

        # Create a test user
        password = 'admin'
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        self.test_user = Credential(username='admin@company.com', password=hashed_password,role=UserRole.ADMIN)
        db.session.add(self.test_user)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def login(self):
        response = self.client.post('/login', json={
            'username': 'admin@company.com',
            'password': 'admin'
        })
        return response

    def test_logout_successful(self):
        # Mock user login
        login_response = self.login()
        self.assertEqual(login_response.status_code, 200)

        with self.client.session_transaction() as sess:
            sess['user_id'] = self.test_user.id
            sess['username'] = self.test_user.username

        # Test logout
        logout_response = self.client.post('/logout')
        self.assertEqual(logout_response.status_code, 204)











