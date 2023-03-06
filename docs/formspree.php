<?php
header("Content-Type: application/json");
$teams_file = 'teams.json';
$data = file_get_contents('php://input');
$data_array = json_decode($data, true);
$teams_array = json_decode(file_get_contents($teams_file), true);
$teams_array[] = $data_array;
file_put_contents($teams_file, json_encode($teams_array, JSON_PRETTY_PRINT));
echo json_encode($data_array);
?>
<form id="add-team-form" action="https://bretis2019.github.io/AGC_benchmark/formspree.php" method="POST">
  <!-- form fields -->
</form>
