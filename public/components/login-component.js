
Vue.component('Login',{
    template:'\
      <div class="login">\
        <p\
          v-if="isLogin">\
          {{message}}\
          <br/>\
          name:<input type="text"\
            v-model="username"/>\
          password:<input type="password"\
            v-model="password"/>\
          <button \
            v-on:click="verify">\
            Login</button>\
        </p>\
        <div\
          v-if="main">\
            <h1>Main</h1>\
        </div>\
      </div>',
    props:{

    },
    data: function(){
      return{
        username:'',
        password:'',
        message:'Please login',
        isLogin:true,
        main:false
      };
    },
    methods:{
        verify: function(){   
          let that = this;
          $.ajax({
            url: 'http://localhost:3000/verify?restaurantName=${this.username}&password=${this.password}',
            type: 'GET',
            
            success: function(result){
              that.isLogin = result.result;
              if(result.result) that.main = true;
              else that.message = 'login failed.'
            }
            
           
          })
        }
    }
})