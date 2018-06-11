  $(document).ready(function(){
    $('form.postNewUserC').on('submit',
      function(form){
        form.preventDefault();
                //ajax for registration
                $.ajax({
                    type:'POST',
                    url:'/registration/create/',
                    data:{
                        name:$('#name').val(),
                        phone:$('#phone').val(),
                        password:$('#password').val(),
                        password1:$('#password1').val(),
                        csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
                    },

                    // handle a successful response
                    success : function(data){
                        if(data=='smssent'){
                                $('#name').val(''); // remove the value from the input
                                $('#phone').val(''); // remove the value from the input
                                $('#password').val(''); // remove the value from the input
                                $('#password1').val(''); // remove the value from the input
                                $("#talk").html("<div class='success-message'><i class='fa fa-check'></i><strong>Successful!</strong> Confirm SMS</div>");
                                setTimeout(function(){
                                           $('#talk').hide();
                                        }, 3000);
                        }
                        else if(data=='smsnotsent'){
                                $('#name').val(''); // remove the value from the input
                                $('#phone').val(''); // remove the value from the input
                                $('#password').val(''); // remove the value from the input
                                $('#password1').val(''); // remove the value from the input
                            $("#talk").html("<div class='success-message'><i class='fa fa-check'></i><strong>Successful!</strong> But SMS not sent</div>");
                                setTimeout(function(){
                                           $('#talk').hide();
                                        }, 3000);
                        }
                        else if(data=='punterExists'){
                                $('#name').val(''); // remove the value from the input
                                $('#phone').val(''); // remove the value from the input
                                $('#password').val(''); // remove the value from the input
                                $('#password1').val(''); // remove the value from the input
                            $("#talk").html("<div class='error-message'><i class='fa fa-check'></i><strong>Sorry!</strong> Account already exists</div>");
                                setTimeout(function(){
                                           $('#talk').hide();
                                        }, 3000);
                        }
                         else if(data=='doNotMatch'){
                               $('#results').html("<div class='error-message'><i class='fa fa-close'></i>Your password don't match!</div>");
                                setTimeout(function(){
                               $('#results').hide();
                            }, 8000);
                        }
                        else
                         alert ('Failed');
                    },
                    // handle a non-successful response
                    error : function(data) {
                        if (data=='failed'){
                        $('#results').html("<div class='error-message'><i class='fa fa-close'></i><strong>Oops!</strong> Encountered an Error</div>");
                                        setTimeout(function(){
                                       $('#results').hide();
                                    }, 4000);
                        } else{
                            $('#results').html("<div class='error-message'><i class='fa fa-close'></i><strong>Oops!</strong> Please try again</div>");
                                        setTimeout(function(){
                                       $('#results').hide();
                                    }, 4000);
                        }
                    }
                });


      });



//    ajax for login handling
    $('form.loginUserC').on('submit',
      function(form){
        form.preventDefault();
                $.ajax({
                    type:'POST',
                    url:'/registration/login/',
                    data:{
                        phone:$('#phone').val(),
                        password:$('#password').val(),
                        //password:$('#stayloggedin').val(),
                        csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
                    },

                    // handle a successful response
                    success : function(data){
                        if(data=='passed'){
                                $('#phone').val(''); // remove the value from the input
                                $('#password').val(''); // remove the value from the input
                                $("#talk").html("<div class='success-message'><i class='fa fa-check'></i><strong>Successful!</strong></div>");
                                setTimeout(function(){
                                           $('#talk').hide();
                                        }, 3000);
                        }
                         else if(data=='wrongpwd'){
                               $('#results').html("<div class='error-message'><i class='fa fa-close'></i>Wrong  combination!</div>");
                                setTimeout(function(){
                               $('#results').hide();
                            }, 8000);
                        }
                         else if(data=='notActive'){
                               $('#results').html("<div class='error-message'><i class='fa fa-close'></i>Account Not Active!!</div>");
                                setTimeout(function(){
                               $('#results').hide();
                            }, 8000);
                        }
                        //else
                        // alert ('Failed');
                    },
                    // handle a non-successful response
                    error : function(data) {
                        $('#results').html("<div class='error-message'><i class='fa fa-close'></i><strong>Oops!</strong> Encountered an Error</div>");
                                        setTimeout(function(){
                                       $('#results').hide();
                                    }, 4000);

                    }
                });


      });


//  forgot password handler
$('form.postForgotPassC').on('submit',
      function(form){
        form.preventDefault();
                $.ajax({
                    type:'POST',
                    url:'/registration/forgotPass/',
                    data:{
                        phone:$('#phone').val(),
                        //password:$('#stayloggedin').val(),
                        csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
                    },

                    // handle a successful response
                    success : function(data){
                        if(data=='passed'){
                                $('#phone').val(''); // remove the value from the input
                                $("#talk").html("<div class='success-message'><i class='fa fa-check'></i><strong>Successful!</strong>New password sent via sms</div>");
                                setTimeout(function(){
                                           $('#talk').hide();
                                        }, 3000);
                        }
                         else if(data=='notActive'){
                               $('#results').html("<div class='error-message'><i class='fa fa-close'></i>Account does not exist!!</div>");
                                setTimeout(function(){
                               $('#results').hide();
                            }, 8000);
                        }
                        else
                         alert ('Failed');
                    },
                    // handle a non-successful response
                    error : function(data) {
                        $('#results').html("<div class='error-message'><i class='fa fa-close'></i><strong>Oops!</strong> Encountered an Error</div>");
                                        setTimeout(function(){
                                       $('#results').hide();
                                    }, 4000);

                    }
                });


      });
});


