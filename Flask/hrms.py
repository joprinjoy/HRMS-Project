import flask
from flask import request,session,jsonify,session
from models import *
from flask_cors import CORS,cross_origin
import datetime as dt
# from flask_bcrypt import Bcrypt 
import bcrypt


app = flask.Flask(__name__)

app.secret_key = 'qwerty'

# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:postgres@localhost:5432/flask_db"

# initialize the app with the extension
db.init_app(app)


CORS(app)

#  Bcrypt object and pass our Flask app as an argument.
# bcrypt = Bcrypt(app) 

now = dt.datetime.now(dt.timezone.utc).isoformat() 

@app.route('/')
def index():
   return "Hello all I am HR Management System"

@app.route("/login",methods = ['POST'])   
@cross_origin()
def login():
    data = request.get_json()
    # breakpoint()
    uname = data.get('username')
    password = data.get('password')
    if not uname:
        return jsonify({
            "data":{},
            "status": False,
            "status_message":"Enter username",
            "timestamp":now}), 400 
    if not password:
        return jsonify({
            "data":{},
            "status": False,
            "status_message":"Enter password",
            "timestamp":now}), 400 

    credential = db.session.query(Credential).filter_by(username=uname).first()  
    if credential == None: 
        return jsonify({
            "data":{},
            "status": False,
            "status_message":"Username not Found",
            "timestamp":now}), 400 
    role = credential.role
    #check_password method woks with flask only

    # is_valid = bcrypt.check_password_hash(credential._password, password)
    is_valid= bcrypt.checkpw(password.encode('utf-8'), credential._password.encode('utf-8'))
    print(is_valid)
    if is_valid:
        session['user'] = credential.username
        session['user_id'] = credential.id
        
        return jsonify({
            "data":{'user':session['user'],'user_id':session['user_id'],'role':role.value},
            "status": True,
            "status_message":"Login Successful",
            "timestamp":now}), 200
    return jsonify({
        "data":{},
        "status": False,
        "status_message":"Incorrect Password ",
        "timestamp":now}), 400  
    


@app.route('/addemployee',methods = ['POST'])
@cross_origin()
def addEmployee():
    data = request.get_json()
    
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    address = data.get('address')
    phone = data.get('phone')
    email = data.get('email')
    designation = data.get('designation')
    if not all([first_name,last_name,designation,phone,email,address]):
        return jsonify({
            "data":{},
            "status": True,
            "status_message":"Fill all the fields",
            "timestamp":now}), 400
    
    employee = db.session.query(Employee).filter_by(phone=phone).first()
    if employee:
        return jsonify({
            "data":{},
            "status": False,
            "status_message":"Phone number already exist",
            "timestamp":now}), 400
    employee = db.session.query(Employee).filter_by(email=email).first()
    if employee:
        return jsonify({
            "data":{},
            "status": False,
            "status_message":"Email already exist",
            "timestamp":now}), 400


    designation = db.session.query(Designation).filter_by(name = designation).first()
    if designation == None:
        return jsonify({
            "data":{},
            "status": False,
            "status_message":"Designation name not found",
            "timestamp":now}), 200
    employee = Employee(first_name=first_name,last_name=last_name,address=address,phone=phone,email = email,designation_id = designation.id)
    db.session.add(employee)
    db.session.commit()
    leave = Leave(employee_id = employee.id)
    db.session.add(leave)
    db.session.commit()
    if leave:
        return jsonify({
                "data":{},
                "status": True,
                "status_message":"Employee Added Successfully",
                "timestamp":now}), 200 
    return jsonify({
                "data":{},
                "status": False,
                "status_message":"Error adding employee",
                "timestamp":now}), 400 

@app.route('/employee')
@cross_origin()
def getEmployee():
    select_query = db.session.query(Employee.id,
                                    Employee.first_name,
                                    Employee.last_name,
                                    Employee.address,
                                    Employee.phone,
                                    Employee.email,
                                    Designation.name,
                                    Designation.leaves_allotted
                                    ,Leave.leave_taken).outerjoin(Designation,Employee.designation_id==Designation.id).outerjoin(
                                    Leave,Leave.employee_id==Employee.id).filter(
                                    Employee.deleted_at == None)
    
    get_employee = db.session.execute(select_query).fetchall()
    employee_data =[]
    for employee in get_employee:
        details = {
        'id' : employee.id,
        'first_name' :employee.first_name,
        'last_name' : employee.last_name,
        'address' : employee.address,
        'phone': employee.phone,
        'email': employee.email,
        'designation':employee.name,
        'leaves_allotted': employee.leaves_allotted,
        'leaves_taken' : employee.leave_taken
        }
        employee_data.append(details)
    return jsonify({
            "data":{"data":employee_data},
            "status": True,
            "status_message": "Data Send Successfully ",
            "timestamp":now}), 200

@app.route('/updateemployee',methods=['PUT'])
@cross_origin()
def editEmployee():
    data = request.get_json()
    emp_id = data.get('id')
    employee =db.session.query(Employee).filter_by(id = emp_id).first()
    first_name = data.get('first_name')
    last_name =data.get('last_name')
    designation = data.get('designation')
    phone = data.get('phone')
    email =data.get('email')
    address = data.get('address')
    leaves_taken = data.get('leaves_taken')

    #setting leaves a number to perform validation
    if leaves_taken ==0:
        leaves_taken =1
    if not all([first_name,last_name,designation,phone,email,address,leaves_taken]):
            
            return jsonify({
            "data":{},
            "status": False,
            "status_message": "Fill all fields ",
            "timestamp":now}), 400
    
    #setting back to original data
    leaves_taken = data.get('leaves_taken')
    try:
            leaves_taken = float(leaves_taken)
    except:
            return jsonify({
            "data":{},
            "status": False,
            "status_message": "Leaves Should be Integer ",
            "timestamp":now}), 400
    
    #make sure leaves data is integer
    leaves_taken = int(leaves_taken)
    designation = db.session.query(Designation).filter_by(name = designation).first()
    #taking leave table  data for employee
    leaves = db.session.query(Leave).filter_by(employee_id= emp_id).first()
    leaves_id = leaves.id
    # update query takes direct interaction with query result
    employee.id = data.get('id',employee.id)
    employee.first_name =data.get('first_name',employee.first_name)
    employee.last_name = data.get('last_name',employee.last_name)
    employee.address = data.get('address',employee.address)
    employee.phone = data.get('phone',employee.phone)
    employee.email = data.get('email',employee.email)
    employee.designation_id = designation.id
    db.session.commit()
    #Permiting the no of days of leave
    if leaves_taken<designation.leaves_allotted:
       leaves.id = leaves_id
       leaves.leave_taken = leaves_taken
       db.session.commit()
       return jsonify({
            "data":{},
            "status": True,
            "status_message": " Employee details updated successfully ",
            "timestamp":now}), 200
    return jsonify({
            "data":{},
            "status": False,
            "status_message": " Employee exceeded allotted casual Leaves",
            "timestamp":now}), 400
    
@app.route('/delete/employee',methods=['POST'])
@cross_origin()
def deleteEmployee():
    data = request.get_json()
    now = dt.datetime.now(dt.timezone.utc).isoformat() 
    employeeId =data['id']
    try:
        employee =db.session.query(Employee).filter_by(id=employeeId).first()
    except:
        return jsonify({
            "data":{},
            "status": True,
            "status_message": "Error Deleting employee",
            "timestamp":now}), 400

    employee.deleted_at =  now
    db.session.commit()
    return jsonify({
            "data":{},
            "status": True,
            "status_message": "Employee Deleted",
            "timestamp":now}), 200


@app.route('/designation')
@cross_origin()
def getDesignation():
    select_query = db.session.query(Designation)
    get_designation = db.session.execute(select_query).scalars()
    designation_data =[]
    for designation in get_designation:

        details = {
            'id' : designation.id,
            'name':designation.name,
            'leaves_allotted' : designation.leaves_allotted,
        }
        designation_data.append(details)
    return jsonify({
            "data":{"data":designation_data},
            "status": True,
            "status_message": "Data Send Successfully ",
            "timestamp":now}), 200

@app.route('/adddesignation',methods=['POST'])
@cross_origin()
def addDesignation():
    data = request.get_json()
    name = data.get('name')
    leaves_allotted = data.get('leaves_allotted')
    if not all([name,leaves_allotted]):
        return jsonify({
            "data":{},
            "status": False,
            "status_message": " Fill all the fields",
            "timestamp":now}), 400
    designation = db.session.query(Designation).filter_by(name = name).first()
    if designation == None:
        designation = Designation(name=name,leaves_allotted=leaves_allotted)
        db.session.add(designation)
        db.session.commit()
        return jsonify({
                "data":{},
                "status": True,
                "status_message": " Designation added Succesfully",
                "timestamp":now}), 200
    return jsonify({
                "data":{},
                "status": False,
                "status_message": " Designation already Exist",
                "timestamp":now}), 400

@app.route('/updatedesignation',methods = ['PUT'])
@cross_origin()
def updateDesignation(): 
    data = request.get_json()
    id = data.get('id')
    name = data.get('name')
    leaves_allotted =data.get('leaves_allotted')
    if not all([name,leaves_allotted]):
        return jsonify({
            "data":{},
            "status": False,
            "status_message": "Fill all fields ",
            "timestamp":now}), 400

    designation = db.session.query(Designation).filter_by(id =id).first()
    if designation == None:
        return jsonify({
            "data":{},
            "status": False,
            "status_message":"Something went wrong while sending update",
            "timestamp":now}), 400
    designation.id = data.get('id',designation.id)
    designation.name = data.get('name',designation.name)
    designation.leaves_allotted = data.get('leaves_allotted',designation.leaves_allotted)
    db.session.commit()
    return jsonify({
            "data":{},
            "status": True,
            "status_message":"Designation Updated Successfully",
            "timestamp":now}), 200 


@app.route('/deletedesigantion',methods=['POST'])
@cross_origin()
def deleteDesignation():
    data = request.get_json()
    designationId =data['id']
    designation =db.session.query(Designation).filter_by(id=designationId).first()
    db.session.delete(designation)
    db.session.commit()
    return jsonify({
            "data":{},
            "status": True,
            "status_message": "Data deleted Successfully ",
            "timestamp":now}), 200

#used with thirdparty tools
@app.route('/registeruser',methods = ['POST'])
@cross_origin()
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not all([username,password]):
        return jsonify({
            "data":{},
            "status": False,
            "status_message": " Fill all the fields",
            "timestamp":now}), 400
    username = data.get('username')
    password = data.get('password')
    # hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    # Create a new user
    new_user = Credential(username=username, password=hashed_password,role=UserRole.USER)
    # Add the new user to the database
    db.session.add(new_user)
    db.session.commit()
    return jsonify({
            "data":{},
            "status": True,
            "status_message": "User registered Successfully ",
            "timestamp":now}), 200


@app.route('/user')
@cross_origin()
def getUser():
    select_query = db.session.query(Credential)
    get_user = db.session.execute(select_query).scalars()
    user_data =[]
    for user in get_user:

        details = {
            'id':user.id,
            'username':user.username,
            'role':user.role.value    
        }
        user_data.append(details)
    return jsonify({
            "data":{"data":user_data},
            "status": True,
            "status_message": "Data Send Successfully ",
            "timestamp":now}), 200


@app.route('/logout',methods=['POST'])
@cross_origin()
def logout():
    user_id = session.get('user_id')
    session.pop('username', None)
    session.pop('user_id', None)   
    return jsonify({
            "data":{},
            "status": True,
            "status_message": "Logged out successfully",
            "timestamp":now}), 204



with app.app_context():
    db.create_all()

if __name__ == "__main__":
  init_db()
  app.run(debug=True,port=5000)