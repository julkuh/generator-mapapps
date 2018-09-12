import <%- componentName %> from "./<%- componentName %>.vue";
import Vue from "apprt-vue/Vue";
import VueDijit from "apprt-vue/VueDijit";


class <%- componentName %>Factory {
    createInstance() {
        let vm = new Vue(<%- componentName %>);
        let widget = VueDijit(vm);
        vm.i18n = this._i18n.get();
        // register for clean up
        return widget;
    }
    activate() {
    }
}

module.exports = <%- componentName %>Factory;