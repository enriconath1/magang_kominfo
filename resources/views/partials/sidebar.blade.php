<aside>
    
    <div id="sidebar" class="nav-collapse">
        @if(Session::get('role_level')==5)
        <ul class="sidebar-menu" id="nav-accordion">
            <li class="mt" id="dashboard">
                <a href="{{url('dashboard')}}">
                    <table>
                        <tr>
                            <td><span style="font-size:80%;">Dashboard</span></td>
                            <td><i class="fa fa-dashboard fa-3x" style="font-size:150%; padding-left:86px;"></i></td>
                        </tr>
                    </table>
<!--                    <i class="fa fa-dashboard"></i>
                    <span>Dashboard</span>-->
                </a>
            </li>
            <li class="sub-menu" id="countryListSidebar">
                <a href="javascript:;" class="dropdown-toggle">
                    <table>
                        <tr>
                            <td><span style="font-size:80%;">IP</span></td>
                            <td><i class="fa fa-desktop" style="font-size:150%; padding-left:137px;"></i></td>
                        </tr>
                    </table>

<!--                    <i class="fa fa-list-alt"></i>
                    <span>IP</span>
                    <b class="arrow fa fa-angle-right"></b>-->
                </a>

                <ul class="sub">
                    <li><a href="{{url('ipList')}}">Daftar IP</a></li>
                    <li><a href="{{url('ipSearch')}}">Cari IP</a></li>
                </ul>
            </li>
            <li class="sub-menu" id="portListSidebar">
                <a href="{{url('portList')}}">
                    <table>
                        <tr>
                            <td><span style="font-size:80%;">Daftar Port</span></td>
                            <td><i class="fa fa-th-list" style="font-size:150%; padding-left:89px;"></i></td>
                        </tr>
                    </table>
                </a>
            </li>
            <li class="sub-menu" id="malwareListSidebar">
                <a href="javascript:;" >
                    <table>
                        <tr>
                            <td><span style="font-size:80%;">Malware</span></td>
                            <td><i class="fa fa-bug" style="font-size:150%; padding-left:101px;"></i></td>
                        </tr>
                    </table>
                </a>

                <!--                <a href="#" class="dropdown-toggle">
                                    <i class="fa fa-bug"></i>
                                    <span>Malware</span>
                                    <b class="arrow fa fa-angle-right"></b>
                                </a>-->

                <ul class="sub">
                    <li><a href="{{url('malwareList')}}">Daftar Malware</a></li>
                    <li><a href="{{url('malwareSearch')}}">Cari Malware</a></li>
                </ul>
            </li>
            <li class="sub-menu" id="sensorListSidebar">
                <a href="javascript:;" >
                    <table>
                        <tr>
                            <td><span style="font-size:80%;">Sensor</span></td>
                            <td><i class="fa fa-bullseye" style="font-size:150%; padding-left:111px;"></i></td>
                        </tr>
                    </table>
                </a>
                <!--                <a href="#" class="dropdown-toggle">
                                    <i class="fa fa-bullseye"></i>
                                    <span>Sensor</span>
                                    <b class="arrow fa fa-angle-right"></b>
                                </a>-->

                <ul class="sub">
                    <li><a href="{{url('sensorList')}}">Daftar Sensor</a></li>
                    <li><a href="{{url('addSensor')}}">Tambah Sensor</a></li>
                </ul>
            </li>
            <li class="sub-menu" id="userListSidebar">
                <a href="javascript:;" >
                    <table>
                        <tr>
                            <td><span style="font-size:80%;">User</span></td>
                            <td><i class="fa fa-users" style="font-size:150%; padding-left:121px;"></i></td>
                        </tr>
                    </table>
                </a>
                <!--                <a href="#" class="dropdown-toggle">
                                    <i class="fa fa-user"></i>
                                    <span>User</span>
                                    <b class="arrow fa fa-angle-right"></b>
                                </a>-->

                <ul class="sub">
                    <li><a href="{{url('userList')}}">Daftar User</a></li>
                    <li><a href="{{url('addUser')}}">Tambah User</a></li>
					<li><a href="{{url('changePassword')}}">Ubah Kata Sandi</a></li>
                    <li><a href="{{url('userSearch')}}">Cari User</a></li>
                </ul>
            </li>
            <li class="sub-menu" id="institutionListSidebar">
                <a href="javascript:;" >
                    <table>
                        <tr>
                            <td><span style="font-size:80%;">Institusi</span></td>
                            <td><i class="fa fa-home" style="font-size:150%; padding-left:102px;"></i></td>
                        </tr>
                    </table>
                </a>   
                <!--                <a href="#" class="dropdown-toggle">
                                    <i class="fa fa-university"></i>
                                    <span>Institution</span>
                                    <b class="arrow fa fa-angle-right"></b>
                                </a>-->

                <ul class="sub">
                    <li><a href="{{url('institutionList')}}">Daftar Institusi</a></li>
                </ul>

            </li>

<!--            <li class="sub-menu" id="analysisListSidebar">
                <a href="javascript:;" >
                    <table>
                        <tr>
                            <td><span style="font-size:80%;">Analisa</span></td>
                            <td><i class="fa fa-search" style="font-size:150%; padding-left:104px;"></i></td>
                        </tr>
                    </table>

                </a>

                <ul class="sub">
                    <li><a href="{{url('addBehaviourAnalysis')}}">Add Behaviour Analysis</a></li>
                    <li><a href="{{url('addStaticAnalysis')}}">Add Static Analysis</a></li>
                </ul>
            </li>-->
<!--            <li class="sub-menu" id="addMalwareSidebar">
                <a href="{{url('addMalware')}}">
                    <table>
                        <tr>
                            <td><span style="font-size:80%;">Add Malware</span></td>
                            <td><i class="fa fa-bug" style="font-size:150%; padding-left:104px;"></i></td>
                        </tr>
                    </table>
                </a>
            </li>-->
        </ul>
        
        @else
        <ul class="sidebar-menu" id="nav-accordion">
            <li class="mt" id="dashboard">
                <a href="{{url('dashboard')}}">
                    <table>
                        <tr>
                            <td><span style="font-size:80%;">Dashboard</span></td>
                            <td><i class="fa fa-dashboard fa-3x" style="font-size:150%; padding-left:86px;"></i></td>
                        </tr>
                    </table>
<!--                    <i class="fa fa-dashboard"></i>
                    <span>Dashboard</span>-->
                </a>
            </li>
            <li class="sub-menu" id="countryListSidebar">
                <a href="javascript:;" class="dropdown-toggle">
                    <table>
                        <tr>
                            <td><span style="font-size:80%;">IP</span></td>
                            <td><i class="fa fa-desktop" style="font-size:150%; padding-left:137px;"></i></td>
                        </tr>
                    </table>

<!--                    <i class="fa fa-list-alt"></i>
                    <span>IP</span>
                    <b class="arrow fa fa-angle-right"></b>-->
                </a>

                <ul class="sub">
                    <li><a href="{{url('ipList')}}">Daftar IP</a></li>
                    <li><a href="{{url('ipSearch')}}">Cari IP</a></li>
                </ul>
            </li>
            <li class="sub-menu" id="portListSidebar">
                <a href="{{url('portList')}}">
                    <table>
                        <tr>
                            <td><span style="font-size:80%;">Daftar Port</span></td>
                            <td><i class="fa fa-th-list" style="font-size:150%; padding-left:89px;"></i></td>
                        </tr>
                    </table>
                </a>
            </li>
            <li class="sub-menu" id="malwareListSidebar">
                <a href="javascript:;" >
                    <table>
                        <tr>
                            <td><span style="font-size:80%;">Malware</span></td>
                            <td><i class="fa fa-bug" style="font-size:150%; padding-left:101px;"></i></td>
                        </tr>
                    </table>
                </a>

                <!--                <a href="#" class="dropdown-toggle">
                                    <i class="fa fa-bug"></i>
                                    <span>Malware</span>
                                    <b class="arrow fa fa-angle-right"></b>
                                </a>-->

                <ul class="sub">
                    <li><a href="{{url('malwareList')}}">Daftar Malware</a></li>
                    <li><a href="{{url('malwareSearch')}}">Cari Malware</a></li>
                </ul>
            </li>
        </ul>
        @endif
    </div>
</aside>
