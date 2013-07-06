<?php
    header('Content-type: application/json; charset=utf-8');

    $searchUrl = 'http://rest.immobilienscout24.de/restapi/api/search/v1.0/search/radius.json?realestatetype=apartmentrent&pagesize=50&geocoordinates=52.52422;13.41027;5';
    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => $searchUrl,
        CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 6.2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1464.0 Safari/537.36'
    ));

    $resp = curl_exec($curl);
    curl_close($curl);

    echo $_GET['callback'].'('.$resp.')';
?>