
   var config = {
    apiKey: "AIzaSyA1O6xRDWtwCGVyB-GQRyLmHlSKxFbdmX0",
    authDomain: "fireproject-13ab0.firebaseapp.com",
    databaseURL: "https://fireproject-13ab0.firebaseio.com",
    projectId: "fireproject-13ab0",
    storageBucket: "fireproject-13ab0.appspot.com",
    messagingSenderId: "61885338920"
    };
    firebase.initializeApp(config);

     //Code Jquery, form class=register 
     $(".signup form").on("submit", function(event) {
        event.preventDefault();

        var email = $(".signup .email").val();
        var password = $(".signup .password").val();

        console.log(email);
        console.log(password);

        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
            console.log(user);
            //Send a user a verification email
            var user = firebase.auth().currentUser;
            var email_verified = user.emailVerified;
            console.log(email_verified);
            
        //     if(!email_verified){
        //         user.sendEmailVerification().then(function() {
        //             // Email sent.
        //             console.log("an verification email was sent");
                    
        //             //window.alert("verification sent, check yuor email and verify. After click ok!");
                    
        //             }).catch(function(error) {
        //             // An error happened.
        //             window.alert("error : " + error.message);
        //             });
        //     }else{
        //         window.alert("User verified, rendering login page");
        //     }
        
         
           
        }).catch(function(err){
            console.log(err);
            window.alert( err.message);
            
        });
        //Prova
        //event.stopImmediatePropagation();
     });    
    
    
    
    //add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            

        } else {
            console.log('not logged in');
            
        }
    });
