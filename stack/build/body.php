<?php  /*
    |
    body.php
    stack/build/body.php
    |
*/
    /* Auto - Compound */
//Later...
//
/**/  ?>
<body draggable="false" id="body"
 class="<?= ($BodyCls); ?>">
<!-- Loading Screening, then just Script... -->
<div class="fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-950"
id="loading-screen"></div>
<script type="module" src="web/js/load-screen.js"
defer></script>

<?= ($Body); ?>
</body>
