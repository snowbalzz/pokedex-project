<script context="module">
  import { initAuth } from "../auth";
  export const { loginWithGoogle, user, logout } = initAuth();
  user.subscribe((v) => {
   console.log(v);
  });
</script>
