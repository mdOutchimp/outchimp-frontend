import Vue from "vue";

Vue.filter("capitalize", function(value) {
    value.toLowerCase().split(" ");
    return value.charAt(0).toUpperCase() + value.slice(1);
});