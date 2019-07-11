<template>
  <div class="ModalContainer">
    <div class="modalMain">
      <input type="text" v-model="address" placeholder="your full address">
      <button @click="saveAddress">save</button>
    </div>
  </div>
</template>
<script>
import UtilService from '@/services/UtilService.js'
export default {
    data(){
        return{
            address: '',
            loc:{}
        }
    },
    methods:{
        saveAddress(){
            let addressloc= UtilService.getLocationByAddress(this.address)
             return addressloc
             .then(res=>{
        console.log('loc',res);
        this.loc=res
            this.$store.dispatch({ type: "saveAddress", loc:res })
        })
        .then(()=>{
            this.$emit('setMap',this.address)
        })
             }
    },
    components:{
        UtilService
    }
}
</script>

<style lang="scss" >
.ModalContainer {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: #f0ffff4d;
  justify-content: center;
  align-items: center;
  .modalMain {
    height: 50vw;
    width: 50vw;
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
