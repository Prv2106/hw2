

<?php $__env->startSection('title', '| Login'); ?>

<?php $__env->startSection('script'); ?>
<script src='<?php echo e(asset('js/login.js')); ?>' defer></script>
<?php $__env->stopSection(); ?>


<?php $__env->startSection('content'); ?>
<div>Inserisci le tue credenziali per accedere</div>
<main>
    <form name = "login"  method= "post" action="<?php echo e(route('login')); ?>">
    <?php echo csrf_field(); ?>
        <span><label>Nome utente</label><input type='text' name='username'  value='<?php echo e(old('username')); ?>'><div id="username-error"></div></span>
        <span><label>Password</label><input type='password' name='password'><div id="pwd-error"></div></span>
        <div id="empty-input" class="hidden"><p class="error">Non hai inserito tutti i campi</p></div>
        <p>Non hai un account? <a id="reg" href="<?php echo e(route('signup')); ?>">Registrati</a></p>
        <label>&nbsp;<input type='submit' id="submit" value="Accedi"></label>
    </form>
</main>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.login_signup', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\xampp\htdocs\Top Movies laravel\example-app\resources\views/login.blade.php ENDPATH**/ ?>