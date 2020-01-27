<template>
    <v-container
        fluid
        class="pa-0"
    >
        <v-layout row>
            <span>
                {{ i18n.ui.intro }}
            </span>
        </v-layout>
        <v-layout row>
            <v-text-field
                v-model="name"
                class="my-2"
                name="Name"
                :label="i18n.ui.textinput"
                hide-details
            />
        </v-layout>
        <v-layout row>
            <v-btn
                color="primary"
                block
                @click="clickMe"
            >
                {{ i18n.ui.windowTitle }} Click me!
            </v-btn>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
      data: function() {
          return {
              name: "",
              i18n: Object
          };
      },
      methods: {
          clickMe() {
          // eslint-disable-next-line no-alert
              confirm(`Your name is ${this.name} ?`);
          }
      }
  };
</script>
