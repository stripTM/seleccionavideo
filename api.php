<?php
$ORIGEN = __DIR__.'/videoCollection.json';

$action = isset($_REQUEST['a']) ? $_REQUEST['a'] : 'list';

switch ($action) {
    case 'list':
        header('Content-Type: application/json');
        readfile($ORIGEN);
        break;
}