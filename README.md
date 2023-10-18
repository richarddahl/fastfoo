Hacking on the Foobar dev project with Fast API and the django orm

FooBar development project.

#### Intro
Foobar is an attempt to finally decouple and significantly improve a number of django related apps and modules I have hacked about in the last 15 years, as well as add a new front end UI using custom web components.
Using to develop multiple independent projects:

##### ZKUI
A Zero Knowledge UI for web apps requiring NO information about the underlying data presented.
Formats and displays data provided from a web api that returns json data
Relies heavily on shoelace.style.  Borrows the CSS grid rules from cirrus-ui.com. Includes the fontawesome.com free icon svgs from the brands, regular, and solid libraries. 

##### ZKBackend

ZKModelSerializer: Subclass of the django DRFs ModelSerializer - returns the appropriate json data for ZKUI

ZKPagination: Subclass of restframework.pagination.PageNumberPagination - provides get_paginated_response function that returns the appropriate data for the ZKUI to consume.

ZKModelViewset: Subclass of restframework.viewsets.ModelViewSet - provides list and retrieve functions that reutrns the appropriate data for the ZKUI to consume.

ZKModelForm: Subclass of django.forms.models.ModelForm - provides an as_dict method that returns a dictionary of a django ModelForm's fields usable by ZKUI

ZKModelForm: Subclass of django.forms.models.ModelForm - provides an as_dict method that returns a dictionary of a django ModelForm's fields usable by ZKUI

##### RoleModel
A django app using a subclass of django.auth.models.BaseUser and other models to implement Role Based Authorization throughout a django project

##### DBQueries
A django app that allows users to create and consume custom queries throughout a django project

#### To Explore:
download the project and place in a python3.11 virtual environment.
activate the environment

> pip install -r requirements.txt

> cd foo
> python manage.py migrate
> python manage.py createroledata
> python manage.py createfoobardata
> python 


then go to localhost:8000/ to explore the zero knowledge UI and localhost:8000/api to explore the fastapi endpoints

#### Todo
A metric sh*tton, just getting started, look at the repo's issue tracker for further information.
