<template>
  <div id="wrapper">
    <div class="parallax"> </div>

    <default-layout>
    <template v-slot:profile>
      <profile/>
    </template>
    <template v-slot:default>
      <navigation :links="links" />
      <nuxt />
    </template>
    </default-layout>

  </div>
</template>

<script>

  import DefaultLayout from "@/components/Layout/DefaultLayout"
  import Profile from "@/components/Common/Profile"
  import Navigation from "@/components/Common/Navigation"

  export default {

    components: {
      Navigation,
      Profile,
      DefaultLayout
    },

    data(){
        return {
          links:[
            {

              icon: 'fa fa-user',
              to: {name: 'index'},
              title: 'ABOUT',

            },
            {

              icon: 'fa fa-file-text-o',
              to: '/resume',
              title: 'RESUME',

            },
            {

              icon: 'fa fa-picture-o',
              to: '/portfolio',
              title: 'PORTFOLIO',
            },
            {
              icon: 'fa fa-map-marker',
              to: '/contact',
              title: 'CONTACT',
            },
          ]
        }
    }
  }
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
