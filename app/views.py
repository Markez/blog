# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.views.generic import View
from django.shortcuts import render, render_to_response, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext
from .forms import UserForm
from django.core.urlresolvers import reverse_lazy
from django.contrib import messages
from django.http import HttpResponse
from django.contrib.auth import login, authenticate
from .forms import SignupForm
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from .tokens import account_activation_token
from django.contrib.auth.models import User
from django.core.mail import EmailMessage


# Create your views here.
# create the class view, named as you need
class UserFormView(View):
    # define the form to use, in this case the form we created
    form_class = UserForm
    # define the template_name, your main html file where your are going to use the form
    template_name = 'registration/registration.html'
    # and the reverse_lazy is helpfully when the registration successfully added a new registration
    # replace 'users-add' with the name of your route
    success_url = reverse_lazy('login')

    def get(self, request):
        form = self.form_class(None)
        return render(request, self.template_name, {'form': form})

    def post(self, request):
        form = self.form_class(request.POST)

        if form.is_valid():
            return self.form_valid(form)
        else:
            return self.form_invalid(form, request)

    def form_valid(self, form):
        # when the info the registration gave us is valid, stop the commit
        # so we can give some nice format to this info
        user = form.save(commit=False)
        # the "form.cleaned_data" help us to give a standard format to the info
        username = form.cleaned_data['username']
        # first_name = form.cleaned_data['first_name']
        # last_name = form.cleaned_data['last_name']
        password = 'tempPass'
        password = form.cleaned_data.get('password1')
        user.set_password(password)
        # and we save it to the database
        user.save()

        # in my case a send a successful massage to the registration indicating that
        # went fine
        messages.add_message(self.request, messages.SUCCESS,
                             "Your account <b>" + username + "</b> has been created Login to Continue.")
        return HttpResponseRedirect('/login/')

    def form_invalid(self, form, request):
        return render(request, self.template_name, {'form': form})


def signup(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()
            current_site = get_current_site(request)
            mail_subject = 'Activate your blog account.'
            message = render_to_string('app/acc_active_email.html', {
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': account_activation_token.make_token(user),
            })
            to_email = form.cleaned_data.get('email')
            email = EmailMessage(
                mail_subject, message, to=[to_email]
            )
            email.send()
            return HttpResponse('Please confirm your email address to complete the registration')
    else:
        form = SignupForm()
    return render(request, 'registration/registration.html', {'form': form})


def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        login(request, user)
        # return redirect('home')
        return HttpResponse('Thank you for your email confirmation. Now you can login to your account.')
    else:
        return HttpResponse('Activation link is invalid!')


def home(request):
    if request.user.is_authenticated():
        return HttpResponse("Successful Ready for next")
    else:
        return render(request, 'registration/login.html', {})
