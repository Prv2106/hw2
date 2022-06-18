

<?php $__env->startSection('title', '| Registrazione'); ?>

<?php $__env->startSection('script'); ?>
<script src='<?php echo e(asset('js/signup.js')); ?>' defer></script>
<script type="text/javascript">
    const SIGNUP_ROUTE = "<?php echo e(route('signup')); ?>";
</script>
<?php $__env->stopSection(); ?>


<?php $__env->startSection('content'); ?>
<div>Inserisci i tuoi dati:</div>
<main>
    <form name='signup' method='post' action="<?php echo e(route('signup')); ?>">
    <?php echo csrf_field(); ?>
        <span><label>Nome</label><input type='text' name='name' value='<?php echo e(old('name')); ?>'><div id="name-error"></div></span>
        <span><label>Cognome</label><input type='text' name='surname' value='<?php echo e(old('surname')); ?>'><div id="surname-error"></div></span>
        <span><label>E-mail</label><input type='text' name='email' value='<?php echo e(old('email')); ?>'><div id="email-error"></div></span>
        <span><label>Nome utente</label><input type='text' name='username' value='<?php echo e(old('username')); ?>' ><div id="username-error"></div></span>
        <span><label>Password</label><input type='password' name='password' ><div id="pwd-error"></div></span>
        <span><label>Conferma password</label><input type='password' name='confirm_password'><div id="c-pwd-error"></div></span>
        <span><div id="empty-input" class="hidden"><p class="error">Devi compilare tutti i campi</p></div></span>
        <span><p>Hai già un account? <a id="reg" href="<?php echo e(route('login')); ?>">Accedi</a></p>
        <label>&nbsp;<input type='submit' id="submit" value="Registrati" ></label>
    </form>
</main>

<?php $__env->stopSection(); ?>








<?php echo $__env->make('layouts.login_signup', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\xampp\htdocs\Top Movies laravel\example-app\resources\views/signup.blade.php ENDPATH**/ ?>