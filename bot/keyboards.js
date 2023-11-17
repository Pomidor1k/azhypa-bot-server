const { Markup } = require('telegraf');
const vars = require('./vars')

const chooseRateKeyboard = Markup.inlineKeyboard([
    [Markup.button.callback('PRO', 'payment_pro_rate_button')],
    [Markup.button.callback('ADVANCED', 'payment_advanced_rate_button')],
    [Markup.button.callback('BASIC', 'payment_basic_rate_button')]
]);

const checkPaymentKeyboard =  Markup.keyboard([
    Markup.button.webApp("Проверить оплату💵", `${vars.SERVER_URL}/payment_check_page`)
]).resize()

const primaryPaymentSuccessKeyboard = Markup.inlineKeyboard([
    [Markup.button.callback('Оплата есть. Погружаемся!🎉', 'primary_payment_success_button')]
]);

const goToFirstVideoKeyboard = Markup.inlineKeyboard([
    [Markup.button.callback('Перейти к уроку🎉', 'watch_lessons_one_button')]
]);

const startFirstTestKeyboard =  Markup.keyboard([
    Markup.button.webApp("Проверить знания📚", `${vars.SERVER_URL}/test_one`)
]).resize()

const introSecondLessonKeyboard = Markup.inlineKeyboard([
    [Markup.button.callback('Перейти к уроку🎉', 'watch_lesson_two_button')]
]);

const startSecondTestKeyboard =  Markup.keyboard([
    Markup.button.webApp("Проверить знания📚", `${vars.SERVER_URL}/test_two`)
]).resize()

const introThirdLessonKeyboard = Markup.inlineKeyboard([
    [Markup.button.callback('Перейти к уроку🎉', 'watch_lesson_three_button')]
]);

const getAccessToChatKeyboard = Markup.inlineKeyboard([
    [Markup.button.callback('Получить доступ в чат👨‍👩‍👧‍👧', 'get_access_to_chat_button')]
]);

const startSignUpForSessionKeyboard =  Markup.inlineKeyboard([
    [Markup.button.callback('Готов ответить✍️', 'start_sign_up_button')]
])

const checkUpgradeAdvToProKeyboard =  Markup.keyboard([
    Markup.button.webApp("Проверить оплату💵", `${vars.SERVER_URL}/upgrade_adv_pro_check`)
]).resize()

const checkAnswersKeyboard = Markup.inlineKeyboard([
    [Markup.button.callback('Ответы верные✅', 'answers_are_right_button')],
    [Markup.button.callback('Ввести данные ещё раз🔄', 'give_data_again_button')]
]);

const checkUpgradeBasicKeyboard =  Markup.keyboard([
    Markup.button.webApp("Проверить оплату ADVANCED💵", `${vars.SERVER_URL}/upgrade_bas_adv_check`),
    Markup.button.webApp("Проверить оплату PRO💵", `${vars.SERVER_URL}/upgrade_bas_pro_check`)
]).resize()

const basicToAdvancedVideoFourKeyboard = Markup.inlineKeyboard([
    [Markup.button.callback('Смотреть урок №4🖥', 'basic_to_advanced_video_four_button')]
]);

const basicToProVideoFourKeyboard = Markup.inlineKeyboard([
    [Markup.button.callback('Смотреть урок №4🖥', 'basic_to_pro_video_four_button')]
]);





module.exports = {
    chooseRateKeyboard,
    checkPaymentKeyboard,
    primaryPaymentSuccessKeyboard,
    goToFirstVideoKeyboard,
    startFirstTestKeyboard,
    introSecondLessonKeyboard,
    startSecondTestKeyboard,
    introThirdLessonKeyboard,
    getAccessToChatKeyboard,
    startSignUpForSessionKeyboard,
    checkUpgradeAdvToProKeyboard,
    checkAnswersKeyboard,
    checkUpgradeBasicKeyboard,
    basicToAdvancedVideoFourKeyboard,
    basicToProVideoFourKeyboard
}