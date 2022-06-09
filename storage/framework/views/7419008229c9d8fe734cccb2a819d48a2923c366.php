


<?php $__env->startSection('title', '| Chat'); ?>


<?php $__env->startSection('css'); ?>
<link rel="stylesheet" href='<?php echo e(asset('css/chat.css')); ?>'/> 
<?php $__env->stopSection(); ?>


<?php $__env->startSection('script'); ?>
<script src='<?php echo e(asset('js/chat.js')); ?>' defer></script>
<script type="text/javascript">
    const BASE_URL = "<?php echo e(url('/')); ?>";
</script>
<?php $__env->stopSection(); ?>


<?php $__env->startSection('home_link'); ?>
<a href="<?php echo e(route('home')); ?>"><h1>Top Movies</h1></a>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('links'); ?>
<a href="<?php echo e(route('home')); ?>">Home</a>
<a href="<?php echo e(route('genre')); ?>">Genere</a>
<a href="<?php echo e(route('top_rated')); ?>">Piu' votati</a>
<a href="<?php echo e(route('favorites')); ?>">Preferiti</a>
<a href= "<?php echo e(route('logout')); ?>">Logout</a>
<?php $__env->stopSection(); ?>


<?php $__env->startSection('header'); ?>
<header>
    <article>
        <h1>Cerca film</h1> 
        <span>Ciao <?php echo e($user['name']); ?> consiglia agli altri utenti di Top Movies qualche film da guardare!</span>
    <form class ="search">
        <input type='text' id='search' value = "nome del film">
        <input type='submit' class='submit' value='Cerca'>
        <div id="close" data-content="close" class="hidden"><img  src ='<?php echo e(asset('images/x-regular-24.png')); ?>'/></div>
    </form>
    
    <article data-section = "movies">
        <section id = "album-view"></section>
    </article>          
</header>
<?php $__env->stopSection(); ?>



<?php $__env->startSection('contents'); ?>
<article id="content">            
    <article id ="main-view">
        <section id="chat-display"></section>
    </article>             
</article>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.page', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\xampp\htdocs\Top Movies laravel\example-app\resources\views/chat.blade.php ENDPATH**/ ?>