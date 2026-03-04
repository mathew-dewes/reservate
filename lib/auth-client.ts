import { createAuthClient } from "better-auth/react" 

export const authClient =  createAuthClient({
baseURL: process.env["BASE_URL"],


});

export const signInWithGoogle = async (redirect: string) => {

    try {
          const {error} = await authClient.signIn.social({
    provider: "google",
    callbackURL: redirect + "?login=success"
    
  });
  
  if (error){
    console.log(error.message);
    
    return {success: false, message: "There was an error"}
  }


  

    return {success: true, message: `Login Successful`}
    } catch (error) {
        console.log(error);
        
    }



  
};