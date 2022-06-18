<!doctype html>
<html>
    <head>
        <title>Top Movies - <?php echo $__env->yieldContent('title'); ?></title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">
        <link rel="stylesheet" href='<?php echo e(asset('css/login-signup-style.css')); ?>'/> 
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap" rel="stylesheet">
        <?php echo $__env->yieldContent('script'); ?>
    </head>
    <body>
        <article id="heading">
                    <div data-section="title">
                        <div data-content="image"><img src='<?php echo e(asset('images/movie-regular-24.png')); ?>'/></div>
                        <h1>Top Movies</h1>
                    </div>
        </article>
        <article id="main-view">
            <section>
                <?php echo $__env->yieldContent('content'); ?>
            </section>
        </article>
        
    </body>
</html> 
<?php /**PATH C:\xampp\htdocs\Top Movies laravel\example-app\resources\views/layouts/login_signup.blade.php ENDPATH**/ ?>