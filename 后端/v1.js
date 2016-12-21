/**
 * Created by Administrator on 2016/12/20 0020.
 */
var varSpaceArray=new VarSpaceArray();
function test()
{
    try{
        CreateFor("i",range(["string"]));
        alert("find i="+varSpaceArray.findVar("i"));
        var list=new List('a','c','b');
        var iter=new iterator(list);
        while(iter.next()!=null){
            alert(iter.get());
        }

        varSpaceArray.createNewVarSpace();
        varSpaceArray.addVar("i",1,"j",2);
        varSpaceArray.forEachVarSpace();
        alert("find i="+varSpaceArray.findVar("i"));

        var object1=prompt("请输入object1","");
        var object2=prompt("请输入object2","");
        var op=prompt("请输入op","");
        if (object1!=null && object1 != "" && object2!=null && object2 != "" )
        {
            var b1=null,b2=true;
            alert(new Operation(new TYPE(b1),new TYPE(b2)).or().value);
        }
    }catch(e){
        alert(e.message);
    }
}

class TYPE{
    constructor(value,type){
        this.value=value;
        this.type=type;
    }

}

class List{
    constructor(){
        this.list=new Array();
        this.type="list";
        for(let i=0;i<arguments.length;++i)
            this.list.push(arguments[i]);
        this.length=this.list.length;
    }
    append(item){
        this.list.push(item);
        this.length++;
    }
    get(index){
        while(index<0)
            index+=this.length;
        if(index>this.length)
            throw new Error("IndexError: list index out of range");
        return this.list[index];
    }
    indexOf(item){
        return this.list.indexOf(item);
    }
    insert(index,item){
        this.list.splice(index,0,item);
        this.length++;
    }
    pop(){
        this.list.pop();
        this.length--;
    }
}

class iterator{
    constructor(obj) {
        this.obj=obj;
        alert("constructor iterator");
        this.index=-1;
        this.max=obj.length;
        this.step=1;
        switch(arguments.length){
            case 1: ;break;
            case 2:{
                this.index=arguments[0]-this.step;
                this.max=arguments[1];
            }break;
            case 3:{
                this.max=arguments[1];
                this.step=arguments[2];
                this.index=arguments[0]-this.step;
            }break;
        }
    }
    next(){
        if(this.index+this.step>=this.max){
            return null;
        }else{
            this.index+=this.step;
            return this.index;
        }
    }
    get(){
        if(this.index<0)
            throw new Error("Index Error:index is -1");
        if(this.obj.type=="list")
            return this.obj.get(this.index);
        else if(this.obj.type=="number"||typeof this.obj =="number")
            return this.index;
        else if(this.obj.type=="string"){
            return this.obj.value[this.index];
        } else if(typeof this.obj =="string"){
            return this.obj[this.index];
        }
    }
}

class Num extends TYPE{
    constructor(num){
        if(num==null || typeof num =="number"){
            super(num,"number");
        }else
            throw new Error("the initialize Num is not a number");
    }
}

class String extends TYPE{
    constructor(string){
        if(string==null || typeof string=="string") {
            super(string,"string");
        }else
            throw new Error("the initialize String is not a string");
    }
}

class Boolean extends TYPE{
    constructor(bool){
        if(bool==null || typeof bool=="boolean") {
            super(bool,"boolean");
        }else
            throw new Error("the initialize String is not a string");
    }
}

class None extends TYPE{
    constructor(){
        super(null,"none");
    }
}
function getNumberObject(string){
    return new Num(parseFloat(string));
}

function getStringObject(string){
    return string.substringData(1,string.length-2);
}

class Operation{
    constructor(object1,object2){
        this.object1=object1;
        this.object2=object2;
    }
    add(){
        if(this.object1.type!=this.object2.type)
            throw new Error("the types of two object are different");
        else{
            return new TYPE(this.object1.value+this.object2.value,this.object1.type);
        }
    }
    sub(){
        if(this.object1.type!=this.object2.type)
            throw new Error("the types of two object are different");
        else if(this.object1.type!="number"){
            throw new Error("the type of object--"+this.object1.type+"can't support -");
        } else{
            return new TYPE(this.object1.value-this.object2.value,this.object1.type);
        }
    }
    multi(){
        if(this.object1.type!=this.object2.type)
            throw new Error("the types of two object are different");
        else if(this.object1.type!="number"){
            throw new Error("the type of object--"+this.object1.type+"can't support *");
        } else{
            return new TYPE(this.object1.value*this.object2.value,this.object1.type);
        }
    }
    mod(){
        if(this.object1.type!=this.object2.type)
            throw new Error("the types of two object are different");
        else if(this.object1.type!="number") {
            throw new Error("the type of object--" + this.object1.type + "can't support %");
        }else if(this.object2.value!=0){
            throw new Error("the divisor can't be 0");
        } else{
            return new TYPE(this.object1.value%this.object2.value,this.object1.type);
        }
    }
    divide(){
        if(this.object1.type!=this.object2.type)
            throw new Error("the types of two object are different");
        else if(this.object1.type!="number") {
            throw new Error("the type of object--" + this.object1.type + "can't support /");
        }else if(this.object2.value!=0){
            throw new Error("the divisor can't be 0");
        } else{
            return new TYPE(this.object1.value/this.object2.value,this.object1.type);
        }
    }
    greater(){
        if(this.object1.type!=this.object2.type)
            throw new Error("the types of two object are different");
        else if(this.object1.type!="number") {
            throw new Error("the type of object--" + this.object1.type + "can't support >");
        } else{
            return new TYPE(this.object1.value>this.object2.value,"boolean");
        }
    }
    less(){
        if(this.object1.type!=this.object2.type)
            throw new Error("the types of two object are different");
        else if(this.object1.type!="number") {
            throw new Error("the type of object--" + this.object1.type + "can't support <");
        } else{
            return new TYPE(this.object1.value<this.object2.value,"boolean");
        }
    }
    greaterOrEqual(){
        if(this.object1.type!=this.object2.type)
            throw new Error("the types of two object are different");
        else if(this.object1.type!="number") {
            throw new Error("the type of object--" + this.object1.type + "can't support >=");
        } else{
            return new TYPE(this.object1.value>=this.object2.value,"boolean");
        }
    }
    lessOrEqual(){
        if(this.object1.type!=this.object2.type)
            throw new Error("the types of two object are different");
        else if(this.object1.type!="number") {
            throw new Error("the type of object--" + this.object1.type + "can't support <=");
        } else{
            return new TYPE(this.object1.value<=this.object2.value,"boolean");
        }
    }
    equal(){
        if(this.object1.type!=this.object2.type)
            throw new Error("the types of two object are different");
        else{
            return new TYPE(this.object1.value==this.object2.value,"boolean");
        }
    }
    inequal(){
        if(this.object1.type!=this.object2.type)
            throw new Error("the types of two object are different");
        else{
            return new TYPE(this.object1.value!=this.object2.value,"boolean");
        }
    }
    or(){
        return new TYPE(toBoolean(this.object1)||trBoolean(this.object2),"boolean");
    }
    and(){
        return new TYPE(toBoolean(this.object1)&&trBoolean(this.object2),"boolean");
    }
    not(){
        return new TYPE(~toBoolean(this.object1()));
    }
};

function toBoolean(object){
    if(object.type=="boolean"){
        return object.value;
    }else if(object.value==null) {
        return false;
    }
    return true;
}





function CreateIF(obj){
    varSpaceArray.createNewVarSpace();
    //obj.do_excute();
    varSpaceArray.remove();
}

function CreateFunc(obj){

}

function range(obj){
    var iter;
    switch(obj.length){
        case 1:alert(1);iter=new iterator(obj[0]);break;
        case 2:iter=new iterator(obj[0],obj[1]);break;
        case 3:iter=new iterator(obj[0],obj[1],obj[2]);break;
        default:throw new Error("error num arguments");break;
    }
    return iter;
}

function CreateFor(text,iter){
    //varSpaceArray.addVar(text);
    varSpaceArray.createNewVarSpace();
    while(iter.next()!=null){
        varSpaceArray.addVar(text,iter.get());
        alert("var:"+text);
        alert("for find"+text+"="+varSpaceArray.findVar(text));
    }
    varSpaceArray.remove();
}

function CreateIf(obj) {
    //obj.do_execute();
}
function assign(text, obj){
    varSpaceArray.addVar(text,obj);//obj?
}

function expression(obj){
    //obj.do_execute();
}