release: python manage.py migrate
web: gunicorn ecom.wsgi --log-file -
web: python ecom/manage.py runserver 0.0.0.0:$PORT
