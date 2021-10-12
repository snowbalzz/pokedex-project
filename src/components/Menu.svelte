<script>
  import { createEventDispatcher } from "svelte";
  import { url } from "@roxi/routify";
  import { clickOutside } from "../services/clickOutside";
  const dispatch = createEventDispatcher();
  export let user;
  let isOpen = false;
  let menuOptions = [
    {
      path: "/profile",
      title: "Profile",
    },
  ];
  function handleClickOutside(event) {
    isOpen = false;
  }
  function openMenu() {
    isOpen = !isOpen;
  }
</script>

<div class="relative cursor-pointer">
  <div class="flex items-center justify-center" on:click={openMenu}>
    <div class="w-8 h-8 rounded-full overflow-hidden">
      <img src={user.picture} alt="user thumb" class="w-8 h-8" />
    </div>
    <p class="ml-2 font-semibold text-sm tracking-wide truncate font-sans text-gray-100">{user.name}</p>
  </div>
  {#if isOpen}
    <div
      class="flex flex-col text-righ absolute top-12 rounded bg-gray-100 z-50  p-3 text-gray-100 pr-24"
      use:clickOutside
      on:click_outside={handleClickOutside}
    >
      {#each menuOptions as option, i}
        <a href={$url(option.path)} key={i} class="mb-5">
          <p class="ml-2 font-semibold text-sm tracking-wide truncate font-sans text-black">
            {option.title}
          </p>
        </a>
      {/each}
      <p class="ml-2 font-semibold text-sm tracking-wide truncate font-sans text-red-700" on:click={() => dispatch("confirmLogout")}>
        Logout
      </p>
    </div>
  {/if}
</div>