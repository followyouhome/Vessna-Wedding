<template>
  <b-form class="form" @submit.prevent="submit">
    <slot name='header'>

    </slot>
    <slot name='body'>

    </slot>
    <slot name='footer'>

    </slot>
    <slot name="modal">
      <div class="form__modal" v-show="state.request">
        <b-spinner type="grow" label="Spinning"></b-spinner>
      </div>
      <div class="form__modal" v-show="state.success">
        <h4 class="form__subline">Форма отправлена</h4>
      </div>
      <div class="form__modal" v-show="state.fail">
        <h4 class="form__subline">Ошибка отправки</h4>
      </div>
    </slot>
  </b-form>
</template>

<script>
  export default {
    name: 'v-form',

    data () {
      return {
        state: {
          request: false,
          success: false,
          failure: false,
          checked: false,
          recaptcha: null,
        },
      };
    },

    computed: {
      disabled () {
        return !this.state.checked
          || typeof this.state.recaptcha === 'boolean' ? !this.state.recaptcha : false;
      },
    },

    methods: {
      success () {
        this.$emit('success');
      },

      failure () {
        this.$emit('failure');
      },

      captchaInit () {
        this.state.recaptcha = false;
      },

      captchaSuccess () {
        this.state.recaptcha = true;
      },

      captchaFailure () {
        this.state.recaptcha = false;
      },

      submit () {
        this.state.request = true;
        this.$emit('submit');

        return this.$store.dispatch(this.$parent.action, this.$parent.form).then((data) => {
          this.state.success = true;
          this.state.request = false;
          this.$emit('success');

          return Promise.resolve(data);
        }).catch((err) => {
          this.state.fail = true;
          this.state.request = false;
          this.$emit('failure');

          return Promise.reject(err);
        });
      },
    },
  };
</script>

<style lang="scss">
  .form {
    position: relative;

    .form-control,
    .custom-select {
      height: auto;
      padding: 10px 15px;
    }

    .custom-control-input:checked ~ .custom-control-label::before {
      border-color: $yellow;
      background-color: $yellow;
    }

    .form-control {
      &:focus {
        border-color: $yellow;
        box-shadow: 0 0 0 0.2rem opacify($yellow, 0.3);
      }
    }
  }

  .form__modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    background: $glass3;
  }

  .form__submit {
    height: 50px;
    padding: 0 20px;
    min-width: 180px;
    border: none;
    border-radius: 2px;
    background: $yellow;
    color: $white;
    line-height: 50px;

    &:hover {

    }

    &:active {

    }
  }

  .form__label {
    margin-bottom: 0;
  }

  .form__headline {
    margin: 0px 0 20px;
    font: 2rem/2rem $RistrettoProLight;
    text-align: center;
  }

  .form__subline {
    margin: 0px 0 20px;
    font: 1.5rem/1.5rem $RistrettoProLight;
    text-align: center;
  }


  // @keyframes fail {
  //   0%   { transform: translateX(0);}
  //   12%   { transform: translateX(-3px);}
  //   25%   { transform: translateX(0);}
  //   37%   { transform: translateX(3px);}
  //   50%   { transform: translateX(0);}
  //   62%   { transform: translateX(-3px);}
  //   75%   { transform: translateX(0);}
  //   87%   { transform: translateX(3px);}
  //   100% { transform: translateX(0); }
  // }
  //
  // @keyframes request {
  //   0% { opacity: 1; }
  //   50% { opacity: 0.5; }
  //   100% { opacity: 1; }
  // }
  //
  // .form {
  //   box-sizing: border-box;
  //
  //   &--row {
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //     flex-direction: row;
  //   }
  //
  //   &--column {
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //     flex-direction: column;
  //   }
  // }
  //
  // .form__row {
  //   position: relative;
  //   width: 100%;
  //
  //   & > * {
  //     width: 100%;
  //   }
  // }

  // .form__divider {
  //   width: 100%;
  //   height: 1px;
  //   border: none;
  //   background: $gray3;
  // }
  //
  // .form__input-text {
  //   padding: 0 10px;
  //   margin: 10px 0;
  //   height: 30px;
  //   box-sizing: border-box;
  //   resize: none;
  //   border: 1px solid #e5e5e5;
  //   border-radius: 1px;
  //   box-shadow: inset 0 1px 2px rgba(0, 0, 0, .04);
  //   background: #fff;
  //   font-size: 12px;
  //   line-height: 16px;
  //
  //   &:focus {
  //     box-shadow: inset 0 1px 2px rgba(0, 0, 0, .08);
  //     background: #f8f8f8;
  //     border: 1px solid #e5e5e5;
  //     outline: 0
  //   }
  // }
  //
  // .form__input-checkbox {
  //   position: absolute;
  //   margin: auto;
  //   width: auto;
  //   top: 0;
  //   left: 0;
  //   bottom: 0;
  //
  //   & ~ * {
  //     margin-left: 25px;
  //   }
  // }
  //
  // .from__input-selection {
  //
  // }
  //
  // .form__input-label {
  //   display: block;
  // }
  //
  // .form__button-submit {
  //   width: 100%;
  //   margin-top: 10px;
  //   transition: background linear 0.2s, transform linear 0.1s;
  //
  //   &:active {
  //     transform: translateY(2px);
  //   }
  //
  //   &:focus {
  //     outline: none;
  //   }
  //
  //   &:disabled {
  //     cursor: default;
  //     cursor: not-allowed;
  //     opacity: 0.5;
  //
  //     &:hover {
  //       background: inherit;
  //       color: inherit;
  //     }
  //   }
  //
  //   &.request {
  //     animation: request 1s infinite;
  //   }
  //
  //   &.success {
  //     background: $green;
  //     color: $white;
  //
  //     &:hover {
  //       opacity: 0.9;
  //       background: $green;
  //       color: $white;
  //     }
  //   }
  //
  //   &.fail {
  //     animation: fail 0.3s 1;
  //     background: $red;
  //     color: $white;
  //
  //     &:hover {
  //       opacity: 0.9;
  //       background: $red;
  //       color: $white;
  //     }
  //   }
  // }
</style>