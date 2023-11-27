const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKeys.json");

/*---------INITIALIZING-------*/
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  }); 
const db = admin.firestore()
/*---------INITIALIZING-------*/





/*-----------ADD NEW USER---------*/
async function createUserDocument(userId, userTgName, userRate) {
    try {
        const db = admin.firestore();
        const usersRef = db.collection('users');

        await usersRef.doc(String(userId)).set({
            userTgName: userTgName,
            userRate: userRate,
            userPhone: '',
            userEmail: '',
            userPayment: false,
            firstTestPassed: false,
            firstTestAttempts: 0,
            secondTestPassed: false,
            secondTestAttempts: 0,
            userUpgradedAdvancedToPro: false,
            userUpgradedBasicToAdvanced: false,
            userUpgradedBasicToPro: false,
            userAnswerUserFullName: '',
            userAnswerUserInstName: '',
            userAnswerUserWhoAreYou: '',
            userAnswerUserAim: '',
            userAnswerUserAimRealize: '',
            userAnswerUserWeaknesses: '',
            userAnswerUserClient: '',
            waitingForSession: false,
        });

        console.log(`User document created for userId: ${userId}`);
    } catch (error) {
        console.error('Error creating user document:', error);
    }
}
/*-----------ADD NEW USER---------*/


/*-----------UPDATE USER RATE------------*/
async function updateUserRate(userId, userRate) {
    try {
        const db = admin.firestore();
        const userRef = db.collection('users').doc(String(userId));

        await userRef.update({
            userRate: userRate,
        });

        console.log(`User rate updated for userId: ${userId}`);
    } catch (error) {
        console.error('Error updating user rate:', error);
    }
}
/*-----------UPDATE USER RATE------------*/

/*----------UPDATE USER AFTER PAYMENT----------*/
async function updateUserInfoAfterPayment(userId, userName, userPhone, userEmail, paymentPrice) {
    try {
        const db = admin.firestore();
        const usersRef = db.collection('users').doc(String(userId));

        await usersRef.update({
            userTgName: userName,
            userPhone: userPhone,
            userEmail: userEmail,
            userPayment: true
        });

        console.log(`User information updated for userId: ${userId}`);
    } catch (error) {
        console.error('Error updating user information:', error);
    }
}
/*----------UPDATE USER AFTER PAYMENT----------*/


/*---------UPDATE USER FIRST TEST PASSED----------*/
async function updateUserFirstTestPassed(userId) {
    try {
        const db = admin.firestore();
        const usersRef = db.collection('users').doc(String(userId));

        await usersRef.update({
            firstTestPassed: true
        });

        console.log(`User information updated for userId: ${userId}`);
    } catch (error) {
        console.error('Error updating user information:', error);
    }
}
/*---------UPDATE USER FIRST TEST PASSED----------*/


/*---------UPDATE USER SECOND TEST PASSED----------*/
async function updateUserSecondTestPassed(userId) {
    try {
        const db = admin.firestore();
        const usersRef = db.collection('users').doc(String(userId));

        await usersRef.update({
            secondTestPassed: true
        });

        console.log(`User information updated for userId: ${userId}`);
    } catch (error) {
        console.error('Error updating user information:', error);
    }
}
/*---------UPDATE USER SECOND TEST PASSED----------*/


/*-------------UPDATE USER ANSWERS-------------*/
async function addUserSignUpAnswers(userId, userAnswerUserFullName, userAnswerUserInstName, userAnswerUserWhoAreYou, userAnswerUserAim, userAnswerUserAimRealize, userAnswerUserWeaknesses, userAnswerUserClient) {
    try {
        const db = admin.firestore();
        const usersRef = db.collection('users').doc(String(userId));

        await usersRef.update({
            userAnswerUserFullName: userAnswerUserFullName,
            userAnswerUserInstName: userAnswerUserInstName,
            userAnswerUserWhoAreYou: userAnswerUserWhoAreYou,
            userAnswerUserAim: userAnswerUserAim,
            userAnswerUserAimRealize: userAnswerUserAimRealize,
            userAnswerUserWeaknesses: userAnswerUserWeaknesses,
            userAnswerUserClient: userAnswerUserClient
        });

        console.log(`User information updated for userId: ${userId}`);
    } catch (error) {
        console.error('Error updating user information:', error);
    }
}



/*-----------DELETE USER EMAIL AFTER PAYMENT ACCEPTION---------*/
async function deleteUserPaymentKey(userEmail) {
    try {
  
      const userRef = db.collection('paymentKeys').doc(userEmail);
      const doc = await userRef.get();
  
      if (!doc.exists) {
        console.error('Документ не найден');
        return;
      }
  
      await userRef.delete();
      console.log(`Документ с email ${userEmail} успешно удален.`);
    } catch (error) {
      console.error('Ошибка при удалении документа:', error);
    }
}

/*-------------ADVANCED-PRO UPGARDE-----------------*/
async function updateUserAfterUpfgradeAdvToPro(userId) {
    try {
        const db = admin.firestore();
        const usersRef = db.collection('users').doc(String(userId));

        await usersRef.update({
            userUpgradedAdvancedToPro: true
        });

        console.log(`User information updated for userId: ${userId}`);
    } catch (error) {
        console.error('Error updating user information:', error);
    }
}

/*----------------BASIC - ADVANCED UPGRADE----------------*/
async function updateUserAfterUpfgradeBasToAdv(userId) {
    try {
        const db = admin.firestore();
        const usersRef = db.collection('users').doc(String(userId));

        await usersRef.update({
            userUpgradedBasicToAdvanced: true
        });

        console.log(`User information updated for userId: ${userId}`);
    } catch (error) {
        console.error('Error updating user information:', error);
    }
}

/*----------------BASIC - PRO UPGRADE----------------*/
async function updateUserAfterUpfgradeBasToPro(userId) {
    try {
        const db = admin.firestore();
        const usersRef = db.collection('users').doc(String(userId));

        await usersRef.update({
            userUpgradedBasicToPro: true
        });

        console.log(`User information updated for userId: ${userId}`);
    } catch (error) {
        console.error('Error updating user information:', error);
    }
}
/*----------------BASIC - PRO UPGRADE----------------*/




/*-----------EXPORTING FUNCTIONS--------*/
module.exports = {
    createUserDocument,
    updateUserRate,
    updateUserInfoAfterPayment,
    updateUserFirstTestPassed,
    updateUserSecondTestPassed,
    addUserSignUpAnswers,
    deleteUserPaymentKey,
    updateUserAfterUpfgradeAdvToPro,
    updateUserAfterUpfgradeBasToAdv,
    updateUserAfterUpfgradeBasToPro
}