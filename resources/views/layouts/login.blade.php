<html>
    <head>
        @include('partials.headLogin')
		<title>Login - Honeynet Indonesia</title>
    </head>
    <body class="login">
        @yield('content')       

        
        @include('partials.jsGeneralInclude')
        @yield('page-script')
    </body>
</html>