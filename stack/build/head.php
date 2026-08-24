<?php  /*
    |
    head.php
    stack/build/head.php
    |
*/
    /* Control: Varing */
// Later
//
/**/  ?>
<!-- Head: Metas -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta description="In-Branch: work-dev" in-branch="work-dev">

<!-- Head: Basic Styles & Script -->
<link rel="stylesheet" href="web/css/theme-mode.css">
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

<!-- Head: Compings -->
<title id="title"><?= ((($Title)
    ?? ($empty)) ?: ("SM-DC"));
    //
?></title>
<link rel="icon" type="image/x-icon" id="favicon" href="./img/favic/favicon.ico">
<!-- Head: Early Styles & Scripts -->
<link rel="stylesheet"
href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
<!-- = -->
<script type="module" src="web/js/set-paging.js"></script>

<!-- Head: Data-Set Page -->
<?= ($AddHead); ?>
