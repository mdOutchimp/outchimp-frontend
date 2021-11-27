import Vue from "vue";

// Plugings
import VModal from "vue-js-modal/dist/ssr.nocss";
import "vue-js-modal/dist/styles.css";
import VueCurrencyFilter from "vue-currency-filter";
var VueTruncate = require("vue-truncate-filter");
// Vue chat scroll
import VueChatScroll from "vue-chat-scroll";
Vue.use(VueChatScroll);

Vue.use(VModal);
Vue.use(VueTruncate);
Vue.use(
  VueCurrencyFilter,
  {
    symbol: "৳",
    thousandsSeparator: ",",
    fractionCount: 0,
    fractionSeparator: ".",
    symbolPosition: "front",
    symbolSpacing: true,
    avoidEmptyDecimals: undefined
  },
  {
    // default name 'currency_2'
    name: "currency_simple",
    symbol: "",
    thousandsSeparator: ",",
    fractionCount: 0,
    fractionSeparator: ".",
    symbolPosition: "front",
    symbolSpacing: false,
    avoidEmptyDecimals: "--"
  }
);

// Components
import PageHeader from "~/components/Layouts/PageHeader.vue";
import Card from "~/components/Layouts/Card.vue";
import PackageCard from "~/components/Layouts/PackageCard.vue";
import SellerCard from "~/components/Layouts/SellerCard.vue";
import ThumbnailSlider from "~/components/Layouts/ThumbnailSlider.vue";
import ProfileDropdown from "~/components/Layouts/ProfileDropdown.vue";
import JobCard from "~/components/Layouts/JobCard.vue";
import ChatItem from "~/components/Layouts/ChatItem.vue";
import Message from "~/components/Layouts/Message.vue";
import MultiselectFilter from "~/components/Layouts/MultiselectFilter.vue";
import OrderCard from "~/components/Layouts/OrderCard.vue";
// Forms
import Checkbox from "~/components/Forms/Checkbox.vue";
import AuthForm from "~/components/Forms/AuthForm.vue";
import TextInput from "~/components/Forms/TextInput.vue";
import TextareaInput from "~/components/Forms/TextareaInput.vue";
import DateInput from "~/components/Forms/DateInput.vue";
import MultiselectInput from "~/components/Forms/MultiselectInput.vue";

// Others
import SearchBar from "~/components/SearchBar.vue";
import Errors from "~/components/Errors.vue";
import Error from "~/components/Error.vue";
import Loader from "~/components/Layouts/Loader.vue";
import LoadingTabView from "~/components/Layouts/LoadingTabView.vue";
import LoadingView from "~/components/Layouts/LoadingView.vue";

// Packages
import { Tabs, Tab } from "vue-tabs-component";

// Filters
Vue.filter("capitalize", function (value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.component("tabs", Tabs);
Vue.component("tab", Tab);

Vue.component('loader', Loader);
Vue.component('loading-tab-view', LoadingTabView);
Vue.component('loading-view', LoadingView);
Vue.component('page-header', PageHeader);
Vue.component('card', Card);
Vue.component('package-card', PackageCard);
Vue.component('seller-card', SellerCard);
Vue.component('job-card', JobCard);
Vue.component('thumbnail-slider', ThumbnailSlider);
Vue.component('search-bar', SearchBar);

// Form Components
Vue.component('checkbox', Checkbox);
Vue.component('auth-form', AuthForm);
Vue.component('text-input', TextInput);
Vue.component('textarea-input', TextareaInput);
Vue.component('date-input', DateInput);
Vue.component('multiselect-input', MultiselectInput);
Vue.component('multiselect-filter', MultiselectFilter);

Vue.component('profile-dropdown', ProfileDropdown);
Vue.component('errors', Errors);
Vue.component('error', Error);
Vue.component('chat-item', ChatItem);
Vue.component('message', Message);
Vue.component('order-card', OrderCard);

// 3rd party components
Vue.component("pagination", require("laravel-vue-pagination"));

// Vue moment
Vue.use(require("vue-moment"));
