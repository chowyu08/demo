from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render
from django.template import Context
from django.template.loader import get_template
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
# Create your views here.
class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

def showHomepage(request):
    template = get_template('index.html')
    html = template.render(Context({
        'hello': "helll",
    }));

    return HttpResponse(html)