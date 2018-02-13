<header class="header black-bg box-blur">

    <!--logo start-->
    <a href="index.html" class="logo"><img src="{{URL::asset('/assets/img/kominfo-logo-1.png')}}" style="height:35px"></a>
    <!--logo end-->
    <!--  notification end -->
    <div class="top-menu">
        <ul class="nav pull-right top-menu">
<!--            <li>{{Session::get('role')}}</li>-->
            <li><button class="logout" id="nongol">Menu</button></li>
            <li><a class="logout" href="{{url('logout')}}">Logout</a></li>
        </ul>
    </div>
</header>

<!--<div id="navbar" class="navbar">
    <button type="button" class="navbar-toggle navbar-btn collapsed" data-toggle="collapse" data-target="#sidebar">
        <span class="fa fa-bars"></span>
    </button>
    <a class="navbar-brand" href="#">
        <small>
            <i class="fa fa-desktop"></i>
            Kominfo Admin
        </small>
    </a>
    <ul class="nav flaty-nav pull-right">
        <li class="username-navbar">
            {{Session::get('username')}}
        </li>
        <li>
            <a href="logout">Logout</a>
        </li>
    </ul>
</div>-->

