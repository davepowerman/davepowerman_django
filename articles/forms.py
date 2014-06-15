from django import forms
from articles.models import Category

categories = Category.objects.all()
category_choices = zip([c.slug for c in categories],[c.name for c in categories])

class ArticleForm(forms.Form):
  name = forms.CharField()
  body = forms.CharField(widget=forms.Textarea)
  category = forms.ChoiceField(choices=category_choices)
  image = forms.FileField(required=False)
