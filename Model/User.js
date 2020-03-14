class User 
{
    constructor(name, gender, birth, country, email, password, photo, admin)//metodo construtor
    {
        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();

    }

    get name()
    {
        return this._name;
    }

    set name(value)
    {
        this._name = value;
    }

    get gender(){
        return this._gender;
    }

    set gender(value)
    {
        this._gender = value;
    }

    get birth(){
        return this._birth;
    }

    set birth(value)
    {
        this._birth = value;
    }

    get country(){
        return this._country;
    }

    set country(value)
    {
        this._country = value;
    }

    get email()
    {
        return this._email;
    }

    set email(value)
    {
        this._email = value;
    }

    get password()
    {
        return this._password;
    }

    set password(value)
    {
        this._password = value;
    }

    get photo()
    {
        return this._photo;
    }

    set photo(value)
    {
        this._photo = value;
    }

    get admin(){
        return this._admin;
    }

    set admin(value)
    {
        this._admin = value;
    }

    get register(){
        return this._register;
    }

    set register(value)
    {
        this._register = value;
    }

    getNewId()
    {

        //verificar se este ID já esta guardado no LS
        let usersID = parseInt(localStorage.getItem("usersID"));//guarda o ultimo id gerado

        console.log(usersID);

        if(!usersID > 0) usersID = 0;

        usersID++;

        localStorage.setItem("usersID", usersID);

        return usersID;

        
    }

    loadFromJSON(json)
    {
         for(let name in json){//pra cada nome que vc encontrar no json faça

            switch(name){

                case '_register':
                    this[name] = new Date(json[name]);
                break;
                default:
                    this[name] = json[name];
            }

            
         }
    }

    static getUsersStorage()//metodo para retornar os dados que estão guardados no sessionstorage
    {
        let users = [];

        if(localStorage.getItem("users"))//verifica se já existe algum obj na session users
        {
            //se tiver ...sobrescreve 
            users = JSON.parse(localStorage.getItem("users")); //transforma string em obj JSON

        }

        return users;

    }

    save()
    {
        let users = User.getUsersStorage();//retorna todos os usuarios que estão no localstorage

        //EDITANDO USER
        if(this.id > 0){//no obj já existe um id?

            users.map(u=>{ //maps - mapeia uma posição no array, e substitue os dados

                if(u._id == this.id){//acha onde no array users tenha o mesmo id do obj

                   Object.assign(u, this);//faz a substituição
                }

                return u;

            });
          
        }
        //CRIANDO USER
        else//se não tiver o id, gera um novo
        {
            this._id = this.getNewId();

            users.push(this);//push add no final do array
        }

        

        localStorage.setItem("users",JSON.stringify(users));////transforma  obj JSON em string
        //setitem - guarda na sessão chave + valor


       
    }

    remove(){

        let users = User.getUsersStorage();//carrega os dados de dentro do LocalStorage

        users.forEach((userData, index) => {

            //fazer um foreach para percorrer os users do LS que tenham o mesmo ID do que deve ser excluido
            
            if(this._id == userData._id)
            {
                //achou o que deve ser excluido

                //para remover um item de um array apenas com o index delete, usa o método SPLICE()
                
                users.splice(index, 1); //1º qual o index/2º qtos vc quer remover?
            
            }


        });

        localStorage.setItem("users",JSON.stringify(users));////transforma  obj JSON em string
        //setitem - guarda na sessão chave + valor

        
    }

    
  


}