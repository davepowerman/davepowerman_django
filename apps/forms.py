from django import forms

class AppForm(forms.Form):
  name = forms.CharField()
  thumbnail = forms.FileField(required=False)
