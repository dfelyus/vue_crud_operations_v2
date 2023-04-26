<template>
    <div class="container1">
        <div class="col-md-5 mb-3">
            <h3>Register</h3>
            <form @submit="register">
               <div>
                <label for="name" class="form-label">Username</label>
                <input type="text" v-model="name" class="form-control" id="name" placeholder="Your username..." />
                <span style="color:yellow" >{{ error_name }}</span>
                </div>
                <div>
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" v-model="email" id="email" placeholder="name@example.com" />
                    <span style="color:yellow">{{ error_email }}</span>
                </div>
                <div>
                    <label for="password" class="form-label">Password</label>
                    <input type="password" v-model="password" class="form-control" id="password" placeholder="your password..." />
                    <span style="color:yellow">{{ error_password }}</span>
                </div> 
                <div>
                    <label for="password_confirmation" class="form-label">Confirm password</label>
                    <input type="password" v-model="password_confirmation" class="form-control" id="password_confirmation" placeholder="confirm password..." />
                </div> 
                <div>
                    <button class='btn btn-danger mt-2'>Register</button>
                    <br>
                    <a href="/login" style="color:yellow">I Already have an Account</a>
                </div> 
            </form>
            
            <button class="btn btn-danger" @click="getToken">getToken</button>
        </div>
    </div>
</template>

<script >

import { useRoute } from "vue-router";

const route = useRoute();

export default{
    
    name:"Register",
    data(){
        return {
            name: "",
            email:"",
            password:"",
            password_confirmation:"",
            error_name:"",
            error_email:"",
            error_password:"",
        };
    },
    
    methods:{
        

        async register(e){
            e.preventDefault();

            const user = {
                name:this.name,
                email:this.email,
                password:this.password,
                password_confirmation:this.password_confirmation,
            };

            let res;
            res = await fetch(
                "http://localhost:8000/api/register",
                {
                    method:"POST",
                    headers:{
                        'Accept': 'Application/json',
                        'Content-Type': 'Application/json;charset=utf-8',
                    },
                    body: JSON.stringify(user)
                }
                );

            if(res.status === 422){
                const error_msg = await res?.json();

                if (typeof error_msg.errors.name === 'undefined' || error_msg.errors.name === null) {
                    this.error_name="";
                }else{
                    this.error_name = error_msg.errors.name[0];
                }
                if (typeof error_msg.errors.email === 'undefined' || error_msg.errors.email === null) {
                    this.error_email="";
                }else{
                    this.error_email = error_msg.errors.email[0];
                }
                if (typeof error_msg.errors.password === 'undefined' || error_msg.errors.password === null) {
                    this.error_password="";
                }else{
                    this.error_password = error_msg.errors.password[0];
                }
                
            }
            else{

                const registed_user = await res?.json();
                localStorage.setItem('current_token', registed_user.token);
                localStorage.setItem('current_name', registed_user.user.name);
                localStorage.setItem('current_email', registed_user.user.email);

                this.name= "";
                this.email= "";
                this.password= "";

                alert("registration success!!!");

                }

        },

    },
    
};
</script>

<style>
 .container1{
    height:100vh;
    display:flex;
    align-items:center;
    justify-content: center;
    background-color: teal;
 }
</style>