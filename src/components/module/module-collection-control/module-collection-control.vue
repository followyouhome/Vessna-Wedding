<template>
  <div class="module module-collection-control" v-if="show">
    <div class="container">
      <div class="row" align-v="center">
        <div class="col col-2 col-sm-4">
          <p class="module-collection-control__headline">Диапазон цен</p>
        </div>
        <div class="col col-2 col-sm-4">
          <input
            class="form__input-text"
            type="text"
            v-model="min"
            placeholder="Минимальная"
            @input="updateFilter($event, 'min')"
          />
        </div>
        <div class="col col-2 col-sm-4">
          <input
            class="form__input-text"
            type="text"
            v-model="max"
            placeholder="Максимальная"
            @input="updateFilter($event, 'max')"
          />
        </div>
        <!-- <div class="col col-2 col-sm-4">
          <b-form-radio-group
            class="module-collection-control__selector-grid"
            v-model="filter.columns"
            :options="columns"
            buttons
            @input="updateFilter($event, 'columns')"
          />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  import Module from '../module.vue';

  export default {
    name: 'ModuleCollectionControl',

    extends: Module,

    props: ['items'],

    data () {
      return {
        filter: {
          min: null,
          max: null,
          columns: 'four',
        },
        price: {
          from: '',
          to: '',
        },
        columns: [{
          text: '',
          value: 'two',
        }, {
          text: '',
          value: 'three',
        }, {
          text: '',
          value: 'four',
        }],
      };
    },

    computed: {
      currency () {
        return this.$store && this.$store.state && this.$store.state.user && this.$store.state.user.access && this.$store.state.user.access.currency;
      },

      show () {
        return !!this.currency;
      },

      min: {
        get () {
          return Math.min.apply(null, this.items.map(item => item.price.usd));
        },

        set () {

        },
      },

      max: {
        get () {
          return Math.max.apply(null, this.items.map(item => item.price.usd));
        },

        set () {

        },
      },
    },

    methods: {
      updateFilter (value, key) {
        this.filter[key] = value;
        this.$emit('update', this.filter);
      },
    },
  };
</script>

<style lang="scss">
  .module-collection-control {
    padding: 15px;
    background: $gray1;
  }

  .module-collection-control__headline {
    margin: 0;
    font: 1.4rem/1 $RistrettoProLight;
  }

  .module-collection-control__selector-grid {
    height: 36px;

    .btn-secondary {
      margin: 0 10px;
      width: 38px;
      cursor: pointer;
      background: $white;
      border: 1px solid $gray3;
      border-radius: none;
    }
  }
</style>
