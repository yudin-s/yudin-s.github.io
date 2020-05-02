<template>
  <div>

  </div>
</template>

<script>
    export default {
        name: "Formatted",
        props:{
          text: {type: String, default: ""}
        },
        computed:{
          formattedText(){
            this.text.replace("\n","<br/>")
          }
        }
    }
</script>

<style scoped>

</style>
