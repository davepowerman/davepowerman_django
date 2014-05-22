from django import forms
from posts.models import Category


categories = Category.objects.all()
category_choices = zip([c.id for c in categories],[c.name for c in categories])

class ArticleForm(forms.Form):
  name = forms.CharField()
  body = forms.CharField(widget=forms.Textarea)
  category = forms.ChoiceField(choices=category_choices)
  thumbnail = forms.FileField(required=False)
