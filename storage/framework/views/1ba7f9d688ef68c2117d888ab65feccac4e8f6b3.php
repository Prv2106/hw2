


<?php $__env->startSection('title', ' Generi'); ?>


<?php $__env->startSection('css'); ?>
<link rel="stylesheet" href='<?php echo e(asset('css/genre.css')); ?>'/> 
<?php $__env->stopSection(); ?>


<?php $__env->startSection('script'); ?>
<script src='<?php echo e(asset('js/genre.js')); ?>' defer></script>
<?php $__env->stopSection(); ?>


<?php $__env->startSection('home_link'); ?>
<a href="<?php echo e(route('home')); ?>"><h1>Top Movies</h1></a>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('links'); ?>
<a href="<?php echo e(route('home')); ?>">Home</a>
<a href="<?php echo e(route('top_rated')); ?>">Piu' votati</a>
<a href="<?php echo e(route('chat')); ?>">Chat</a>
<a href="<?php echo e(route('favorites')); ?>">Preferiti</a>
<a href= "<?php echo e(route('logout')); ?>">Logout</a>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('contents'); ?>
<article id="genre-background">
    <section data-section="genre">
        <h1>Cerca per genere</h1>
        <div>
            <label for = "type">Scegli il genere:</label> 
            <select name="type" id="type">
                <option value = 'Azione'>Azione</option>
                <option value = 'Avventura'>Avventura</option>
                <option value = 'Animazione'>Animazione</option>
                <option value = 'Commedia'>Commedia</option>
                <option value = 'Crime'>Crime</option>
                <option value = 'Documentario'>Documentario</option>
                <option value = 'Dramma'>Drammatico</option>
                <option value = 'Famiglia'>Famiglia</option>
                <option value = 'Fantasy'>Fantascienza</option>
                <option value = 'Storia'>Storia</option>
                <option value = 'Horror'>Horror</option>
                <option value = 'Musica'>Musica</option>
                <option value = 'Mistero'>Misterioso</option>
                <option value = 'Romance'>Romantico</option>
                <option value = 'Fantascienza'>Fantascienza</option>
                <option value = 'televisione film'>Film televisivo</option>
                <option value = 'Thriller'>Thriller</option>
                <option value = 'Guerra'>Guerra</option>
                <option value = 'Western'>Western</option>
            </select>
            <button id="genre">cerca</button>
        </div>    
        <section id = "album-view"></section>
        <article id="youtube">
            <section id="youtube-view"></section>    
        </article> 
    </section>
</article>

<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.page', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\xampp\htdocs\Top Movies laravel\hw2\resources\views/genre.blade.php ENDPATH**/ ?>