


<?php $__env->startSection('title', '| Più Votati'); ?>


<?php $__env->startSection('css'); ?>
<link rel="stylesheet" href='<?php echo e(asset('css/top_rated.css')); ?>'/> 
<?php $__env->stopSection(); ?>


<?php $__env->startSection('script'); ?>
<script src='<?php echo e(asset('js/top_rated.js')); ?>' defer></script>
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
<a href="<?php echo e(route('chat')); ?>">Chat</a>
<a href="<?php echo e(route('favorites')); ?>">Preferiti</a>
<a href= "<?php echo e(route('logout')); ?>">Logout</a>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('contents'); ?>
<article id="album-background">
    <section data-section="album">    
        <section id = "album-view"></section>
    </section>
</article>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.page', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\xampp\htdocs\Top Movies laravel\example-app\resources\views/top_rated.blade.php ENDPATH**/ ?>