import { object } from '@storybook/addon-knobs';
import FormCooperation from './form-cooperation.vue';

export default {
  title: 'Form/Cooperation',
	component: FormCooperation,
};

export const Default = () => ({
	components: { FormCooperation },
  template: `
    <form-cooperation/>
	`,
});