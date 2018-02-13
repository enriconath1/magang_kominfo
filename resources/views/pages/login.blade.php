@extends('layouts.login')
@section('content')

<div class="logo">
    <img src="{{URL::asset('/assets/img/kominfo-logo-1.png')}}">
</div>

<div class="content">
    {{Form::open(array('url' => 'loginUser', 'class' => 'form-vertical login-form'))}}
    <h3 class="form-title"></h3>
    <div class="alert alert-error hide">
        <button class="close" data-dismiss="alert"></button>
        <span>Masukkan E-Mail dan Password Anda.</span>
    </div>
	@if(Session::has('failure'))
    <div class="alert alert-danger">
        <span>{{ Session::get('failure') }}</span>
    </div>
	@endif
    <div class="control-group">
        <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
        {{Form::label('email', 'Email: ', array('class' => 'control-label visible-ie8 visible-ie9'))}}
        <div class="controls">
            <div class="input-icon left">
                <i class="fa fa-user"></i>
                {{ Form::text('email', Input::old('email'), array('class' => 'm-wrap placeholder-no-fix form-control', 'placeholder' => 'Email')) }}
            </div>
        </div>
    </div>
    <div class="control-group">
        {{Form::label('pass', 'Password: ', array('class' => 'control-label visible-ie8 visible-ie9'))}}
        <div class="controls">
            <div class="input-icon left">
                <i class="fa fa-lock"></i>
                {{ Form::password('pass', array('class' => 'm-wrap placeholder-no-fix form-control', 'placeholder' => 'Password')) }}
            </div>
        </div>
    </div>
    <div class="form-actions" style="margin-left:-10px">
        <label class="checkbox">
            <input type="checkbox" name="remember" value="1"/> Ingat Saya
        </label>
        {{ Form::submit('Login', array('class' => 'btn blue pull-right')) }}
    </div>
    {{ Form::close() }}
</div>
<!--<div class="login-page">
    <div class="login-wrapper">
        
        <div class="form-signin" id="LoginForm">
            {{Form::open(array('url' => 'loginUser'))}}
            <div>
                <h1 class="login-title"><i class="fa fa-share"></i>Login</h1>
                <h4></h4>
            </div>
            @if(Session::has('error'))
            <div class="alert alert-danger">
                <button class="close" data-dismiss="alert">x</button>
                <strong>Error! </strong>{{ Session::get('error') }}
            </div>
            @endif
            <div class="form-group">
            {{ Form::label('email', 'Email: ') }}
            {{ Form::text('email', Input::old('email'), array('class' => 'form-control')) }}
            </div>
            <div class="form-group">
            {{Form:: label('pass','Password: ')}}
            {{ Form::password('pass', array('class' => 'form-control')) }}
            </div>

            {{ Form::submit('Login', array('class' => 'btn btn-primary')) }}
        {{ Form::close() }}
        </div>
    </div>
</div>-->
@stop

@section('page-script')
{{HTML::script('/assets/js/login/jquery-1.10.1.min.js')}}
{{HTML::script('/assets/js/login/jquery-migrate-1.2.1.min.js')}}
{{HTML::script('/assets/js/login/jquery-ui-1.10.1.custom.min.js')}}
{{HTML::script('/assets/js/login/bootstrap.min.js')}}
{{HTML::script('/assets/js/login/jquery.slimscroll.min.js')}}
{{HTML::script('/assets/js/login/jquery.blockui.min.js')}}
{{HTML::script('/assets/js/login/jquery.cookie.min.js')}}
{{HTML::script('/assets/js/login/jquery.validate.min.js')}}
{{HTML::script('/assets/js/login/jquery.backstretch.min.js')}}
{{HTML::script('/assets/js/login/select2.min.js')}}
{{HTML::script('/assets/js/login/app.js')}}
{{HTML::script('/assets/js/login/login-soft.js')}}

<script>
    jQuery(document).ready(function () {
        App.init();
        Login.init();
    });
</script>
@stop