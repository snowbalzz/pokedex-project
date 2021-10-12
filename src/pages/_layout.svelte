<script>
import Nav  from '../components/Nav.svelte';
</script>

<main class="">
    <div class="flex mb-4">
        <div class="w-1/6">
            <Nav />        
        </div>
        <div class="w-5/6">     
        <div class="bg-gray-100 flex justify-center items-center px-5 ">
            <slot />
        </div>
    </div>
    <!-- Later include footer for the inforamtion -->
</main>