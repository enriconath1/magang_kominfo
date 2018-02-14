@extends('layouts.layout')

@section('page-title')
<title>Attacker | Indonesia Malware Monitoring</title>
@stop

@section('content')
<div class="row">
    <div class="control-group col-md-6">
        <div class="box-title">
        </div>
        <div class="box-content">
            <label class="control-label">Filter</label>
            <div class="controls">
                <select class="form-control" data-placeholder="Choose a Category" tabindex="1" name="filter" id="filter">
                    <option value="filter-by-total">Seluruh Data</option>
                    <option value="filter-by-date">Pilih Berdasarkan Tanggal</option>
                </select>
            </div>
        </div>
    </div>

    <div class="filter-by-date" style="display: none">
        <div class="row">
            <div class="form-group col-md-2">
                <div class="box-title">
                </div>
                <div class="box-content">
                    <label for="from" class="control-label">Tanggal Awal</label>
                    <input type="text" class="form-control" id="from" name="from" placeholder="- Select Date -" value="Date"></input>
                </div>
            </div>

            <div class="form-group col-md-2">
                <div class="box-title">
                </div>
                <div class="box-content">
                    <label for="to" class="control-label">Tanggal Akhir</label>
                    <input type="text" class="form-control" id="to" name="to" placeholder="- Select Date -" value="Date"></input>
                </div>
            </div>
        </div>
    </div>
    <div class="control-group col-md-6">
        <div class="box-title">
        </div>
        <div class="box-content">
            <label class="control-label">Negara</label>
            <div class="controls">
                <select class="form-control" data-placeholder="Choose a Category" tabindex="1" name="country" id="country" onchange="getIP(this.value, from.value, to.value, '20', '0')">
                    <option value="">- Pilih Negara -</option>
                </select>
            </div>
        </div>
    </div>
</div>
<div class="clearfix"></div>

<br>

<div class="row filter-by-date" style="display: none">
    <div class="control-group col-md-3">
        <button class="btn btn-primary" style=" width: 255px;" onclick="getIP(country.value, from.value, to.value, '20', '0')">Generate</button>
    </div>
</div>

<div class="clearfix"></div>
<br>

<div class="row">
    <div class="col-md-12">
        <div class="box table-box">
            <div class="box-title">
                <h3><i class="fa fa-table"></i> Daftar IP</h3>
                <div class="box-tool">
                    <a data-action="collapse" href="#"><i class="fa fa-chevron-up"></i></a>
                </div>
            </div>
            <div class="box-content " style="height:70%; overflow:auto;" >
                <div id="ipList"></div>
                <table class="table tableInDiv tableOuter" id="ipTableOuter" >
                    <!--Part buat Connect database JS-->
                    <thead>
                        <tr>
                            <th>Alamat IP</th>
                            <th class="right-aligned">Jumlah Serangan</th>
                        </tr>
                    </thead>
                </table>
                <div style="height: 100%; overflow-y: auto" class="scrollit">
                    <table class="table tableInDiv" id="ipTable" >
                        @foreach ($uniqueattack as $key => $iplist)
                        <tbody >
                            <tr>
                                <td>{{ $iplist->attackerIP }}</td>
                                <td>{{ $iplist->count }}</td>
                            </tr>
                        </tbody>
                        @endforeach
                        <!--end part-->
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-12" id="generate" style="margin-left: 10%; margin-top: 20px;">

    </div>
</div>
@stop

@section('content-modal')
<div id="ip-detail-modal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span>
                    <span class="sr-only">Close</span>
                </button>
                <div class="modal-title">
                    <h2><b>Detail Alamat IP</b></h2>
                    <div id="result"></div>
                </div>
            </div>
            <div class="modal-body">
                <!-- Nav tabs -->
                <div class="tabbable">
                    <ul class="nav nav-tabs" role="tablist">
                        <li class="active"><a href="#tab-1-1" role="tab" data-toggle="tab">who.is</a></li>
                        <li><a href="#tab-1-2" role="tab" data-toggle="tab">Port Sasaran</a></li>
                        <li><a href="#tab-1-3" data-toggle="tab">Malware</a></li>
                    </ul>

                    <!-- Tab panes -->
                    <div class="tab-content">
                        <div class="tab-pane active" id="tab-1-1" style="height:480px;overflow:auto;">
                            <div id="ipDetailTitle">
                            </div>

                            <div id="ipDetail">
                            </div>
                        </div>
                        <div class="tab-pane" id="tab-1-2" style="height:480px;overflow:auto;">
                            <div id="port-load-bar"></div>
                            <table class="table table-striped table-font-black" id="PortList">
                                <thead>
                                    <tr>
                                        <th>Port</th>
                                        <th>Jumlah Serangan</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                        <div class="tab-pane" id="tab-1-3" style="height:480px;overflow:auto;">
                            <div id="malware-load-bar"></div>
                            <table class="table table-striped table-font-black" id="MalwareList">
                                <thead>
                                    <tr>
                                        <th>Malware Hash</th>
                                        <th>Jumlah Malware</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@stop



@section('page-script')
{{HTML::script('public/assets/js/page-specific-scripts/ipList.js')}}
@stop

@section('scroll')
<style type="text/css">
    .scrollit {
    overflow:scroll;
    height:100px;
}
</style>
@endsection