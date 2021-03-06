const keystone = require('keystone');
const Types = keystone.Field.Types;

const Feedback = new keystone.List('Feedback', {
  label: 'Отзывы',
  plural: 'Отзывы',
  singular: 'Отзыв',
  autokey: { path: 'slug', from: 'name', unique: true },
  perPage: 25,
  hidden: false,
});

Feedback.add('Параметры', {
  name: {
    label: 'Имя',
    type: String,
    initial: true,
  },
  image: {
    label: 'Изображение',
    type: String,
    initial: true,
  },
  group: {
    label: 'Группа',
    type: Types.Relationship,
    ref: 'FeedbackGroup',
    many: true,
  },
});

Feedback.defaultColumns = 'name|50%, group|50%';
Feedback.register();

module.exports = Feedback;
