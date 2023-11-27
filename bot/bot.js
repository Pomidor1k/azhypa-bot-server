const { Telegraf, Markup } = require('telegraf')
const LocalSession = require('telegraf-session-local')
const messages = require('./messages.json')
const keyboards = require('./keyboards')
const dataBase = require('./dataBase')
const vars = require("./vars")

/*------------------IMPORTS--------------------*/


/*-------------------INITIALIZING---------------*/
const bot = new Telegraf(vars.BOT_TOKEN)
const localSession = new LocalSession({database: 'session_db.json'})
bot.use(localSession.middleware())
/*-------------------INITIALIZING---------------*/


/*--------------BOT START MESSAGE----------*/
bot.start(async (ctx) => {
    const userId = ctx.from.id
    const userName = ctx.from.username ? ctx.from.username : 'none'

    //getting user rate from link
    const parameter = ctx.message.text.split(' ')[1]
    const userRates = {
        'level_pro': 'pro',
        'level_advanced': 'advanced',
        'level_basic': 'basic'
    }
    const userRate = userRates[parameter] || 'none'

    //setting local session fields
    ctx.session.userName = userName
    ctx.session.userRate = userRate
    ctx.session.canSendMessage = false
    ctx.session.video1Link = `${vars.SERVER_URL}/ZjUOfUNFnu/${userId}`
    ctx.session.video2Link = `${vars.SERVER_URL}/QinfOnFiuA/${userId}`
    ctx.session.video3Link = `${vars.SERVER_URL}/unfUFnuduP/${userId}`
    ctx.session.video4BtoALink = `${vars.SERVER_URL}/bYyhiboBbx/${userId}`
    ctx.session.video4BtoPLink = `${vars.SERVER_URL}/iuBuogiytf/${userId}`

    /*delete later*/
    await dataBase.createPaymentTest()
    await dataBase.createPaymentTestAzhypa()
    /*delete later*/

    //Adding user info to DB(depends on user's rate)
    try {
        await dataBase.createUserDocument(userId, userName, userRate)
    } catch (error) {
        console.error(error);

        setTimeout(async () => {
            await dataBase.createUserDocument(userId, userName, userRate)
        }, 90000000);
    }

    if (ctx.session.userRate === 'none') { //If user rate is not defined(user came not by the link)
        try {
            await ctx.replyWithPhoto({source: '../assets/images/welcome.jpg'}, {
                protect_content: true,
                parse_mode: "Markdown",
                caption: messages.chooseRateMsg,
                ...keyboards.chooseRateKeyboard
            })
        } catch (error) {
            console.error(error);

            setTimeout(async () => {
                await ctx.replyWithHTML(messages.chooseRateMsg, {
                    parse_mode: 'Markdown',
                    protect_content: true,
                    ...keyboards.chooseRateKeyboard
                })
            }, 2000);
        }
    } else { //User came by the link from website(contains rate parameter)
        const paymentLinks = {
            'pro': vars.PRO_PAYMENT_LINK,
            'advanced': vars.ADVANCED_PAYMENT_LINK,
            'basic': vars.BASIC_PAYMENT_LINK
        }
        try {
            await ctx.replyWithPhoto({source: '../assets/images/welcome.jpg'}, {
                protect_content: true,
                parse_mode: "Markdown",
                caption: messages.welcomeToCourseMsg + paymentLinks[ctx.session.userRate],
                ...keyboards.checkPaymentKeyboard
            })
        } catch (error) {
            console.error(error);

            setTimeout(async () => {
                await ctx.replyWithHTML(messages.welcomeToCourseMsg + paymentLinks[ctx.session.userRate], {
                    protect_content: true,
                    ...keyboards.checkPaymentKeyboard
                })
            }, 2000);
        }
    }
})

/*--------------BOT START MESSAGE----------*/

/*------------IGNORING MESSAGES-------------*/
bot.on('text', (ctx, next) => {
    if (!ctx.session.canSendMessage) {
        return;
    } else {
        return next();
    }
});


const ignoreEvents = ['photo', 'video', 'voice', 'document'];

bot.on(ignoreEvents, (ctx, next) => {
    
});
/*------------IGNORING MESSAGES-------------*/



/*--------------CHOSEN RATE HANDLERS-----------*/
//pro
bot.action("payment_pro_rate_button", async (ctx) => {
    const userId = ctx.from.id
    ctx.session.userRate = 'pro'

    try {
        await ctx.deleteMessage()
    } catch (error) {
        console.error(error);
    }

    try {
        await dataBase.updateUserRate(userId, ctx.session.userRate)
    } catch (error) {
        console.error(error);

        setTimeout(async () => {
            await dataBase.updateUserRate(userId, ctx.session.userRate)
        }, 90000000);
    }

    try {
        await ctx.replyWithHTML(messages.welcomeToCourseMsg + vars.PRO_PAYMENT_LINK, {
            protect_content: true,
            ...keyboards.checkPaymentKeyboard
        })
    } catch (error) {
        setTimeout(async () => {
            await ctx.replyWithHTML(messages.welcomeToCourseMsg + vars.PRO_PAYMENT_LINK, {
                protect_content: true,
                ...keyboards.checkPaymentKeyboard
            })
        }, 2000);
    }

})

//advanced
bot.action("payment_advanced_rate_button", async (ctx) => {
    const userId = ctx.from.id
    ctx.session.userRate = 'advanced'

    try {
        await ctx.deleteMessage()
    } catch (error) {
        console.error(error);
    }

    try {
        await dataBase.updateUserRate(userId, ctx.session.userRate)
    } catch (error) {
        console.error(error);

        setTimeout(async () => {
            await dataBase.updateUserRate(userId, ctx.session.userRate)
        }, 90000000);
    }

    try {
        await ctx.replyWithHTML(messages.welcomeToCourseMsg + vars.ADVANCED_PAYMENT_LINK, {
            protect_content: true,
            ...keyboards.checkPaymentKeyboard
        })
    } catch (error) {
        setTimeout(async () => {
            await ctx.replyWithHTML(messages.welcomeToCourseMsg + vars.ADVANCED_PAYMENT_LINK, {
                protect_content: true,
                ...keyboards.checkPaymentKeyboard
            })
        }, 2000);
    }

})

//basic
bot.action("payment_basic_rate_button", async (ctx) => {
    const userId = ctx.from.id
    ctx.session.userRate = 'basic'

    try {
        await ctx.deleteMessage()
    } catch (error) {
        console.error(error);
    }

    try {
        await dataBase.updateUserRate(userId, ctx.session.userRate)
    } catch (error) {
        console.error(error);

        setTimeout(async () => {
            await dataBase.updateUserRate(userId, ctx.session.userRate)
        }, 90000000);
    }

    try {
        await ctx.replyWithHTML(messages.welcomeToCourseMsg + vars.BASIC_PAYMENT_LINK, {
            protect_content: true,
            ...keyboards.checkPaymentKeyboard
        })
    } catch (error) {
        setTimeout(async () => {
            await ctx.replyWithHTML(messages.welcomeToCourseMsg + vars.BASIC_PAYMENT_LINK, {
                protect_content: true,
                ...keyboards.checkPaymentKeyboard
            })
        }, 2000);
    }

})
/*--------------CHOSEN RATE HANDLERS-----------*/


/*-------ADMIN PAYMENT SKIP--------*/
bot.command("skip_primary_payment", async (ctx) => {
    const userId = ctx.from.id
    const userName = "Test Name"
    const userPhone = "+375 29 666 66 66"
    const userEmail = "test@test.com"
    await dataBase.updateUserInfoAfterPayment(userId, userName, userPhone, userEmail)
    await dataBase.deleteUserPaymentKey(`${userEmail}`)
    await ctx.replyWithPhoto({source: '../assets/images/payment_success.jpg'}, keyboards.primaryPaymentSuccessKeyboard)
}) 


/*-------ADMIN PAYMENT SKIP--------*/





/*------------DATA FROM WEB APP PAYMENT CHECK HANDLER-------*/
bot.on("web_app_data", async ctx => {

    const userId = ctx.from.id
    const data = ctx.webAppData.data.json()
    console.log(data);
	if (data.webAppType === 'checkPaymentWebApp') {
        const data = ctx.webAppData.data.json();
        const userEmail = data.userEmail
        const userName = data.userName
        const userPhone = data.userPhone
        try {
            await dataBase.updateUserInfoAfterPayment(userId, userName, userPhone, userEmail)
        } catch (error) {
            console.error(error);

            setTimeout(async () => {
                await dataBase.updateUserInfoAfterPayment(userId, userName, userPhone, userEmail)
            }, 90000000);
        }

        try {
            await dataBase.deleteUserPaymentKey(`${userEmail}`)
        } catch (error) {
            console.error(error);

            setTimeout(async () => {
                await dataBase.deleteUserPaymentKey(`${userEmail}`)
            }, 90000000);
        }

        try {
            await ctx.replyWithPhoto({ source: '../assets/images/payment_success.jpg' }, {
                protect_content: true,
                reply_markup: {remove_keyboard: true}
              });

            setTimeout(async () => {
                await ctx.replyWithHTML(messages.fisrtVideoIntroMsg, {
                    protect_content: true,
                    ...keyboards.goToFirstVideoKeyboard,
                })
            }, 1500);

        } catch (error) {
            console.error(error);

            setTimeout(async () => {
                await ctx.replyWithHTML("Оплата прошла успешно!", {
                    protect_content: true,
                    ...keyboards.primaryPaymentSuccessKeyboard
                })
            }, 2000);
        }
    } else if (data.webAppType === 'testOneWebApp') {
        if (data.testPassed) {
            try {
                await ctx.replyWithHTML(messages.secondVideoIntroMsg, {
                    protect_content: true,
                    ...keyboards.introSecondLessonKeyboard
                })
            } catch (error) {
                console.error(error);

                setTimeout(async () => {
                    await ctx.replyWithHTML(messages.secondVideoIntroMsg, {
                        protect_content: true,
                        ...keyboards.introSecondLessonKeyboard
                    })
                }, 2000);
            }

            /*---------SAVING USER FIRST TEST PASSED TO DB------------*/
            try {
                await dataBase.updateUserFirstTestPassed(userId)
            } catch (error) {
                console.error(error);

                setTimeout(async () => {
                    await dataBase.updateUserFirstTestPassed(userId)
                }, 90000000);
            }
            /*---------SAVING USER FIRST TEST PASSED TO DB------------*/
        }
    } else if (data.webAppType === 'testTwoWebApp') {
        if (data.testPassed) {
            try {
                await ctx.replyWithHTML(messages.thirdVideoIntroMsg, {
                    protect_content: true,
                    ...keyboards.introThirdLessonKeyboard
                })
            } catch (error) {
                console.error(error);

                setTimeout(async () => {
                    await ctx.replyWithHTML(messages.thirdVideoIntroMsg, {
                        protect_content: true,
                        ...keyboards.introThirdLessonKeyboard
                    })
                }, 2000);
            }

            
            /*---------SAVING USER SECOND TEST PASSED TO DB------------*/
            try {
                await dataBase.updateUserSecondTestPassed(userId)
            } catch (error) {
                console.error(error);

                setTimeout(async () => {
                    await dataBase.updateUserSecondTestPassed(userId)
                }, 90000000);
            }
            /*---------SAVING USER SECOND TEST PASSED TO DB------------*/
        }
    } else if (data.webAppType === 'checkUpgradeAdvToProWebApp') {

        const userEmail = data.userEmail

        try {
            await ctx.replyWithPhoto({ source: '../assets/images/payment_success.jpg' }, {
                protect_content: true,
                reply_markup: {remove_keyboard: true}
              });

            setTimeout(async () => {
                await ctx.replyWithHTML(messages.upgradeToProSuccess, {
                    protect_content: true,
                    ...keyboards.startSignUpForSessionKeyboard
                })
            }, 1500);
        } catch (error) {
            console.error(error);

            setTimeout(async () => {
                await ctx.replyWithPhoto({ source: '../assets/images/payment_success.jpg' }, {
                    protect_content: true,
                    reply_markup: {remove_keyboard: true}
                  });
                setTimeout(async () => {
                    await ctx.replyWithHTML(messages.upgradeToProSuccess, {
                        protect_content: true,
                        ...keyboards.startSignUpForSessionKeyboard
                    })
                }, 1500);
            }, 2000);
        }
        
        try {
            await dataBase.updateUserAfterUpfgradeAdvToPro(userId)
        } catch (error) {
            console.error(error);

            setTimeout(async () => {
                await dataBase.updateUserAfterUpfgradeAdvToPro(userId)
            }, 90000000);
        }

        try {
            await dataBase.deleteUserPaymentKey(`${userEmail}`)
        } catch (error) {
            console.error(error);

            setTimeout(async () => {
                await dataBase.deleteUserPaymentKey(`${userEmail}`)
            }, 90000000);
        }
    } else if (data.webAppType === 'checkUpgradeBasToAdvWebApp') {
        const userEmail = data.userEmail
        const productId = data.productId

        if (`${productId}` !== '27008') {
            try {
                await ctx.replyWithHTML(messages.basToAdvPaymentCheckFail, {
                    protect_content: true,
                    ...keyboards.checkUpgradeBasicKeyboard
                })
            } catch (error) {
                console.error(error);

                setTimeout(async () => {
                    await ctx.replyWithHTML(messages.basToAdvPaymentCheckFail, {
                        protect_content: true,
                        ...keyboards.checkUpgradeBasicKeyboard
                    })
                }, 2000);
            }
        } else {
            try {
                await ctx.replyWithHTML(messages.basicToAdvancedVideoFourMsg, {
                    protect_content: true,
                    ...keyboards.basicToAdvancedVideoFourKeyboard
                })
            } catch (error) {
                console.error(error);

                setTimeout(async () => {
                    await ctx.replyWithHTML(messages.basicToAdvancedVideoFourMsg, {
                        protect_content: true,
                        ...keyboards.basicToAdvancedVideoFourKeyboard
                    })
                }, 2000);
            }

            try {
                await dataBase.updateUserAfterUpfgradeBasToAdv(userId)
            } catch (error) {
                console.error(error);

                setTimeout(async () => {
                    await dataBase.updateUserAfterUpfgradeBasToAdv(userId)
                }, 90000000);
            }

            try {
                await dataBase.deleteUserPaymentKey(`${userEmail}`)
            } catch (error) {
                setTimeout(async () => {
                    await dataBase.deleteUserPaymentKey(`${userEmail}`)
                }, 90000000);
            }
        }
    } else if (data.webAppType === 'checkUpgradeBasToProWebApp') {
        const userEmail = data.userEmail
        const productId = data.productId

        if (`${productId}` !== '27010') {
            try {
                await ctx.replyWithHTML(messages.basToAdvPaymentCheckFail, {
                    protect_content: true,
                    ...keyboards.checkUpgradeBasicKeyboard
                })
            } catch (error) {
                console.error(error);

                setTimeout(async () => {
                    await ctx.replyWithHTML(messages.basToAdvPaymentCheckFail, {
                        protect_content: true,
                        ...keyboards.checkUpgradeBasicKeyboard
                    })
                }, 2000);
            }
        } else {
            try {
                await ctx.replyWithHTML(messages.basicToProVideoFourMsg, {
                    protect_content: true,
                    ...keyboards.basicToProVideoFourKeyboard
                })
            } catch (error) {
                console.error(error);

                setTimeout(async () => {
                    await ctx.replyWithHTML(messages.basicToProVideoFourMsg, {
                        protect_content: true,
                        ...keyboards.basicToProVideoFourKeyboard
                    })
                }, 2000);
            }

            try {
                await dataBase.updateUserAfterUpfgradeBasToPro(userId)
            } catch (error) {
                console.error(error);

                setTimeout(async () => {
                    await dataBase.updateUserAfterUpfgradeBasToPro(userId)
                }, 90000000);
            }

            try {
                await dataBase.deleteUserPaymentKey(`${userEmail}`)
            } catch (error) {
                setTimeout(async () => {
                    await dataBase.deleteUserPaymentKey(`${userEmail}`)
                }, 90000000);
            }
        }
    }
});

/*------------DATA FROM WEB APP PAYMENT CHECK HANDLER-------*/



//first video link sending
bot.action("watch_lessons_one_button", async (ctx) => {
    
    const userId = ctx.from.id

    const finishedFirstVideoKeyboard = Markup.inlineKeyboard([
        [Markup.button.url('Смотреть урок №1🖥', `${ctx.session.video1Link}`)]
    ]);

    try {
        await ctx.replyWithPhoto({source: '../assets/images/lesson1.jpg'}, {
            protect_content: true,
            parse_mode: "Markdown",
            ...finishedFirstVideoKeyboard
        })
    } catch (error) {
        console.error(error);

        setTimeout(async () => {
            await ctx.replyWithHTML("Урок 1", {
                protect_content: true,
                ...finishedFirstVideoKeyboard
            })
        }, 2000);
    }

    setTimeout(async () => {
        try {
            await ctx.replyWithPhoto({source: '../assets/images/test1.jpg'}, {
                protect_content: true,
                caption: messages.firstVideoOutroMsg,
                parse_mode: 'Markdown',
                ...keyboards.startFirstTestKeyboard
            })
        } catch (error) {
            console.error(error);

            setTimeout(async () => {
                ctx.replyWithHTML(messages.firstVideoOutroMsg, {
                    protect_content: true,
                    ...keyboards.startFirstTestKeyboard
                })
            }, 2000);
        }
    }, 10000);
})


//second lesson link sending
bot.action("watch_lesson_two_button", async (ctx) => {

    const watchSecondLessonKeyboard = Markup.inlineKeyboard([
        [Markup.button.url('Смотреть урок №2🖥', `${ctx.session.video2Link}`)]
    ]);
    
    try {
        await ctx.replyWithPhoto({source: '../assets/images/lesson2.jpg'}, {
            protect_content: true,
            parse_mode: "Markdown",
            ...watchSecondLessonKeyboard
        })

        setTimeout(async () => {
            await ctx.replyWithPhoto({source: '../assets/images/test2.jpg'}, {
                protect_content: true,
                caption: messages.secondVideoOutroMsg,
                parse_mode: "Markdown",
                ...keyboards.startSecondTestKeyboard
            })
        }, 10000);
    } catch (error) {
        console.error(error);

        setTimeout(async () => {
            await ctx.replyWithPhoto({source: '../assets/images/lesson2.jpg'}, {
                protect_content: true,
                parse_mode: "Markdown",
                ...watchSecondLessonKeyboard
            })
            ctx.replyWithHTML("Урок 2", {
                protect_content: true,
                ...watchSecondLessonKeyboard
            })
    
            setTimeout(async () => {
                await ctx.replyWithPhoto({source: '../assets/images/test2.jpg'}, {
                    protect_content: true,
                    caption: messages.secondVideoOutroMsg,
                    parse_mode: "Markdown",
                    ...keyboards.startSecondTestKeyboard
                })
            }, 10000);
        }, 2000);
    }
})


bot.action("watch_lesson_three_button", async (ctx) => {
    
    const watchThirdVideoKeyboard = Markup.inlineKeyboard([
        [Markup.button.url('Смотреть урок №3🖥', `${ctx.session.video3Link}`)]
    ]);

    try {
        await ctx.replyWithPhoto({source: '../assets/images/lesson3.jpg'}, {
            protect_content: true,
            parse_mode: "Markdown",
            ...watchThirdVideoKeyboard
        })

        setTimeout(async () => {
            if (ctx.session.userRate === 'pro') {
                await ctx.replyWithDocument({source: '../assets/images/formula2.png'}, {
                    protect_content: true,
                    reply_markup: {remove_keyboard: true}
                })
                await ctx.replyWithDocument({source: '../assets/images/formula1.png'}, {
                    protect_content: true,
                    ...keyboards.getAccessToChatKeyboard
                })
            } else if (ctx.session.userRate === 'advanced') {
                await ctx.replyWithDocument({source: '../assets/images/formula2.png'}, {
                    protect_content: true,
                    reply_markup: {remove_keyboard: true}
                })
                await ctx.replyWithDocument({source: '../assets/images/formula1.png'}, {
                    protect_content: true,
                    ...keyboards.getAccessToChatKeyboard
                })
            } else if (ctx.session.userRate === 'basic') {
                await ctx.replyWithDocument({source: '../assets/images/formula2.png'}, {
                    protect_content: true,
                    ...keyboards.getAccessToChatKeyboard
                })
            }
        }, 5000);

    } catch (error) {
        console.error(error);

        setTimeout(async () => {
            await ctx.replyWithPhoto({source: '../assets/images/lesson3.jpg'}, {
                protect_content: true,
                parse_mode: "Markdown",
                ...watchThirdVideoKeyboard
            })
    
            setTimeout(async () => {
                if (ctx.session.userRate === 'pro') {
                    await ctx.replyWithDocument({source: '../assets/images/formula2.png'}, {
                        protect_content: true,
                        reply_markup: {remove_keyboard: true}
                    })
                    await ctx.replyWithDocument({source: '../assets/images/formula1.png'}, {
                        protect_content: true,
                        ...keyboards.getAccessToChatKeyboard
                    })
                } else if (ctx.session.userRate === 'advanced') {
                    await ctx.replyWithDocument({source: '../assets/images/formula2.png'}, {
                        protect_content: true,
                        reply_markup: {remove_keyboard: true}
                    })
                    await ctx.replyWithDocument({source: '../assets/images/formula1.png'}, {
                        protect_content: true,
                        ...keyboards.getAccessToChatKeyboard
                    })
                } else if (ctx.session.userRate === 'basic') {
                    await ctx.replyWithDocument({source: '../assets/images/formula2.png'}, {
                        protect_content: true,
                        ...keyboards.getAccessToChatKeyboard
                    })
                }
            }, 5000);
        }, 2000);
    }
})

/*-------ADMIN PAYMENT SKIP--------*/
bot.command("skip_advanced_pro_upgrade", async (ctx) => {
    const userId = ctx.from.id
    const userName = "Test Name"
    const userPhone = "+375 29 666 66 66"
    const userEmail = "test@test.com"
    await dataBase.updateUserAfterUpfgradeAdvToPro(userId)
    await dataBase.updateUserInfoAfterPayment(userId, userName, userPhone, userEmail)
    await dataBase.deleteUserPaymentKey(`${userEmail}`)
    await ctx.replyWithHTML(messages.upgradeToProSuccess, {
        protect_content: true,
        ...keyboards.startSignUpForSessionKeyboard
    })
}) 



bot.command("skip_bas_pro_upgrade", async (ctx) => {
    const userId = ctx.from.id
    const userName = "Test Name"
    const userPhone = "+375 29 666 66 66"
    const userEmail = "test@test.com"
    await ctx.replyWithHTML(messages.basicToProVideoFourMsg, keyboards.basicToProVideoFourKeyboard)
    await dataBase.updateUserInfoAfterPayment(userId, userName, userPhone, userEmail)
    await dataBase.updateUserAfterUpfgradeBasToPro(userId)
    await dataBase.deleteUserPaymentKey(`${userEmail}`)
}) 

bot.command("skip_bas_adv_upgrade", async (ctx) => {
    const userId = ctx.from.id
    const userName = "Test Name"
    const userPhone = "+375 29 666 66 66"
    const userEmail = "test@test.com"
    await ctx.replyWithHTML(messages.basicToAdvancedVideoFourMsg, keyboards.basicToAdvancedVideoFourKeyboard)
    await dataBase.updateUserInfoAfterPayment(userId, userName, userPhone, userEmail)
    await dataBase.updateUserAfterUpfgradeBasToAdv(userId)
    await dataBase.deleteUserPaymentKey(`${userEmail}`)
}) 

/*-------ADMIN PAYMENT SKIP--------*/

bot.action("get_access_to_chat_button", async (ctx) => {

    try {
        if (ctx.session.userRate === 'basic') {
            await ctx.replyWithHTML("https://t.me/+vRPrDecgJ5k1MmFi", {
                protect_content: true,
                reply_markup: {remove_keyboard: true}
            })
        } else {
            await ctx.replyWithHTML("https://t.me/+vRPrDecgJ5k1MmFi", {
                protect_content: true
            })
        }
        
    } catch (error) {
        console.error(error);

        setTimeout(async () => {
            if (ctx.session.userRate === 'basic') {
                await ctx.replyWithHTML("https://t.me/+vRPrDecgJ5k1MmFi", {
                    protect_content: true,
                    reply_markup: {remove_keyboard: true}
                })
            } else {
                await ctx.replyWithHTML("https://t.me/+vRPrDecgJ5k1MmFi", {
                    protect_content: true
                })
            }
        }, 2000);
    }

    /*--------------RATE SEPARATION-------------*/
    if (ctx.session.userRate === 'pro') {
        await ctx.replyWithHTML(messages.signUpForSessionMsg, {
            protect_content: true,
            ...keyboards.startSignUpForSessionKeyboard
        })
    } else if (ctx.session.userRate === 'advanced') {
        try {
            await ctx.replyWithVideo({source: '../assets/special_offers/special_advanced.mp4'}, {
                protect_content: true
            })
        } catch (error) {
            console.error(error);

            setTimeout(async () => {
                await ctx.replyWithVideo({source: '../assets/special_offers/special_advanced.mp4'}, {
                    protect_content: true
                })
            }, 2000);
        }

        try {
            await dataBase.createPaymentTest()
            await dataBase.createPaymentTestAzhypa()
            await ctx.replyWithHTML(`Итак, специальное предложение.\n\nПоскольку ты приобрёл версию мастеркласса ADVANCED, сейчас у тебя есть возможность апгрейднуться до PRO и попасть на стратегическую сессию 1-на-1 со мной всего за 20$.\n\nОбсудим твои проекты, твою персональную стратегию роста и может быть, что-то ещё :)\n\nЭто предложение одного дня. Завтра оно сгорает. Так что думай и решай.\n\nЕсли интересно, вот тебе ссылка:\n${vars.ADVANCED_TO_PRO_UPGRADE_LINK}\n\nПосле оплаты возвращайся сюда.` , {
                protect_content: true,
                ...keyboards.checkUpgradeAdvToProKeyboard
            })
        } catch (error) {
            console.error(error);

            setTimeout(async () => {
                await ctx.replyWithHTML(`Итак, специальное предложение.\n\nПоскольку ты приобрёл версию мастеркласса ADVANCED, сейчас у тебя есть возможность апгрейднуться до PRO и попасть на стратегическую сессию 1-на-1 со мной всего за 20$.\n\nОбсудим твои проекты, твою персональную стратегию роста и может быть, что-то ещё :)\n\nЭто предложение одного дня. Завтра оно сгорает. Так что думай и решай.\n\nЕсли интересно, вот тебе ссылка:\n${vars.ADVANCED_TO_PRO_UPGRADE_LINK}\n\nПосле оплаты возвращайся сюда.` , {
                    protect_content: true,
                    ...keyboards.checkUpgradeAdvToProKeyboard
                })
            }, 2000);
        }
    } else if (ctx.session.userRate === 'basic') {
        try {
            await ctx.replyWithVideo({source: "../assets/special_offers/special_basic.mp4"}, {
                protect_content: true
            })
        } catch (error) {
            console.error(error);

            setTimeout(async () => {
                await ctx.replyWithVideo({source: "../assets/special_offers/special_basic.mp4"}, {
                    protect_content: true
                })
            }, 2000);
        }

        await dataBase.createPaymentTest(50)
        await dataBase.createPaymentTestAzhypa(50)
        
        try {
            await ctx.replyWithHTML(`Итак, специальное предложение.\n\nПоскольку ты приобрёл версию мастеркласса BASIC, я предлагаю тебе 2 апгрейда.\n\nДо advanced за 30$ - ты получишь +1 урок, с более углубленным материалом и разбором реальных коммерческих проектов.\n\nА апгрейд до PRO за 50$ даст тебе возможность не только получить +1 урок с разбором коммерческих проектов, но и стратегическую сессию, созвон 1-на-1 со мной.\n\nОбсудим твои проекты, твою персональную стратегию роста и может быть, что-то ещё :)\n\nЭто предложение одного дня Завтра оно сгорает Так что думай и решай. Если интересно, вот тебе ссылки для оплаты:\n\nADVANCED: ${vars.BASIC_TO_ADVANCED_UPGRADE_LINK}\n\nPRO: ${vars.BASIC_TO_PRO_UPGRADE_LINK}\n\nПосле оплаты возвращайся сюда.`, {
                protect_content: true,
                ...keyboards.checkUpgradeBasicKeyboard
            })
        } catch (error) {
            console.error(error);

            setTimeout(async () => {
                await ctx.replyWithHTML(`Итак, специальное предложение.\n\nПоскольку ты приобрёл версию мастеркласса BASIC, я предлагаю тебе 2 апгрейда.\n\nДо advanced за 30$ - ты получишь +1 урок, с более углубленным материалом и разбором реальных коммерческих проектов.\n\nА апгрейд до PRO за 50$ даст тебе возможность не только получить +1 урок с разбором коммерческих проектов, но и стратегическую сессию, созвон 1-на-1 со мной.\n\nОбсудим твои проекты, твою персональную стратегию роста и может быть, что-то ещё :)\n\nЭто предложение одного дня Завтра оно сгорает Так что думай и решай. Если интересно, вот тебе ссылки для оплаты:\n\nADVANCED: ${vars.BASIC_TO_ADVANCED_UPGRADE_LINK}\n\nPRO: ${vars.BASIC_TO_PRO_UPGRADE_LINK}\n\nПосле оплаты возвращайся сюда.`, {
                    protect_content: true,
                    ...keyboards.checkUpgradeBasicKeyboard
                })
            }, 2000);
        }
    }
})


bot.action("start_sign_up_button", async (ctx) => {
    ctx.session.canSendMessage = true
    await resetUserInfoAnswers(ctx)


    try {
        await ctx.replyWithHTML(messages.userFullName)
    } catch (error) {
        console.log(error.message)
        logger.error(`${ctx.from.username} | ${ctx.from.id} | ${error.message}`)

        setTimeout(async () => {
            await ctx.replyWithHTML(messages.userFullName)
        }, 2000);
    }
})


bot.on("message", async (ctx) => {

    const userAnswer = ctx.message.text
        if (ctx.session.fullName === "") {
            ctx.session.fullName = userAnswer
            await ctx.replyWithHTML(messages.userInstName)
        } else if (ctx.session.instName === "" && ctx.session.fullName !== "") {
            ctx.session.instName = userAnswer
            await ctx.replyWithHTML(messages.whoAreYou)
        } else if (ctx.session.whoAreYou === "" && ctx.session.instName !== "") {
            ctx.session.whoAreYou = userAnswer
            await ctx.replyWithHTML(messages.userAim)
        } else if (ctx.session.userAim === "" && ctx.session.whoAreYou !== "") {
            ctx.session.userAim = userAnswer
            await ctx.replyWithHTML(messages.userAimRealize)
        } else if (ctx.session.realizeAim === "" && ctx.session.userAim !== "") {
            ctx.session.realizeAim = userAnswer
            await ctx.replyWithHTML(messages.userWeaknesses)
        } else if (ctx.session.userWeaknesses === "" && ctx.session.realizeAim !== "") {
            ctx.session.userWeaknesses = userAnswer
            await ctx.replyWithHTML(messages.userClient)
        } else if (ctx.session.userClient === "" && ctx.session.userWeaknesses !== "") {
            ctx.session.userClient = userAnswer
            const checkAnswersRu = `Проверьте свои ответы:\n\n<b>Твои Имя и Фамилия:</b> ${ctx.session.fullName}\n<b>Твой никнейм Instagram:</b> ${ctx.session.instName}\n<b>Кто ты:</b> ${ctx.session.whoAreYou}\n<b>Твоя цель:</b> ${ctx.session.userAim}\n<b>Как можно достигнуть цели:</b> ${ctx.session.realizeAim}\n<b>Твои слабости:</b> ${ctx.session.userWeaknesses}\n<b>Кто твой клиент:</b> ${ctx.session.userClient}`
            await ctx.replyWithHTML(checkAnswersRu, keyboards.checkAnswersKeyboard)
        }
})

bot.action("give_data_again_button", async (ctx) => {

    await resetUserInfoAnswers(ctx)
    try {
        await ctx.deleteMessage()
    } catch (error) {
        console.error(error);
    }
    try {
        await ctx.replyWithHTML(messages.userFullName)
    } catch (error) {
        console.error(error);

        setTimeout(async () => {
            await ctx.replyWithHTML(messages.userFullName)
        }, 2000);
    }
})


bot.action("answers_are_right_button", async (ctx) => {
    const userId = ctx.from.id

    ctx.session.canSendMessage = false

    try {
        await ctx.deleteMessage()
    } catch (error) {
        console.error(error);
    }
    try {
        await ctx.replyWithHTML(messages.proFinalMsg, {
            protect_content: true
        })
        await dataBase.addUserSignUpAnswers(userId, ctx.session.fullName, ctx.session.instName, ctx.session.whoAreYou, ctx.session.userAim, ctx.session.realizeAim, ctx.session.userWeaknesses, ctx.session.userClient)
    } catch (error) {
        console.error(error);

        setTimeout(async () => {
            await ctx.replyWithHTML(messages.proFinalMsg, {
                protect_content: true
            })
        }, 2000);

        setTimeout(async () => {
            await dataBase.addUserSignUpAnswers(userId, ctx.session.fullName, ctx.session.instName, ctx.session.whoAreYou, ctx.session.userAim, ctx.session.realizeAim, ctx.session.userWeaknesses, ctx.session.userClient)
        }, 90000000);
    }
})

/*----------BASIC UPGRADE HANDLERS-----------*/
bot.action("basic_to_advanced_video_four_button", async (ctx) => {

    const watchLessonFour = Markup.inlineKeyboard([
        [Markup.button.url('Смотреть урок №4🖥', `${ctx.session.video4BtoALink}`)]
    ]);

    try {
        await ctx.replyWithPhoto({source: '../assets/images/lesson4.jpg'}, {
            protect_content: true,
            parse_mode: "Markdown",
            ...watchLessonFour
        })
    } catch (error) {
        console.error(error);

        setTimeout(async () => {
            await ctx.replyWithHTML("Урок 4", {
                protect_content: true,
                ...watchLessonFour
            })
        }, 2000);
    }

    try {
        setTimeout(async () => {
            await ctx.replyWithDocument({source: '../assets/images/formula1.png'}, {
                protect_content: true,
                reply_markup: {remove_keyboard: true}
            })
            await ctx.replyWithHTML(messages.basicToAdvancedFinalMsg, {
                protect_content: true,
            })
        }, 5000);
    } catch (error) {
        
    }
})


bot.action("basic_to_pro_video_four_button", async (ctx) => {

    const watchLessonFour = Markup.inlineKeyboard([
        [Markup.button.url('Смотреть урок №4🖥', `${ctx.session.video4BtoPLink}`)]
    ]);

    try {
        await ctx.replyWithPhoto({source: '../assets/images/lesson4.jpg'}, {
            protect_content: true,
            parse_mode: "Markdown",
            ...watchLessonFour
        })

        setTimeout(async () => {
            await ctx.replyWithDocument({source: '../assets/images/formula1.png'}, {
                protect_content: true,
                reply_markup: {remove_keyboard: true}
            })
            await ctx.replyWithHTML(messages.signUpForSessionMsg, {
                protect_content: true,
                ...keyboards.startSignUpForSessionKeyboard
            })
        }, 5000);
    } catch (error) {
        console.error(error);

        setTimeout(async () => {
            await ctx.replyWithHTML("Урок 4", {
                protect_content: true,
                ...watchLessonFour
            })
    
            setTimeout(async () => {
                await ctx.replyWithDocument({source: '../assets/images/formula2.png'}, {
                    protect_content: true,
                    ...watchLessonFour
                })
                await ctx.replyWithHTML(messages.signUpForSessionMsg, {
                    protect_content: true,
                    ...keyboards.startSignUpForSessionKeyboard
                })
            }, 5000);
        }, 2000);
    }

})




/*----------BASIC UPGRADE HANDLERS-----------*/





/*---------------------BOT LAUNCH-----------------*/
const option = {dropPendingUpdates: true}
bot.launch(option)
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

/*---------------------BOT LAUNCH-----------------*/


async function resetUserInfoAnswers(ctx) {
    ctx.session.fullName = ""
    ctx.session.instName = ""
    ctx.session.whoAreYou = ""
    ctx.session.userAim = ""
    ctx.session.realizeAim = ""
    ctx.session.userWeaknesses = ""
    ctx.session.userClient = ""
}