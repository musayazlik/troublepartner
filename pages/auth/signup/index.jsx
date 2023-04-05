import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const SignUp = () => {
  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const userCredential = await Register(values.email, values.password);

      // const userCredential = await createUserWithEmailAndPassword(
      //   auth,
      //   values.email,
      //   values.password
      // );
      // Kullanıcı başarılı bir şekilde kaydedildi, giriş yap sayfasına yönlendir
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Registration was successful. You are being redirected to the login page...",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        router.push("/auth/signin");
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
      console.log(err);
      setErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-500 min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h1 className="text-3xl font-bold text-center text-teal-500">
            Sign Up
          </h1>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Email alanı boş bırakılamaz";
            }
            if (!values.password) {
              errors.password = "Şifre alanı boş bırakılamaz";
            }
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold "
                >
                  Email:
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className=" py-2 border-2  w-full px-2 mb-3 border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold"
                >
                  Şifre:
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="py-2 border-2  w-full px-2 mb-8 border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 outline-none"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Recording..." : "Sign Up"}
              </button>
              <ErrorMessage
                name="submit"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
