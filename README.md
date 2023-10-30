# Demonstration of django_schema

Inspired by djantic.  

### Project Goal:
Define script that uses Pydantic's create_model and a group of functions that loop through a django models.Model fields to create a Pydantic Base Model (DjangoSchema) for the models.Model.

**DEVELOPMENT IN PROGRESS**

Optionally, the function accepts configuration information  that can be used to customize the schema and include class/instance methods and properties from the models.Model.

### Overall Guidance
Use only public classes, methods, and functions from Pydantic: Successful

Use only one internal class method in django (models._meta.get_fields()): Successful

Allow for creation of multiple Pydantic Base Models for a given django models.Model, using Pydantic's normal __base__ kwarg to create_model with the field inheritance it facilitates

### Desired Functionality:
Support all pydantic BaseModel configuration options: Incomplete, not all pydantic create_model and Field options supported.

Support creating BaseModel Fields for django Model, classmethods, properties, and instance methods:  Incomplete, needs addt'l configuraiton options supported.

### Current Issues
Support for multiple DjangoSchema's for a django Model is working but... requires a call to model_rebuild() for all additional DjangoSchemas created with ForwardRefs (all DjangoSchemas that contain related fields: FK, M2M, O2O) or an exception is raised that the related DjangoSchema does not exist at server startup.

If an exception is returned when creating new objects through a POST, FastAPI returns an Internal Server Error, instead of the actual error guidance.  NEED to understand how to incorporate django model validation (unique fields or Constraints on multiple unique fields)

## How to see django_schema in action:
Download source and place in a python3.11 virtual environment.
run:

`pip install -r requirements.txt`

`python manage.py migrate`

`python manage.py createsuperuser`

`python manage.py createfoobardata`

`python manage.py runserver`

This will launch the django app at localhost:

go to: http://1270.0.1:8000/admin

Log in the credentials used in `createsuperuser`

Add some Bazzes to a Foo through the admin interface.

Press: `ctrl + c` in the termnial to stop the django dev server

run `uvicorn main:app --reload` to start the FastApi Server

go to:

http://127.0.0.1:8000/api/foos

http://127.0.0.1:8000/api/foos/1

http://127.0.0.1:8000/api/bars

http://127.0.0.1:8000/api/bazzes

http://127.0.0.1:8000/api/bazzes/1 

(substitue 1 above for the id of a baz you associated with a foo in the django admin interface)

## How django_schema works
The foobar.schemas.py file contains calls to django_schema.create_django_schema for the following models.Model's:

- FooBaseSchema
- FooFullScheme
- BarSchema
- BazSchema
- BazCreateSchema

More to come...
