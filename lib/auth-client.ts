import { createAuthClient } from "better-auth/react" 

export const authClient =  createAuthClient({
baseURL: process.env["BASE_URL"],

});

export const signInWithGoogle = async () => {

    try {
          const {data, error} = await authClient.signIn.social({
    provider: "google",
  });
  
  if (error){
    console.log(error.message);
    
    return {success: false, message: "There was an error"}
  }

  console.log(data);
  

    return {success: true, message: `Welcome`}
    } catch (error) {
        console.log(error);
        
    }



  
};