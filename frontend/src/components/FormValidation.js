import * as Yup from "yup";

const FormValidation = Yup.object().shape({
  name: Yup.string().min(5).required("Please enter name"),
  type: Yup.string().min(5).required("Please choose challenge type"),
  description: Yup.string().min(20).required("Please enter description"),
  difficulty: Yup.string().min(5).required("Please enter difficulty"),
  duration: Yup.number().positive().integer().required("Please enter duration"),
});

export default FormValidation;
