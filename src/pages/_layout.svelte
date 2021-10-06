<script>
import Nav  from '../components/Nav.svelte';
</script>

<main class="">

    <Nav />        

    <div class="bg-gray-100 flex justify-center items-center px-5">
        <slot />
    </div>
    <!-- Later include footer for the inforamtion -->
</main>