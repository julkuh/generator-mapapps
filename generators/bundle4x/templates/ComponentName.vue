<template>
    <v-container
            fluid
            fill-height
            class="my-widget pa-0"
    >
        <v-layout column>
            <!-- optional Header Content Area  (constant height, can be used multiple times) -->
            <v-flex
                    shrink
                    class="my-widget__header"
            >
                <v-alert
                        :value="true"
                        type="info"
                >
                    This is a simple demo to show how simple dialog design works
                </v-alert>
            </v-flex>
            <!-- Main Content Area (Grows, shrinks and scrolls if needed) -->
            <v-flex
                    style="overflow: auto"
                    class="my-widget__center"
            >
                <v-text-field
                        v-model="name"
                        class="my-2"
                        name="Name"
                        :label="i18n.ui.textinput"
                        hide-details
                />
                <v-textarea
                        label="Leave a message"
                        :value="message"
                        hide-details
                />
            </v-flex>
            <v-divider class="mb-1" />
            <!-- optional Bottom Bar (constant height) -->
            <v-flex
                    shrink
                    class="my-widget__bottom-bar"
            >
                <v-btn
                        color="primary"
                        block
                        mx-0
                        @click="clickMe"
                >
                    {{ i18n.ui.windowTitle }} Click me!
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data: function() {
            return {
                name: "",
                i18n: Object,
                message: ""
            };
        },
        methods: {
            clickMe() {
                // eslint-disable-next-line no-alert
                confirm(`Your name is ${this.name}. And the message was ${this.message}` );
            }
        }
    };
</script>
