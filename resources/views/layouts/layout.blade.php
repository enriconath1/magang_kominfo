<html>
    <head>
       @include('partials.head')
       @yield('page-title')
    </head>
    <body style class="skin-black">
        @include('partials.navbar')
        @include('partials.sidebar')
        <div id="hmp">
        </div>
        <div class="container" id="main-container">
            <div id="main-content">
                <div id="hmp-container">
                    <div id="content-placeholder">
                        @yield('content')
                    </div>
                </div>
                @yield('content-modal')
            </div>
        </div>
        
        
        @yield('page-script')
        @include('partials.jsGeneralInclude')
    </body>
</html>

