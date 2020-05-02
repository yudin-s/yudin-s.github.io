<template>
  <div class="profile">
    <div class="profile-image">
      <img alt="image" src="images/Profile-img.png">
    </div>
    <div class="profile-info">
      <div class="name-job">
        <h1>Sergei Iudin</h1>
        <span class="job"> Full-Stack Developer </span>
      </div><!-- .name-job -->
      <div class="social-icons">
        <a class="facebook" href="https://www.facebook.com/sergeblackbox"><i class="fa fa-facebook"></i> </a>
        <a class="twitter" href="https://twitter.com/serge_yudin_"><i class="fa fa-twitter"></i> </a>
        <a class="behance" href="https://github.com/yudin-s"><i class="fa fa-github"></i> </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Profile"

  }
</script>

<style scoped>
  @media (min-width: 768px) {
    .profile {
      position: fixed;

    }
  }
</style>
