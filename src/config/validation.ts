import * as yup from "yup";

export const validationRegSchema = yup.object({
    email: yup
        .string()
        .email("Введите существующую почту!")
        .required("Обязательное поле!"),
    firstName: yup
        .string()
        .matches(
            /^[A-ZА-ЯЁ][a-zа-яё]*$/,
            "Имя должно начинаться с заглавной буквы и содержать только строчные буквы после неё"
        )
        .required("Обязательное поле!"),
    surName: yup
        .string()
        .matches(
            /^[A-ZА-ЯЁ][a-zа-яё]*$/,
            "Фамилия должна начинаться с заглавной буквы и содержать только строчные буквы после неё"
        )
        .min(2, "Введите более 2х символов!")
        .required("Обязательное поле!"),
    phone: yup
        .string()
        .matches(
            /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
            "Введите корректный номер телефона!"
        )
        .required("Обязательное поле!"),
    password: yup
        .string()
        .min(8, "Пароль должен быть не менее 8-ми символов!")
        .required("Обязательное поле!"),
});


export const validationLoginSchema = yup.object({
    email: yup
        .string()
        .email("Введите существующую почту!")
        .required("Обязательное поле!"),
    password: yup
        .string()
        .min(8, "Пароль должен быть не менее 8-ми символов!")
        .required("Обязательное поле!"),
});
