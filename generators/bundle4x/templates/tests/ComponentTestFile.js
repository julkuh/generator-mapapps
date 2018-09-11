import registerSuite from "intern!object";
import assert from "intern/chai!assert";
import module from  "module";
import <%- name %> from "../<%- name %>";

registerSuite({
    name: md.id,
    "expect that 1 added to 1 equals 2": function () {
        var test = new <%- name %> ();
        // exchange this with a more clever test ;)
        var result = 1 + 1;
        assert.equal(result, 2);
    }
});
