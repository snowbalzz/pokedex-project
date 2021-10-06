<script>
  import Lable from './Lable.svelte'
  export let pokemon;
  let isLoading = false;
  
</script>

<div class="cursor-pointer p-5 rounded-xl border bg-whiterounded-lg my-3 flex grid grid-flow-row grid-cols-3 px-4 row-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
  <div class="col-span-1 flex-grow" on:click>
    <img src={pokemon.sprites.normal} alt={pokemon.name} class="object-fill" />
  </div>
  <div class="col-span-1" on:click>
    <p class="text-xs text-gray-500">{pokemon.national_number}</p>
    <p class="text-lg font-bold my-1">{pokemon.name}</p>
    <div class="list-item-type flex">
      {#each pokemon.type as type}
        <Lable {type} />
      {/each}
    </div>
  </div>
  <div class="col-span-1 flex items-start justify-end">
    <div type="button"class="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-full">
      <p>Favorite</p>
    </div>
  </div>
</div>