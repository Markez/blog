# we import the django default user model
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
# also, import the forms to create em
from django import forms

# define a class for your form, it can be anything you want
class UserForm(forms.ModelForm):
    # password = forms.CharField(widget=forms.PasswordInput)
    # this Meta class is the way we send information for our form
    class Meta:
        # define the model
        model = User
        # define the fields you need (note that username and password are required)
        fields = [
            'password',
            'username',
            'first_name',
            'last_name',
            'is_staff',
            'email',
        ]
        # then, in widgets you can define the input type of the field and give
        # attributes to each one
        widgets = {
            'password': forms.PasswordInput(attrs={'class': 'form-control', 'name': 'password'}),
            'username': forms.TextInput(attrs={'class': 'form-control', 'name': 'username', 'placeholder': 'username'}),
            'first_name': forms.TextInput(attrs={'class': 'form-control', 'name': 'first_name', 'placeholder': 'First Name'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control', 'name': 'last_name', 'placeholder': 'Last Name'}),
            'email': forms.TextInput(attrs={'class': 'form-control', 'name': 'email', 'placeholder': 'email'}),
        }


class SignupForm(UserCreationForm):
    email = forms.EmailField(max_length=200, help_text='Required')

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')