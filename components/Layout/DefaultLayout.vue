<template>
  <div class="container">
    <div class="row">

      <div class="col-md-3 wow fadeInDown">
        <slot name="profile"></slot>
      </div>

      <div id="tab-container" class="col-md-9">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "DefaultLayout"
    }
</script>

<style >

</style>
