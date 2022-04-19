import * as yup from 'yup';
// ___________________________________________________________________________
//
const MIN_LENGTH_USERNAME = 2;
const MAX_LENGTH_NAME = 40;
const MAX_LENGTH_USERNAME = 15;
const MAX_LENGTH_BIO = 160;
const MAX_LENGTH_TALK_TITLE = 100;
const MAX_LENGTH_SPACE_TITLE = 70;
const MAX_LENGTH_NOTE_TITLE = 100;
// ___________________________________________________________________________
//
const emailSchema = yup.string().required('').email('メールアドレスの形式が正しくありません');
const passwordSchema = yup
  .string()
  .required('')
  .matches(/^[\w!@#$%]{8,32}$/, '8〜32文字の半角英数で入力してください');
const nicknameSchema = yup
  .string()
  .required('')
  .max(
    MAX_LENGTH_NAME,
    ({ value }: { value: string }) =>
      `表示名を ${value.length - MAX_LENGTH_NAME} 文字短くしてください`,
  );
// ___________________________________________________________________________
//
export const deleteAccountSchema = yup.object().shape({
  password: yup.string().required(''),
});

export const updateProfileSchema = yup.object().shape({
  name: nicknameSchema,
  bio: yup
    .string()
    .nullable()
    .notRequired()
    .max(
      MAX_LENGTH_BIO,
      ({ value }: { value: string }) =>
        `プロフィールを ${value.length - MAX_LENGTH_BIO} 文字短くしてください`,
    ),
  twitter_username: yup
    .string()
    .nullable()
    .notRequired()
    .matches(/^(?!.*@).*$/, '@なしで入力してください'),
});

export const onboardingSchema = yup.object().shape({
  name: nicknameSchema,
  username: yup
    .string()
    .required('')
    .min(
      MIN_LENGTH_USERNAME,
      `${MIN_LENGTH_USERNAME}〜${MAX_LENGTH_USERNAME}文字で入力してください`,
    )
    .max(
      MAX_LENGTH_USERNAME,
      `${MIN_LENGTH_USERNAME}〜${MAX_LENGTH_USERNAME}文字で入力してください`,
    )
    .matches(/^[a-z\d_]+$/, '半角英数字とアンダースコア(_)のみ使用できます'),
  password: passwordSchema,
  bio: yup
    .string()
    .notRequired()
    .when('$step', (step: 'REQUIRED' | 'OPTIONAL' | 'COMPLETE', schema) => {
      if (step === 'OPTIONAL') {
        return schema.max(
          MAX_LENGTH_BIO,
          ({ value }: { value: string }) =>
            `プロフィールを ${value.length - MAX_LENGTH_BIO} 文字短くしてください`,
        );
      }
    }),
});

export const createSpaceSchema = yup.object().shape({
  name: yup
    .string()
    .required('')
    .max(
      MAX_LENGTH_SPACE_TITLE,
      ({ value }) => `名前を ${value.length - MAX_LENGTH_SPACE_TITLE} 文字短くしてください`,
    ),
});

export const updateSpaceSchema = yup.object().shape({
  name: yup
    .string()
    .required('')
    .max(
      MAX_LENGTH_SPACE_TITLE,
      ({ value }) => `名前を ${value.length - MAX_LENGTH_SPACE_TITLE} 文字短くしてください`,
    ),
});

export const createTalkSchema = yup.object().shape({
  title: yup
    .string()
    .required('')
    .max(
      MAX_LENGTH_TALK_TITLE,
      ({ value }) => `タイトルを ${value.length - MAX_LENGTH_TALK_TITLE} 文字短くしてください`,
    ),
});

export const updateTalkSchema = yup.object().shape({
  title: yup
    .string()
    .required('')
    .max(
      MAX_LENGTH_TALK_TITLE,
      ({ value }) => `タイトルを ${value.length - MAX_LENGTH_TALK_TITLE} 文字短くしてください`,
    ),
});

export const loginSchema = yup.object().shape({
  email: yup.string().required(''),
  password: yup.string().required(''),
});

export const signupSchema = yup.object().shape({
  email: emailSchema,
});

export const resetEmailSchema = yup.object().shape({
  email: emailSchema,
});

export const inviteSchema = yup.object().shape({
  username: yup.string().required(''),
});

export const updateEmailSchema = yup.object().shape({
  password: passwordSchema,
});

export const updatePasswordSchema = yup.object().shape({
  old_password: passwordSchema,
  new_password: passwordSchema,
  new_password_confirm: yup
    .string()
    .required('')
    .oneOf([yup.ref('new_password')], 'パスワードと再入力が一致しません'),
});

export const resetPasswordSchema = yup.object().shape({
  email: emailSchema,
});

export const updateNewPasswordSchema = yup.object().shape({
  password: passwordSchema,
  password_confirm: yup
    .string()
    .required('')
    .oneOf([yup.ref('password')], 'パスワードと再入力が一致しません'),
});

export const updateNoteSchema = yup.object().shape({
  posted_at: yup.string().required(''),
  title: yup
    .string()
    .required('')
    .max(
      MAX_LENGTH_NOTE_TITLE,
      ({ value }) => `タイトルを ${value.length - MAX_LENGTH_NOTE_TITLE} 文字短くしてください`,
    ),
  body_text: yup.string().nullable(),
  body_json: yup.string().nullable(),
});
