from rest_framework import pagination

class postPagination(pagination.PageNumberPagination):
    page_size = 2 
    