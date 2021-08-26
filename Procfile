release: python Django/manage.py migrate
web:cd Django && daphne core.asgi:application --port $PORT --bind 0.0.0.0 -v2
worker:cd Django && python manage.py runworker channels --settings=core.settings -v2