<?php
    include($_SERVER['DOCUMENT_ROOT'] . '/db/connect.php');

    //if (!$_GET) echo "empty";


    $id = $_GET['id'];

    $query = "SELECT * FROM `categories` WHERE `id` = $id";
    $result = mysqli_query($db, $query);


    $cat = mysqli_fetch_assoc($result)['parent_category'];

    sleep(3);
    
    // ищем дочерние категории
    if ($cat == 0) {
        $query = "SELECT * FROM `categories` WHERE `parent_category` = $id";
        $result = mysqli_query($db, $query);

        // записываем id категории в массив
        $children = [];
        while( $row = mysqli_fetch_assoc($result) ) {
            
            $children[] = $row['id'];

        }
        $cats = implode(',', $children);

        // ищем товары на основании найденных категорий
        $query = "SELECT * FROM `catalog` WHERE `category_id` IN ($cats)";
        $result = mysqli_query($db, $query);

        // добавляем товары в массив $items
        $items = [];
        while($row = mysqli_fetch_assoc($result) ) {
            $items[] = $row;
        }
        echo json_encode($items);
    } else {
        // ищем товары на основании найденных категорий
        $query = "SELECT * FROM `catalog` WHERE `category_id` = $id";
        $result = mysqli_query($db, $query);

        // добавляем товары в массив $items
        $items = [];
        while($row = mysqli_fetch_assoc($result) ) {
            $items[] = $row;
        }
        echo json_encode($items);
    }

    // JSON - javascript object notation
?>