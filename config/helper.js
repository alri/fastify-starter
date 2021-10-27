
const url = function(link=false,params=false) {
    if(params)
    {
        var items="";
        var newLink="";
        for(const property in params )
        {
            let n = link.includes(property);
            if(n!=0)
            {   
                let value =`${property}/${params[property]}`;
                let str=link.replace(property,value);
                newLink=str;
            }
            else{
               items=items+"/"+params[property];
            }  
        }

        if(newLink){
            newLink=newLink+items
        }
        else{
            newLink=link+newLink+items
        }
        
        return process.env.APP_URL+'/'+newLink;

    }else{
        return process.env.APP_URL+'/'+link;
    }
    
}

const css = function(link=false) {
    return process.env.APP_URL+'/css/'+link;
}

const js = function(link=false) {
    return process.env.APP_URL+'/js/'+link;
};

const img = function(link=false) {
    return process.env.APP_URL+'/images/'+link;
};

const cssSpa = function(link=false) {
    return process.env.APP_URL+'/dist/css/'+link;
}

const jsSpa = function(link=false) {
    return process.env.APP_URL+'/dist/js/'+link;
};

const imgSpa = function(link=false) {
    return process.env.APP_URL+'/dist/images/'+link;
};

const dist = function(link=false) {
    return process.env.APP_URL+'/dist/'+link;
};

const root = function(){
    return process.env.PWD
}

const test = function(){
    return "Test Helper Work Done !"
}


module.exports = {
    url : url,
    css:css,
    js:js,
    img:img,
    cssSpa:cssSpa,
    jsSpa:jsSpa,
    imgSpa:imgSpa,
    dist:dist,
    root:root,
    test:test
};
