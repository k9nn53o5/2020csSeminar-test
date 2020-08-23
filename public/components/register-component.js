
Vue.component('Register',{
    template:'\
        <div class="register">\
            <div class="user">\
                    {{message}}\
                    <br/>\
                    name:<input type="text" \
                        v-model="name"/>\
                    <br/>\
                    password:<input type="password" \
                        v-model="password"/>\
                    <br/>\
                    phone:<input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"\
                        v-model="phone">\
                    <br/>\
                    <button\
                        v-on:click="doRegister">\
                        Submit</button>\
            </div>\
        <p \
            v-if="haveNotRegister == false">\
                You have already registered before</p>\
        <div \
            v-if="main">\
            <h1>Main</h1>\
        </div>\
        </div>',
    data: function(){
        return{
            name:'',
            password:'',
            phone:'',
            message:"Haven't Register yet?",
            haveNotRegister:true,
            main:false
        };
    },
    computed:{},
    methods:{
        doRegister: function(){
        }
    }
})