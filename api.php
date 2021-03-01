<?php
$ORIGEN = __DIR__.'/videoCollection.json';
$SESSION = sys_get_temp_dir().'/videoSession.json';

$action = isset($_REQUEST['a']) ? $_REQUEST['a'] : 'list';

switch ($action) {
    case 'reset':
        $videoCollectionData = json_decode(file_get_contents($ORIGEN));
        $videoCollectionData->reset ="SII";
        file_put_contents ($SESSION, json_encode($videoCollectionData));

        header('Content-Type: application/json');
        echo(json_encode($videoCollectionData));
        break;
    case 'list':
        if(!file_exists($SESSION)) {
            copy($ORIGEN, $SESSION);
        }
        header('Content-Type: application/json');
        readfile($SESSION);
        break;
}