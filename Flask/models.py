from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, String,DateTime
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import mapped_column
from typing import List
import logging
from sqlalchemy.orm import Mapped,relationship,sessionmaker
from sqlalchemy import UniqueConstraint,ForeignKey,create_engine
from datetime import datetime,timezone

class Base(DeclarativeBase):
  def __repr__(self):
    return f"{self.__class__.__name__}(id={self.id})"

db = SQLAlchemy(model_class=Base)

class Designation(Base):
  __tablename__="designation"
  __table_args__= (UniqueConstraint('name'),)
  id : Mapped[int] = mapped_column(primary_key=True)
  name : Mapped[str] = mapped_column(String(50))
  leaves_allotted : Mapped[int] =mapped_column()
  employee :Mapped[List["Employee"]] = relationship("Employee",back_populates="designation",cascade="all,delete-orphan")
  

class Employee(Base):
  __tablename__="employee"
  __table_args__= (UniqueConstraint('email','phone'),)
  id : Mapped[int] = mapped_column(primary_key=True)
  first_name : Mapped[str] = mapped_column(String(50))
  last_name : Mapped[str] = mapped_column(String(50))
  address : Mapped[str] = mapped_column(String(100))
  phone : Mapped[str] = mapped_column(String(20))
  email : Mapped[str] = mapped_column(String(50))
  designation_id : Mapped[int] = mapped_column(ForeignKey('designation.id'))
  created_at :Mapped[datetime] = mapped_column(default=lambda:datetime.now(timezone.utc),nullable=False)
  updated_at :Mapped[datetime] = mapped_column(default=lambda:datetime.now(timezone.utc),onupdate=lambda:datetime.now())
  deleted_at :Mapped[datetime] = mapped_column(nullable=True)
  designation:Mapped["Designation"] =relationship("Designation",back_populates='employee')
  leave : Mapped["Leave"] = relationship("Leave",back_populates="employees")


class Leave(Base):
  __tablename__="leave"
  __table_args__= (UniqueConstraint('employee_id'),)
  id : Mapped[int] = mapped_column(primary_key=True)
  employee_id : Mapped[int] = mapped_column(ForeignKey('employee.id'))
  leave_taken : Mapped[int] = mapped_column(default=0)
  employees : Mapped["Employee"] = relationship("Employee",back_populates='leave')

class Credential(Base):
    __tablename__="credential"
    __table_args__= (UniqueConstraint('username','_password'),)
    id : Mapped[int] = mapped_column(primary_key=True)
    username:Mapped[str] = mapped_column(String(30),nullable=False)
    _password:Mapped[str] = mapped_column(String(255),nullable=False)
    

def __init__(self, username, password):
        self.username = username
        self._password = password

def init_db(db_uri='postgresql://postgres:postgres@localhost:5432/flask_db'):
    logger = logging.getLogger("FlaskApp")
    engine = create_engine(db_uri)
    Base.metadata.create_all(engine)
    logger.info("Created database")

def get_session(db_uri):
    engine = create_engine(db_uri)
    Session = sessionmaker(bind = engine)
    session = Session()
    return session








