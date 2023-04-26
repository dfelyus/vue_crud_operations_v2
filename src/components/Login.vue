<template>
    <div class="container1">
        <div class="col-md-5 mb-3">
            <h3>Login</h3>
            <form @submit="login">
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
                    <button type="submit" class='btn btn-danger mt-2'>Login</button>
                    <br>
                    <a href="/register" style="color:yellow">Register</a>
                </div> 
            </form>
            
            
        </div>
    </div>
</template>

<script >

export default{
    name:"Login",
    data(){
        return {
            email:"",
            password:"",
            error_email:"",
            error_password:"",
        };
    },
    methods:{
        

        async login(e){
            e.preventDefault();

            const user = {
                email:this.email,
                password:this.password,
            };

            let res;
            res = await fetch(
                "http://localhost:8000/api/login",
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

                const login_user = await res?.json();
                localStorage.setItem('current_token', login_user.token);
                localStorage.setItem('current_name', login_user.user.name);
                localStorage.setItem('current_email', login_user.user.email);

                this.name= "";
                this.email= "";
                this.password= "";

                location.href = 'http://127.0.0.1:5173/home';

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