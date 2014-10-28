<?php
$sendto   = "candysmoke@mail.ru";
$name  = nl2br($_POST['name']);
$phone  = nl2br($_POST['tel']);
$city  = nl2br($_POST['city']);
$products  = nl2br($_POST['products']);
$summ  = nl2br($_POST['summary']);
$source  = nl2br($_POST['source']);
$target  = nl2br($_POST['target']);


// Формирование заголовка письма
$subject  = "Новое сообщение";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;font-size: 16px; border-bottom:1px dotted #ccc;'>Сообщение с Landing page 'E-Hose'</h2>\r\n";
$msg .= "<p><strong>Имя:</strong> ".$name."</p>\r\n";
$msg .= "<p><strong>Телефон:</strong> ".$phone."</p>\r\n";
$msg .= "<p><strong>Город:</strong> ".$city."</p>\r\n";
$msg .= "<p><strong>Заказ:</strong> ".$products."</p>\r\n";
$msg .= "<p><strong>Сумма:</strong> ".$summ."</p>\r\n";
$msg .= "<p><strong>Дополнительно:</strong> ".$target."</p>\r\n";

$msg .= "</body></html>";
print_r($msg);

// отправка сообщения
mail($sendto, $subject, $msg, $headers)
?>