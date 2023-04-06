import swal from "sweetalert";

export default {
  methods: {
    flash(message, type = "success", title = "Success") {
      swal(title, message, type);
    },
  },
};
