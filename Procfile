release: python manage.py migrate
web: daphne Django/core.asgi:application --port $PORT --bind 0.0.0.0 -v2
worker: python manage.py runworker channels --settings=Django/core.settings -v2