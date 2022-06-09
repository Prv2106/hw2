<!DOCTYPE html>
<html>
    <head>
        <title>Top Movies - <?php echo $__env->yieldContent('title'); ?></title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href='<?php echo e(asset('css/style.css')); ?>'/> 
        <?php echo $__env->yieldContent('css'); ?>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap" rel="stylesheet">
        <script src='<?php echo e(asset('js/functions.js')); ?>' defer></script>
        <?php echo $__env->yieldContent('script'); ?>    
    </head>

    <body>
        <article>
            <article id="heading">

                <div data-section="title">
                    <div data-content="image"><img src='<?php echo e(asset('images/movie-regular-24.png')); ?>'/></div>
                    <?php echo $__env->yieldContent('home_link'); ?>
                </div>

                <nav>
                    <div id="links" class="mobile">
                        <?php echo $__env->yieldContent('links'); ?>
                    </div> 
                </nav>
                <?php echo $__env->yieldContent('search'); ?>
                <section data-section="menu-container">
                    <div id="menu-view" class="hidden"></div>
                    <div id="menu">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </section>
            </article>

        <?php echo $__env->yieldContent('header'); ?>
        <section id="modal-view" class="hidden">
                    <h1></h1>
                    <form id ="text-box">
                        <textarea type='text' id='input-text' value= "Consiglio a tutti di guardare questo film!!!"></textarea>
                        <input name='_token' type='hidden' value = "<?php echo e(csrf_token()); ?>" />
                        <input type='submit' class='submit' value='invia'>
                    </form>
        </section>
        <?php echo $__env->yieldContent('search-mobile'); ?>
        
        <?php echo $__env->yieldContent('contents'); ?>
        <footer>               
                <em>Powered by Alberto Provenzano</em><br/>
                <em>Matricola: 1000001826</em><br/>
                <em>Anno accademico 2021/2022</em>               
        </footer>
    </body>
</html><?php /**PATH C:\xampp\htdocs\Top Movies laravel\example-app\resources\views/layouts/page.blade.php ENDPATH**/ ?>