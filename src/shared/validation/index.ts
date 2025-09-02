import type {Rule} from 'antd/es/form';

export {passwordRules} from './auth';

// common //

export const kiryllicOnly: Rule = {
    pattern: new RegExp(/^[а-яА-Я]+$/i),
    message: 'Допускаются только кириллические символы',
};