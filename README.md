## Demonstration of django_schema

Inspired by djantic.  

### Goal:
Define automated process that uses django Models and an optional configuration info to define Pydantic BaseModels for FastAPI.

### Overall Guidance
Use only public classes, methods, and functions from Pydantic: Successful
Use only one internal class method in django models._meta.get_fields(): Successful

### Desired Functionality:
Support all pydantic BaseModel configuration options: Incomplete

Support creating BaseModel Fields for django Model, classmethods, properties, and instance methods:  Incomplete, needs addt'l configuraiton options supported.

Support multiple BaseModel for each django Model, if desired: NOT WORKING CORRECTLY
