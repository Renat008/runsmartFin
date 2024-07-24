<?php 

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];

$to='kuzminrenat51@mail.ru';
$subject='Заявка с тестового сайта';
$message='
		Пользователь оставил данные <br> 
		Имя: ' . $name . ' <br>
		Номер телефона: ' . $phone . '<br>
		E-mail: ' . $email . '';
$headers="From: kuzminrenattest@gmail.com";
mail($to, $subject, $message, $headers);

?>