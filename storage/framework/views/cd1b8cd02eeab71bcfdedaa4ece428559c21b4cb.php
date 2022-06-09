


<?php $__env->startSection('title', ' Home'); ?>


<?php $__env->startSection('css'); ?>
<link rel="stylesheet" href='<?php echo e(asset('css/home.css')); ?>'/> 
<?php $__env->stopSection(); ?>


<?php $__env->startSection('script'); ?>
<script src='<?php echo e(asset('js/home.js')); ?>' defer></script>
<?php $__env->stopSection(); ?>


<?php $__env->startSection('home_link'); ?>
<h1>Top Movies</h1>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('links'); ?>
<a href="<?php echo e(route('genre')); ?>">Genere</a>
<a href="<?php echo e(route('top_rated')); ?>">Piu' votati</a>
<a href="<?php echo e(route('chat')); ?>">Chat</a>
<a href= "<?php echo e(route('logout')); ?>">Logout</a>
<?php $__env->stopSection(); ?>



<?php $__env->startSection('search'); ?>
<div data-section="search" class="mobile">
    <div data-content ="favorites"><a href="<?php echo e(route('favorites')); ?>"><img src ='<?php echo e(asset('images/heart-circle-solid-36.png')); ?>'/></a></div>
    <form id ="search" class="hidden">
        <input type='text' id='search-movies' value = "nome del film">
        <input type='submit' class='submit' value='Cerca'>
    </form>
    <div id="search-button" data-content="search"><img  src ='<?php echo e(asset('images/search-regular-36.png')); ?>'/></div>
    <div id="close" data-content="close" class="hidden"><img  src ='<?php echo e(asset('images/x-regular-24.png')); ?>'/></div>
</div>
<?php $__env->stopSection(); ?>


<?php $__env->startSection('header'); ?>
<header>
    <div id="overlay"></div>
    <h1>
        <div>Ciao <?php echo e($user['name']); ?> </div> 
        <strong>Ecco la raccolta dei migliori film di sempre</strong><br/>
        <em>Trova i tuoi film preferiti!</em><br/>              
    </h1>
</header>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('search-mobile'); ?>
<article data-section="search-mobile">
    <h1>Cerca i tuoi film preferiti</h1>  
    <form class ="search-mobile">
        <input type='text' id='search-movies-mobile' value = "nome del film">
        <input type='submit' class='submit' value='Cerca'>
    </form>
</article>
<?php $__env->stopSection(); ?>


<?php $__env->startSection('contents'); ?>
<article data-section = "movies">
    <section id = "album-view"></section>
</article>
<article id="youtube">
    <section id="youtube-view"></section>    
</article>  
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.page', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\xampp\htdocs\Top Movies laravel\hw2\resources\views/home.blade.php ENDPATH**/ ?>