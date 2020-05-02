<template>
  <ul class="top-menu">
    <li v-for="(link,index) in links" :key="index">
      <nuxt-link :to="link.to">
        <i :class="link.icon"></i> <span v-html="link.title"/>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
    export default {
        name: "Navigation",
        data(){
          return {
            activeLink: null,
          }
        },
        props:{
          links: {type: Array, default: ()=>[] }
        }

    }
</script>

<style>
  ul.top-menu li a:hover{
    transition:all ease 0.2s;
  }


  ul.top-menu li i{
    font-size:14px;
    margin-right: 4px;
  }

  ul.top-menu li .nuxt-link-active{
    border-bottom: 3px solid #ffa60a;
  }


</style>
