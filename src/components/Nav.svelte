<script>
  import { url } from "@roxi/routify";
  import { Button, Menu } from "../components";
  import { user, loginWithGoogle, logout } from "../components/Auth.svelte";
  import Autocomplete from '../components/Autocomplete.svelte'

  let _user;

  user.subscribe((v) => (_user = v));
</script>

<main>
    <div class="fixed flex flex-col top-0 left-0 w-60 bg-red-500 h-full shadow-lg">
        <a href={$url('../')}>
            <div class="flex items-center pl-6 h-20 border-b border-white">
                <img src="/images/pokeball.png" alt="" class="rounded-full h-10 w-10 flex items-center justify-center mr-3  rotate-1">
                <div class="ml">
                    <p class="text-md font-medium tracking-wide truncate text-gray-100 font-sans">GIT - POKEDEX</p>
                </div>
            </div>
        </a>
        <div class="overflow-y-auto overflow-x-hidden flex-grow ">
            <ul class="flex flex-col py-6 space-y-1 border-b border-white">
                <li>
                    <a href={$url('../pokedex')} class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-red-400 hover:text-gray-200 border-r-4 border-transparent hover:border-yellow-500 pr-6">
                        <span class="inline-flex justify-center items-center ml-4">
                            <img src="/images/home.png" alt="" class="w-8 h-8">
                        </span>
                        <span class="ml-2 font-semibold text-sm tracking-wide truncate font-sans text-gray-100">Gen 1 - Pokedex</span>
                    </a>
                </li>
                <li>
                    <a href='https://github.com/snowbalzz/pokedex-project' class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-red-400 hover:text-gray-200 border-r-4 border-transparent hover:border-yellow-500 pr-6">
                        <span class="inline-flex justify-center items-center ml-4">
                            <img src="/images/git.png" alt="" class="w-8 h-8">
                        </span>
                        <span class="ml-2 font-semibold text-sm tracking-wide truncate font-sans text-gray-100">Project Git Hub</span>
                    </a>
                </li>
            </ul>
            <div class="flex items-center pl-4 h-20">
                {#if _user}
                    <Menu user={_user} on:confirmLogout={logout}/>
                {:else}
                    <Button title='Log in with Google' white on:click={loginWithGoogle} />
                {/if}   
            </div>
        </div>
    </div>
</main>
