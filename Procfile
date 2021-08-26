release: python Django/manage.py migrate
web:daphne Django.core.asgi:application --port $PORT --bind 0.0.0.0 -v2
worker:python Django/manage.py runworker channels --settings=core.settings -v2