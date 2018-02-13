@extends('layouts.layout')

@section('page-title')
<title>Dashboard | Indonesia Malware Monitoring</title>
@stop

@section('content')
<div id="hmp-container">
    <div id="content-placeholder">
        <div class="col-md-6">
            <div class="row">
                <div class="col-md-6">
                    <div class="box tile" style="height:160; background-color:rgba(22, 34, 42, 1);">
                        <div class="box-content">
                            <div class="img">
                                <i class="fa fa-bomb" style="color:rgba(0,0,0,0.3); font-size:600%; margin-left:15px; margin-top:5px;"></i>
                            </div>
                            <div class="content" style="margin-right:20px; margin-top:15px;">
                                <p class="big" style="color:#68DFF0">

                                </p>
                                <p class="title">Jumlah Serangan</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="box tile" style="height:160; background-color:rgba(22, 34, 42, 1);">
                        <div class="box-content">
                            <div class="img">
                                <i class="fa fa-desktop" style="color:rgba(0,0,0,0.3); font-size:600%; margin-left:20px; margin-top:15px;"></i>
                            </div>
                            <div class="content" style="margin-right:20px; margin-top:15px;">
                                <p class="big" style="color:#68DFF0">
                                    
                                </p>
                                <p class="title">IP yang Terdeteksi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="row">
                <div class="col-md-6">
                    <div class="box tile" style="height:160; background-color:rgba(22, 34, 42, 1);">
                        <div class="box-content">
                            <div class="img">
                                <i class="fa fa-download" style="color:rgba(0,0,0,0.3); font-size:600%; margin-left:20px; margin-top:15px;"></i>
                            </div>
                            <div class="content" style="margin-right:20px; margin-top:15px;">
                                <p class="big" style="color:#68DFF0">
                                    
                                </p>
                                <p class="title">Serangan Malware</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="box tile" style="height:160; background-color:rgba(22, 34, 42, 1);">
                        <div class="box-content">
                            <div class="img">
                                <i class="fa fa-globe" style="color:rgba(0,0,0,0.3); font-size:700%; margin-left:10px;"></i>
                            </div>
                            <div class="content" style="margin-right:20px; margin-top:15px;">
                                <p class="big" style="color:#68DFF0">
                                  
                                </p>
                                <p class="title">Jumlah Negara</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button id="editWidget" class="btn btn-primary col-md-3 widgetButton">Edit Widget</button>
        <button id="saveWidget" class="btn btn-primary col-md-3 widgetButton" style="display: none">Save Widget</button>

        <div id="new-chart"></div>
        <div id="new-chart-button" style="display: none">
            <div class="col-md-6" style="margin-left: 25%; margin-right:25%;">
                <div class="box" style="box-shadow:0 1px 15px rgba(0,0,0,0);">
                    <center>
                        <i class="fa fa-plus-circle" style="font-size:180px; color:#9CF;" id="addChart" data-toggle="modal" data-target="#addchart"></i>
                    </center>
                    <!--</div>-->
                </div>
            </div>
        </div>
    </div>
</div>
@stop

@section('content-modal')
<div class="modal fade" id="addchart" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Tambah Grafik Baru</h4>
            </div>
            <div class="modal-body">
                <div id="menuChart">
                    <label class="select-option-modal" style="color: black">Pilih Grafik:</label>
                    <br>
                    <select id="tipeChart" class="form-control">
                        <option value="">Pilih Tipe Grafik</option>
                        <option value="pie">Pie Chart</option>
                        <option value="donut">Donut Chart</option>
                        <!-- <option value="line">Line Chart</option>
                        <option value="bar">Bar Chart</option>
                        <option value="area">Area Chart</option> -->
                        <option value="table">Tabel</option>
                        <option value="map">Peta</option>
                    </select>
                    <br>
                    <label id="dataLabel" class="select-option-modal" style="color: black">Select data:</label>
                    <br>
                    <select id="dataChart" class="form-control" style="display:none">
                        <option value="top">Penyerang Terpopuler</option>
                        <option value="port">Port Terpopuler</option>
                        <option value="malware">Malware yang Ditangkap</option>
                    </select>
                    <select id="dataTable" class="form-control" style="display:none">
                        <option value="top">Penyerang Terpopuler</option>
                        <option value="malware">Malware yang Ditangkap</option>
                        <option value="port">Port Terpopuler</option>
                        <option value="liveticker">Live Ticker</option>
                    </select>
                    <select id="dataMap" class="form-control" style="display:none">
                        <option value="indoMap">Peta Indonesia</option>
                        <option value="worldMap">Peta Dunia</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" id="confirm-chart" data-dismiss="modal">Pilih</button>
            </div>
        </div>

    </div>
</div>
@stop

@section('page-script')
{{HTML::script('public/assets/js/page-specific-scripts/dashboard.js')}}
{{HTML::script('public/assets/js/newDashboard/additionalMethodDashboard.js')}}
@stop
