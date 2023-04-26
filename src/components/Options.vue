<template>
    <div class="btn-group"  role="group" aria-label="Basic mixed styles example">
            <div v-html="edit_button"></div>
            <button type="button" @click="deleteBook(book.id)"  class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
            <button type="button" class="btn btn-success">options</button>
    </div>

<Edit
:childFunc="this.funcInter"
:book="book" />    
</template>

<script >

import Edit from './Edit.vue';

export default{
    name:"Options",
    components:{ Edit },
    props:{
        book:Object,
        funcInter:Function
    },
    data(){
        return{
            edit_button:"",
        }
    },
    methods:{
        async deleteBook(id){
            this.$emit("delete-book",id)

        },
    },
    async created() {

        
            const num_modal = this.book.id;
            this.edit_button = "<button type='button' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#editModal"+num_modal+"'>Edit</button>"
            
    },
    
}
</script>
