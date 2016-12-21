/**
 * Created by Administrator on 2016/12/20 0020.
 */
class VarSpace{
    constructor(){
        //      super(this.map,"varTable");
        this.type="varSpace";
    }
    add(key,value){//even arguments
        if(arguments.length%2)
            throw new Error("arguments must be even");
        if(this.map==null)
            this.map=new Map();
        for(let i=0; i<arguments.length/2;++i){
            this.map.set(arguments[2*i],arguments[2*i+1]);
        }
    }
    remove(key){
        if(this.map.has(key))
            this.map.delete(key);
        else
            throw new Error("no such variable to remove");
    }
    find(key) {
        return this.map.get(key);
    }

}

/*class SpaceArray{
 constructor(){
 if(arguments.length==0){
 if(this.arr==null)
 this.arr=new Array();
 return;
 }
 for(let i=0;i<arguments.length;++i){
 if(this.arr==null)
 this.arr=new Array(arguments[i]);
 else
 this.arr.unshift(arguments[i]);
 }
 }
 find(varName){
 let value=null;
 for(let i=0;i<this.arr.length;++i){
 if((value=this.arr[i].find(varName))!=null)
 break;
 }
 if(value==null)
 throw new Error("no such variable:'"+varName+"'");
 return value;
 }
 remove(){
 if(arguments.length==0){
 if(this.arr.length==0)
 throw new Error("can't remove space");
 this.arr.shift();
 return;
 }
 if(arguments[0]>this.arr.length)
 throw new Error("too much remove");
 for(let i=0;i<arguments[0];++i){
 this.arr.shift();
 }
 }
 }*/
class VarSpaceArray {
    constructor(){
        if(arguments.length==0){
            if(this.arr==null)
                this.arr=new Array();
            return;
        }
        for(let i=0;i<arguments.length;++i){
            if(this.arr==null)
                this.arr=new Array(arguments[i]);
            else
                this.arr.unshift(arguments[i]);
        }
    }
    findVar(varName){
        let value=null;
        for(let i=0;i<this.arr.length;++i){
            if((value=this.arr[i].find(varName))!=null)
                break;
        }
        if(value==null)
            throw new Error("no such variable:'"+varName+"'");
        return value;
    }
    remove(){
        if(arguments.length==0){
            if(this.arr.length==0)
                throw new Error("can't remove space");
            this.arr.shift();
            return;
        }
        if(arguments[0]>this.arr.length)
            throw new Error("too much remove");
        for(let i=0;i<arguments[0];++i){
            this.arr.shift();
        }
    }
    addVarSpace(varSpace){
        if(varSpace.type=="varSpace"){
            this.arr.unshift(varSpace);
        }else
            throw new Error("no such varSpace");
    }
    getCurVarSpace(){
        return this.arr[0];
    }
    addVar(key,value){
        if(arguments.length%2)
            throw new Error("arguments must be even");
        var varSpace=this.getCurVarSpace();
        for(let i=0;i<arguments.length/2;++i){
            varSpace.add(arguments[2*i],arguments[2*i+1]);
        }
    }
    createNewVarSpace(){
        this.addVarSpace(new VarSpace());
    }
    forEachVarSpace(){
        this.arr.forEach(function(varSpace) {
            varSpace.map.forEach(function (value,key,map) {
                alert(key+"="+value);
            });
        });
    }
}

class FuncArray{
    constructor(){
        super();
    }

}
