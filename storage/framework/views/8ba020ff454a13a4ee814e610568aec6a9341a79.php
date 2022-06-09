


<?php $__env->startSection('title', ' Preferiti'); ?>


<?php $__env->startSection('css'); ?>
<link rel="stylesheet" href='<?php echo e(asset('css/favorites.css')); ?>'/> 
<?php $__env->stopSection(); ?>


<?php $__env->startSection('script'); ?>
<script src='<?php echo e(asset('js/favorites.js')); ?>' defer></script>
<?php $__env->stopSection(); ?>


<?php $__env->startSection('home_link'); ?>
<a href="<?php echo e(route('home')); ?>"><h1>Top Movies</h1></a>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('links'); ?>
<a href="<?php echo e(route('home')); ?>">Home</a>
<a href="<?php echo e(route('genre')); ?>">Genere</a>
<a href="<?php echo e(route('chat')); ?>">Chat</a>
<a href="<?php echo e(route('top_rated')); ?>">Piu' votati</a>
<a href= "<?php echo e(route('logout')); ?>">Logout</a>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('contents'); ?>
<article id="favorites">
    <article id="favorites-background">
        <section data-section="favorites">
            <section id = "album-view"></section>
            <article id="youtube">
                <section id="youtube-view"></section>    
            </article> 
        </section>
    </article>
</article>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.page', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\xampp\htdocs\Top Movies laravel\hw2\resources\views/favorites.blade.php ENDPATH**/ ?>