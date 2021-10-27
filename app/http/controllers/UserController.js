//-----------------------------------------
//-----------------------------------------
//------------- HTTP UserController
//------------------------------------------
//-----------------------------------------



//--------------------------
//------- Import Models & Libs
//--------------------------
const bcrypt = require('bcrypt');
const User = requiree('/models/UserModel.js');



//--------------------------------------
//----------- Home Controller Functions
//---------------------------------------

async function signupForm(req,reply)
{
    reply.view('user/signup.njk');
}

async function signupSubmit(req,reply)
{
    //------- getdata
    let user=req.body.formUser;
    let email=req.body.formEmail;
    let password=req.body.formPassword;


   
    //----------- server side validation
  
    //--check username or email exist
    let doc= await User.findOne({$or:[
            { username: user },
            { email: email }
        ]
    })

    if(doc)
    {
        req.flash('error','نامکاربری یا رمز عبور قبلا انتخاب شده');
        reply.redirect('/signup')
    }
  


    //----------- database
    const record = new User({
        'username':user,
        'email':email,
        'password':password
    });

    try{
             let doc = await record.save()

              let message=doc.username+'کاربر ایجاد شد'
              req.flash('success',message);
              reply.redirect('/signup')
    }catch(err)
     {
        //res.send(err.errors);
        req.flash('error',err.errors);
        reply.redirect('back')
    }
}


function signinForm(req,reply)
{
    reply.view('user/signin.njk');
}


async function signinSubmit(req,reply){


     let username=req.body.formUser;
     let password=req.body.formPassword;


     try{
         let doc= await User.findOne({
                            username: username // search query
                        })
              
         let match = await bcrypt.compare(password, doc.password)
        
          if (match) {
              
           //create session and login
           let userData={
              id:doc._id,
              username:doc.username,
              isAdmin:false,
              userAgent:"test"
           }
           req.session.set('user',userData);
           reply.redirect('/user/panel')
        
        } else {
          // create error
           req.flash('error','نام کاربری یا رمز عبور صحیح نمیباشد');
           reply.redirect('/signin')
        }
        
     }
     catch(error){
          req.flash('error','کاربر مورد نظر پیدا نشد');
          reply.redirect('/signin')
     }
}


function signout(req, reply) {
        req.session.delete()
        reply.redirect('/signin');
}


function panel(req,reply)
{
    //-- get sessio
    const user=req.session.get('user')
    //-- get value of session
    const id = req.session.get('user').id
    const username= req.session.get('user').username
    const message=username+'- You are login to panel'
   
    //--- we can pass session with data
    const data={
        user:req.session.get('user')
    }
    
    reply.view('user/panel.njk',data);
}

//---------------------------- Export Controller
module.exports={
    signinForm,
    signinSubmit,
    signupForm,
    signupSubmit,
    signout,
    panel
}