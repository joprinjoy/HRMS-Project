import flask
from flask import render_template,request,redirect,url_for,session,flash,make_response,jsonify
from sqlalchemy import select
from flask_sqlalchemy import SQLAlchemy
from models import *
from flask_cors import CORS,cross_origin


app = flask.Flask(__name__)

app.secret_key = 'qwerty'

# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:postgres@localhost:5432/flask_db"

# initialize the app with the extension
db.init_app(app)

@app.route('/')
def index():
   return "Hello all I am HR Management System"

@app.route("/login",methods = ['POST','GET'])   
def login():
    data = request.get_json()
    
    username = data.get('username')
    password = data.get('password')
    credential = db.session.query(Credential).filter_by(username=username).first()   
    if credential == None:
            # usname = request.cookies.get('username')
            # pswd = request.cookies.get('password')  
        return jsonify({"error": "Username not found"}), 400
    if username == credential.username and password == credential._password:
        session['user'] = credential.username
        print(session['user'])
        return jsonify({"message": 'Login Successful'}),200
                          
    else:
        return jsonify({"error": "Password error"}), 400  

@app.route('/addemployee',methods = ['POST'])
def addEmployee():
    data = request.get_json()
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    address = data.get('address')
    phone = data.get('phone')
    email = data.get('email')
    designation_name = data.get('designation')
    designation = db.session.query(Designation).filter_by(name = designation_name).first()
    if designation == None:
        return jsonify({"error": "Designation name not found"}), 400
    employee = Employee(first_name=first_name,last_name=last_name,address=address,phone=phone,email = email,designation_id = designation.id)
    db.session.add(employee)
    db.session.commit()
    return jsonify({"message": 'Employee added Successfully'}),200

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
                                    ,Leave.leave_taken).outerjoin(Designation,Employee.designation_id==Designation.id).outerjoin(Leave,Leave.employee_id==Employee.id)
    get_employee = db.session.execute(select_query).fetchall()
    print(get_employee)

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
    
    print(employee_data)
    return jsonify(employee_data)

@app.route('/updateemployee/<int:id>' ,methods=['PUT'])
def editEmployee(id):
    
    employee =db.session.query(Employee).filter_by(id= id).first()
    data = request.get_json()
    leaves_taken = data.get('leaves_taken')
    designation_name = data.get('designation',)
    designation = db.session.query(Designation).filter_by(name = designation_name).first()
    #taking leave table  data for employee
    leaves = db.session.query(Leave).filter_by(employee_id=id).first()
    # update query takes direct interaction with query result
    employee.id = data.get('id',employee.id)
    employee.first_name =data.get('first_name',employee.first_name)
    employee.last_name = data.get('last_name',employee.last_name)
    employee.address = data.get('address',employee.address)
    employee.phone = data.get('phone',employee.phone)
    employee.email = data.get('email',employee.email)
    employee.designation_id = designation.id
    db.session.commit()
    
    #updating leave table
    leaves.leave_taken = leaves_taken
    db.session.commit()
    return jsonify({"message":"Employee details updated successfully"})


@app.route('/designation')
def getDesignation():
    select_query = db.session.query(Designation)
    get_designation = db.session.execute(select_query).scalars()
    designation_data =[]
    for designation in get_designation:

        details = {
            
            'name':designation.name,
            'leaves_allottet' : designation.leaves_allotted,
        }
        designation_data.append(details)

    print(designation_data)
    return jsonify(designation_data)

@app.route('/adddesignation',methods=['POST'])
def addDesignation():
    data = request.get_json()
    name = data.get('name')
    leaves_allotted = data.get('leaves_allotted')
    designation = Designation(name=name,leaves_allotted=leaves_allotted)
    db.session.add(designation)
    db.session.commit()
    return jsonify({"message":"Designation added Succesfully"})

@app.route('/deletedesigantion',methods=['POST'])
def deleteDesignation():
    data = request.get_json()
    designationId =data['id']
    designation =db.session.query(Designation).filter_by(id=designationId).first()
    db.session.delete(designation)
    db.session.commit()
    return jsonify({'message':"designation deleted succesfully"})
    









    
    



with app.app_context():
    db.create_all()

if __name__ == "__main__":
  init_db()
  app.run(debug=True,port=5005)